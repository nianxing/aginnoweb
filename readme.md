# 公司官方网站

这是一个基于Node.js和Express的公司官方网站项目。该项目使用纯HTML、CSS和JavaScript构建，并部署在Azure App Service上。

## 技术栈

- Node.js
- Express.js
- HTML5
- CSS3
- JavaScript
- Azure App Service
- GitHub Actions（自动部署）

## 本地开发

1. 克隆项目
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm start
```

服务器将在 http://localhost:8080 启动

## 部署到Azure App Service

### 前提条件

- Azure账号和订阅
- GitHub账号
- Node.js 18.x或更高版本

### 部署步骤

1. **创建Azure App Service**
   - 登录Azure Portal (https://portal.azure.com)
   - 创建新的App Service，选择Node.js 18 LTS运行时
   - 记录下App Service的名称

2. **配置GitHub Secrets**
   - 在GitHub仓库中进入Settings > Secrets and variables > Actions
   - 创建新的secret：`AZURE_WEBAPP_PUBLISH_PROFILE`
   - 从Azure Portal下载发布配置文件并粘贴内容

3. **配置部署文件**
   - 确保`.github/workflows/azure-webapps-node.yml`中的`AZURE_WEBAPP_NAME`设置正确
   - 提交并推送更改到main分支

4. **验证部署**
   - 访问 `https://[your-app-name].azurewebsites.net`
   - 检查GitHub Actions工作流运行状态

## 项目结构

```
.
├── src/                # 静态资源文件
│   ├── css/           # 样式文件
│   ├── js/            # JavaScript文件
│   ├── img/           # 图片资源
│   └── *.html         # HTML页面
├── server.js          # Express服务器配置
├── package.json       # 项目依赖
└── .github/           # GitHub Actions配置
```

## 开发注意事项

- 所有静态资源都放在`src`目录下
- 服务器使用Gzip压缩提升性能
- 自动部署触发条件：推送到main分支

## 贡献指南

1. Fork项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 许可证

[根据实际情况填写许可证信息]