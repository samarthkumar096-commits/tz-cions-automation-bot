# 🚀 Advanced Features Guide

## 🎯 Three Bot Versions

### 1. Basic Bot (`bot.js`)
Simple Puppeteer-based bot for basic automation.

```bash
node bot.js inspect
node bot.js login email@example.com password123
node bot.js signup "Name" email@example.com password123
```

### 2. Advanced Bot (`advanced-bot.js`)
Playwright-based with anti-detection and stealth mode.

```bash
node advanced-bot.js inspect
node advanced-bot.js login email@example.com password123
node advanced-bot.js signup "Name" email@example.com password123
```

**Features:**
- ✅ Anti-detection stealth mode
- ✅ Human-like behavior (random scrolling, typing delays)
- ✅ Multiple selector strategies
- ✅ Retry mechanism
- ✅ Advanced form detection
- ✅ Cookie management

### 3. Pro Bot (`pro-bot.js`)
Enterprise-grade with session management and bulk operations.

```bash
node pro-bot.js test-login
node pro-bot.js test-signup
node pro-bot.js session-login email@example.com password123
node pro-bot.js bulk-signup accounts.json
```

**Features:**
- ✅ All Advanced Bot features
- ✅ Session management (login once, reuse session)
- ✅ CAPTCHA detection and handling
- ✅ Bulk account creation
- ✅ Test mode (dry run)
- ✅ Proxy support
- ✅ Detailed logging and reports

---

## 🔥 Advanced Features

### 1. Session Management

Login once and reuse the session:

```bash
# First login (saves session)
node pro-bot.js session-login user@example.com password123

# Next time (uses saved session, no login needed!)
node pro-bot.js session-login user@example.com password123
```

Session is saved in `session.json` and automatically loaded.

### 2. Bulk Account Creation

Create multiple accounts at once:

**Step 1:** Create `accounts.json`:
```json
[
  {
    "name": "User 1",
    "email": "user1@example.com",
    "password": "pass123"
  },
  {
    "name": "User 2",
    "email": "user2@example.com",
    "password": "pass456"
  }
]
```

**Step 2:** Run bulk signup:
```bash
node pro-bot.js bulk-signup accounts.json
```

Results are saved in `bulk-signup-results.json`.

### 3. Test Mode (Dry Run)

Test the bot without actually submitting:

```bash
# Test login flow
node pro-bot.js test-login

# Test signup flow
node pro-bot.js test-signup
```

This will:
- Find all form elements
- Show which selectors work
- Take screenshots
- NOT submit the form

### 4. CAPTCHA Handling

The bot automatically detects CAPTCHAs:

- **Headless mode (false)**: Bot pauses for 60 seconds, solve manually
- **Headless mode (true)**: Bot reports CAPTCHA and suggests running with GUI

### 5. Anti-Detection Features

Advanced bot includes:
- ✅ Stealth plugin (hides automation)
- ✅ Real browser fingerprint
- ✅ Human-like mouse movements
- ✅ Random typing delays
- ✅ Random scrolling
- ✅ Realistic user agent
- ✅ Timezone and geolocation spoofing

### 6. Retry Mechanism

Automatic retry on failure:

```javascript
const bot = new AdvancedTZCionsBot();
await bot.login(email, password, { retries: 5 });
```

### 7. Custom Configuration

```javascript
const bot = new ProBot({
  url: 'http://tz-cions.com',
  headless: false,
  timeout: 60000,
  slowMo: 100,
  screenshots: true,
  proxy: 'http://proxy-server:port',
  retryAttempts: 3,
  retryDelay: 2000
});
```

### 8. Proxy Support

Use proxies to avoid IP blocking:

**Method 1: Environment variable**
```bash
export PROXY_URL=http://username:password@proxy:port
node advanced-bot.js login email pass
```

**Method 2: Code**
```javascript
const bot = new ProBot({
  proxy: 'http://proxy-server:port'
});
```

### 9. Screenshot Management

All bots automatically take screenshots:
- `inspect-*.png` - Website inspection
- `login-result-*.png` - Login success
- `signup-result-*.png` - Signup success
- `*-error-*.png` - Error screenshots

Disable screenshots:
```javascript
const bot = new AdvancedTZCionsBot({ screenshots: false });
```

### 10. Cookie Management

Cookies are automatically saved and can be reused:

```javascript
// Cookies saved to cookies.json after login
const bot = new AdvancedTZCionsBot();
await bot.login(email, password);

// Load cookies in next session
const cookies = JSON.parse(fs.readFileSync('cookies.json'));
await context.addCookies(cookies);
```

---

## 🎓 Usage Examples

### Example 1: Simple Login
```bash
node bot.js login user@example.com password123
```

### Example 2: Stealth Login with Retry
```bash
node advanced-bot.js login user@example.com password123
```

### Example 3: Session-based Login
```bash
node pro-bot.js session-login user@example.com password123
```

### Example 4: Bulk Signup
```bash
node pro-bot.js bulk-signup accounts.json
```

### Example 5: Test Before Running
```bash
node pro-bot.js test-login
node pro-bot.js test-signup
```

---

## 🔧 Troubleshooting

### Bot detected by website?
Use Advanced or Pro bot with stealth mode.

### CAPTCHA appearing?
Run with `headless: false` and solve manually.

### Elements not found?
Run `test-login` or `test-signup` to see which selectors work.

### Session expired?
Delete `session.json` and login again.

### Slow website?
Increase timeout: `{ timeout: 120000 }`

---

## 📊 Comparison

| Feature | Basic Bot | Advanced Bot | Pro Bot |
|---------|-----------|--------------|---------|
| Simple automation | ✅ | ✅ | ✅ |
| Anti-detection | ❌ | ✅ | ✅ |
| Stealth mode | ❌ | ✅ | ✅ |
| Human behavior | ❌ | ✅ | ✅ |
| Retry mechanism | ❌ | ✅ | ✅ |
| Session management | ❌ | ❌ | ✅ |
| CAPTCHA handling | ❌ | ❌ | ✅ |
| Bulk operations | ❌ | ❌ | ✅ |
| Test mode | ❌ | ❌ | ✅ |
| Proxy support | ❌ | ❌ | ✅ |

---

## 💡 Best Practices

1. **Start with test mode** to understand the website
2. **Use session management** to avoid repeated logins
3. **Add delays** between bulk operations
4. **Use proxies** for large-scale operations
5. **Run with GUI first** to debug issues
6. **Check screenshots** when something fails
7. **Save cookies** for faster subsequent runs

---

## 🚀 Pro Tips

- Use Advanced Bot for single operations
- Use Pro Bot for bulk operations
- Always test with `test-login` first
- Keep `headless: false` during development
- Use `slowMo` to see what's happening
- Check `inspection-result.json` for form details
- Monitor `bulk-signup-results.json` for bulk operations

---

**Happy Automating! 🎉**