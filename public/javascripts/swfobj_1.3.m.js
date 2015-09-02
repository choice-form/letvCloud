/*
 *	@filename	videosupport.js
 *	@Author		guewool@gmail.com.
 *	@employer	letv.com.
 *	@create		2012-11-15
 *	@update		2013-05-14
 */
(function(h) {
    var l = h.document
      , g = h.navigator
      , k = g.userAgent.toLowerCase()
      , i = g.platform.toLowerCase()
      // , m = i ? /win/.test(i) : /win/.test(k)
      // , n = i ? /mac/.test(i) : /mac/.test(k)
      , m = false
      , n = false
      , o = !+"\v1";
    h.ReviveSWF = function() {
        var f = {
            swfPlayEnable: null ,
            getPlugins: function() {
                try {
                    return g.plugins["Shockwave Flash"].description
                } catch (b) {}
            },
            getActiveX: function() {
                try {
                    return (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
                } catch (b) {}
            },
            getFlashVars: function() {
                var b = null 
                  , c = 0;
                g.plugins && g.plugins["Shockwave Flash"] ? 
                b = this.getPlugins() : typeof h.ActiveXObject != "undefined" && (b = this.getActiveX());
                if (!b)
                    return c;
                for (var b = b.split(/\s+/), e = 0, d = b.length; e < d; e++) {
                    var a = b[e];
                    isNaN(parseInt(a)) || (c = parseInt(a))
                }
                return c
            },
            createObject: function(b, c) {
                var e = "", d = m && o, a;
                for (a in b)
                    if (b[a] != "undefined" && (d || !(a.toLowerCase() == "classid" || a.toLowerCase() == "codeBase")))
                        d && a.toLowerCase() == "data" ? (c.push("movie"),
                        c.push(b[a])) : e += " " + a + '="' + b[a] + '"';
                d = "";
                a = 0;
                for (var f = c.length; a < f / 2; a++)
                    if (c[a] != Object.prototype[a]) {
                        var j = a * 2;
                        d += '<param name="' + c[j] + '" value="' + c[j + 1] + '" />'
                    }
                return '<object type="application/x-shockwave-flash"' + e + ">" + d + "</object>"
            }
        };
        return {
            flashPlat: {
                win: m,
                mac: n
            },
            swfPlayEnable: function(b) {
                f.swfPlayEnable = f.getFlashVars() >= b;
                return f.swfPlayEnable
            },
            echo: function(b, c, e) {
                var d = "", a;
                a = null  == f.swfPlayEnable ? f.getFlashVars() >= c.version : f.swfPlayEnable;
                var d = c.w || "100%"
                  , g = c.h || "100%";
                if (a) {
                    a = ["quality", "high", "align", "middle", "wmode", "opaque", "bgcolor", c.bg || "#000000", "allowScriptAccess", "always", "allowFullScreen", 
                    "true", "flashvars", c.flashvars];
                    if (e && e instanceof Object) {
                        var j = a.length / 2 - 1;
                        do {
                            var h = a[j * 2]
                              , i = e[h];
                            typeof i != "undefined" && (a[j * 2 + 1] = i,
                            delete e[h])
                        } while (j-- >= 0);for (var k in e)
                            a.push(k),
                            a.push(e[k])
                    }
                    d = f.createObject({
                        id: "player" + ("" + Math.random()).split(".")[1],
                        width: d,
                        height: g,
                        data: c.swf,
                        classid: "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",
                        codeBase: "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,45,0"
                    }, a)
                } else
                    d = '<div style="width:' + d + "px; height:" + g + 'px; text-align:center;"><span style="line-height:200%; font-size:18px">\u5b89\u88c5\u6216\u8005\u66f4\u65b0\u7248\u672c\u4e0d\u5c0f\u4e8e<b style="color:red">' + 
                    c.version + '</b>\u7684flash\u64ad\u653e\u5668, \u8bf7\u70b9\u51fb<a href="http://get.adobe.com/cn/flashplayer/" target="_blank">\u8fd9\u91cc</a>\u5b89\u88c5</span></div>';
                typeof b == "string" && b != "" && l.getElementById(b) ? l.getElementById(b).innerHTML = d : l.write(d)
            }
        }
    }
    ()
}
)(window);
