 const consul = require('consul');

const server = require('http').createServer((req, res) => {
  res.end('Hello World!');
});

// Registrar la aplicación con Consul
consulClient.agent.service.register({
  name: 'my-node-app',
  address: '127.0.0.1',
  port: 3000,
  check: {
    http: 'http://127.0.0.1:3000/health',
    interval: '10s'
}, (err) => {
  if (err) throw err;

  // Iniciar el servidor
  server.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });
});
