const express = require("express");
const request = require("request");
const app = express();

app.use((req, res, next) => {
  res.removeHeader("X-Frame-Options");
  res.removeHeader("Content-Security-Policy");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/onoff/*", (req, res) => {
  const targetUrl = "https://phone.onoff.app/" + req.params[0];
  request(targetUrl).pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Proxy OnOff actif sur port ${port}`));
