const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const chrome = require('chrome-cookies-secure');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Get Chrome Cookies' });
});

app.post('/api/cookies', async (req, res) => {
  console.log(req.body);
  const url = 'https://www.linkedin.com/sales/home'
  const cookies = await chrome.getCookiesPromised(url, 'puppeteer', `Profile ${req.body.post}`)
  res.send(
    cookies,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
