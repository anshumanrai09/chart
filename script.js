const socket = new WebSocket('ws://localhost:8080');

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to add message to the chat box
function addMessage(message, type = 'received') {
  const p = document.createElement('p');
  p.textContent = message;
  p.style.color = type === 'sent' ? '#2563eb' : '#000';
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// WebSocket events
socket.addEventListener('open', () => {
  addMessage('Connected to the server.', 'system');
});

socket.addEventListener('message', (event) => {
  addMessage(event.data);
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.send(message);
    addMessage(`You: ${message}`, 'sent');
    messageInput.value = '';
  }
});

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});
