const express = require('express');
const TZCionsBot = require('./bot');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Serve the main page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TZ-Cions Bot - Live API</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        h1 {
            color: #667eea;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
        }
        .endpoint {
            background: #f7fafc;
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
            border-left: 5px solid #667eea;
        }
        .endpoint h2 {
            color: #2d3748;
            margin-bottom: 10px;
        }
        .method {
            display: inline-block;
            padding: 5px 15px;
            background: #48bb78;
            color: white;
            border-radius: 5px;
            font-weight: bold;
            margin-right: 10px;
        }
        .code {
            background: #2d3748;
            color: #68d391;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
        }
        .form-section {
            background: #edf2f7;
            padding: 30px;
            border-radius: 10px;
            margin: 30px 0;
        }
        input, button {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 2px solid #e2e8f0;
            border-radius: 5px;
            font-size: 1em;
        }
        button {
            background: #667eea;
            color: white;
            border: none;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
        }
        button:hover {
            background: #5568d3;
            transform: translateY(-2px);
        }
        .result {
            background: #2d3748;
            color: #68d391;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
            display: none;
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
        }
        .status {
            text-align: center;
            padding: 20px;
            background: #48bb78;
            color: white;
            border-radius: 10px;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="status">
            <h2>🟢 Bot Live Hai!</h2>
            <p>API Ready for Use</p>
        </div>

        <h1>🤖 TZ-Cions Bot API</h1>

        <div class="endpoint">
            <h2><span class="method">GET</span> Health Check</h2>
            <div class="code">GET /health</div>
            <p>Check if bot is running</p>
        </div>

        <div class="endpoint">
            <h2><span class="method">POST</span> Inspect Website</h2>
            <div class="code">POST /api/inspect</div>
            <p>Get website structure and form details</p>
        </div>

        <div class="endpoint">
            <h2><span class="method">POST</span> Login</h2>
            <div class="code">POST /api/login</div>
            <p>Body: { "email": "your@email.com", "password": "yourpass" }</p>
        </div>

        <div class="endpoint">
            <h2><span class="method">POST</span> Signup</h2>
            <div class="code">POST /api/signup</div>
            <p>Body: { "name": "Your Name", "email": "your@email.com", "password": "yourpass" }</p>
        </div>

        <div class="form-section">
            <h2 style="margin-bottom: 20px;">🔍 Try Inspect</h2>
            <button onclick="inspect()">Inspect Website</button>
            <div id="inspectResult" class="result"></div>
        </div>

        <div class="form-section">
            <h2 style="margin-bottom: 20px;">🔐 Try Login</h2>
            <input type="email" id="loginEmail" placeholder="Email">
            <input type="password" id="loginPassword" placeholder="Password">
            <button onclick="login()">Login</button>
            <div id="loginResult" class="result"></div>
        </div>

        <div class="form-section">
            <h2 style="margin-bottom: 20px;">📝 Try Signup</h2>
            <input type="text" id="signupName" placeholder="Name">
            <input type="email" id="signupEmail" placeholder="Email">
            <input type="password" id="signupPassword" placeholder="Password">
            <button onclick="signup()">Signup</button>
            <div id="signupResult" class="result"></div>
        </div>
    </div>

    <script>
        async function inspect() {
            const result = document.getElementById('inspectResult');
            result.style.display = 'block';
            result.textContent = 'Loading...';
            
            try {
                const response = await fetch('/api/inspect', { method: 'POST' });
                const data = await response.json();
                result.textContent = JSON.stringify(data, null, 2);
            } catch (error) {
                result.textContent = 'Error: ' + error.message;
            }
        }

        async function login() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const result = document.getElementById('loginResult');
            
            result.style.display = 'block';
            result.textContent = 'Processing...';
            
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                result.textContent = JSON.stringify(data, null, 2);
            } catch (error) {
                result.textContent = 'Error: ' + error.message;
            }
        }

        async function signup() {
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const result = document.getElementById('signupResult');
            
            result.style.display = 'block';
            result.textContent = 'Processing...';
            
            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                const data = await response.json();
                result.textContent = JSON.stringify(data, null, 2);
            } catch (error) {
                result.textContent = 'Error: ' + error.message;
            }
        }
    </script>
</body>
</html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'TZ-Cions Bot is running!',
    timestamp: new Date().toISOString()
  });
});

// Inspect endpoint
app.post('/api/inspect', async (req, res) => {
  try {
    const bot = new TZCionsBot();
    const result = await bot.inspect();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password required' 
      });
    }

    const bot = new TZCionsBot();
    const result = await bot.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password required' 
      });
    }

    const bot = new TZCionsBot();
    const result = await bot.signup(name || 'User', email, password);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 TZ-Cions Bot API running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});

module.exports = app;