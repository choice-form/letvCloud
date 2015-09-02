// var md5 = require('md5');
var crypto = require('crypto');
var request = require("request");
// var formdata = require("form-data");
var config = require("../config");
var querystring = require('querystring');

module.exports = function () {
	// letv云的参数
	var letvObj = {
		user_unique: config.user_unique,
		secret_key: config.secret_key,
		restUrl: "http://api.letvcloud.com/open.php",
		format: "json",
		ver: "2.0"
	};

	var uploadIp = config.serverUrl;

	/**
	* 获取从乐视云返回的数据
	* @param {Object} funParam 乐视提供的公开api
	* @param {Function} callback 回调方法 输出结果
	* @return {undefined}
	*/
	function getResult(funParam, callback) {
		// if (letvObj.user_unique === "") {
		// 	console.log("请配置user_unique参数");
		// 	return;
		// }
		// if (letvObj.secret_key === "") {
		// 	console.log("请配置secret_key参数");
		// 	return;
		// }
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
		var hash;
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
		console.log("[sign生成MD5之前： ]"+ res);
		var md5 = crypto.createHash('md5');
		md5.update(res);
		hash = md5.digest('hex');
		// hash = md5(res);
		console.log("[sign: ]" + hash);
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

		console.log("[生成的sign参数: ]" + JSON.stringify(req));
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
				var element = encodeURI(funParam[key]);
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
		var qUrl = reqUrl.slice(0, reqUrl.length - 1);
		console.log("[生成的请求链接]: " + qUrl);
		return qUrl;
	}

	/**
	 * 判断请求的api名称来调用乐视云api
	 */
	function jude(obj, callback) {
		var fnName = obj.api;
		switch (fnName) {
			case "video.upload.init":
				console.log("{视频上传初始化}");
				videoUploadInit(obj, callback);
				break;
			case "video.upload.resume":
				console.log("{视频断点续传}");
				videoUploadResume(obj, callback);
				break;
			case "video.list":
				console.log("{视频列表}");
				videoList(obj, callback);
				break;
			case "video.del":
				console.log("{删除视频}");
				videoDel(obj, callback);
				break;
			case "video.get":
				console.log("{获取视频信息}");
				videoGet(obj, callback);
				break;
			case "play.interface":
				console.log("{获取视频播放接口}");
				videoGetPlayinterface(obj, callback);
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
		// var ts = new Date().getTime();
		var videoinit = {
			api: "video.upload.init",
			video_name: video_name,
			file_size: file_size,
			uploadtype: 1,
			timestamp: "1369300735578",
			client_ip: uploadIp
		}

		getResult(videoinit, function (rs) {
			callback(rs);
		})
	}
	/**
	 * 断点续传
	 */
	function videoUploadResume(obj, callback) {
		var token = obj.token;
		var ts = new Date().getTime();
		var videoUploadResume = {
			api: "video.upload.resume",
			token: token,
			timestamp: "1369300735578"
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
			timestamp: "1369300735578"
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
			timestamp: "1369300735578"
		}
		getResult(video, function (rs) {
			callback(rs);
		})
	}
	/**
	 * 获取单个视频信息
	 */
	function videoGet(obj, callback) {
		var videoId = obj.video_id;
		var ts = new Date().getTime();
		var video = {
			api: 'video.get',
			video_id: videoId,
			timestamp: "1369300735578"
		};
		getResult(video, function (rs) {
			callback(rs);
		});
	}
	/**
	 * 获取视频播放接口
	 */
	function videoGetPlayinterface(obj, callback) {
		var uu = letvObj.user_unique; //uu 用户唯一标识码，由乐视网统一分配并提供
		var vu = obj.vu; //vu 视频唯一标识码
		var type = obj.type; //type 接口类型：url表示播放URL地址；js表示JavaScript代码；flash表示视频地址；html表示HTML代码
		var pu = ''; //pu 播放器唯一标识码
		var auto_play = 0; //auto_play 是否自动播放：1表示自动播放；0表示不自动播放。
		var width = 640; //width 播放器宽度
		var height = 480; //height 播放器高度 
		var res = '';
		if (obj.pu !== '' && obj.pu !== undefined) {
			pu = obj.pu;
		};
		if (obj.auto_play !== '' && obj.auto_play !== undefined) {
			auto_play = obj.auto_play;
		};
		if (obj.width > 0) {
			width = obj.width;
		};
		if (obj.height > 0) {
			height = obj.height;
		};
		var playObj = {
			uu: uu,
			vu: vu,
			pu: pu,
			auto_play: auto_play,
			width: width,
			height: height
		};
		var qs = querystring.stringify(playObj);
		var jsonString = JSON.stringify(playObj);
		if (type === "url") {
			res = "http://yuntv.letv.com/bcloud.html?" + qs;
		};
		if (type === "js") {
			res = '<script type="text/javascript">var letvcloud_player_conf = ' + jsonString + ';</script><script type="text/javascript" src="http://yuntv.letv.com/bcloud.js"></script>';
		};
		if (type === "flash") {
			res = "http://yuntv.letv.com/bcloud.swf?" + qs;
		}
		if (type === "html") {
			res = '<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high" width="800" height="450" align="middle" allowScriptAccess="always" flashvars="' + qs + '" type="application/x-shockwave-flash"></embed>';
		}
		//新增json格式，用来直接生成 letvcloud_player_conf 的值
		if (type === "json"){
						res = jsonString;
		}
		callback(res);
	}
	return {
		fun: jude
	}
} ();