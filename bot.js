const puppeteer = require('puppeteer');

const CONFIG = {
  url: 'http://tz-cions.com',
  headless: false,  // Set true for background mode
  timeout: 30000
};

class TZCionsBot {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    console.log('🚀 Browser start ho raha hai...');
    this.browser = await puppeteer.launch({
      headless: CONFIG.headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1366, height: 768 });
  }

  async login(email, password) {
    try {
      console.log('🔐 Login shuru...');
      await this.init();
      await this.page.goto(CONFIG.url, { waitUntil: 'networkidle2' });
      await this.page.waitForTimeout(2000);

      // Multiple selector strategies for email
      const emailSelectors = [
        'input[type="email"]',
        'input[name="email"]',
        'input[name="username"]',
        '#email',
        '#username'
      ];

      let emailFilled = false;
      for (const selector of emailSelectors) {
        try {
          const field = await this.page.$(selector);
          if (field) {
            await this.page.type(selector, email, { delay: 100 });
            console.log(`✅ Email daal diya: ${selector}`);
            emailFilled = true;
            break;
          }
        } catch (e) { continue; }
      }

      if (!emailFilled) throw new Error('Email field nahi mila!');

      // Password field
      const passwordSelectors = [
        'input[type="password"]',
        'input[name="password"]',
        '#password'
      ];

      let passwordFilled = false;
      for (const selector of passwordSelectors) {
        try {
          const field = await this.page.$(selector);
          if (field) {
            await this.page.type(selector, password, { delay: 100 });
            console.log(`✅ Password daal diya: ${selector}`);
            passwordFilled = true;
            break;
          }
        } catch (e) { continue; }
      }

      if (!passwordFilled) throw new Error('Password field nahi mila!');

      // Submit button
      const submitSelectors = [
        'button[type="submit"]',
        'input[type="submit"]',
        'form button'
      ];

      let clicked = false;
      for (const selector of submitSelectors) {
        try {
          await this.page.click(selector);
          clicked = true;
          console.log('✅ Submit button click ho gaya');
          break;
        } catch (e) { continue; }
      }

      if (!clicked) {
        await this.page.keyboard.press('Enter');
        console.log('✅ Enter key press ho gaya');
      }

      await this.page.waitForTimeout(5000);
      await this.page.screenshot({ path: 'login-result.png', fullPage: true });
      
      console.log('✅ Login complete!');
      console.log('📸 Screenshot: login-result.png');
      console.log(`📍 Current URL: ${this.page.url()}`);

      return { success: true, url: this.page.url() };

    } catch (error) {
      console.error('❌ Login fail:', error.message);
      if (this.page) {
        await this.page.screenshot({ path: 'login-error.png' });
        console.log('📸 Error screenshot: login-error.png');
      }
      return { success: false, error: error.message };
    } finally {
      await this.close();
    }
  }

  async signup(name, email, password) {
    try {
      console.log('📝 Signup shuru...');
      await this.init();
      await this.page.goto(CONFIG.url, { waitUntil: 'networkidle2' });
      await this.page.waitForTimeout(2000);

      // Look for signup link
      const signupLinks = [
        'a[href*="signup"]',
        'a[href*="register"]',
        'button:contains("Sign Up")'
      ];

      for (const selector of signupLinks) {
        try {
          const link = await this.page.$(selector);
          if (link) {
            await this.page.click(selector);
            await this.page.waitForTimeout(2000);
            console.log('✅ Signup link click ho gaya');
            break;
          }
        } catch (e) { continue; }
      }

      // Fill name
      const nameSelectors = [
        'input[name="name"]',
        'input[name="fullname"]',
        'input[name="full_name"]',
        '#name',
        '#fullname'
      ];

      for (const selector of nameSelectors) {
        try {
          const field = await this.page.$(selector);
          if (field) {
            await this.page.type(selector, name, { delay: 100 });
            console.log('✅ Name daal diya');
            break;
          }
        } catch (e) { continue; }
      }

      // Fill email
      const emailSelectors = [
        'input[type="email"]',
        'input[name="email"]',
        '#email'
      ];

      let emailFilled = false;
      for (const selector of emailSelectors) {
        try {
          const field = await this.page.$(selector);
          if (field) {
            await this.page.type(selector, email, { delay: 100 });
            console.log('✅ Email daal diya');
            emailFilled = true;
            break;
          }
        } catch (e) { continue; }
      }

      if (!emailFilled) throw new Error('Email field nahi mila!');

      // Fill password(s)
      const passwordFields = await this.page.$$('input[type="password"]');
      if (passwordFields.length > 0) {
        for (const field of passwordFields) {
          await field.type(password, { delay: 100 });
        }
        console.log(`✅ Password daal diya ${passwordFields.length} field(s) mein`);
      } else {
        throw new Error('Password field nahi mila!');
      }

      // Submit
      await this.page.click('button[type="submit"]');
      await this.page.waitForTimeout(5000);
      await this.page.screenshot({ path: 'signup-result.png', fullPage: true });

      console.log('✅ Signup complete!');
      console.log('📸 Screenshot: signup-result.png');
      console.log(`📍 Current URL: ${this.page.url()}`);

      return { success: true, url: this.page.url() };

    } catch (error) {
      console.error('❌ Signup fail:', error.message);
      if (this.page) {
        await this.page.screenshot({ path: 'signup-error.png' });
        console.log('📸 Error screenshot: signup-error.png');
      }
      return { success: false, error: error.message };
    } finally {
      await this.close();
    }
  }

  async inspect() {
    try {
      console.log('🔍 Website check kar rahe hain...');
      await this.init();
      await this.page.goto(CONFIG.url, { waitUntil: 'networkidle2' });
      await this.page.waitForTimeout(2000);

      const forms = await this.page.evaluate(() => {
        return Array.from(document.querySelectorAll('form')).map((form, idx) => {
          const inputs = Array.from(form.querySelectorAll('input')).map(input => ({
            type: input.type,
            name: input.name,
            id: input.id,
            placeholder: input.placeholder
          }));
          const buttons = Array.from(form.querySelectorAll('button')).map(btn => ({
            type: btn.type,
            text: btn.textContent.trim()
          }));
          return { formIndex: idx, inputs, buttons };
        });
      });

      console.log('\n📋 WEBSITE KA STRUCTURE:');
      console.log('='.repeat(60));
      console.log(JSON.stringify(forms, null, 2));
      console.log('='.repeat(60));

      await this.page.screenshot({ path: 'inspect.png', fullPage: true });
      console.log('\n📸 Screenshot: inspect.png');

      return forms;

    } catch (error) {
      console.error('❌ Inspection fail:', error.message);
      return null;
    } finally {
      await this.close();
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  const bot = new TZCionsBot();

  if (command === 'login') {
    bot.login(args[1] || 'test@example.com', args[2] || 'password123');
  } else if (command === 'signup') {
    bot.signup(
      args[1] || 'Test User',
      args[2] || 'test@example.com',
      args[3] || 'password123'
    );
  } else if (command === 'inspect') {
    bot.inspect();
  } else {
    console.log('\n🤖 TZ-Cions Automation Bot\n');
    console.log('Usage:');
    console.log('  node bot.js login <email> <password>');
    console.log('  node bot.js signup <name> <email> <password>');
    console.log('  node bot.js inspect\n');
    console.log('Examples:');
    console.log('  node bot.js login user@example.com mypass123');
    console.log('  node bot.js signup "John Doe" john@example.com pass123');
    console.log('  node bot.js inspect\n');
  }
}

module.exports = TZCionsBot;