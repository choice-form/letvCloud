# letvCloud
乐视云视频上传api(javascript 实现)

## 安装依赖
npm install

## 启动服务(http-server 端口8080)
npm start

### 使用
window.letvCloud

#### 先初始化模块
letvCloud.init(uu,sk)
uu:user_unique;
sk:secret_key;
	
#### 视频上传（Web方式）
接口地址：由video.upload.init返回的upload_url确定
功能描述：视频上传
请求参数：由video.upload.init返回的upload_url确定，请不要进行任何修改
通过回调函数获取返回的信息
letvCloud.getResult(init,function(rs){
..........
});

#######################################################
未完待续...