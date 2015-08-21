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
		if(letvObj.user_unique === ""){
			console.log("请初始化user_unique参数");
			return;
		}
		if(letvObj.secret_key ===""){
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

var timestamp = (function(){
	var ts = new Date().getTime();
	return ts;
})();

// 获取视频列表
var videoList = {
	api: "video.list",
	index: "1",
	size: "10",
	status: "0",
	timestamp: timestamp
};
// 获取单个视频信息
var videoGet = {
	api: "video.get",
	video_id: "15427025",
	timestamp: timestamp
}
// 删除视频
var videoDel = {
	api: "video.del",
	video_id: "15427025",
	timestamp: timestamp
}
// 视频上传初始化
var init = {
	api: "video.upload.init",
	video_name: "Daum Potplayer-64 Bits.mp4",
	client_ip: "101.224.122.70",
	file_size: "123123",
	uploadtype:"0", //是否分片上传，0不分片，1分片；默认0
	timestamp: timestamp
}
// 初始化
letvCloud.init("fcba45089f", "768cabd0d7806dcd4da13586029be607");
// 在页面上生成视频列表
letvCloud.getResult(videoList, function (rs) {
	var list = rs.data;
	console.log(list)
	var html = template('test', { list: list });
	document.getElementById('content').innerHTML = html;
})
letvCloud.getResult(init,function(rs){

})