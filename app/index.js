 const consul = require('consul');

const server = require('http').createServer((req, res) => {
  res.end('Hello World!');
});

const service = {
  name: 'my-app',
  port: 3000,
  check: {
    id: 'my-app-check',
    name: 'My App Health Check',
    http: 'http://127.0.0.1:3000/health',
    interval: '10s'
  }
};

// Registrar la aplicación con Consul
const consulClient = new consul();
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