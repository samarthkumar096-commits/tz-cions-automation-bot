# 🤖 TZ-Cions Automation Bot

Complete automation bot for **tz-cions.com** with login, signup, and website inspection features.

## ✨ Features

- ✅ **Smart Login** - Automatic login with multiple selector strategies
- ✅ **Account Creation** - Automated signup process
- ✅ **Website Inspector** - Analyze website structure and forms
- ✅ **Screenshot Capture** - Automatic screenshots of all actions
- ✅ **Error Handling** - Detailed error messages and error screenshots
- ✅ **Hindi Logging** - Easy to understand Hindi console messages
- ✅ **CLI Interface** - Simple command-line usage

## 📥 Installation

### Step 1: Download Code

```bash
git clone https://github.com/samarthkumar096-commits/tz-cions-automation-bot.git
cd tz-cions-automation-bot
```

### Step 2: Install Dependencies

```bash
npm install
```

## 🚀 Usage

### 1. Inspect Website (Pehle yeh karo!)

Website ka structure dekhne ke liye:

```bash
node bot.js inspect
```

Yeh command:
- Website ke saare forms dhundega
- Input fields aur buttons ki details dikhayega
- Full page screenshot save karega (`inspect.png`)

### 2. Login to Account

```bash
node bot.js login your@email.com yourpassword
```

Example:
```bash
node bot.js login user@example.com mypass123
```

### 3. Create New Account

```bash
node bot.js signup "Your Name" your@email.com yourpassword
```

Example:
```bash
node bot.js signup "John Doe" john@example.com securepass123
```

## ⚙️ Configuration

`bot.js` file mein CONFIG object edit karo:

```javascript
const CONFIG = {
  url: 'http://tz-cions.com',  // Target website
  headless: false,              // true = background, false = browser dikhega
  timeout: 30000                // Timeout in milliseconds
};
```

### Settings Explained:

- **url**: Website ka URL
- **headless**: 
  - `false` = Browser window dikhega (debugging ke liye best)
  - `true` = Background mein chalega (production ke liye)
- **timeout**: Kitni der wait karega (30000 = 30 seconds)

## 📸 Screenshots

Bot automatically screenshots save karta hai:

- `login-result.png` - Login successful hone ke baad
- `signup-result.png` - Signup complete hone ke baad
- `inspect.png` - Website structure inspection
- `login-error.png` - Agar login fail ho
- `signup-error.png` - Agar signup fail ho

## 🔧 Advanced Usage

### Use as Module

Apne code mein import karke use karo:

```javascript
const TZCionsBot = require('./bot');

async function main() {
  const bot = new TZCionsBot();
  
  // Inspect website
  const structure = await bot.inspect();
  console.log(structure);
  
  // Login
  const loginResult = await bot.login('user@example.com', 'pass123');
  console.log(loginResult);
  
  // Signup
  const signupResult = await bot.signup('John Doe', 'john@example.com', 'pass123');
  console.log(signupResult);
}

main();
```

### Custom Selectors

Agar website ka structure alag hai, toh selectors customize kar sakte ho:

```javascript
// Email field ke liye multiple selectors
const emailSelectors = [
  'input[type="email"]',
  'input[name="email"]',
  'input[name="username"]',
  '#email',
  '#username'
];

// Password field ke liye
const passwordSelectors = [
  'input[type="password"]',
  'input[name="password"]',
  '#password'
];
```

## 🐛 Troubleshooting

### Problem: Form fields nahi mil rahe

**Solution:**
1. Pehle `node bot.js inspect` run karo
2. Output mein actual field names dekho
3. `bot.js` mein selectors update karo

### Problem: Login/Signup fail ho raha hai

**Solution:**
1. `headless: false` set karo CONFIG mein
2. Browser window dekho kya ho raha hai
3. Error screenshots check karo
4. Timeout badhao agar website slow hai

### Problem: Website slow load ho rahi hai

**Solution:**
```javascript
const CONFIG = {
  timeout: 60000  // 60 seconds
};
```

### Problem: CAPTCHA aa raha hai

**Solution:**
- Bot pause ho jayega
- Manually CAPTCHA solve karo
- Ya CAPTCHA solving service integrate karo

## 💡 Tips

1. **Pehle inspect karo** - Website structure samajhne ke liye
2. **Headless false rakho** - Debugging ke time
3. **Screenshots check karo** - Kya hua yeh samajhne ke liye
4. **Timeout badhao** - Slow websites ke liye
5. **Error messages padho** - Hindi mein clear explanation milegi

## 📋 Requirements

- Node.js (v14 or higher)
- npm or yarn
- Internet connection
- Chrome/Chromium (Puppeteer automatically install karega)

## ⚠️ Important Notes

- **Legal Use Only**: Sirf authorized testing ke liye use karo
- **Terms of Service**: Website ki ToS follow karo
- **Bot Detection**: Kuch websites bot detect kar sakti hain
- **Rate Limiting**: Bahut zyada requests mat bhejo
- **Privacy**: Apne credentials safe rakho

## 🔐 Security

- Credentials code mein hardcode mat karo
- Environment variables use karo:

```javascript
const email = process.env.EMAIL || 'default@example.com';
const password = process.env.PASSWORD || 'defaultpass';
```

Run karte time:
```bash
EMAIL=your@email.com PASSWORD=yourpass node bot.js login
```

## 📚 How It Works

1. **Puppeteer** browser launch karta hai
2. **Multiple selectors** try karta hai forms dhundne ke liye
3. **Smart detection** automatically fields fill karta hai
4. **Screenshots** har action ka proof save karta hai
5. **Error handling** agar kuch galat ho toh bhi handle karta hai

## 🎯 Use Cases

- Automated testing
- Form filling automation
- Website structure analysis
- Bulk account creation (authorized only)
- Login flow testing

## 🤝 Contributing

Improvements chahiye? Pull requests welcome hain!

## 📄 License

MIT License - Free to use and modify!

## 🆘 Support

Problems ho toh:
1. Error screenshots dekho
2. Console output padho (Hindi mein hai)
3. README phir se padho
4. GitHub issues mein post karo

---

**Made with ❤️ for easy automation!**

**Happy Automating! 🚀**