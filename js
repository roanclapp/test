// proxy-onoff.js
const express = require("express");
const request = require("request");
const app = express();

app.use((req, res, next) => {
  res.removeHeader("X-Frame-Options");
  res.removeHeader("Content-Security-Policy");
  next();
});

app.get("/onoff/*", (req, res) => {
  const path = req.params[0];
  const url = `https://phone.onoff.app/${path}`;
  request({ url, headers: { Cookie: req.headers.cookie } }).pipe(res);
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Proxy OnOff actif sur port ${port}`);
});
