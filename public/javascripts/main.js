var letv = (function () {
	// 服务器地址
	var url = 'http://192.168.0.108:3000/letv';
	// var url = "http://localhost:52045/letv/todu";
	var fileTypes = ['wmv', 'avi', 'dat', 'asf', 'rm', 'rmvb', 'ram', 'mpg', 'mpeg', '3gp', 'mov', 'mp4', 'm4v', 'dvix', 'dv', 'dat', 'mkv', 'flv', 'f4v', 'vob', 'ram', 'qt', 'divx', 'cpk', 'fli', 'flc', 'mod'];

	function isVideo(file) {
		if (typeof (file) === "undefined") {
			// alert("请选择视频");
			return false
		}
		var fileType = file.type.split("/")[1];
		for (var i = 0; i < fileTypes.length; i++) {
			if (fileType === fileTypes[i]) {
				return true;
			}
		}
		return false;
	}
	
	/**
	 * 生成视频列表
	 * @param {Number} 索引页
	 * @param {Number} 每页项数
	 */
	function videoList(index, size, callback) {
		var data = {
			api: 'video.list',
			index: index,
			size: size,
		}
		$.ajax({
			url: url,
			type: 'post',
			data: data,
			success: function (rs) {
				callback(rs);
			}
		});
	};

	/**
	 * 获取视频播放接口
	 * @param {string} vu 视频唯一识别码
	 * @param {string} pu 播放器唯一标识码 默认需设置为空字符串
	 * @param {string} type 接口类型：url,js,flash,html
	 * @param {Number} auto_play 是否自动播放：1表示自动播放；0表示不自动播放。默认值由双方事先约定
	 * @param {Number} width 播放去宽度,默认设置了640
	 * @param {Number} height 播放器高度，默认设置了480
	 * @param {Function} callback 回调函数
	 * @return {undefined}
	 */
	function videoGetPlayinterface(vu, pu, type, auto_play, width, height, callback) {
		var playObj = {
			api: "play.interface",
			vu: vu,
			pu: pu,
			type: type,
			auto_play: auto_play,
			width: width,
			height: height
		};
		$.ajax({
			url: url,
			type: 'post',
			data: playObj,
			success: function (rs) {
				callback(rs);
			}
		})
	}
	
	/**
	 * 删除单个视频
	 */
	function videoDel(videoId, callback) {
		var video = {
			api: "video.del",
			video_id: videoId
		}
		if (confirm("是否删除视频？")) {
			$.ajax({
				url: url,
				type: 'post',
				data: video,
				success: function (rs) {
					var result = JSON.parse(rs);
					if (result.code === 0) {
						if (arguments.length > 1) {
							callback(rs)
						}
						console.log('视频删除成功');
					} else {
						console.log('视频删除失败');
						console.log(result);
					}
				}
			})
		}
	}
	
	/**
	 * 获取单个视频信息
	 */
	function videoGet(videoId, callback) {
		var video = {
			api: 'video.get',
			video_id: videoId
		}
		$.ajax({
			url: url,
			type: 'post',
			data: video,
			success: function (rs) {
				var result = JSON.parse(rs);
				if (result.code === 0) {
					console.log(result);
					callback(result);
				} else {
					console.log("获取视频信息失败")
				}
			}
		})
	}
	
	/**
	 * 视频上传初始化(断点续传)
	 * @param {obj} 视频文件
	 * @param {Function} 回调函数
	 */
	function videoUploadInit(file, callback) {
		var init = {
			api: 'video.upload.init',
			video_name: file.name,
			file_size: file.size,
			uploadtype: '1',
			// client_ip: '192.168.0.19'
		};
		$.ajax({
			url: url,
			type: 'post',
			data: init,
			success: function (rs) {
				var result = JSON.parse(rs);
				if (result.code === 0) {
					console.log("视频上传初始化成功");
					localStorage.setItem("token", result.data.token);
					localStorage.setItem("videoName", file.name);
					callback(result);
				} else {
					console.log(result);
				}
			}
		})
	}
	
	/**
	 * 断点续传
	 * @param {Object} file 视频文件对象
	 * @param {Object} intRs ideoUploadInit 返回的对象
	 * @param {Function} callback 回调函数
	 */
	function videoUploadResume(file, initRs, callback) {
		var token = initRs.data.token;
		var resume = {
			api: "video.upload.resume",
			token: token,
			uploadtype: 1,
		}
		$.ajax({
			url: url,
			type: "post",
			data: resume,
			success: function (rs) {
				console.log("resume");
				var result = JSON.parse(rs);
				console.log(result);
				console.log(result.data.progress_url);
				if (result.code === 0) {
					if (callback instanceof Function) {
						callback(result);
					}
				} else if (result.code === 112) {
					redo(file, initRs);
				} else {
					console.log(result);
				};
			}
		});
	}

	function redo(file, initInfo) {
		setTimeout(function () {
			videoUploadResume(file, initInfo, function (e) {
				doUpdata(e, file);
			}, 1000);
		});
	}
	
	/**
	 * 上传视频
	 * @param {File} file 视频文件
	 * @param {Number} uploadSize 视频文件尺寸
	 * @param {String} uploadUrl 上传地址
	 */
	function videoUpdata(file, uploadSize, uploadUrl, callback) {
		var fl = file.slice(uploadSize)
		var myform = new FormData();
		myform.append("video_file", fl);
		var xhr = new XMLHttpRequest();
		xhr.open("post", uploadUrl);
		xhr.onload = function () {
			if (xhr.status === 200) {
				console.log("上传成功......");
				// alert("上传完成")
				localStorage.removeItem("token");
				localStorage.removeItem("videoName");
				if (arguments.length > 3) {
					callback();
				}
			} else {
				console.log("出错了");
			}
		};
		xhr.upload.onprogress = function (event) {
			if (event.lengthComputable) {
				/******************* 控制进度条 *******************/
				var complete = ((event.loaded + uploadSize) / file.size * 100 | 0);
				// console.log(complete);
				$(".progress-bar").css("width", complete + "%");
				$(".progress-bar").html(complete + "%");
			} else {
				console.log("上传失败");
				return;
			}

		};
		xhr.send(myform);
	}
	//用以处理断点续传返回的"code=112"时回调函数
	function doUpdata(e, file) {
		console.log("视频将从:" + e.data.upload_size);
		var uploadSize = e.data.upload_size;
		letv.videoUpdata(file, uploadSize + 1, e.data.upload_url, function () {
			alert("上传完成");
		});
	};

	return {
		videoList: videoList,
		videoGetPlayinterface: videoGetPlayinterface,
		videoDel: videoDel,
		videoGet: videoGet,
		videoUploadInit: videoUploadInit,
		videoUploadResume: videoUploadResume,
		videoUpdata: videoUpdata,
		url: url,
		isVideo: isVideo,
		doUpdata: doUpdata
	}
})();


