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
var domainname = "javascripts/";
if (typeof ReviveSWF == "undefined" && letvcloud_player_conf.type != 'video') {
	document.write('<scr' + 'ipt type="text/javascript" src="' + domainname + 'swfobj_1.3.m.js"></script>')
};
if (typeof GUELib == "undefined") {
	document.write('<scr' + 'ipt type="text/javascript" src="' + domainname + 'videosupport_2.0_v1.m.js"></script>')
};
if (typeof _user_defined == "undefined" && letvcloud_player_conf.type != 'video') {
	document.write('<scr' + 'ipt type="text/javascript" src="' + domainname + 'user_defined.js?v2"></script>');
};

document.write('<scr' + 'ipt type="text/javascript" src="' + domainname + 'player_v2.3.1.js" data="' + data2string(letvcloud_player_conf) + '"></script>');