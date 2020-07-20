// 引入模块
const express = require('express');
const path = require('path');

// 初始化
const app = express();

// 设置静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 端口号
const PORT = process.env.PORT || 5000;

// 监听端口号
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
