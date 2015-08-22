# letvCloud
乐视云视频管理

## 开发环境
编辑器：VS Code
需安装nodejs、git
需全局安装的nodejs库 bower,tsd

## 安装依赖
npm install
	一条命令获取所需依赖，完成配置
	使用前后端分离，后端使用nodejs和express框架
	
## 启动 
npm start
	默认端口3000
	例如(乐视云管理页面)：http://localhost/3000/letv/
	
### 使用
#### 视频上传（Web方式）完成
	常规上传非断点续传，上传过程中断掉后无法续传，乐视云将抛弃此视频

#### 视频断点续传
	上传过程中断掉后重新选择此视频将继续上传
	已知BUG,上传的视频如果断掉后，如果选择其他视频上传，之前上传的视频将无法续传，会重新开始上传

#######################################################
未完待续...
