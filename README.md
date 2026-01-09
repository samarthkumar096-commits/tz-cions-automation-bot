# 🤖 TZ-Cions Automation Bot

Complete automation bot for **tz-cions.com** with login, signup, and website inspection features.

## 🚀 Quick Deploy (1-Click!)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/samarthkumar096-commits/tz-cions-automation-bot)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/samarthkumar096-commits/tz-cions-automation-bot)

**Bas button click karo aur tumhara bot live ho jayega!** 🎉

---

## 🌐 Live Demo

**Website:** https://samarthkumar096-commits.github.io/tz-cions-automation-bot/

---

## ✨ Features

- ✅ **Smart Login** - Automatic login with multiple selector strategies
- ✅ **Account Creation** - Automated signup process
- ✅ **Website Inspector** - Analyze website structure and forms
- ✅ **Screenshot Capture** - Automatic screenshots of all actions
- ✅ **Error Handling** - Detailed error messages and error screenshots
- ✅ **Hindi Logging** - Easy to understand Hindi console messages
- ✅ **CLI Interface** - Simple command-line usage
- ✅ **Web API** - REST API for remote access
- ✅ **Web Interface** - Beautiful web UI to use the bot

---

## 📥 Installation (Local Use)

### Step 1: Download Code

```bash
git clone https://github.com/samarthkumar096-commits/tz-cions-automation-bot.git
cd tz-cions-automation-bot
```

### Step 2: Install Dependencies

```bash
npm install
```

---

## 🚀 Usage

### Option 1: Web Interface (After Deploy)

1. Deploy using button above
2. Visit your deployed URL
3. Use the web interface to:
   - Inspect website
   - Login
   - Signup

### Option 2: CLI (Local)

#### 1. Inspect Website (Pehle yeh karo!)

```bash
node bot.js inspect
```

#### 2. Login to Account

```bash
node bot.js login your@email.com yourpassword
```

Example:
```bash
node bot.js login user@example.com mypass123
```

#### 3. Create New Account

```bash
node bot.js signup "Your Name" your@email.com yourpassword
```

Example:
```bash
node bot.js signup "John Doe" john@example.com securepass123
```

### Option 3: Web Server (Local)

```bash
npm start
```

Then visit: http://localhost:3000

---

## 📡 API Endpoints (After Deploy)

### Health Check
```
GET /health
```

### Inspect Website
```
POST /api/inspect
```

### Login
```
POST /api/login
Content-Type: application/json

{
  "email": "your@email.com",
  "password": "yourpassword"
}
```

### Signup
```
POST /api/signup
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your@email.com",
  "password": "yourpassword"
}
```

---

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

---

## 📸 Screenshots

Bot automatically screenshots save karta hai:

- `login-result.png` - Login successful hone ke baad
- `signup-result.png` - Signup complete hone ke baad
- `inspect.png` - Website structure inspection
- `login-error.png` - Agar login fail ho
- `signup-error.png` - Agar signup fail ho

---

## 🔧 Advanced Usage

### Use as Module

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

---

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

---

## 💡 Tips

1. **Pehle inspect karo** - Website structure samajhne ke liye
2. **Headless false rakho** - Debugging ke time
3. **Screenshots check karo** - Kya hua yeh samajhne ke liye
4. **Timeout badhao** - Slow websites ke liye
5. **Deploy karo** - 24/7 access ke liye

---

## 📋 Requirements

- Node.js (v14 or higher)
- npm or yarn
- Internet connection
- Chrome/Chromium (Puppeteer automatically install karega)

---

## ⚠️ Important Notes

- **Legal Use Only**: Sirf authorized testing ke liye use karo
- **Terms of Service**: Website ki ToS follow karo
- **Bot Detection**: Kuch websites bot detect kar sakti hain
- **Rate Limiting**: Bahut zyada requests mat bhejo
- **Privacy**: Apne credentials safe rakho

---

## 🎯 Deployment Options

1. **Vercel** ⭐ - Best for quick deployment (Click button above)
2. **Railway** - Good for long-running processes
3. **Render** - Free tier with auto-deploy
4. **Heroku** - Classic option

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions.

---

## 📚 Project Structure

```
tz-cions-automation-bot/
├── bot.js           # Main bot logic
├── server.js        # Express web server
├── package.json     # Dependencies
├── vercel.json      # Vercel config
├── Procfile         # Process config
├── index.html       # Static website
├── README.md        # This file
└── DEPLOY.md        # Deployment guide
```

---

## 🤝 Contributing

Improvements chahiye? Pull requests welcome hain!

---

## 📄 License

MIT License - Free to use and modify!

---

## 🆘 Support

Problems ho toh:
1. Error screenshots dekho
2. Console output padho (Hindi mein hai)
3. README phir se padho
4. GitHub issues mein post karo

---

## 🔗 Links

- **Live Website**: https://samarthkumar096-commits.github.io/tz-cions-automation-bot/
- **GitHub Repo**: https://github.com/samarthkumar096-commits/tz-cions-automation-bot
- **Deploy Guide**: [DEPLOY.md](DEPLOY.md)

---

**Made with ❤️ for easy automation!**

**Happy Automating! 🚀**