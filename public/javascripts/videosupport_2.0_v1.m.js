/*
 *	@filename	videosupport.js
 *	@Author		guewool@gmail.com.
 *	@employer	letv.com.
 *	@create		2012-11-15
 *	@update		2013-07-19
 */
(function(window){
    var document = window.document,
        navigator = window.navigator,
        UNDEF = "undefined",
        OBJECT = "object",
        ua = navigator.userAgent.toLowerCase(),
        pf = navigator.platform.toLowerCase(),
        windows = pf ? /win/.test(pf) : /win/.test(ua),
        mac = pf ? /mac/.test(pf) : /mac/.test(ua),
    //webkit = /webkit/.test(ua) ? parseFloat(ua.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
        ie = !+"\v1";
    if(typeof GUELib == "undefined") window['GUELib'] = {};
    if(GUELib.fn==Object.prototype[0]) GUELib.fn={};
    GUELib.Support = {
        ipad:/ipad/.test(ua),
        ipod: /ipod/.test(ua),
        iphone:/iphone/.test(ua),
        android:/android/.test(ua),
        android4: /android 4/.test(ua),
        androidpad: /android/.test(ua) && !/mobile/.test(ua),
        androidpad4: /android 4/.test(ua) && !/mobile/.test(ua),
        atwin: /win/.test(ua),
        mac : mac,
        linux : /linux x86/.test(ua)
    }
    GUELib.Platform = function(){
        var pf=null,pfs=['phone','pad','win','linux'];

        return pf;
    }
    var _util = {
        param: function(obj){
            if(obj && obj instanceof Object){
                var arr=[];
                for(var p in obj){
                    arr.push(p+"="+obj[p]);
                }
                return arr.join('&');
            }
        }
    }
    var _extend = function(){
        //support two arguments, target and source, format Object;
        var target = arguments[0],
            i=1,
            len = arguments.length;
        if(len<2) return target||{};
        for(;i<len; i++){
            var source = arguments[i];
            for(var p in source){
                target[p] = source[p];
            }
        }
        return target;
    }
    GUELib.extend = GUELib.fn.extend = _extend;
    var _getJSON = function(url,data, fn){
        var oldScript = document.getElementById(url);
        if(oldScript){
            oldScript.setAttribute("src",url);
            return;
        }
        var _data = _extend({callback:("fn"+Math.random()).replace(".","")}, data||{});
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement("script");
        script.setAttribute('type','text/javascript');
        script.setAttribute('src',url+"&"+_util.param(_data) );
        script.setAttribute('id',url+Math.random());
        head.appendChild(script);
        // document.body.appendChild(url)
        if(typeof fn=="function"){
            window[_data.callback]=function(data){
                try{
                    fn && fn(data);
                }catch(e){}
            };
        }
        script.onload = script.onreadystatechange = function() {
            if ((!this.readyState || this.readyState ==="complete" || this.readyState === "loaded" )) {
                script.onload =script.onreadystatechange = null; //IE内存溢出
                if (head && script.parentNode) {
                    head.removeChild(script);
                }
            }
        };
    }
    var _send = function(u,fn){
        var img= new Image();
        img.src=u;
        img.onload = function(){ fn && fn()};
    }
    var _Video={
        // Video.setup(document.body,["movie.mp4","movie.ogg"],500,386);
        videoVersion:'2.0',
        config:{
            boxId:"video_box",
            videoId:"videoId",
            width:'100%',
            height:'100%'
        },
        firstplay:{},

        /**
         * init HTML5 video;
         * @parent	{HTMLElement}
         * @source	{Array} *.mp4 *.ogg;
         * @width	{Number}
         * @height	{Number}
         * @return	{HTMLDivElement}
         */
        setup:function(parentElem,source,width,height,plugins,rate){
            var rand = (""+Math.random()).split('.')[1];
            if (!source) {return null;}
            var _self = this;
            var conf = _self.config,
                w = width ? width+"px" : conf.width,
                h = height? height+"px": conf.height;

            var s=	"<div id='"+conf.boxId+rand+"'position=\"absolute\";z-index=0>" +
                "<video id=\""+conf.videoId+rand+"\" controls=\"controls\" poster=\"\" preload=\"none\" data-rate=\""+rate+"\" type=\"video/mp4\">"+
                "<p>你的浏览器不支持HTML5的video标签!</p>";
            //source.shift();
            for ( var k in source)
                s+=			"<source src='"+source[k]+"'></source>";

            s+=			"</video>" +
                '<div id="GControls'+rand+'"></div>'+
                "</div>";
            parentElem = typeof parentElem != "string"? parentElem : document.getElementById(parentElem);
            parentElem.innerHTML+=s;

            //init style
            var videoBox=document.getElementById(conf.boxId+rand);
            var videoElem = document.getElementById(conf.videoId+rand);
            videoBox.style.width = videoElem.style.width= w;
            videoBox.style.height= videoElem.style.height= h;

            var _report = plugins.event||{};
            function setPlugin ( ){
                for(var p in _report){
                    var evt = p;
                    videoElem.addEventListener(evt, function(){
                        !!_self.firstplay[videoElem.getAttribute('id')] && _report[p](_self.getdata);
                        if(evt =='play'){
                            _self.firstplay[videoElem.getAttribute('id')]=0;
                        }
                    }, !1);
                }
            };
            setPlugin ( );

            return {
                video:videoElem,
                VERSION: _self.videoVersion,
                poster:function(src){
                    videoElem.poster = src;
                },
                getSource: function(getdata){
                    _self.getdata = getdata;
                },
                source:function(media){
                    if(typeof media == "string")
                        videoElem.src=media;
                    videoElem.load();
                    _self.firstplay[conf.videoId+rand]=1;
                },
                play:function(fn){
                    typeof fn =='function' && fn();
                    videoElem.play();
                },
                upDataPlugins:function (plugins){
                    _report = plugins.event||{};
                    setPlugin ( );
                },
                currentTime: function (crttime) {
                    videoElem.currentTime = crttime;
                }
            }
        }
    };

    GUELib.Util = _util;
    GUELib.Video = _Video;
    GUELib.GetJSON = _getJSON;
    GUELib.send = _send;
})(window);