$(function () {
	// 上传
	$('#upDataOfBreak').on('click', function () {
		var input = document.getElementById('fileinput');
		var file = input.files[0];
		if (!letv.isVideo(file)) {
			alert("上传的文件不是视频文件，请重新选择");
			return;
		}
		//判断视频是否上传中断过，如果中断则续传
		if (localStorage.getItem("videoName") === file.name) {
			var token = localStorage.getItem('token');
			var obj = {
				data: { token: token },
			}
			letv.videoUploadResume(file, obj, function (e) {
				letv.doUpdata(e, file);
			});
		} else {
			//视频为新视频，初始化视频信息并开始上传
			letv.videoUploadInit(file, function (rs) {
				letv.videoUploadResume(file, rs, function (e) {
					var uploadSize = 0;
					letv.videoUpdata(file, uploadSize, e.data.upload_url, function () {
						alert("上传完成")
					});
				})
			})
		}
	});
	// 显示列表
	letv.videoList(1, 20, function (rs) {
		var result = JSON.parse(rs);
		console.log(result.data);
		var html = template('test', { list: result.data });
		$('#content').html(html);
		// 删除视频
		$(".js-del-video").on("click", function (e) {
			var node = this.parentNode.parentNode;
			var nodeId = node.getAttribute('data-videoid');
			letv.videoDel(nodeId, function (rs) {
				node.remove();
			});
		});
		// 获取单个视频信息
		$(".js-get-video").on('click', function (e) {
			var node = this.parentNode.parentNode;
			var nodeId = node.getAttribute('data-videoid');
			letv.videoGet(nodeId, function (e) {
			});
		});
		// 获取视频播放接口
		$(".js-video-interface").on('click', function (e) {
			var node = this.parentNode.parentNode;
			var vu = node.getAttribute('data-vu');
			letv.videoGetPlayinterface(vu, '', 'js', 0, 0, 0, function (rs) {
				console.log(rs);
			});
		});
		//播放视频
		$(".js-video-play").on('click', function (e) {
			var node = this.parentNode.parentNode;
			var vu = node.getAttribute('data-vu');
			letv.videoGetPlayinterface(vu, '', 'html', 0, 550, 450, function (rs) {
				$(".modal-body p").html(rs);
				console.log(rs);
			});
		});
	});
})


var BaseCode =
	{
		decode: function (data) {
			var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];

			if (!data) {
				return data;
			}
			data += '';

			do {		// unpack four hexets into three octets using index points in b64
				h1 = b64.indexOf(data.charAt(i++));
				h2 = b64.indexOf(data.charAt(i++));
				h3 = b64.indexOf(data.charAt(i++));
				h4 = b64.indexOf(data.charAt(i++));
				bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

				o1 = bits >> 16 & 0xff;
				o2 = bits >> 8 & 0xff;
				o3 = bits & 0xff;

				if (h3 == 64) {
					tmp_arr[ac++] = String.fromCharCode(o1);
				} else if (h4 == 64) {
					tmp_arr[ac++] = String.fromCharCode(o1, o2);
				} else {
					tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
				}
			} while (i < data.length);
			dec = tmp_arr.join('');
			return dec;
		},
		encode: function (data) {
			var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];

			if (!data) {
				return data;
			}
			data = this.utf8_encode(data + '');
			do { // pack three octets into four hexets
				o1 = data.charCodeAt(i++);
				o2 = data.charCodeAt(i++);
				o3 = data.charCodeAt(i++);

				bits = o1 << 16 | o2 << 8 | o3;

				h1 = bits >> 18 & 0x3f;
				h2 = bits >> 12 & 0x3f;
				h3 = bits >> 6 & 0x3f;
				h4 = bits & 0x3f;

				tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
			} while (i < data.length);

			enc = tmp_arr.join('');
			switch (data.length % 3) {
				case 1:
					enc = enc.slice(0, -2) + '==';
					break;
				case 2:
					enc = enc.slice(0, -1) + '=';
					break;
			}
			return enc;
		}
	};