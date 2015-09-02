//变量太容易冲突
function data2string(d) {
	var arr = [];
	for (var p in d) {
		var item = p + ":'" + d[p] + "'";
		arr.push(item)
	}
	var str = "{" + arr.join(',') + "}";
	return str;
}

//从乐视云获取的视频信息
var letvcloud_player_conf = { "uu": "fcba45089f", "vu": "b319295f22", "pu": "1b2224dcef", "auto_play": 0, "gpcflag": 1, "width": 600, "height": 480 };
//修改过的乐视云api所在路径
var domainname = "javascripts/";
//播放视频用到的参数对象
var playObj = {};
window.playObj = playObj;

//视频播放调用方式
$('#play1').on('click', function () {
	playVideo('haha', 'video0', 'hehe');
})
$('#play2').on('click', function () {
	playVideo('hehe', 'video1', 'haha');
})

/**
 * 播放视频
 * @param {string} superElId 包裹视频元素的父元素的id
 * @param {string} videoElId 视频所在元素的id
 * @param {string} superLastElId 上一个包裹视频元素的父元素的id
 */
function playVideo(superElId, videoElId, superLastElId) {
	playObj.videoElId = videoElId;
	playObj.superLastElId = superLastElId;
	playObj.superElId = superElId;

	$('#' + superLastElId).html('');
	$('.letvjs').remove();
	delete window.ReviveSWF;
	delete window.GUELib;
	delete window._user_defined;

	document.getElementById(playObj.superElId).innerHTML = "<div id='" + playObj.videoElId + "'></div>";
	window.playObj;
	if (typeof ReviveSWF == "undefined" && letvcloud_player_conf.type != 'video') {
		$('body').append('<scr' + 'ipt type="text/javascript" src="' + domainname + 'swfobj_1.3.m.js" class="letvjs"></script>')
	};
	if (typeof GUELib == "undefined") {
		$('body').append('<scr' + 'ipt type="text/javascript" src="' + domainname + 'videosupport_2.0_v1.m.js" class="letvjs"></script>')
	};
	if (typeof _user_defined == "undefined" && letvcloud_player_conf.type != 'video') {
		$('body').append('<scr' + 'ipt type="text/javascript" src="' + domainname + 'user_defined.js?v2" class="letvjs"></script>');
	};

	$('body').append('<scr' + 'ipt type="text/javascript" src="' + domainname + 'player_v2.3.1.js" data="' + data2string(letvcloud_player_conf) + '" class="letvjs"></script>');
}

