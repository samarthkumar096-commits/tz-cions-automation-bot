require('dotenv').config();
const AdvancedTZCionsBot = require('./advanced-bot');
const fs = require('fs');

class ProBot extends AdvancedTZCionsBot {
  constructor(options = {}) {
    super(options);
    this.config = {
      ...this.config,
      proxy: options.proxy || process.env.PROXY_URL,
      captchaSolver: options.captchaSolver || process.env.CAPTCHA_API_KEY,
      sessionFile: options.sessionFile || './session.json',
      cookieFile: options.cookieFile || './cookies.json',
      retryAttempts: options.retryAttempts || 3,
      retryDelay: options.retryDelay || 2000,
      ...options
    };
  }

  // Load saved session
  async loadSession() {
    try {
      if (fs.existsSync(this.config.sessionFile)) {
        const session = JSON.parse(fs.readFileSync(this.config.sessionFile, 'utf8'));
        console.log('📂 Loading saved session...');
        
        if (session.cookies && this.context) {
          await this.context.addCookies(session.cookies);
          console.log('✅ Session loaded successfully');
          return true;
        }
      }
    } catch (error) {
      console.log('⚠️ Could not load session:', error.message);
    }
    return false;
  }

  // Save session
  async saveSession() {
    try {
      const cookies = await this.context.cookies();
      const session = {
        cookies,
        timestamp: new Date().toISOString(),
        url: this.page.url()
      };
      
      fs.writeFileSync(this.config.sessionFile, JSON.stringify(session, null, 2));
      console.log('💾 Session saved');
    } catch (error) {
      console.log('⚠️ Could not save session:', error.message);
    }
  }

  // Detect and handle CAPTCHA
  async handleCaptcha() {
    try {
      // Check for common CAPTCHA elements
      const captchaSelectors = [
        'iframe[src*="recaptcha"]',
        'iframe[src*="hcaptcha"]',
        '.g-recaptcha',
        '.h-captcha',
        '#captcha',
        '[class*="captcha"]'
      ];

      for (const selector of captchaSelectors) {
        const captcha = await this.page.$(selector);
        if (captcha) {
          console.log('🤖 CAPTCHA detected!');
          
          if (this.config.headless === false) {
            console.log('⏸️  Please solve the CAPTCHA manually...');
            console.log('⏳ Waiting 60 seconds...');
            await this.page.waitForTimeout(60000);
            return true;
          } else {
            console.log('⚠️ CAPTCHA detected but running in headless mode');
            console.log('💡 Tip: Run with headless: false to solve manually');
            return false;
          }
        }
      }
      
      return true; // No CAPTCHA found
    } catch (error) {
      console.log('⚠️ CAPTCHA check failed:', error.message);
      return true;
    }
  }

