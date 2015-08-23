var md5 = require('md5');
var request = require("request");
var formdata = require("form-data");

module.exports = function () {
	// letv云的参数
	var letvObj = {
		user_unique: "",
		secret_key: "",
		restUrl: "http://api.letvcloud.com/open.php",
		format: "json",
		ver: "2.0"
	};

	var uploadIp = "101.224.122.70";

	/**
	* 获取从乐视云返回的数据
	* @param {Object} 乐视提供的公开api
	* @param {Function} 回调方法
	* @return {undefine}
	*/
	function getResult(funParam, callback) {
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
		request(json, function (err, res, body) {
			if (!err && res.statusCode == 200) {
				callback(body)
			}
		})
		// console.log(decodeURI(json));
		// $.get(json, function (rs) {
		// 	console.log(rs);
		// 	callback(rs)
		// })
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

	/**
	 * 初始化
	 */
	function init(uu, sk) {
		letvObj.user_unique = uu;
		letvObj.secret_key = sk;
	};

	/**
	 * 判断请求的调用乐视云api
	 */
	function jude(obj, callback) {
		var fnName = obj.api;
		switch (fnName) {
			case "video.upload.init":
				videoUploadInit(obj, callback);
				break;
			case "video.upload.resume":
				videoUploadResume(obj, callback);
			case "video.list":
				videoList(obj, callback);
				break;
			case "video.del":
				videoDel(obj, callback);
				break;
			case "video.get":
				videoGet(obj, callback);
				break;
			default:
				break;
		}
	}
	/**
	 * 视频上传初始化
	 */
	function videoUploadInit(obj, callback) {
		var video_name = obj.video_name;
		var file_size = obj.file_size;
		var ts = new Date().getTime();
		var videoinit = {
			api: "video.upload.init",
			video_name: video_name,
			file_size: file_size,
			uploadtype: 1,
			timestamp: ts,
			client_ip: uploadIp
		}

		// var videoinit = {
		// 	api: "video.upload.init",
		// 	video_name: file.name,
		// 	file_size: file.size,
		// 	uploadtype: "1",
		// 	timestamp: file.lastModified,
		// 	client_ip: "116.226.37.91"
		// }

		getResult(videoinit, function (rs) {
			callback(rs);
		})
	}
	/**
	 * 
	 */
	function videoUploadResume(obj, callback) {
		var token = obj.token;
		var ts = new Date().getTime();
		var videoUploadResume = {
			api: "video.upload.resume",
			token: token,
			timestamp: ts
		}
		getResult(videoUploadResume, function (rs) {
			callback(rs);
		})
	}
	/**
	 * 视频列表
	 */
	function videoList(obj, callback) {
		var index = obj.index;
		var size = obj.size;
		var ts = new Date().getTime();
		var vl = {
			api: 'video.list',
			index: index,
			size: size,
			status: '0',
			timestamp: ts
		};
		getResult(vl, function (rs) {
			callback(rs);
		})
	}
	/**
	 * 删除单个视频
	 */
	function videoDel(obj, callback) {
		var videoId = obj.video_id;
		var ts = new Date().getTime();
		var video = {
			api: "video.del",
			video_id: videoId,
			timestamp: ts
		}
		getResult(video, function (rs) {
			callback(rs);
		})
	}
	/**
	 * 获取单个视频信息
	 * @param  int $video_id 视频id
	 * @return string
	 */
	function videoGet(obj, callback) {
		var videoId = obj.video_id;
		var ts = new Date().getTime();
		var video = {
			api: 'video.get',
			video_id: videoId,
			timestamp: ts
		};
		getResult(video, function (rs) {
			callback(rs);
		});
	}
	return {
		init: init,
		jude: jude
	}
} ();