var BaseCode =
{
    decode :	function(data){
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];

        if (!data) {
            return data;
        }
        data += '';

        do{		// unpack four hexets into three octets using index points in b64
            h1 = b64.indexOf(data.charAt(i++));
            h2 = b64.indexOf(data.charAt(i++));
            h3 = b64.indexOf(data.charAt(i++));
            h4 = b64.indexOf(data.charAt(i++));
            bits = h1<<18 | h2<<12 | h3<<6 | h4;

            o1 = bits>>16 & 0xff;
            o2 = bits>>8 & 0xff;
            o3 = bits & 0xff;

            if (h3 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1);
            } else if (h4 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1, o2);
            } else {
                tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
            }
        }while (i < data.length);
        dec = tmp_arr.join('');
        return dec;
    },
    encode :	function(data) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc="", tmp_arr = [];

        if (!data) {
            return data;
        }
        data = this.utf8_encode(data+'');
        do { // pack three octets into four hexets
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);

            bits = o1<<16 | o2<<8 | o3;

            h1 = bits>>18 & 0x3f;
            h2 = bits>>12 & 0x3f;
            h3 = bits>>6 & 0x3f;
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
(function(window, G){
    String.prototype.Trim = function(clipStr){
        var _self = this;
        if(arguments.length==0)
            return _self.replace(/(^\s+)|(\s+$)/g,"");
        if(clipStr && typeof clipStr=='string'){
            var _reg_f = /^\^.*/;
            var _reg_e = /.*\$$/;

            if( _reg_f.test(clipStr) ){
                var s = clipStr.substr(1);
                return _self.replace(s,'');
            }
            if( _reg_e.test(clipStr) ){
                return _self.replace();
            }
        }
    }
    var _query = {
        program : {},
        querystr :"",
        initQuery: function(){
            var _p = window.location.search.substr(1);
            if (_p=="") return;
            if (_p.indexOf("="||"&") == -1)return;
            // _p = decodeURIComponent(_p); // 匹配解码 函数错误。次函数不能解地址栏的汉字编码
            this.querystr = _p;
            var arr = _p.split("&");
            for(var i=0,l=arr.length; i<l; i++){
                var _item = arr[i].split("=");
                if(_item[1].indexOf("function") > -1) return alert("非法参数");
                this.program[_item[0].Trim()] = _item[1].Trim();
            }
        },
        get: function(name) {
            //var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            return this.program[name] || null;
        },
        getall:function(type) {
            if(type && type == "string"){
                return this.querystr;
            }
            var o = this.program;
            delete o["title"];
            return o;
        }
    }
    G.Query = _query;
})(window, GUELib);