  // Smart wait for element with retry
  async smartWait(selectors, options = {}) {
    const maxAttempts = options.attempts || 3;
    const timeout = options.timeout || 10000;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`🔍 Attempt ${attempt}/${maxAttempts} to find element...`);
        return await this.findElement(selectors, timeout);
      } catch (error) {
        if (attempt === maxAttempts) {
          throw error;
        }
        console.log(`⚠️ Attempt ${attempt} failed, retrying...`);
        await this.page.waitForTimeout(this.config.retryDelay);
        await this.randomScroll();
      }
    }
  }

  // Login with session management
  async loginWithSession(email, password, options = {}) {
    try {
      await this.init();
      
      // Try to load existing session
      const sessionLoaded = await this.loadSession();
      
      if (sessionLoaded) {
        console.log('🔄 Checking if session is still valid...');
        await this.page.goto(this.config.url, { 
          waitUntil: 'networkidle',
          timeout: this.config.timeout 
        });
        
        await this.page.waitForTimeout(3000);
        
        // Check if already logged in
        const isLoggedIn = await this.page.evaluate(() => {
          const indicators = ['logout', 'sign out', 'dashboard', 'profile', 'account'];
          const text = document.body.innerText.toLowerCase();
          return indicators.some(indicator => text.includes(indicator));
        });
        
        if (isLoggedIn) {
          console.log('✅ Already logged in with saved session!');
          await this.takeScreenshot('session-login');
          return { 
            success: true, 
            url: this.page.url(),
            message: 'Logged in with saved session'
          };
        } else {
          console.log('⚠️ Session expired, logging in again...');
        }
      }
      
      // Perform normal login
      const result = await this.login(email, password, options);
      
      // Save session if login successful
      if (result.success) {
        await this.saveSession();
      }
      
      return result;
      
    } catch (error) {
      console.error('❌ Login with session failed:', error.message);
      return { success: false, error: error.message };
    } finally {
      await this.close();
    }
  }

  // Bulk account creation
  async bulkSignup(accounts, options = {}) {
    const results = [];
    const delay = options.delay || 5000;
    
    console.log(`📝 Starting bulk signup for ${accounts.length} accounts...`);
    
    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];
      console.log(`\n[${i + 1}/${accounts.length}] Processing: ${account.email}`);
      
      try {
        const result = await this.signup(account, options);
        results.push({
          ...account,
          result,
          index: i + 1
        });
        
        if (result.success) {
          console.log(`✅ Account ${i + 1} created successfully`);
        } else {
          console.log(`❌ Account ${i + 1} failed:`, result.error);
        }
        
        // Delay between accounts
        if (i < accounts.length - 1) {
          console.log(`⏳ Waiting ${delay/1000} seconds before next account...`);
          await this.page.waitForTimeout(delay);
        }
        
      } catch (error) {
        console.error(`❌ Account ${i + 1} error:`, error.message);
        results.push({
          ...account,
          result: { success: false, error: error.message },
          index: i + 1
        });
      }
    }
    
    // Save results
    fs.writeFileSync('bulk-signup-results.json', JSON.stringify(results, null, 2));
    console.log('\n💾 Results saved to: bulk-signup-results.json');
    
    const successful = results.filter(r => r.result.success).length;
    console.log(`\n📊 Summary: ${successful}/${accounts.length} accounts created successfully`);
    
    return results;
  }

  // Test mode - dry run without actual submission
  async testMode(action, data) {
    console.log('🧪 Running in TEST MODE (no actual submission)');
    
    try {
      await this.init();
      await this.page.goto(this.config.url, { 
        waitUntil: 'networkidle',
        timeout: this.config.timeout 
      });
      
      await this.randomScroll();
      
      if (action === 'login') {
        console.log('📝 Testing login flow...');
        
        // Find email field
        const emailSelectors = [
          'input[type="email"]',
          'input[name="email"]',
          'input[name="username"]'
        ];
        const emailField = await this.smartWait(emailSelectors);
        console.log(`✅ Email field found: ${emailField.selector}`);
        
        // Find password field
        const passwordSelectors = [
          'input[type="password"]',
          'input[name="password"]'
        ];
        const passwordField = await this.smartWait(passwordSelectors);
        console.log(`✅ Password field found: ${passwordField.selector}`);
        
        // Find submit button
        const submitSelectors = [
          'button[type="submit"]',
          'input[type="submit"]'
        ];
        const submitButton = await this.smartWait(submitSelectors);
        console.log(`✅ Submit button found: ${submitButton.selector}`);
        
        console.log('✅ Login flow test passed!');
        
      } else if (action === 'signup') {
        console.log('📝 Testing signup flow...');
        
        const forms = await this.detectForms();
        console.log(`✅ Found ${forms.length} form(s)`);
        
        forms.forEach((form, idx) => {
          console.log(`\nForm ${idx + 1}:`);
          console.log(`  Inputs: ${form.inputs.length}`);
          console.log(`  Buttons: ${form.buttons.length}`);
        });
        
        console.log('✅ Signup flow test passed!');
      }
      
      await this.takeScreenshot('test-mode');
      
    } catch (error) {
      console.error('❌ Test failed:', error.message);
    } finally {
      await this.close();
    }
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  const bot = new ProBot({
    headless: false,
    screenshots: true
  });

  if (command === 'test-login') {
    bot.testMode('login');
  } else if (command === 'test-signup') {
    bot.testMode('signup');
  } else if (command === 'session-login') {
    const email = args[1] || 'test@example.com';
    const password = args[2] || 'password123';
    bot.loginWithSession(email, password);
  } else if (command === 'bulk-signup') {
    const accountsFile = args[1] || 'accounts.json';
    if (fs.existsSync(accountsFile)) {
      const accounts = JSON.parse(fs.readFileSync(accountsFile, 'utf8'));
      bot.bulkSignup(accounts);
    } else {
      console.log('❌ Accounts file not found:', accountsFile);
      console.log('💡 Create accounts.json with format:');
      console.log('[{"name":"User1","email":"user1@example.com","password":"pass123"}]');
    }
  } else {
    console.log('\n🚀 Pro TZ-Cions Bot\n');
    console.log('Usage:');
    console.log('  node pro-bot.js test-login');
    console.log('  node pro-bot.js test-signup');
    console.log('  node pro-bot.js session-login <email> <password>');
    console.log('  node pro-bot.js bulk-signup <accounts.json>\n');
  }
}

module.exports = ProBot;