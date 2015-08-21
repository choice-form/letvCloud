/* global getResult */
/* global template */
/* global md5 jquery*/
"starte";
var letvCloud = (function (letvCloud) {
	var letv = letvCloud;
	// letv云的参数
	var letvObj = {
		user_unique: "",
		secret_key: "",
		restUrl: "http://api.letvcloud.com/open.php",
		format: "json",
		ver: "2.0"
	};
	/**
	 * 初始化
	 */
	letv.init = function (uu, sk) {
		letvObj.user_unique = uu;
		letvObj.secret_key = sk;
	};
	/**
	* 获取从乐视云返回的数据
	* @param {Object} 乐视提供的公开api
	* @param {Function} 回调方法
	* @return {undefine}
	*/
	letv.getResult = function (funParam, callback) {
		if (letvObj.user_unique === "") {
			console.log("请初始化user_unique参数");
			return;
		}
		if (letvObj.secret_key === "") {
			console.log("请初始化secret_key参数");
			return;
		}
		var req = getReqParam(funParam);
		var hash = generateSign(req);
		letvObj.sign = hash;
		// console.log(hash);
		var json = generateQueryUrl(funParam);
		// console.log(decodeURI(json));
		$.get(json, function (rs) {
			console.log(rs);
			callback(rs)
		})
	}

	/**
	*  生成Sign
	*/
	function generateSign(param) {
		var arr = [];
		var str = '';
		var res = "";
		var hash = "";
		for (var key in param) {
			if (param.hasOwnProperty(key)) {
				var element = param[key];
				str = key + element;
				arr.push(str);
			}
		}
		arr.sort();
		arr.forEach(function (element) {
			res += element;
		}, this);
		res += letvObj.secret_key;
		// console.log(res);
		hash = md5(res);
		return hash;
	}
	/**
	 * 合成获取Sign用的参数
	 */
	function getReqParam(funParam) {
		var req = {
			format: letvObj.format,
			user_unique: letvObj.user_unique,
			ver: letvObj.ver
		};
		for (var key in funParam) {
			if (funParam.hasOwnProperty(key)) {
				var element = funParam[key];
				req[key] = element;
			}
		}
		return req;
	}
	/**
	 * 生成请求链接
	 */
	function generateQueryUrl(funParam) {
		var url = letvObj.restUrl;
		var obj = {
			user_unique: letvObj.user_unique,
			ver: letvObj.ver,
			format: letvObj.format,
			sign: letvObj.sign
		}
		var reqUrl = "";
		reqUrl += url + "?";
		for (var key in funParam) {
			if (funParam.hasOwnProperty(key)) {
				var element = funParam[key];
				reqUrl += key + "=" + element + "&";
			}
		}
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				var el = obj[key];
				reqUrl += key + "=" + el + "&"
			}
		}
		// console.log(reqUrl);
		return reqUrl;
	}

	return letv;
})(window.letvCloud || {});

var timestamp = (function () {
	var ts = new Date().getTime();
	return ts;
})();


// 获取单个视频信息
var videoGet = {
	api: "video.get",
	video_id: "15427025",
	timestamp: timestamp
}

// 操作初始化
letvCloud.init("fcba45089f", "768cabd0d7806dcd4da13586029be607");

/**
 * 显示视频列表
 */
function videoList(index, size) {
	var ts = new Date().getTime();
	// 获取视频列表
	var videoList = {
		api: "video.list",
		index: index,
		size: size,
		status: "0",
		timestamp: ts
	};
	letvCloud.getResult(videoList, function (rs) {
		var list = rs.data;
		console.log(list)
		var html = template('test', { list: list });
		document.getElementById('content').innerHTML = html;
		$(".js-del-video").on("click", function (e) {
			console.log(e);
			console.log(this.getAttribute("data-videoid"));
			videoDet(this.getAttribute("data-videoid"));
		});
	})
}

/**
 * 删除单个视频
 */
function videoDet(videoId) {
	var ts = new Date().getTime();
	var video = {
		api: "video.del",
		video_id: videoId,
		timestamp: ts
	}
	if (confirm("是否删除视频？")) {
		letvCloud.getResult(video, function (rs) {
			if (rs.code === 0) {
				console.log("视频删除成功");
				videoList(1, 20);
			} else {
				console.log("视频删除错误");
			}
			return;
		})
	}
}
// 显示视频列表
videoList(1, 20);

// 断点续传

$("#upDataOfBreak").on("click", function () {
	var myform = new FormData();
	var input = document.getElementById("fileinput");
	var file = input.files[0];
	myform.append("video_file", file);
	var videoinit = {
		api: "video.upload.init",
		video_name: file.name,
		file_size: file.size,
		uploadtype: "1",
		timestamp: file.lastModified,
		client_ip: "116.226.37.91"
	}
	letvCloud.getResult(videoinit,function(e){
		console.log(e);
		if(e.code === 0){
			console.log("视频上传初始化成功");
			var uploadUrl = e.data.upload_url;
		}else{
			console.log("视频上传初始化失败");
			return;
		}
	})
})

// 普通上传视频
$("#upData").on("click", function () {
	var myform = new FormData();
	console.log(myform);
	var input = document.getElementById("fileinput")
	var file = input.files[0];
	myform.append('video_file', file);
	// myform.append("video_file",file);
	console.log(myform);
	console.log(file);
	var videoinit = {
		api: "video.upload.init",
		video_name: file.name,
		file_size: file.size,
		uploadtype: "0",
		timestamp: file.lastModified,
		client_ip: "116.226.37.91"
	}
	letvCloud.getResult(videoinit, function (e) {
		// console.log(e);
		if (e.code === 0) {
			console.log("视频上传初始化成功");
			var uploadUrl = e.data.upload_url;
			console.log(uploadUrl);
			// var videoId = e.data.video_id;
			// myform.append("video_file","");
			// myform.append("video_id",videoId);
			// myform.append("video_file",file)
			console.log(myform);
			$.ajax({
				url: uploadUrl,
				type: "post",
				data: myform,
				processData: false,
				contentType: false,
				success: function (e) {
					console.log(e);
					setTimeout(function () {
						videoList(1, 20);
					}, 2000);
				},
				error: function (xml, b, c) {
					console.log(xml);
					console.log(b);
					console.log(c);
				},
				complete:function(e){
					console.log(e);
					console.log("视频上传结束");
				}
			})
		} else {
			console.log("视频上传初始化失败");
			return;
		}
	})
})
