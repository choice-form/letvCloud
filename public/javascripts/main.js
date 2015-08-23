$(function () {
	var url = 'http://localhost:3000/letv';
	/**
	 * 生成视频列表
	 * @param {Number} 索引页
	 * @param {Number} 每页项数
	 */
	function videoList(index, size) {
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
				var result = JSON.parse(rs);
				console.log(result.data);
				var html = template('test', { list: result.data });
				$('#content').html(html);
				$(".js-del-video").on("click", function (e) {
					var nodeId = this.parentNode.parentNode.getAttribute('data-videoid')
					videoDel(nodeId);
				});
				$(".js-get-video").on('click', function (e) {
					var nodeId = this.parentNode.parentNode.getAttribute('data-videoid')
					videoGet(nodeId);
				})
			}
		})
	}

	/**
	 * 删除单个视频
	 */
	function videoDel(videoId) {
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
	function videoGet(videoId) {
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
			}
		})
	}
	
	/**
	 * 视频上传初始化(断点续传)
	 * @param {obj} 视频对象
	 * @param {Function} 回调函数
	 */
	function videoUploadInit(file, callback) {
		var init = {
			api: 'video.upload.init',
			video_name: file.name,
			file_size: file.size,
			uploadtype: '1',
			client_ip: '192.168.0.19'
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
	 * @param {Object} 文件对象
	 * @param {Object} videoUploadInit 返回的对象
	 * @param {Function} 回调函数
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
	 */
	function videoUpdata(file, uploadSize, uploadUrl) {
		var fl = file.slice(uploadSize)
		var myform = new FormData();
		myform.append("video_file", fl);
		var xhr = new XMLHttpRequest();
		xhr.open("post", uploadUrl);
		xhr.onload = function () {
			if (xhr.status === 200) {
				console.log("上传成功......");
				localStorage.removeItem("token");
				// localStorage.removeItem("uploadUrl");
				localStorage.removeItem("videoName");
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
		}
		xhr.send(myform);
	}

	videoList(1, 20);
	/**
	 * 断点续传
	 */
	$('#upDataOfBreak').on('click', function () {
		var input = document.getElementById('fileinput');
		var file = input.files[0];
		if (localStorage.getItem("videoName") === file.name) {
			var token = localStorage.getItem('token');
			var obj = {
				data: { token: token },
			}
			videoUploadResume(file, obj, function (e) {
				console.log("视频将从:" + e.data.upload_size);
				var uploadSize = e.data.upload_size;
				videoUpdata(file, uploadSize + 1, e.data.upload_url);
			})
		} else {
			videoUploadInit(file, function (rs) {
				videoUploadResume(file, rs, function (e) {
					var uploadSize = 0;
					videoUpdata(file, uploadSize, e.data.upload_url);
				})
			})
		}
	});
})