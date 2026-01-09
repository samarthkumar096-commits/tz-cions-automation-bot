const { chromium } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

// Anti-detection stealth mode
chromium.use(StealthPlugin());

class AdvancedTZCionsBot {
  constructor(options = {}) {
    this.config = {
      url: options.url || 'http://tz-cions.com',
      headless: options.headless !== undefined ? options.headless : false,
      timeout: options.timeout || 60000,
      slowMo: options.slowMo || 100,
      userDataDir: options.userDataDir || './user-data',
      screenshots: options.screenshots !== undefined ? options.screenshots : true,
      ...options
    };
    
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  // Initialize browser with anti-detection
  async init() {
    console.log('🚀 Launching advanced browser with stealth mode...');
    
    this.browser = await chromium.launch({
      headless: this.config.headless,
      slowMo: this.config.slowMo,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080',
        '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      ]
    });

    // Create context with realistic settings
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      locale: 'en-US',
      timezoneId: 'America/New_York',
      permissions: ['geolocation', 'notifications'],
      geolocation: { latitude: 40.7128, longitude: -74.0060 },
      colorScheme: 'light',
      deviceScaleFactor: 1,
      hasTouch: false,
      isMobile: false,
      javaScriptEnabled: true
    });

    // Add extra headers
    await this.context.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    });

    this.page = await this.context.newPage();

    // Remove webdriver flag
    await this.page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false
      });
      
      // Mock plugins
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5]
      });
      
      // Mock languages
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en']
      });
      
      // Chrome runtime
      window.chrome = {
        runtime: {}
      };
    });

    console.log('✅ Browser initialized with anti-detection');
  }

  // Smart element finder with multiple strategies
  async findElement(selectors, timeout = 10000) {
    for (const selector of selectors) {
      try {
        await this.page.waitForSelector(selector, { timeout: 5000, state: 'visible' });
        const element = await this.page.$(selector);
        if (element) {
          console.log(`✅ Found element: ${selector}`);
          return { element, selector };
        }
      } catch (e) {
        continue;
      }
    }
    throw new Error('Element not found with any selector');
  }

  // Human-like typing
  async humanType(selector, text) {
    await this.page.click(selector);
    await this.page.waitForTimeout(Math.random() * 500 + 200);
    
    for (const char of text) {
      await this.page.type(selector, char, { 
        delay: Math.random() * 100 + 50 
      });
    }
    
    await this.page.waitForTimeout(Math.random() * 300 + 100);
  }

  // Human-like mouse movement and click
  async humanClick(selector) {
    const element = await this.page.$(selector);
    const box = await element.boundingBox();
    
    if (box) {
      // Move to random position within element
      const x = box.x + Math.random() * box.width;
      const y = box.y + Math.random() * box.height;
      
      await this.page.mouse.move(x, y, { steps: 10 });
      await this.page.waitForTimeout(Math.random() * 200 + 100);
      await this.page.mouse.click(x, y);
    } else {
      await this.page.click(selector);
    }
  }

  // Random scrolling (human behavior)
  async randomScroll() {
    const scrolls = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < scrolls; i++) {
      await this.page.evaluate(() => {
        window.scrollBy(0, Math.random() * 300 + 100);
      });
      await this.page.waitForTimeout(Math.random() * 1000 + 500);
    }
  }

  // Take screenshot with timestamp
  async takeScreenshot(name) {
    if (!this.config.screenshots) return;
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}-${timestamp}.png`;
    await this.page.screenshot({ 
      path: filename, 
      fullPage: true 
    });
    console.log(`📸 Screenshot saved: ${filename}`);
    return filename;
  }

  // Advanced form detection
  async detectForms() {
    return await this.page.evaluate(() => {
      const forms = [];
      document.querySelectorAll('form').forEach((form, idx) => {
        const formData = {
          index: idx,
          action: form.action,
          method: form.method,
          id: form.id,
          className: form.className,
          inputs: [],
          buttons: []
        };

        // Get all inputs
        form.querySelectorAll('input, textarea, select').forEach(input => {
          formData.inputs.push({
            type: input.type,
            name: input.name,
            id: input.id,
            placeholder: input.placeholder,
            required: input.required,
            className: input.className,
            value: input.value,
            autocomplete: input.autocomplete
          });
        });

        // Get all buttons
        form.querySelectorAll('button, input[type="submit"]').forEach(btn => {
          formData.buttons.push({
            type: btn.type,
            text: btn.textContent.trim(),
            id: btn.id,
            className: btn.className,
            name: btn.name
          });
        });

        forms.push(formData);
      });
      
      return forms;
    });
  }

  // Advanced inspect with AI-like analysis
  async inspect() {
    try {
      console.log('🔍 Starting advanced website inspection...');
      await this.init();
      
      await this.page.goto(this.config.url, { 
        waitUntil: 'networkidle',
        timeout: this.config.timeout 
      });
      
      await this.randomScroll();
      await this.page.waitForTimeout(2000);

      // Detect forms
      const forms = await this.detectForms();
      
      // Get all links
      const links = await this.page.evaluate(() => {
        return Array.from(document.querySelectorAll('a')).map(a => ({
          text: a.textContent.trim(),
          href: a.href,
          id: a.id,
          className: a.className
        })).filter(link => link.text.length > 0);
      });

      // Detect login/signup patterns
      const patterns = await this.page.evaluate(() => {
        const text = document.body.innerText.toLowerCase();
        return {
          hasLogin: text.includes('login') || text.includes('sign in') || text.includes('log in'),
          hasSignup: text.includes('signup') || text.includes('sign up') || text.includes('register'),
          hasForgotPassword: text.includes('forgot password') || text.includes('reset password'),
          hasRememberMe: text.includes('remember me') || text.includes('keep me logged in')
        };
      });

      const result = {
        url: this.page.url(),
        title: await this.page.title(),
        forms,
        links: links.slice(0, 20), // Top 20 links
        patterns,
        timestamp: new Date().toISOString()
      };

      // Save to file
      fs.writeFileSync('inspection-result.json', JSON.stringify(result, null, 2));
      console.log('💾 Inspection data saved to: inspection-result.json');

      await this.takeScreenshot('inspect');

      console.log('\n📋 INSPECTION RESULTS:');
      console.log('='.repeat(60));
      console.log(`Title: ${result.title}`);
      console.log(`Forms found: ${forms.length}`);
      console.log(`Links found: ${links.length}`);
      console.log(`Patterns detected:`, patterns);
      console.log('='.repeat(60));

      return result;

    } catch (error) {
      console.error('❌ Inspection failed:', error.message);
      await this.takeScreenshot('inspect-error');
      throw error;
    } finally {
      await this.close();
    }
  }

  // Advanced login with retry mechanism
  async login(email, password, options = {}) {
    const maxRetries = options.retries || 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        attempt++;
        console.log(`🔐 Login attempt ${attempt}/${maxRetries}...`);
        
        await this.init();
        await this.page.goto(this.config.url, { 
          waitUntil: 'networkidle',
          timeout: this.config.timeout 
        });

        await this.randomScroll();
        await this.page.waitForTimeout(1000);

        // Try to find and click login link first
        const loginLinkSelectors = [
          'a[href*="login"]',
          'a[href*="signin"]',
          'button:has-text("Login")',
          'button:has-text("Sign In")',
          'a:has-text("Login")',
          'a:has-text("Sign In")'
        ];

        for (const selector of loginLinkSelectors) {
          try {
            const link = await this.page.$(selector);
            if (link) {
              console.log(`✅ Found login link: ${selector}`);
              await this.humanClick(selector);
              await this.page.waitForTimeout(2000);
              break;
            }
          } catch (e) {
            continue;
          }
        }

        // Find email field
        const emailSelectors = [
          'input[type="email"]',
          'input[name="email"]',
          'input[name="username"]',
          'input[placeholder*="email" i]',
          'input[placeholder*="Email" i]',
          'input[id*="email" i]',
          'input[id*="username" i]',
          '#email',
          '#username',
          '#user',
          'input[autocomplete="email"]',
          'input[autocomplete="username"]'
        ];

        const emailField = await this.findElement(emailSelectors);
        await this.humanType(emailField.selector, email);
        console.log('✅ Email entered');

        // Find password field
        const passwordSelectors = [
          'input[type="password"]',
          'input[name="password"]',
          'input[placeholder*="password" i]',
          'input[id*="password" i]',
          '#password',
          '#pass',
          'input[autocomplete="current-password"]'
        ];

        const passwordField = await this.findElement(passwordSelectors);
        await this.humanType(passwordField.selector, password);
        console.log('✅ Password entered');

        await this.page.waitForTimeout(500);

        // Find and click submit button
        const submitSelectors = [
          'button[type="submit"]',
          'input[type="submit"]',
          'button:has-text("Login")',
          'button:has-text("Sign In")',
          'button:has-text("Log In")',
          'form button',
          'button[name="login"]',
          'button[id*="login" i]',
          'button[id*="submit" i]'
        ];

        try {
          const submitButton = await this.findElement(submitSelectors, 5000);
          await this.humanClick(submitButton.selector);
          console.log('✅ Submit button clicked');
        } catch (e) {
          console.log('⚠️ Submit button not found, trying Enter key');
          await this.page.keyboard.press('Enter');
        }

        // Wait for navigation or response
        await Promise.race([
          this.page.waitForNavigation({ timeout: 15000 }).catch(() => {}),
          this.page.waitForTimeout(15000)
        ]);

        const currentUrl = this.page.url();
        const pageContent = await this.page.content();

        // Check for success indicators
        const successIndicators = [
          'dashboard',
          'welcome',
          'profile',
          'account',
          'logout',
          'sign out'
        ];

        const isSuccess = successIndicators.some(indicator => 
          currentUrl.toLowerCase().includes(indicator) || 
          pageContent.toLowerCase().includes(indicator)
        );

        // Check for error messages
        const errorIndicators = [
          'invalid',
          'incorrect',
          'wrong',
          'failed',
          'error',
          'try again'
        ];

        const hasError = errorIndicators.some(indicator => 
          pageContent.toLowerCase().includes(indicator)
        );

        await this.takeScreenshot('login-result');

        if (isSuccess && !hasError) {
          console.log('✅ Login successful!');
          console.log(`📍 Current URL: ${currentUrl}`);
          
          // Save cookies for future use
          const cookies = await this.context.cookies();
          fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
          console.log('🍪 Cookies saved');

          return { 
            success: true, 
            url: currentUrl,
            message: 'Login successful',
            attempt
          };
        } else if (hasError) {
          throw new Error('Login failed: Invalid credentials or error message detected');
        } else {
          console.log('⚠️ Login status unclear, checking...');
          await this.page.waitForTimeout(3000);
          
          return { 
            success: true, 
            url: currentUrl,
            message: 'Login completed (status unclear)',
            attempt
          };
        }

      } catch (error) {
        console.error(`❌ Login attempt ${attempt} failed:`, error.message);
        await this.takeScreenshot(`login-error-attempt-${attempt}`);
        
        if (attempt >= maxRetries) {
          return { 
            success: false, 
            error: error.message,
            attempts: attempt
          };
        }
        
        await this.close();
        await this.page.waitForTimeout(2000);
      }
    }
  }

  // Advanced signup with field detection
  async signup(userData, options = {}) {
    try {
      console.log('📝 Starting advanced signup...');
      await this.init();
      
      await this.page.goto(this.config.url, { 
        waitUntil: 'networkidle',
        timeout: this.config.timeout 
      });

      await this.randomScroll();
      await this.page.waitForTimeout(1000);

      // Find signup link
      const signupLinkSelectors = [
        'a[href*="signup"]',
        'a[href*="register"]',
        'a[href*="sign-up"]',
        'button:has-text("Sign Up")',
        'button:has-text("Register")',
        'a:has-text("Sign Up")',
        'a:has-text("Register")',
        'a:has-text("Create Account")'
      ];

      for (const selector of signupLinkSelectors) {
        try {
          const link = await this.page.$(selector);
          if (link) {
            console.log(`✅ Found signup link: ${selector}`);
            await this.humanClick(selector);
            await this.page.waitForTimeout(2000);
            break;
          }
        } catch (e) {
          continue;
        }
      }

      // Fill name field
      if (userData.name) {
        const nameSelectors = [
          'input[name="name"]',
          'input[name="fullname"]',
          'input[name="full_name"]',
          'input[placeholder*="name" i]',
          'input[id*="name" i]',
          '#name',
          '#fullname',
          'input[autocomplete="name"]'
        ];

        try {
          const nameField = await this.findElement(nameSelectors, 5000);
          await this.humanType(nameField.selector, userData.name);
          console.log('✅ Name entered');
        } catch (e) {
          console.log('⚠️ Name field not found (optional)');
        }
      }

      // Fill email
      const emailSelectors = [
        'input[type="email"]',
        'input[name="email"]',
        'input[placeholder*="email" i]',
        'input[id*="email" i]',
        '#email',
        'input[autocomplete="email"]'
      ];

      const emailField = await this.findElement(emailSelectors);
      await this.humanType(emailField.selector, userData.email);
      console.log('✅ Email entered');

      // Fill password fields
      const passwordFields = await this.page.$$('input[type="password"]');
      console.log(`Found ${passwordFields.length} password field(s)`);

      for (let i = 0; i < passwordFields.length; i++) {
        await passwordFields[i].click();
        await this.page.waitForTimeout(300);
        await passwordFields[i].type(userData.password, { delay: 100 });
        console.log(`✅ Password entered in field ${i + 1}`);
      }

      await this.page.waitForTimeout(500);

      // Find and click submit
      const submitSelectors = [
        'button[type="submit"]',
        'input[type="submit"]',
        'button:has-text("Sign Up")',
        'button:has-text("Register")',
        'button:has-text("Create Account")',
        'form button'
      ];

      try {
        const submitButton = await this.findElement(submitSelectors, 5000);
        await this.humanClick(submitButton.selector);
        console.log('✅ Submit button clicked');
      } catch (e) {
        console.log('⚠️ Submit button not found, trying Enter key');
        await this.page.keyboard.press('Enter');
      }

      await Promise.race([
        this.page.waitForNavigation({ timeout: 15000 }).catch(() => {}),
        this.page.waitForTimeout(15000)
      ]);

      await this.takeScreenshot('signup-result');

      const currentUrl = this.page.url();
      console.log('✅ Signup completed!');
      console.log(`📍 Current URL: ${currentUrl}`);

      return { 
        success: true, 
        url: currentUrl,
        message: 'Signup completed'
      };

    } catch (error) {
      console.error('❌ Signup failed:', error.message);
      await this.takeScreenshot('signup-error');
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      await this.close();
    }
  }

  // Close browser
  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔒 Browser closed');
    }
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  const bot = new AdvancedTZCionsBot({
    headless: false,
    screenshots: true
  });

  if (command === 'inspect') {
    bot.inspect();
  } else if (command === 'login') {
    const email = args[1] || 'test@example.com';
    const password = args[2] || 'password123';
    bot.login(email, password);
  } else if (command === 'signup') {
    const userData = {
      name: args[1] || 'Test User',
      email: args[2] || 'test@example.com',
      password: args[3] || 'password123'
    };
    bot.signup(userData);
  } else {
    console.log('\n🤖 Advanced TZ-Cions Bot\n');
    console.log('Usage:');
    console.log('  node advanced-bot.js inspect');
    console.log('  node advanced-bot.js login <email> <password>');
    console.log('  node advanced-bot.js signup <name> <email> <password>\n');
  }
}

module.exports = AdvancedTZCionsBot;