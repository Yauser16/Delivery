// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('service.json');
const middlewares = jsonServer.defaults();

// Добавляем дефолтных посредников (logger, static, cors и no-cache)
server.use(middlewares)


// Для обработки POST, PUT и PATCH необходимо использовать body-parser
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Передаем управление роутеру `JSON Server`
  next()
})

// Используем дефолтный роутер
server.use(router);
server.listen(3002, () => {
  console.log('Server ready')
})