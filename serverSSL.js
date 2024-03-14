// https-json-server.js
// Run with: node https-json-server.js

// Generate SSL keys: openssl req -nodes -new -x509 -keyout server.key -out server.cert

const jsonServer = require("json-server");
const https = require("https");
const path = require("path");
const fs = require("fs");
const pause = require('connect-pause'); // Install: npm install connect-pause

const server = jsonServer.create();
const router = jsonServer.router('delivery.json');
const middlewares = jsonServer.defaults();

const checkSecretKey = (req, res, next) => {
  if (!req.query.secretKey || req.query.secretKey !== 'YaUseR') {
    return res.status(403).send('Secret key is missing or incorrect');
  }
  next();
}


server.use(middlewares);
server.use(checkSecretKey);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })

server.use(pause(200));
server.use(router);

// If using custom routes
//var routes = JSON.parse(fs.readFileSync('routes.json'));
//server.use(jsonServer.rewriter(routes));

const keyFile = path.join("/etc/ssl/delivery.teststudyweb.ru_le.crtkey");
const certFile = path.join("/etc/ssl/delivery.teststudyweb.ru_le.crt");



https
  .createServer(
    {
        key: fs.readFileSync(keyFile),
        // ca: fs.readFileSync("/etc/ssl/delivery.teststudyweb.ru_le1.cacrt"),
        cert: fs.readFileSync(certFile),
    },
    server
  )
  .listen(3001, () => {
    console.log(
      'Go to https://delivery.teststudyweb.ru:3001/'
    );
  });