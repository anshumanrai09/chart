const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on('connection', (socket) => {
  clients.add(socket);
  console.log('New client connected.');

  socket.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Broadcast message to all clients
    clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    clients.delete(socket);
    console.log('Client disconnected.');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
