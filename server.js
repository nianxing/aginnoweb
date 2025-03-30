const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

// 启用Gzip压缩
app.use(compression());

// 提供静态文件服务
app.use(express.static(path.join(__dirname, 'src')));

// 所有路由都返回index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 