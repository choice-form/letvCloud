var letv = (function () {
	// 服务器地址
	var url = 'http://192.168.0.50:3000/letv';
	var fileTypes = ['wmv', 'avi', 'dat', 'asf', 'rm', 'rmvb', 'ram', 'mpg', 'mpeg', '3gp', 'mov', 'mp4', 'm4v', 'dvix', 'dv', 'dat', 'mkv', 'flv', 'f4v', 'vob', 'ram', 'qt', 'divx', 'cpk', 'fli', 'flc', 'mod'];

	function isVideo(file) {
		if (typeof (file) === "undefined") {
			alert("请选择视频");
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
				// console.log(rs);
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
				console.log(result);
				callback(result);
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
		var videoUploadResume = {
			api: "video.upload.resume",
			token: token,
			uploadtype: 1,
		}
		$.ajax({
			url: url,
			type: "post",
			data: videoUploadResume,
			success: function (rs) {
				console.log("resume");
				var result = JSON.parse(rs);
				console.log(JSON.parse(rs));
				console.log(result.data.progress_url);
				callback(result);
			}
		})
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
				var complete = ((event.loaded + uploadSize) / file.size * 100 | 0);
				// console.log(complete);
				$(".progress-bar").css("width", complete + "%");
				$(".progress-bar").html(complete + "%");
			}
		};
		xhr.upload.onloadend = function(event){
			console.log (event);
		}
		xhr.send(myform);
	}

	return {
		videoList: videoList,
		videoGetPlayinterface: videoGetPlayinterface,
		videoDel: videoDel,
		videoGet: videoGet,
		videoUploadInit: videoUploadInit,
		videoUploadResume: videoUploadResume,
		videoUpdata: videoUpdata,
		url: url,
		isVideo: isVideo
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
		if (localStorage.getItem("videoName") === file.name) {
			var token = localStorage.getItem('token');
			var obj = {
				data: { token: token },
			}
			letv.videoUploadResume(file, obj, function (e) {
				console.log("视频将从:" + e.data.upload_size);
				var uploadSize = e.data.upload_size;
				letv.videoUpdata(file, uploadSize + 1, e.data.upload_url, function () {
					alert("上传完成")
				});
			})
		} else {
			letv.videoUploadInit(file, function (rs) {
				letv.videoUploadResume(file, rs, function (e) {
					var uploadSize = 0;
					letv.videoUpdata(file, uploadSize, e.data.upload_url,function () {
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
			var nodeId = this.parentNode.parentNode.getAttribute('data-videoid')
			letv.videoDel(nodeId, function (rs) {
				this.parentNode.parentNode.remove();
			});
		});
		// 获取单个视频信息
		$(".js-get-video").on('click', function (e) {
			var nodeId = this.parentNode.parentNode.getAttribute('data-videoid')
			letv.videoGet(nodeId, function (e) {
			});
		});
		// 获取视频播放接口
		$(".js-video-interface").on('click', function (e) {
			var vu = this.parentNode.parentNode.getAttribute('data-vu')
			letv.videoGetPlayinterface(vu, '', 'html', 0, 0, 0, function (rs) {
				console.log(rs);
			});
		});
		//播放视频
		$(".js-video-play").on('click', function (e) {
			var vu = this.parentNode.parentNode.getAttribute('data-vu')
			letv.videoGetPlayinterface(vu, '', 'html', 0, 550, 450, function (rs) {
				$(".modal-body p").html(rs);
				console.log(rs);
			});
		});
	});
})
