# letvCloud-nodejs
乐视云视频管理

## 开发环境
* 编辑器：VS Code
* 需安装nodejs、git
* 需全局安装的nodejs库 bower,tsd

## 安装依赖
`npm install`
* 一条命令获取所需依赖，完成配置
* 使用前后端分离，后端使用nodejs和express框架

## 配置
1. 服务器端
*修改`/config.js`文件进行服务器配置*
2. 客户端
*修改`/public/javascripts/main.js`内url的值为服务器ip*
	
## 启动 
`npm start`
* 默认端口3000
* 例如(乐视云管理页面)：`http://localhost:3000/letv/`
	
### 使用

#### 视频断点续传
* 上传过程中断掉后重新选择此视频将继续上传
* 已知BUG,上传的视频如果断掉后，如果选择其他视频上传，之前上传的视频将无法续传，会重新开始上传

#### 获取视频信息
* 点击**信息**按钮，在控制台输出单个视频的信息

#### 获取视频播放接口
* 点击**代码**按钮，在控制台输出此视频的播放接口链接

#### 播放视频
* 播放视频：`http://localhost:3000/play`
* 修改了乐视云原始js代码，改成可供调用的方法来适应项目需求
* 在原有乐视云公开api基础上增加了直接生成`letvcloud_player_conf`的方法，调用方法是 type 类型内添加 ``json`` 类型
