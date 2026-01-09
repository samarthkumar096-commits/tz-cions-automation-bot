# TZ-Cions Bot - Deploy Instructions

## 🚀 Quick Deploy Options

### Option 1: Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/samarthkumar096-commits/tz-cions-automation-bot)

1. Click the button above
2. Sign in with GitHub
3. Click "Deploy"
4. Done! Your bot is live!

### Option 2: Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/samarthkumar096-commits/tz-cions-automation-bot)

1. Click the button above
2. Sign in with GitHub
3. Click "Deploy Now"
4. Wait for deployment
5. Your bot is live!

### Option 3: Deploy to Render

1. Go to [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select `tz-cions-automation-bot` repository
5. Click "Create Web Service"
6. Done!

### Option 4: Deploy to Heroku

```bash
# Install Heroku CLI first
heroku login
heroku create tz-cions-bot
git push heroku main
heroku open
```

## 🌐 Live URLs

After deployment, you'll get a URL like:
- Vercel: `https://tz-cions-automation-bot.vercel.app`
- Railway: `https://tz-cions-automation-bot.up.railway.app`
- Render: `https://tz-cions-automation-bot.onrender.com`

## 📡 API Endpoints

Once deployed, use these endpoints:

### Health Check
```
GET https://your-url.vercel.app/health
```

### Inspect Website
```
POST https://your-url.vercel.app/api/inspect
```

### Login
```
POST https://your-url.vercel.app/api/login
Content-Type: application/json

{
  "email": "your@email.com",
  "password": "yourpassword"
}
```

### Signup
```
POST https://your-url.vercel.app/api/signup
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your@email.com",
  "password": "yourpassword"
}
```

## 🔧 Environment Variables

No environment variables needed! Bot works out of the box.

## 📱 Use from Browser

Just visit your deployed URL and use the web interface!

## 🐛 Troubleshooting

### Deployment fails?
- Check build logs
- Make sure all dependencies are in package.json
- Verify Node.js version (>=14.0.0)

### Bot not working?
- Puppeteer might need additional setup on some platforms
- Check platform-specific Puppeteer documentation

## 💡 Tips

1. **Vercel** - Best for quick deployment, free tier available
2. **Railway** - Good for long-running processes
3. **Render** - Free tier with auto-deploy from GitHub
4. **Heroku** - Classic option, requires credit card for free tier

## 🎯 Recommended: Vercel

Vercel is the easiest and fastest option. Just click the deploy button above!

---

**Happy Deploying! 🚀**