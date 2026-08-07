require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Shut CORS up
app.use(cors());

// Proxy /api/* to the external API
app.use('/api', createProxyMiddleware({
  target: process.env.API_URL || 'http://localhost:5000', // Replace with your API URL
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}));

// Serve your static files
app.use(express.static('public'));

// SPA fallback
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});