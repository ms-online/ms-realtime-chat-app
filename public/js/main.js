const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// 依据URL获取用户登录的房间和用户名
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// 加入房间
socket.emit('joinRoom', { username, room });

console.log(username, room);
// 获得从服务器发送的消息
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // 滚动条
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// 监听消息提交submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // 获取提交的消息
  const msg = e.target.elements.msg.value;
  socket.emit('chatMessage', msg);

  // 清空input输入框
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// 创建outputMessage函数，输出消息到DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = ` <p class="meta">${message.username}<span>${message.time}</span></p>
  <p class="text">
   ${message.text}
  </p>`;
  chatMessages.appendChild(div);
}
