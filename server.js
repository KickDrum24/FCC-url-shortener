require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser'); // middleware


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//on form submission, check url & respond w/error or short url
var short;
var long;
app.post("/api/shorturl", function (req, res) {
  short = Math.floor(Math.random() * 1000) + 1;
  long = req.body.url;
  try {
    url = new URL(long);
  } catch (_) {
    res.json({ error: 'invalid url' })
    return;
  }
  res.json({ original_url: long, short_url: short })
});

//on submission of short url, redirect to long
app.get('/api/shorturl/:short', (req, res) => {
  res.redirect(long);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
