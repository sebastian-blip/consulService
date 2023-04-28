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
};

// Registrar la aplicación con Consul
const consulClient = consul();
consulClient.agent.service.register(service, err => {
  if (err) throw err;
  console.log('Registro exitoso con Consul');
});

// Cuando la aplicación se cierra, retirar la aplicación de Consul
process.on('SIGINT', () => {
  consulClient.agent.service.deregister(service, err => {
    console.log('Desregistro exitoso con Consul');
    process.exit(err ? 1 : 0);
  });
});
