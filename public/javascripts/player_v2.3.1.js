var Util = {
    Timer: function(d, h) {
        function f() {
            return (new Date).getTime()
        }
        var m = !1, r, p, q, s, u;
        return {
            delay: function() {
                return d
            },
            isRunning: function() {
                return m
            },
            start: function() {
                var b = this;
                m = !0;
                r = setInterval(function() {
                    h && h();
                    b.start()
                }
                , d);
                return this
            },
            stop: function() {
                console.log("timr \u8f6e\u8be2\u505c\u6b62\uff01");
                clearInterval(r);
                m = !1;
                return this
            },
            setDelay: function(b) {
                d = b
            },
            reset: function() {
                r || this.start();
                return this
            },
            startTiming: function() {
                p = f();
                return this
            },
            stopTiming: function() {
                q = f();
                return this
            },
            getTimeM: function() {
                return q - p
            },
            getTimeS: function() {
                return Math.round((q - p) / 1E3)
            },
            setCurrTimerId: function(b) {
                r = b
            },
            blockTimeStart: function() {
                s = f()
            },
            blockTimeStop: function() {
                var b = f();
                return Math.round(b - s)
            },
            startPlayTimeFun: function() {
                u = f()
            },
            countStartPlayTime: function() {
                var b = f()
                  , b = Math.round(b - u);
                console.log("\u8d77\u64ad\u65f6\u957f\uff1a" + b);
                return b
            }
        }
    },
    extend: function() {
        var d = arguments[0], h = !0, f = 1, m = arguments.length, r, p;
        "boolean" === typeof d && (h = d,
        d = arguments[1] || {},
        f = 2);
        if (m == f)
            return d || {};
        for (; f < 
        m; f++)
            for (p in r = arguments[f],
            r)
                h && void 0 !== d[p] || (d[p] = r[p]);
        return d
    },
    send: function(d) {
        var h = new Image(1,1);
        h.onload = h.onerror = h.onabort = function() {
            h = h.onload = h.onerror = h.onabort = null 
        }
        ;
        h.src = d
    },
    addParams: function(d) {
        var h = [], f;
        for (f in d)
            h.push(f + "=" + d[f]);
        return h.join("&")
    },
    getCookie: function(d) {
        try {
            var h = document.cookie.match(new RegExp("(^| )" + d + "=([^;]*)(;|$)"))
        } catch (f) {
            console.log("\u6355\u6349\u5230\u4f8b\u5916\uff0c\u5f00\u59cb\u6267\u884ccatch\u5757\u8bed\u53e5 ---\x3e"),
            console.log("\u9519\u8bef\u540d\u79f0: " + 
            f.name + " ---\x3e "),
            console.log("\u9519\u8bef\u4fe1\u606f: " + f.message + " ---\x3e ")
        }
        return null  != h ? unescape(h[2]) : ""
    },
    addCookie: function(d, h, f) {
        f = f || {};
        null  === h && (h = "",
        f.expires = -1);
        var m = "";
        f.expires && ("number" == typeof f.expires || f.expires.toUTCString) && ("number" == typeof f.expires ? (m = new Date,
        m.setTime(m.getTime() + 864E5 * f.expires)) : m = f.expires,
        m = "; expires=" + m.toUTCString());
        var r = f.path ? "; path=" + f.path : ""
          , p = f.domain ? "; domain=" + f.domain : "";
        f = f.secure ? "; secure" : "";
        try {
            document.cookie = [d, "=", encodeURIComponent(h), 
            m, r, p, f].join("")
        } catch (q) {}
    },
    getBroswerUrl: function() {
        return encodeURIComponent(window.location.href)
    },
    getUUID: function() {
        return void 0 != this.uuid ? this.uuid : this.uuid = "1" + String((new Date).getTime()).slice(4) + String(Math.random()).slice(-6)
    },
    getLC: function() {
        var d = Util.getCookie("tj_lc");
        if ("" == d) {
            for (var d = "", h = 32; h--; )
                d += Math.floor(16 * Math.random()).toString(16);
            h = new Date;
            h.setFullYear(h.getFullYear() + 20);
            Util.addCookie("tj_lc", d, {
                expires: h,
                domain: ".letv.com",
                path: "/"
            })
        }
        return d
    },
    paramstr: function(d) {
        var h = 
        [], f;
        for (f in d)
            h.push(f + "=" + d[f]);
        return h.join("&")
    },
    checkParam: function(d) {
        if (void 0 == d)
            return "";
        var h = d
          , f = d.length
          , m = d.substr(f - 1, 1)
          , r = d.substr(f - 2, 2);
        "%" == m ? h = 0 : "px" == r && (h = d.substr(0, f - 2));
        return h
    },
    trim: function(d) {
        if (String.prototype.trim && !String.prototype.trim.call("\ufeff\u00a0"))
            return null  == d ? "" : String.prototype.trim.call(d);
        var h = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        return null  == d ? "" : (d + "").replace(h, "")
    },
    getCrtOS: function() {
        var d = navigator.userAgent;
        return d.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 
        311 : -1 < d.indexOf("Android") || -1 < d.indexOf("Linux") ? 312 : 310
    },
    getOS: function() {
        var d;
        switch (this.getCrtOS()) {
        case 310:
            d = "other";
            break;
        case 312:
            d = "android";
            break;
        case 311:
            d = "ios"
        }
        return d
    },
    backData: {},
    getRate: function() {
        var d = document.getElementsByTagName("video")[0];
        if (d)
            return d.getAttribute("data-rate")
    },
    getVideoUrl: function(d) {
        d = BaseCode.decode(d);
        -1 == d.indexOf("uuid=") && (d = -1 == d.indexOf("?") ? d + ("?uuid=" + Util.getUUID()) : d + ("&uuid=" + Util.getUUID()));
        return d
    },
    setRate: function(d) {
        if (d) {
            var h = {
                yuanhua: "yuanhua",
                1300: "super",
                800: "high",
                350: "low"
            }[d];
            if (d != Util.getRate() && Util.backData.data.video_info.media[h]) {
                var f = document.getElementsByTagName("video")[0]
                  , m = f.currentTime
                  , r = f.paused;
                f.src = Util.getVideoUrl(Util.backData.data.video_info.media[h].play_url.main_url);
                f.load();
                f.addEventListener("loadedmetadata", function() {
                    f.currentTime = m;
                    r ? f.pause() : f.play()
                }
                );
                f.setAttribute("data-rate", d)
            }
        }
    },
    getNt: function() {
        var d;
        if (navigator.network && navigator.network.connection) {
            d = navigator.network.connection.type;
            var h = 
            {};
            h[Connection.ETHERNET] = "\u7f51\u7ebf";
            h[Connection.WIFI] = "WIFI\u7f51\u7edc";
            h[Connection.CELL_2G] = "2G\u7f51\u7edc";
            h[Connection.CELL_3G] = "3G\u7f51\u7edc";
            h[Connection.CELL_4G] = "4G\u7f51\u7edc";
            d = h[d]
        }
        return d
    },
    getBrowserVersion: function() {
        var d = {}, h = navigator.userAgent.toLowerCase(), f;
        (f = h.match(/msie ([\d.]+)/)) ? d.msie = f[1] : (f = h.match(/firefox\/([\d.]+)/)) ? d.firefox = f[1] : (f = h.match(/360browser/)) ? d.b360 = f[1] ? f[1] : "-" : (f = h.match(/qqbrowser\/([\d.]+)/)) ? d.bqq = f[1] : (f = h.match(/ucbrowser\/([\d.]+)/)) ? 
        d.buc = f[1] : (f = h.match(/baidubrowser\/([\d.]+)/)) ? d.bbaidu = f[1] : (f = h.match(/sogoumobilebrowser\/([\d.]+)/)) ? d.bsgm = f[1] : (f = h.match(/liebaofast\/([\d.]+)/)) ? d.blbfast = f[1] : (f = h.match(/mb2345browser\/([\d.]+)/)) ? d.b2345 = f[1] : (f = h.match(/4g explorer\/([\d.]+)/)) ? d.b4g = f[1] : (f = h.match(/huohoubrowser\/([\d.]+)/)) ? d.bhuohou = f[1] : (f = h.match(/maxthon[\/ ]([\d.]+)/)) ? d.maxthon = f[1] : (f = h.match(/(opera)|(opr)\/([\d.]+)/)) ? d.opera = f[3] : (f = h.match(/chrome\/([\d.]+)/)) ? d.chrome = f[1] : (f = h.match(/version\/([\d.]+).*safari/)) ? 
        d.safari = f[1] : d.other = "-";
        var h = "", m;
        for (m in d)
            h = m + d[m];
        return h
    },
    getHttpsDomain: function(d) {
        if ("https:" == window.location.protocol) {
            d = d.split("://")[1];
            var h = {
                "yuntv.letv.com": "s.yuntv.letv.com",
                "ark.letv.com": "arkletv.lecloud.com",
                "api.letvcloud.com": "apiletv.lecloud.com",
                "sdk.lecloud.com": "sdkletv.lecloud.com"
            };
            h.hasOwnProperty(d) && (d = h[d]);
            return "https://" + d
        }
        return d
    },
    _utf8_decode: function(d) {
        for (var h = "", f = 0, m = c1 = c2 = 0; f < d.length; )
            m = d.charCodeAt(f),
            128 > m ? (h += String.fromCharCode(m),
            f++) : 191 < m && 
            224 > m ? (c2 = d.charCodeAt(f + 1),
            h += String.fromCharCode((m & 31) << 6 | c2 & 63),
            f += 2) : (c2 = d.charCodeAt(f + 1),
            c3 = d.charCodeAt(f + 2),
            h += String.fromCharCode((m & 15) << 12 | (c2 & 63) << 6 | c3 & 63),
            f += 3);
        return h
    }
};
!function(d, h) {
    function f(a, b, c, e, n, g, d, f, l, t, z, h) {
        this.duration = parseInt(f) || 0;
        this.impression = n;
        this.clickUrl = b;
        this.tracking = c;
        this.event = e;
        this.oid = g;
        this.orderid = d;
        this.curIdx = z;
        this.resolveAdParam(a);
        this.adType = l + "";
        this.aduid = t;
        this.lc = h;
        this.initEvent()
    }
    function m(a) {
        this.support = "WebSocket" in window;
        this.ready = !1;
        this.target = a;
        this.mq = [];
        this.open()
    }
    var r = function() {
        var a = navigator.userAgent.toLowerCase();
        browser = {
            iPhone: /iphone/.test(a),
            iPad: /ipad/.test(a),
            iPod: /ipod/.test(a),
            isLetv: /letv/.test(a),
            Android: /android/.test(a),
            AndroidPad: /android/.test(a) && !/mobile/.test(a),
            atwin: /win/.test(a),
            opera: /opera/.test(a),
            msie: /msie/.test(a),
            firefox: /firefox/.test(a),
            safari: /safari/.test(a) && !/chrome/.test(a),
            wph: /windows phone/.test(a),
            ps: /playstation/.test(a),
            uc: /ucbrowser|ucweb/.test(a),
            xiaomi: /xiaomi/.test(a),
            weixin: /MicroMessenger/i.test(a),
            isLetvTv: function() {
                try {
                    return "function" == typeof LetvFish.getBrowserType
                } catch (a) {
                    return !1
                }
            }
        };
        var b = /(opera)(?:.*version)?[ \/]([\w.]+)/
          , c = /(msie) ([\w.]+)/
          , 
        e = /(mozilla)(?:.*? rv:([\w.]+))?/
          , a = /(webkit)[ \/]([\w.]+)/.exec(a) || b.exec(a) || c.exec(a) || 0 > a.indexOf("compatible") && e.exec(a) || [];
        browser.version = a[2] || "0";
        return browser
    }
    (), p = function() {
        function a(a) {
            return b.call(a, function(a) {
                return null  != a
            }
            )
        }
        var b = [].filter
          , c = [].slice
          , e = /^\.([\w-]+)$/
          , n = /^#([\w-]*)$/
          , g = /^[\w-]+$/;
        vjs = function(a, c) {
            return new vjs.fn.init(a,c)
        }
        ;
        vjs.isPC = !1;
        var f = function(a, b) {
            var k;
            try {
                return null  == a || 9 != a.nodeType && a.nodeType != a.DOCUMENT_NODE || !n.test(b) ? 1 !== a.nodeType && 9 !== 
                a.nodeType ? [] : c.call(e.test(b) ? a.getElementsByClassName ? a.getElementsByClassName(RegExp.$1) : h(a, RegExp.$1) : g.test(b) ? a.getElementsByTagName(b) : a.querySelectorAll(b)) : (k = a.getElementById(RegExp.$1)) ? [k] : []
            } catch (d) {
                return []
            }
        }
          , l = function(a, c, b) {
            c = c || [];
            a.selector = b || "";
            a.length = c.length;
            b = 0;
            for (var k = c.length; b < k; b++)
                a[b] = c[b];
            return a
        }
          , h = function(a, c) {
            if (a.getElementsByTagName)
                for (var b = a.getElementsByTagName("*"), k = new RegExp("(^|\\s)" + c + "(\\s|$)"), e = 0, g = b.length; e < g; e++)
                    if (k.test(b[e].className))
                        return [b[e]];
            return []
        }
        ;
        vjs.fn = {
            init: function(c, b) {
                if (c) {
                    if (c.nodeType)
                        return l(this, [c]);
                    var k;
                    if (c instanceof Array)
                        k = a(c);
                    else {
                        if (void 0 !== b)
                            return vjs(b).find(c);
                        k = f(d, c)
                    }
                    return l(this, k, c)
                }
                return l(this)
            },
            find: function(a) {
                var c = this;
                return "object" == typeof a ? vjs(a).filter(function() {
                    var a = this;
                    return [].some.call(c, function(c) {
                        return vjs.contains(c, a)
                    }
                    )
                }
                ) : 1 == this.length ? vjs(f(this[0], a)) : this.map(function() {
                    return f(this, a)
                }
                )
            },
            each: function(a) {
                if ([].every)
                    [].every.call(this, function(c, b) {
                        return !1 !== a.call(c, 
                        b, c)
                    }
                    );
                else
                    for (var c = 0, b = this.length; c < b; c++)
                        a.call(this[c], c, this[c]);
                return this
            },
            hasClass: function(a) {
                return (new RegExp("(\\s|^)" + a + "(\\s|$)")).test(this[0].className)
            },
            addClass: function(a) {
                var c = (a || "").split(/\s+/);
                return this.each(function() {
                    for (var a = this.className, b = 0, k = c.length; b < k; b++)
                        vjs(this).hasClass(c[b]) || (a += " " + c[b]);
                    this.className = a
                }
                )
            },
            removeClass: function(a) {
                var c = (a || "").split(/\s+/);
                return this.each(function() {
                    for (var a = this.className, b = 0, k = c.length; b < k; b++)
                        a = a.replace(new RegExp("(\\s|^)" + 
                        c[b] + "(\\s|$)"), " ");
                    this.className = vjs.trim(a)
                }
                )
            },
            on: function(a, c, b) {
                return this.each(function(k, e) {
                    var g = function(a) {
                        a.target = a.target || a.srcElement;
                        c.call(b, a)
                    }
                    ;
                    e.domid || (e.domid = String(Math.random()).slice(-4));
                    c[a + "_" + e.domid] = g;
                    e.addEventListener ? e.addEventListener(a, g, !1) : e.attachEvent && e.attachEvent("on" + a, g)
                }
                )
            },
            off: function(a, c, b) {
                return this.each(function(b, k) {
                    var e = c[a + "_" + k.domid] || c;
                    k.removeEventListener ? k.removeEventListener(a, e, !1) : k.detachEvent && k.detachEvent("on" + a, e)
                }
                )
            },
            getStyle: function(a) {
                var c = 
                this[0];
                if (r.msie) {
                    switch (a) {
                    case "opacity":
                        return (c.filters["DXImageTransform.Microsoft.Alpha"] || c.filters.alpha || {}).opacity || 100;
                    case "float":
                        a = "styleFloat"
                    }
                    return c.style[a] || c.currentStyle ? c.currentStyle[a] : 0
                }
                "float" == a && (a = "cssFloat");
                return c.style[a] || (d.defaultView.getComputedStyle(c, "") ? d.defaultView.getComputedStyle(c, "")[a] : null ) || 0
            },
            setStyle: function(a, c) {
                return this.each(function() {
                    if (r.msie)
                        switch (a) {
                        case "opacity":
                            this.style.filter = "alpha(opacity=" + 100 * c + ")";
                            this.currentStyle && this.currentStyle.hasLayout || 
                            (this.style.zoom = 1);
                            return;
                        case "float":
                            a = "styleFloat"
                        }
                    else
                        "float" == a && (a = "cssFloat");
                    this.style[a] = c
                }
                )
            },
            getAttr: function(a) {
                return this[0].getAttribute(a)
            },
            setAttr: function(a, c) {
                return this.each(function() {
                    this.setAttribute(a, c)
                }
                )
            },
            offset: function() {
                var a = this[0]
                  , c = d.body
                  , b = a.getBoundingClientRect();
                return {
                    top: b.top + (window.scrollY || c.parentNode.scrollTop || a.scrollTop) - (d.documentElement.clientTop || c.clientTop || 0),
                    left: b.left + (window.scrollX || c.parentNode.scrollLeft || a.scrollLeft) - (d.documentElement.clientLeft || 
                    c.clientLeft || 0)
                }
            },
            width: function(a) {
                if ("undefined" == typeof a)
                    return this[0].offsetWidth;
                this[0].style.width = parseFloat(a) + "px"
            },
            height: function(a) {
                if ("undefined" == typeof a)
                    return this[0].offsetHeight;
                this[0].style.height = parseFloat(a) + "px"
            },
            map: function(a) {
                return vjs(vjs.map(this, function(c, b) {
                    return a.call(c, b, c)
                }
                ))
            }
        };
        vjs.fn.init.prototype = vjs.fn;
        vjs.contains = function(a, c) {
            return a !== c && a.contains(c)
        }
        ;
        vjs.map = function(a, c) {
            var b, k = [], e;
            if ("number" == typeof a.length)
                for (e = 0; e < a.length; e++)
                    b = c(a[e], 
                    e),
                    null  != b && k.push(b);
            else
                for (e in a)
                    b = c(a[e], e),
                    null  != b && k.push(b);
            return k
        }
        ;
        vjs.each = function(a, c) {
            var b;
            if ("number" == typeof a.length)
                for (b = 0; b < a.length && !1 !== c.call(this, b, a[b]); b++)
                    ;
            else
                for (b in a)
                    if (!1 === c.call(this, b, a[b]))
                        break;
            return a
        }
        ;
        vjs.trim = function(a) {
            return a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
        }
        ;
        vjs.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, c) {
            c.toLowerCase()
        }
        );
        vjs.extend = function(a) {
            var c, b;
            a = a || {};
            c = a.init || a.init || this.prototype.init || 
            this.prototype.init || function() {}
            ;
            b = function() {
                c.apply(this, arguments)
            }
            ;
            b.prototype = vjs.create(this.prototype);
            b.prototype.constructor = b;
            a.__proto__ || (a.__proto__ = b.prototype);
            b.extend = vjs.extend;
            for (var k in a)
                a.hasOwnProperty(k) && (b.prototype[k] = a[k]);
            return b
        }
        ;
        vjs.create = function(a) {
            function c() {}
            c.prototype = a;
            return new c
        }
        ;
        vjs.getWinWH = function() {
            var a = window.innerWidth
              , c = window.innerHeight;
            "number" != typeof a && ("CSS1Compat" == d.compatMode ? (a = d.documentElement.clientWidth,
            c = d.documentElement.clientHeight) : 
            (a = d.body.clientWidth,
            c = d.body.clientHeight));
            return {
                width: a,
                height: c
            }
        }
        ;
        vjs.safari = r.safari;
        return vjs
    }
    (), q = {
        createElement: function(a, b) {
            var c = d.createElement(a), e;
            for (e in b)
                b.hasOwnProperty(e) && (-1 !== e.indexOf("-") ? c.setAttribute(e, b[e]) : c[e] = b[e]);
            return c
        },
        now: Date.now || function() {
            return +new Date
        }
        ,
        merge: function(a, b, c) {
            b || (b = {});
            for (var e in b)
                !b.hasOwnProperty(e) || c && a.hasOwnProperty(e) || (a[e] = b[e]);
            return a
        },
        getJSON: function(a, b, c, e, n) {
            var g = this.now(), f = "vjs_" + g + Math.floor(100 * Math.random()), 
            l = "$1" + f + "$2", m = 0, p = 0, r = this, q, s = d.head || d.getElementsByTagName("head")[0] || d.documentElement;
            /_r=/i.test(a) || (a += "&_r=?");
            a = a.replace(/(\=)\?(&|$)|\?\?/i, l);
            e = e || 5E3;
            n = n || 2;
            window[f] = function(a) {
                u();
                vjs.responseTime = r.now() - g;
                vjs.retryCount = m;
                b.call(this, a, {
                    responseTime: r.now() - g,
                    retryCount: m
                });
                window[f] = null 
            }
            ;
            var u = function() {
                clearTimeout(p);
                q && q.parentNode && (s.removeChild(q),
                q.onload = q.onreadystatechange = null ,
                q = h)
            }
              , v = function() {
                u();
                m >= n ? (clearTimeout(p),
                window[f] = null ,
                c && c.call(this)) : (a = a.replace(/&_r=[\d|\?]+/i, 
                "&_r=" + m),
                q = d.createElement("script"),
                q.setAttribute("type", "text/javascript"),
                q.setAttribute("src", a),
                q.onload = q.onreadystatechange = function(a) {
                    clearTimeout(p)
                }
                ,
                s.insertBefore(q, s.firstChild),
                p = setTimeout(v, e),
                m++)
            }
            ;
            v()
        }
    }, s = function() {
        var a = screen;
        return {
            x: a.width > a.height ? a.width : a.height,
            y: a.width > a.height ? a.height : a.width
        }
    }
    (), u;
    u = r.iPhone || r.iPod || r.msie ? !1 : !0;
    var b = {
        param: function(a) {
            var b = [];
            if ("object" == typeof a)
                for (var c in a)
                    a.hasOwnProperty(c) && "-" !== a[c] && b.push(encodeURIComponent(c) + "=" + 
                    encodeURIComponent(a[c]));
            return b.join("&")
        },
        sendLogs: function(a, k) {
            if (b.getQuery("arkdebug"))
                try {
                    var c = this.el("#arkDebugButton")
                      , e = l.putinVars.uuid
                      , n = "http://ark.letv.com/apsdbg/?type=1&sid=" + e + "&time=" + k + "&msg=";
                    b.existEl(c) || (c = q.createElement("div", {
                        id: "arkDebugButton",
                        className: "vdo_send_log"
                    }),
                    c.innerText = "\u8bf7\u67e5\u770b" + e + "\u7684\u65e5\u5fd7",
                    l.staticVars.countdownElem.appendChild(c));
                    (new Image).src = n + encodeURIComponent("`" + a + "`")
                } catch (g) {}
        },
        wsLog: function(a) {
            if ("2" == b.getQuery("arkdebug"))
                try {
                    this.s || 
                    (this.s = new m(l.config.WS_URL)),
                    this.s.addLog(a)
                } catch (k) {
                    console.log(k)
                }
        },
        debug: function(a, k, c) {
            c = c || " ";
            if (!0 == l.config.DEBUG || b.getQuery("arkdebug"))
                "object" == typeof a ? (k && (console.log("%c" + k, "color:#f0d"),
                this.wsLog(k)),
                this.wsLog(a),
                console.dir(a)) : a == h ? console.log("\u6570\u636e\u7a7a" + c) : (this.wsLog(a),
                console.log(a + c))
        },
        json: function(a) {
            return "string" === typeof a ? JSON && JSON.parse ? JSON.parse(a) : eval("(" + a + ")") : JSON.stringify(a)
        },
        resoSid: function(a) {
            var b = "";
            "string" === typeof a && (a = a.split(",")[0],
            a = a.split("|"),
            b = 3 == a.length ? a[1] : 1 < a.length ? a[1] : a[0]);
            return b
        },
        getQuery: function(a, b) {
            var c = b || location.search;
            return 0 < c.length && -1 != c.indexOf("?") ? (c = c.match(new RegExp(a + "=([^&]*)","i"))) && 0 < c.length ? unescape(c[1]) : null  : null 
        },
        easyClone: function(a, b) {
            for (var c in b)
                b.hasOwnProperty(c) && "object" !== typeof b[c] && (a[c] = b[c])
        },
        arkMapper: function(a) {
            if ("string" == typeof a && (a = parseInt(a),
            isNaN(a)))
                return 531;
            if (this.isMStation && (r.iPhone || r.iPod)) {
                var b = l.config.M_ARK_MAPPER[a];
                if (b)
                    return b
            }
            return l.config.ARK_Mapper[a] || 
            (this.isMStation ? 532 : 531)
        },
        removeElem: function(a) {
            if (a)
                return a.remove ? a.remove() : a.parentNode && a.parentNode.removeChild && a.parentNode.removeChild(a)
        },
        el: function(a, b) {
            var c = b ? p(a).find(b)[0] : p(a)[0];
            c || (c = {
                setAttribute: function() {},
                style: {},
                isnull: !0
            });
            return c
        },
        existEl: function(a) {
            return a && !a.isnull ? a instanceof Array ? 0 < a.length : !0 : !1
        },
        getAslbUrl: function(a, k) {
            var c, e;
            k.result = k.result || [];
            if (a instanceof Array) {
                if (e = a.shift())
                    0 <= e.url.indexOf(l.config.ASLB_DOMAIN) ? c = r.iPhone || r.iPod || r.iPad ? e.url + 
                    "&tss=ios&format=1&jsonp=?" : e.url + "&format=1&jsonp=?" : (k.result.push(e),
                    b.getAslbUrl(a, k));
                else
                    return k(k.result);
                c !== h && q.getJSON(c, function(c) {
                    if (!1 == /mp4|m3u8/.test(c.location)) {
                        debugger ;e.ryCount = p.retryCount;
                        e.costTime = p.responseTime;
                        e.err = 474;
                        l.sendEvent(l.config.SEND_EVENT_TYPE.OnASLB, {
                            curAD: e,
                            curIndex: e.curIdx
                        });
                        l.collectError("474,format error," + b.json(e), 3)
                    } else
                        e.rUrl = e.url,
                        e.url = c.location,
                        e.ryCount = p.retryCount,
                        e.costTime = p.responseTime,
                        k.result.push(e),
                        l.sendEvent(l.config.SEND_EVENT_TYPE.OnASLB, 
                        {
                            curAD: e,
                            curIndex: e.curIdx
                        });
                    b.getAslbUrl(a, k)
                }
                , function(c) {
                    e.ryCount = p.retryCount;
                    e.costTime = p.responseTime;
                    e.err = 473;
                    k.result.push(e);
                    l.sendEvent(l.config.SEND_EVENT_TYPE.OnASLB, {
                        curAD: e,
                        curIndex: e.curIdx
                    });
                    l.collectError("473,aslb error," + b.json(e), 3);
                    b.getAslbUrl(a, k)
                }
                )
            } else {
                if (0 > c.indexOf(l.config.ASLB_DOMAIN))
                    return k([]);
                q.getJSON(a + "&format=1&jsonp=?", function(a) {
                    return k([a.location])
                }
                , function(a) {
                    return k([])
                }
                )
            }
        },
        loadCss: function(a) {
            var b = d.head || d.getElementsByTagName("head")[0] || d.documentElement
              , 
            c = d.createElement("style");
            c.setAttribute("type", "text/css");
            c.innerHTML = a;
            b.appendChild(c)
        },
        getDeviceSize: s,
        canBeClicked: u,
        isUC: r.uc,
        isMStation: !1
    }
      , l = {
        dynamicVars: {
            retry: 0,
            adidQueue: [],
            isFirst: !0,
            hasPlayed: !1
        },
        staticVars: {
            arkId: 531,
            countdownElem: null 
        },
        putinVars: {},
        config: {
            AD_STYLE: {
                pre_roll: "2",
                standard: "3",
                pause: "6"
            },
            SEND_EVENT_TYPE: {
                OnStart: "AD_PLAY",
                OnComplate: "AD_ENDED",
                OnClick: "AD_CLICK",
                OnAcComplate: "AC_COMPLATE",
                OnError: "AD_ERROR",
                OnPause: "AD_PAUSE",
                OnASLB: "AD_ASLB",
                OnLoginAc: "loginCb"
            },
            CALL_PLAYER_TYPE: {
                playAD: "playAD",
                stopAD: "stopAD",
                pauseAD: "pauseAD",
                resumeAD: "resumeAD",
                getRealTime: "getCurrTime",
                getPlayerSize: "getVideoRect",
                doLogin: "login",
                pingback: "pingback"
            },
            PROCESS_EVENT_TICKS: [{
                k: "firstQuartile",
                v: 0.25
            }, {
                k: "midpoint",
                v: 0.5
            }, {
                k: "thirdQuartile",
                v: 0.75
            }],
            crc_table: [61888, 62024, 21822, 44648, 51027, 25193, 39449, 32749, 45072, 19780, 27911, 40640, 22412, 47959, 2033, 15647, 26948, 7977, 333, 52810, 2229, 28457, 56115, 3222, 7819, 8261, 37040, 26479, 46017, 37654, 52255, 36436, 49642, 26018, 41611, 57969, 22529, 40087, 25454, 12785, 50531, 1739, 4421, 
            44187, 14573, 60124, 48843, 50551, 63571, 18928, 9702, 31935, 37924, 53689, 43138, 29106, 22299, 17913, 22765, 17733, 13233, 54102, 63095, 54790, 45315, 4283, 52320, 21487, 24719, 23499, 25688, 43296, 18522, 46226, 54051, 23750, 63855, 40050, 23830, 13909, 53473, 35269, 6541, 59749, 45495, 7225, 26512, 17657, 28777, 4159, 17208, 50565, 48334, 33575, 10897, 26141, 42425, 51911, 4632, 28267, 27030, 57778, 15356, 31158, 14774, 53522, 27342, 33231, 29241, 52365, 12102, 5400, 40637, 7989, 51774, 31639, 1064, 46043, 38691, 42315, 25171, 2606, 94, 25879, 50273, 48389, 61059, 63334, 38144, 
            34805, 17489, 9758, 21488, 31104, 40127, 47832, 19575, 8379, 62899, 64770, 6327, 15962, 35087, 34E3, 41978, 50244, 40758, 57390, 20080, 51537, 61759, 31722, 57084, 25726, 3693, 42772, 41971, 46086, 30626, 46885, 37383, 847, 38119, 23229, 59572, 58742, 40006, 20034, 62943, 57283, 50816, 54485, 36496, 28963, 5481, 23375, 51432, 3135, 18675, 20557, 968, 55963, 47914, 45119, 25284, 1646, 34994, 1493, 10573, 32670, 64131, 45013, 56896, 57534, 26361, 47505, 26941, 31536, 886, 43364, 32112, 18014, 13600, 60378, 12717, 60596, 9862, 56041, 44055, 39986, 37168, 28168, 55209, 30733, 5480, 6034, 
            17485, 56710, 63417, 33557, 9848, 39651, 64250, 14639, 63835, 38963, 7906, 39909, 7971, 10158, 40564, 25844, 3305, 50258, 28353, 42316, 44088, 44477, 1500, 42481, 45659, 44289, 10989, 54239, 19915, 42407, 19391, 1463, 50295, 60742, 8528, 50215, 445, 89, 39965, 42071],
            ARK_Mapper: {
                531: "531",
                532: "532",
                92: "92"
            },
            M_ARK_MAPPER: {
                531: "531",
                532: "532",
                92: "92"
            },
            H5_ADPLAYER_VER: "aps_h5_2.0.13",
            COUNTDOWN_IMG_URL: "http://i2.letvimg.com/img/201310/21/numbers.png",
            ARK_DOMAIN: "ark.letv.com",
            ASLB_DOMAIN: "g3.letv",
            ARK_SHOW_URL: "http://ark.letv.com/s?res=jsonp",
            ARK_PREVIEW_URL: "http://ark.letv.com/p?res=jsonp",
            DC_AD_URL: "http://dc.letv.com/va/?",
            SKIP_AD_CLICK: "http://dc.letv.com/s/?k=sumtmp;H5PADQad",
            SKIP_AD_SUCC: "http://dc.letv.com/s/?k=sumtmp;H5PADQadfc",
            REQ_ARK_TIMEOUT: 5E3,
            DOWNLOAD_URL_TIMEOUT: 1E4,
            WS_URL: "ws://10.58.88.69:8080",
            CSS_TEMPLATE: ".aps_countdown_cont{position:absolute;border-radius:10px 0;top:10px;right:10px;display:block;padding:5px 10px;background:rgba(49,37,37,0.8);z-index:12} .precdImg{float:left;width:12px;height:20px;overflow:hidden;}.vdo_post_time,.vdo_post_detail{position:absolute;height:40px;border:1px solid #262626;text-align:center;line-height:40px;font-size:16px;z-index:13;}.vdo_post_time{right:40px;top:20px;color:#ccc;}.vdo_post_rlt{position:relative;width:100%;height:40px}.vdo_time_bg,.vdo_detail_bg{position:absolute;width:100%;height:40px;left:0;top:0;background-color:#000;opacity:0.7}.vdo_time_info,.vdo_detail_info{padding:0 10px;position:relative}.vdo_detail_info{padding:0 20px}.vdo_time_info span{color:#09adfe;padding:9px 5px 0 0;float:left}.vdo_time_info a{color:#cccccc;margin-left:3px;text-decoration: none;}.vdo_post_detail{left:40px;bottom:20px}.vdo_post_detail a,.vdo_post_detail a:hover{color:#ccc;display:block;width:100%;height:40px;text-decoration: none;}.vdo_post_detail i{background:url(http://i3.letvimg.com/img/201404/15/1052/rightLink.png) no-repeat left top;width:14px;height:24px;float:right;margin:8px 0 0 10px}.hv_box_mb .vdo_post_time,.hv_box_live_mb .vdo_post_time{right:10px;top:10px;}.hv_box_mb .vdo_post_detail,.hv_box_live_mb .vdo_post_detail{left:10px;bottom:10px}.hv_box_mb .vdo_post_time,.hv_box_mb .vdo_post_detail,.hv_box_live_mb .vdo_post_time,.hv_box_live_mb .vdo_post_detail{height:30px;line-height:30px;font-size:13px}.hv_box_mb .vdo_post_rlt,.hv_box_mb .vdo_time_bg,.hv_box_mb .vdo_detail_bg,.hv_box_mb .vdo_post_detail a,.hv_box_mb .vdo_post_detail,.hv_box_live_mb .vdo_post_rlt,.hv_box_live_mb .vdo_time_bg,.hv_box_live_mb .vdo_detail_bg,.hv_box_live_mb .vdo_post_detail a,.hv_box_live_mb .vdo_post_detail a:hover{height:30px}.hv_box_mb .vdo_detail_info,.hv_box_live_mb .vdo_detail_info{padding:0 10px}.hv_box_mb .vdo_post_detail i,.hv_box_live_mb .vdo_post_detail i{width:7px;height:12px;background-size:100%;margin:8px 0 0 5px}.hv_box_mb .vdo_time_info span,.hv_box_live_mb .vdo_time_info span{color:#09adfe;padding:4px 0px 0 0;float:left}.aps_mask_cont{position: absolute;width: 100%;height: 100%;top: 0px;left: 0px;z-index: 12;}.aps_pop_poster{width:100%;height:100%;position:absolute;top:0;left:0;z-index:150;}.vdo_send_log{position:absolute;top:80px;height:100px;right:10px;font-size:30px;z-index:30}.hv_pop_poster{position:absolute;top:50%;left:50%;margin:-112px 0 0 -182px; width:365px;height:225px;overflow:hidden;background-color:#f1f1f1;}.hv_pop_poster p{text-align:center;margin-bottom:12px}.hv_pop_poster p.hv_p1{padding-top:48px}.hv_pop_poster a{display:inline-block;height:40px;width:224px;line-height:40px;background-color:#f7f7f7;font-size:15px;color:#7e7e7e;border:1px solid #d1d1d1}.hv_pop_poster a.blu{background-color:#00a0e9;color:#ffffff;border:1px solid #00a0e9}.hv_pop_poster a.close{width:20px;height:20px;display:block;position:absolute;top:10px;right:10px;border:none;background:none}.hv_pop_poster a.close i{display:block;width:18px;height:2px;position:absolute;top:6px;left:0;background:#737373;transform:rotate(-45deg);-ms-transform:rotate(-45deg);   -moz-transform:rotate(-45deg);  -webkit-transform:rotate(-45deg);-o-transform:rotate(-45deg)}.hv_pop_poster a.close i.i_1{transform:rotate(45deg);-ms-transform:rotate(45deg);  -moz-transform:rotate(45deg);   -webkit-transform:rotate(45deg);-o-transform:rotate(45deg)}.hv_pop_poster .hv_org{color:#fd6c01}.hv_ico_pasued, .hv_ico_loading {position: absolute;top: 50%;left: 50%;margin: -55px 0 0 -55px;width: 110px;height: 110px;overflow: hidden;z-index: 100;background: url(http://i3.letvimg.com/img/201403/24/hv_ico.png) no-repeat -140px 0;}",
            DEBUG: !1,
            ArkDebug: !1
        },
        adQueue: [],
        loadCss: function() {
            b.loadCss(this.config.CSS_TEMPLATE)
        },
        prepareImages: function(a, b) {
            var c = new Image;
            c.src = a;
            "undefined" != typeof b && (c.complete ? b(c.width, c.height) : c.onload = function() {
                b(c.width, c.height);
                c.onload = null 
            }
            )
        },
        destory: function(a) {
            try {
                a.closeCountDown(),
                this.callback2Player = null ,
                this.putinVars = {},
                this.dynamicVars = {
                    retry: 0,
                    adidQueue: [],
                    isFirst: !0,
                    hasPlayed: !1
                },
                this.adQueue = [],
                this.playingMonitorCount = 0,
                this.playAdTimer && 0 < this.playAdTimer.length && clearTimeout(this.playAdTimer[a.curIndex]),
                clearTimeout(this.downMaterialTimer),
                clearTimeout(this.arkTimer),
                clearTimeout(this.playingMonitor),
                clearInterval(a.processTimer),
                clearInterval(a.countdownTimer)
            } catch (b) {}
        },
        openApp: function(a, b) {
            var c = "letvclient://msiteAction?actionType=0&pid=" + encodeURIComponent(a) + "&vid=" + encodeURIComponent(b) + "&from=mletv";
            setTimeout(function() {
                if (r.Android) {
                    var a = d.createElement("iframe");
                    a.style.cssText = "width:0px;height:0px;position:fixed;top:0;left:0;";
                    a.src = c;
                    d.body.appendChild(a)
                } else
                    location.href = c;
                setTimeout(function() {}
                , 
                1500)
            }
            , 100)
        },
        initAD: function(a, k) {
            var c = this;
            f.curAd && c.destory(f.curAd);
            c.loadCss();
            c.prepareImages(c.config.COUNTDOWN_IMG_URL);
            b.debug(a, "\u4f20\u8fc7\u6765\u7684\u503c\uff1a");
            var e = c.config
              , n = e.SEND_EVENT_TYPE
              , g = e.CALL_PLAYER_TYPE;
            a && k ? (c.callback2Player = function() {
                try {
                    return k.apply(c, arguments)
                } catch (a) {
                    c.collectError("497&err=" + (a || {}).stack, 3)
                }
            }
            ,
            c.putinVars = a) : (a = c.putinVars,
            k = c.callback2Player);
            if (c.putinVars && c.putinVars.gdur) {
                var d = parseInt(c.putinVars.gdur) || 0;
                c.putinVars.vid = 60 >= d ? 19999997 : 
                300 >= d ? 19999998 : 19999999
            }
            if (r.isLetv)
                c.sendEvent(n.OnAcComplate, {
                    atype: "2",
                    curAD: {},
                    curIndex: -1,
                    ia: 0
                }),
                c.callback2Player.call(c, g.stopAD);
            else if (c.startTime = q.now(),
            a.isvip)
                c.callback2Player.call(c, g.stopAD),
                c.sendEvent(n.OnAcComplate, {
                    atype: "2",
                    curAD: {},
                    curIndex: -1,
                    ia: a.isvip
                }),
                "MPlayer" != a.pname && c.sendEvent(n.OnAcComplate, {
                    atype: "3",
                    curAD: {},
                    curIndex: -1,
                    ia: a.isvip
                }),
                c.tips("tips", "\u60a8\u6b63\u4eab\u53d7\u4e50\u89c6\u4f1a\u5458\u53bb\u5e7f\u544a\u670d\u52a1");
            else if (a.isTrylook)
                c.callback2Player.call(c, 
                g.stopAD),
                c.sendEvent(n.OnAcComplate, {
                    atype: "2",
                    curAD: {},
                    curIndex: -1,
                    ia: 3
                }),
                "MPlayer" != a.pname && c.sendEvent(n.OnAcComplate, {
                    atype: "3",
                    curAD: {},
                    curIndex: -1,
                    ia: 3
                }),
                c.tips("tips", "\u8bd5\u770b\u670d\u52a1");
            else if ("baidullq" == b.getQuery("ref") && 0 <= navigator.userAgent.indexOf("baidubrowser"))
                c.callback2Player.call(c, g.stopAD),
                c.sendEvent(n.OnAcComplate, {
                    atype: "2",
                    curAD: {},
                    curIndex: -1,
                    ia: 10
                }),
                c.tips("tips", "\u767e\u5ea6\u6e20\u9053\u7981\u64ad");
            else {
                "MPlayer" == a.pname ? (b.isMStation = !0,
                c.adStyle = a.style || 
                e.AD_STYLE.pre_roll) : c.adStyle = a.style || [e.AD_STYLE.pre_roll, e.AD_STYLE.standard];
                try {
                    c.staticVars.countdownElem = b.el("#" + c.putinVars.cont, "div")
                } catch (h) {
                    l.callback2Player.call(c, g.stopAD, []);
                    c.sendEvent(n.OnAcComplate, {
                        error: {
                            code: 22
                        }
                    });
                    return
                }
                g = c.putinVars.ark ? c.putinVars.ark : "__ADINFO__" in window && __ADINFO__.arkId ? __ADINFO__.arkId : c.putinVars.streamid ? "!" : "531";
                c.staticVars.arkId = b.arkMapper(g);
                c.arkTimer = setTimeout(function() {
                    b.debug("\u8bf7\u6c42ark\u8d85\u65f6,\u64ad\u653e\u6b63\u7247");
                    c.sendEvent(n.OnAcComplate, 
                    {
                        error: {
                            code: 451
                        }
                    });
                    l.callback2Player.call(l, e.CALL_PLAYER_TYPE.stopAD, [])
                }
                , e.REQ_ARK_TIMEOUT);
                c.getArkData(c.adStyle, c.staticVars.arkId, c.putinVars.vid, c.putinVars.streamid)
            }
        },
        getArkData: function(a, k, c, e) {
            var n = this, g = n.config, d = g.SEND_EVENT_TYPE, f = n.dynamicVars, l;
            a instanceof Array && (a = a.join(","));
            c = {
                ark: k,
                n: f.isFirst ? 1 : 0,
                ct: a,
                vid: c || 0
            };
            "undefined" != typeof e && (e = b.resoSid(e),
            l = b.isMStation ? r.iPhone || r.iPod ? "471" : "335" : "148",
            b.easyClone(c, {
                sid: e,
                vid: "19999999",
                b: "2",
                ark: l
            }),
            n.staticVars.arkId = l);
            if (e = {
                coop_yinliu: 393,
                coop_yinliu1: 394,
                coop_yinliu2: 395,
                coop_yinliu3: 396
            }[b.getQuery("q2")])
                c.ark = n.staticVars.arkId = e;
            var h = [this.config.ARK_SHOW_URL, b.param(c), "j=?"].join("&");
            e = {
                r: b.getQuery("r"),
                o: b.getQuery("o"),
                d: b.getQuery("d"),
                w: b.getQuery("w"),
                x: b.getQuery("x"),
                y: b.getQuery("y"),
                z: b.getQuery("z")
            };
            f.isFirst = !1;
            e.w && e.x && e.y && e.z && (h = [this.config.ARK_PREVIEW_URL, b.param(c), b.param(e), "j=?"].join("&"));
            e = null ;
            b.debug("\u8bf7\u6c42ARK\u5730\u5740:" + h);
            q.getJSON(h, function(c) {
                try {
                    n._resolveData.call(n, 
                    c, a, h, k)
                } catch (e) {
                    n.callback2Player(g.CALL_PLAYER_TYPE.playAD, []),
                    n.sendEvent(d.OnAcComplate, {
                        error: {
                            code: 453
                        }
                    }),
                    b.debug(e, "\u89e3\u6790\u5f02\u5e38\uff1a")
                }
                clearTimeout(n.arkTimer)
            }
            , function(a) {
                n.sendEvent(d.OnAcComplate, {
                    error: {
                        code: 450
                    }
                });
                n.callback2Player(g.CALL_PLAYER_TYPE.stopAD, []);
                clearTimeout(n.arkTimer)
            }
            , g.REQ_ARK_TIMEOUT)
        },
        tips: function(a, k, c) {
            switch (a) {
            case "tips":
                b.debug(k)
            }
        },
        _resolveData: function(a, k, c, e) {
            var n = this
              , g = n.config;
            k = "-";
            if (a && a.vast) {
                c = a.vast;
                a = c.Ad.length;
                b.easyClone(n.staticVars, 
                c);
                n.dynamicVars.preAdCount = 0;
                n.dynamicVars.staAdCount = 0;
                b.debug("\u8fd4\u56de\u5e7f\u544a\u6570\uff1a" + a);
                n.adQueue = [];
                n.dynamicVars.dur_total = 0;
                n.dynamicVars.dur = [];
                for (e = 0; e < a; e++) {
                    var d = c.Ad[e]
                      , l = d.InLine
                      , h = d.cuepoint_type
                      , m = l.Creatives.Creative[0]
                      , p = {};
                    1 === a && this.adStyle instanceof Array && (h == g.AD_STYLE.pre_roll ? this.adStyle.pop() : h == g.AD_STYLE.standard && this.adStyle.shift());
                    b.easyClone(p, d);
                    d = new f(m.Linear.AdParameters,m.Linear.VideoClicks.ClickThrough,m.Linear.VideoClicks.ClickTracking,
                    m.Linear.TrackingEvents.Tracking,l.Impression,p.order_item_id,p.order_id,m.Linear.Duration,h,m.Linear.adzone_id,e,d.lc);
                    n.adQueue.push(d);
                    p.duration = d.duration;
                    h == g.AD_STYLE.pre_roll ? (n.dynamicVars.dur.push(p.duration),
                    n.dynamicVars.dur_total += p.duration,
                    n.dynamicVars.preAdCount++,
                    n.dynamicVars.adidQueue.push(p.order_item_id)) : h == g.AD_STYLE.standard && (n.dynamicVars.staAdCount++,
                    n.dynamicVars.stadur = p.duration,
                    k = p.order_item_id)
                }
                b.getAslbUrl(n.adQueue, function(a) {
                    b.debug(a, "\u8fd4\u56deASLB\u2014Data:");
                    n.callback2Player.call(n, g.CALL_PLAYER_TYPE.playAD, a);
                    n.downMaterialTimer = q.now()
                }
                );
                n.sendEvent(g.SEND_EVENT_TYPE.OnAcComplate, {
                    atype: "2",
                    ct: n.dynamicVars.preAdCount
                });
                !1 === b.isMStation && n.sendEvent(g.SEND_EVENT_TYPE.OnAcComplate, {
                    atype: "3",
                    ct: n.dynamicVars.staAdCount,
                    dur: n.dynamicVars.stadur || "0",
                    oiid: k
                })
            } else
                n.callback2Player.call(n, g.CALL_PLAYER_TYPE.playAD, []),
                n.sendEvent(g.EVENT_TYPE.OnAcComplate, {
                    error: {
                        code: 453
                    }
                })
        },
        retry: function(a) {},
        _getUniqueId: function() {
            var a = Math;
            return "ad_" + Array.prototype.join.call(arguments, 
            "_") + String(a.ceil(1E4 * a.random()))
        },
        sendEvent: function(a, k) {
            var c = l;
            try {
                var e = c.config
                  , d = e.SEND_EVENT_TYPE
                  , g = k.curAD;
                if (g || a == d.OnAcComplate)
                    switch (a) {
                    case d.OnAcComplate:
                        c._sendUserLog(0, k);
                        b.debug("AC\u7ed3\u675f");
                        break;
                    case d.OnStart:
                        if ("0" == c.dynamicVars.dur_total)
                            break;
                        !1 === c.dynamicVars.hasPlayed && (c._sendUserLog(1, k),
                        c._sendArkTracking(1, k),
                        g.sendEvent("start", c._sendArkTracking));
                        0 == c.callback2Player.call(c, e.CALL_PLAYER_TYPE.getRealTime) && (c.playingMonitorCount = c.playingMonitorCount || 0,
                        c.playingMonitor && clearTimeout(c.playingMonitor),
                        c.playingMonitor = setTimeout(function() {
                            ++c.playingMonitorCount;
                            5 < c.playingMonitorCount ? c.playingMonitorCount = null  : 0 == c.callback2Player.call(c, e.CALL_PLAYER_TYPE.getRealTime) && c.callback2Player.call(c, e.CALL_PLAYER_TYPE.resumeAD)
                        }
                        , 2E3));
                        c.dynamicVars.hasPlayed = !0;
                        g.adType == e.AD_STYLE.pre_roll ? (g.seeDetail(),
                        g.closeBigPlay(),
                        g.renderRealCd(c.dynamicVars.dur_total, k, c.dynamicVars.dur),
                        c.playAdTimer = c.playAdTimer || [],
                        clearTimeout(c.playAdTimer[k.curIndex]),
                        c.playAdTimer[k.curIndex] = setTimeout(function() {
                            b.debug(k.curIndex + " \u5e7f\u544a\u64ad\u653e\u8d85\u65f6");
                            q.merge(k, {
                                error: {
                                    code: 461
                                }
                            });
                            c._sendUserLog(1, k);
                            c.callback2Player.call(c, e.CALL_PLAYER_TYPE.stopAD);
                            g.closeCountDown()
                        }
                        , 1E3 * g.duration + e.DOWNLOAD_URL_TIMEOUT)) : g.adType == e.AD_STYLE.standard && (g.seeDetail(),
                        g.closeBigPlay(),
                        c.playAdTimer = c.playAdTimer || [],
                        clearTimeout(c.playAdTimer[k.curIndex]),
                        c.playAdTimer[k.curIndex] = setTimeout(function() {
                            b.debug(k.curIndex + " \u5e7f\u544a\u64ad\u653e\u8d85\u65f6");
                            q.merge(k, {
                                error: {
                                    code: 461
                                }
                            });
                            c._sendUserLog(1, k);
                            c.callback2Player.call(c, e.CALL_PLAYER_TYPE.stopAD);
                            g.closeSeeDetail()
                        }
                        , 1E3 * g.duration + e.DOWNLOAD_URL_TIMEOUT));
                        b.debug(k.curIndex + " \u5f00\u59cb\u64ad\u653e\u5e7f\u544a");
                        break;
                    case d.OnComplate:
                        g.adType == e.AD_STYLE.pre_roll ? (g.closeSeeDetail(),
                        g.closeBigPlay(k),
                        k.curIndex + 1 == c.dynamicVars.preAdCount ? g.closeCountDown() : g.pauseCountDown()) : g.adType == e.AD_STYLE.standard && g.closeCountDown();
                        clearTimeout(c.playAdTimer[k.curIndex]);
                        c._sendUserLog(3, k);
                        g.sendEvent("complete", c._sendArkTracking);
                        b.debug(k.curIndex + "\u6bb5\u5e7f\u544a\u64ad\u653e\u5b8c\u6210");
                        c.dynamicVars.hasPlayed = !1;
                        break;
                    case d.OnPause:
                        c.playingMonitor && clearTimeout(c.playingMonitor);
                        l.playAdTimer && 0 < l.playAdTimer.length && clearTimeout(l.playAdTimer[k.curIndex]);
                        g.pauseCountDown();
                        g.renderBigPlay(k);
                        b.debug(k.curIndex + " \u6682\u505c");
                        break;
                    case d.OnError:
                        c._sendUserLog(1, k);
                        if (g.adType == e.AD_STYLE.pre_roll) {
                            clearTimeout(c.playAdTimer[k.curIndex]);
                            for (d = 0; d < k.curIndex; d++)
                                ;
                            g.closeCountDown()
                        }
                        b.debug(k.error, 
                        k.curIndex + " \u64ad\u653e\u5668\u9047\u5230\u9519\u8bef\uff0c\u56de\u8c03");
                        c.dynamicVars.hasPlayed = !1;
                        break;
                    case d.OnASLB:
                        c._sendUserLog(5, k);
                        break;
                    case d.OnLoginAc:
                        g.loginAc(k.level)
                    }
                else {
                    debugger ;c.collectError("1827&err=itemIsNull&type=" + a + "&lc=" + c.putinVars.lc, 3)
                }
            } catch (f) {
                console.log(f),
                c.collectError("974," + (f || {}).stack, 3)
            }
        },
        _sendUserLog: function(a, k) {
            k = k || {};
            var c = l
              , e = c.config
              , f = c.putinVars
              , g = c.dynamicVars
              , h = Math;
            g.dur || q.merge(g, {
                dur: ["-"],
                dur_total: "-",
                adCount: 0
            });
            _adItem = k.curAD || {};
            g = 
            {
                act: "event",
                atype: k.atype || _adItem.adType,
                id: "-",
                ia: 0,
                err: 0,
                lc: f.lc || "-",
                ver: "2.0",
                aps: e.H5_ADPLAYER_VER,
                ch: f.ch,
                cid: f.cid || "-",
                ct: k.ct || 0,
                dur: k.dur || g.dur.join("_") || "0",
                dur_total: k.dur || g.dur_total || "0",
                mmsid: f.mmsid || "-",
                pid: f.pid || "-",
                r: h.ceil(h.random() * q.now()),
                cur_url: encodeURIComponent(location.href),
                ry: g.retry || 0,
                ref: encodeURIComponent(d.referrer) || "-",
                sys: 1,
                uname: f.uname || "-",
                uid: f.uid || "-",
                py: f.up,
                uuid: f.uuid,
                pv: f.ver,
                vid: f.vid || "-",
                vlen: f.gdur || "-",
                p1: f.p1,
                p2: f.p2,
                ontime: "-",
                p3: f.p3 == 
                f.p3 ? "-" : f.p3,
                ty: f.islive ? 1 : 0
            };
            switch (a) {
            case 0:
                g.act = "ac";
                g.ry = p.retryCount;
                f.isvip && (g.ia = k.isvip || "1",
                g.ry = "0");
                k.error && (g.err = k.error.code);
                g.ut = p.responseTime;
                "3" == g.atype && (g.atype = "13");
                g.oiid = k.oiid || c.dynamicVars.adidQueue.join("_") || "-";
                c._sendData(c.config.DC_AD_URL + b.param(g));
                break;
            case 1:
                g.ut = q.now() - c.downMaterialTimer;
                c.lastCostTime = g.ut;
                if (k.error) {
                    switch (k.error.code) {
                    case 1:
                        g.err = 460;
                        break;
                    case 2:
                        g.err = 461;
                        break;
                    case 3:
                        g.err = 463;
                        break;
                    case 4:
                        g.err = 469;
                        break;
                    default:
                        g.err = k.error.code || 
                        0
                    }
                    g.loc = encodeURIComponent(_adItem.url)
                }
                g.dur = _adItem.duration;
                g.ftype = "video";
                g.id = a;
                g.ry = 1;
                g.atype = _adItem.adType;
                g.ord = (parseInt(_adItem.curIdx) || 0) + 1;
                0 < g.ct && g.ord > g.ct && (g.ord = 1,
                c.collectError("1129&data=" + g.ord + "&idx=" + _adItem.curIndex + "&lc=" + c.putinVars.lc, 3));
                g.atype == e.AD_STYLE.standard ? (g.dur_total = g.dur,
                g.ord = 1,
                g.ct = c.dynamicVars.staAdCount) : g.ct = c.dynamicVars.preAdCount;
                "3" == g.atype && (g.atype = "13");
                g.oiid = _adItem.oid || c.dynamicVars.adidQueue[k.curIndex];
                c._sendData(c.config.DC_AD_URL + 
                b.param(g));
                break;
            case 2:
            case 3:
                g.dur = _adItem.duration;
                g.ut = q.now() - c.downMaterialTimer - c.lastCostTime;
                g.ftype = "video";
                g.id = a;
                g.atype = _adItem.adType;
                g.ord = (parseInt(_adItem.curIdx) || 0) + 1;
                0 < g.ct && g.ord > g.ct && (g.ord = 1,
                c.collectError("1129&data=" + g.ord + "&idx=" + _adItem.curIndex + "&lc=" + c.putinVars.lc, 3));
                g.atype == e.AD_STYLE.standard ? (g.dur_total = g.dur,
                g.ord = 1,
                g.ct = c.dynamicVars.staAdCount) : g.ct = c.dynamicVars.preAdCount;
                "3" == g.atype && (g.atype = "13");
                g.oiid = _adItem.oid || c.dynamicVars.adidQueue[_adItem.curIdx];
                c._sendData(c.config.DC_AD_URL + b.param(g));
                3 == a && (c.downMaterialTimer = q.now());
                break;
            case 5:
                b.debug("ASLB\u7ed3\u675f"),
                _adItem.err && (g.loc = encodeURIComponent(_adItem.url),
                g.err = _adItem.err),
                g.act = "aslb",
                g.ut = _adItem.costTime,
                g.ry = _adItem.ryCount,
                g.atype = _adItem.adType,
                g.ord = (parseInt(_adItem.curIdx) || 0) + 1,
                0 < g.ct && g.ord > g.ct && (g.ord = 1),
                g.atype == e.AD_STYLE.standard && (g.ord = 1,
                c.collectError("1129&data=" + g.ord + "&idx=" + _adItem.curIndex + "&lc=" + c.putinVars.lc, 3)),
                g.oiid = _adItem.oid || c.dynamicVars.adidQueue[_adItem.curIdx],
                delete g.ct,
                delete g.dur,
                delete g.dur_total,
                delete g.ia,
                "3" == g.atype && (g.atype = "13"),
                c._sendData(c.config.DC_AD_URL + b.param(g))
            }
        },
        _getCtUrl: function(a, b) {
            return this._getAttachParam(a.clickUrl, a.aduid, b || 2, 1, a)
        },
        _getAdStyle: function(a) {
            return this.adStyle ? this.adStyle instanceof Array && this.adStyle.length - 1 >= a ? this.adStyle[a] : this.adStyle : null 
        },
        _sendArkTracking: function(a, b, c) {
            var e = []
              , d = b ? b.curAD : {};
            switch (a) {
            case 1:
                e = d.impression;
                for (b = 0; b < e.length; b++)
                    c = "",
                    "object" == typeof e[b] ? e[b].cdata && 0 < e[b].cdata.length && 
                    (c = e[b].cdata) : c = e[b],
                    this._sendData(this._getAttachParam, c, d.aduid, a, 1, d);
                break;
            case 2:
                e = d.tracking;
                for (b = 0; b < e.length; b++)
                    c = "",
                    "object" == typeof e[b] ? e[b].cdata && 0 < e[b].cdata.length && (c = e[b].cdata) : c = e[b],
                    this._sendData(this._getAttachParam, c, d.aduid, 3, 1, d);
                break;
            case 4:
                if (e = b,
                d = c,
                e && 0 < e.length)
                    for (b = 0; b < e.length; b++)
                        this._sendData(this._getAttachParam, e[b], d.aduid, a, 1, d)
            }
        },
        _getAttachParam: function(a, k, c, e, d) {
            var g = l;
            if (!a || "javascript:void(0)" === a)
                return "javascript:void(0)";
            if (-1 < a.indexOf(g.config.ARK_DOMAIN)) {
                var f = 
                (new Date).getTime()
                  , m = g.staticVars
                  , p = g.putinVars;
                e = {
                    rt: c,
                    oid: d.oid,
                    im: e === h ? 1 : e,
                    t: m.stime + Math.ceil((f - g.startTime) / 1E3),
                    data: [k, m.area_id, m.arkId || 0, p.uuid, d.orderid, p.vid || "", p.pid || "", p.cid || "", d.lc || "1", d.adType || "2", g.putinVars.ch || "letv", b.resoSid(g.putinVars.streamid) || ""].join()
                };
                e.s = g._getSecurityKey(e);
                2 == c ? (-1 < a.indexOf("[randnum]") && (a = a.replace("[randnum]", (new Date).getTime())),
                -1 < a.indexOf("[M_IESID]") && (a = a.replace("[M_IESID]", "LETV_" + k)),
                -1 < a.indexOf("[M_ADIP]") && (a = a.replace("[M_ADIP]", 
                g.staticVars.ip)),
                -1 < a.indexOf("[A_ADIP]") && (a = a.replace("[A_ADIP]", g.staticVars.ip)),
                a = a.split("&u="),
                a = [a[0], b.param(e), "u=" + a[1]].join("&")) : a += "&" + b.param(e)
            } else
                -1 < a.indexOf("[randnum]") && (a = a.replace("[randnum]", (new Date).getTime())),
                -1 < a.indexOf("[M_IESID]") && (a = a.replace("[M_IESID]", "LETV_" + k)),
                -1 < a.indexOf("[M_ADIP]") && (a = a.replace("[M_ADIP]", g.staticVars.ip)),
                -1 < a.indexOf("http://v.admaster.com.cn") && (a = a + ",f" + g.staticVars.ip);
            return a
        },
        _getSecurityKey: function(a) {
            var b = this.config.crc_table, 
            c = 0, e = 0, d = 0, g = "", f = "", l;
            for (l in a)
                f += a[l];
            g = f.length;
            for (c = 0; c < g; c++)
                a = f.charCodeAt(c),
                d = b[e & 15 | (a & 15) << 4],
                e = e >> 4 ^ d,
                d = b[e & 15 | a & 240],
                e = e >> 4 ^ d;
            return e.toString(16)
        },
        _sendData: function(a) {
            var d = a;
            "function" == typeof arguments[0] && (d = arguments[0].apply(this, [].slice.call(arguments, 1)));
            if (d && "" != d) {
                var c = q.createElement("img", {
                    src: d
                });
                b.debug("\u53d1\u8d77url : " + d);
                p(c).on("load", function() {
                    c = null 
                }
                )
            }
        },
        collectError: function(a, b) {
            b = b || 2;
            0 == Math.floor(100 * Math.random()) % b && (a && "object" == typeof a ? (new Image).src = 
            "http://ark.letv.com/apsdbg/?msg=" + encodeURI(a.stack) : (new Image).src = "http://ark.letv.com/apsdbg/?msg=" + encodeURI(a))
        }
    };
    f.prototype = {
        resolveAdParam: function(a) {
            a = b.json(a);
            this.url = a.hdurl && 0 < a.hdurl.length && 960 < b.getDeviceSize.x && 640 < b.getDeviceSize.y ? a.hdurl : a.url;
            if ("1" === a.sg || a.sg === h || !1 === b.isMStation)
                this.renderCd = !0;
            a.duration && (this.duration = parseInt(a.duration));
            this.pid = a.pid || 0;
            this.vid = a.vid || 0
        },
        initEvent: function() {
            var a = l.config.PROCESS_EVENT_TICKS, b, c, e;
            this.progressTicks = [];
            if (this.event && 
            0 < this.event.length)
                for (c = 0; c < this.event.length; c++)
                    if (b = this.event[c],
                    b.offset != h)
                        this.progressTicks.push(b.offset);
                    else
                        for (e = 0; e < a.length; e++)
                            b.event == a[e].k && (this.event[c].event = "progress",
                            this.event[c].offset = this.duration * a[e].v || 0,
                            this.progressTicks.push(this.event[c].offset));
            f.curAd = this
        },
        sendEvent: function(a, d, c) {
            try {
                var e = this.getTrackArr(a, c);
                d.call(l, 4, e, this)
            } catch (f) {
                b.debug("\u8fdb\u5ea6\u76d1\u6d4b\u51fa\u9519" + f.stack)
            }
        },
        getTrackArr: function(a, b) {
            var c, e = [];
            if (this.event && 0 < this.event.length)
                for (c = 
                0; c < this.event.length; c++)
                    this.event[c].event == a && (b != h ? b == this.event[c].offset && (e.push(this.event[c].cdata),
                    this.event[c].event = "hadSent") : (e.push(this.event[c].cdata),
                    this.event[c].event = "hadSent"));
            return e
        },
        renderRealCd: function(a, d, c) {
            var e = this, f, g, h = 0, m = Math, r = l, s = b.el("#div_cdown"), u = a, w;
            0 < e.progressTicks.length ? (clearInterval(e.processTimer),
            e.processTimer = setInterval(function() {
                w = r.callback2Player(r.config.CALL_PLAYER_TYPE.getRealTime) || 0;
                for (var a = 0; a < e.progressTicks.length; a++)
                    if (1 >= 
                    m.abs(e.progressTicks[a] - w)) {
                        b.debug("\u8fdb\u5ea6\u76d1\u6d4b\uff1aoffset:" + e.progressTicks[a] + ",curTime:" + w + "," + a);
                        e.sendEvent("progress", r._sendArkTracking, e.progressTicks[a]);
                        e.progressTicks.splice(a, 1);
                        0 == e.progressTicks.length && clearInterval(e.processTimer);
                        break
                    }
            }
            , 1E3)) : clearInterval(e.processTimer);
            if (b.canBeClicked)
                if (!0 != e.renderCd)
                    b.removeElem(b.el("#vdo_post_time"));
                else {
                    for (f = e.curIdx; 0 <= f; f--)
                        u -= c[f];
                    var y = function(a, b, c) {
                        for (f = 0; f < e.curIdx; f++)
                            a -= c[f];
                        h = r.callback2Player(r.config.CALL_PLAYER_TYPE.getRealTime) || 
                        0;
                        return a -= m.ceil(h)
                    }
                    ;
                    g = y.apply(this, arguments);
                    var A = function(a) {
                        a = a.toString();
                        var b = "", c;
                        for (c = 0; c < a.length; c++)
                            b += '<em id="cd_' + String(c) + '" class="precdImg" style="' + (2 > a.length ? "float:right;" : "") + "background-image:url(" + l.config.COUNTDOWN_IMG_URL + ");background-position:0 " + 20 * -parseInt(a.charAt(c)) + 'px;background-repeat: no-repeat;"></em>';
                        return b
                    }
                    ;
                    if (b.existEl(s))
                        s = b.el("#div_cdown");
                    else {
                        var s = q.createElement("div", {
                            className: "vdo_post_time",
                            id: "vdo_post_time"
                        })
                          , v = "";
                        b.isMStation && (v = "");
                        s.innerHTML = ['<div class="vdo_post_rlt"><div class="vdo_time_bg"></div>', '<div class="vdo_time_info"><span id="div_cdown"></span>' + v + "</div>", "</div>"].join("");
                        r.staticVars.countdownElem.appendChild(s);
                        p("#vdo_skip_pre").on("click", function() {
                            e.skipAd()
                        }
                        );
                        p("#div_cdown")[0].innerHTML = A(g)
                    }
                    clearInterval(e.countdownTimer);
                    e.countdownTimer = setInterval(function() {
                        var g = y(a, d, c);
                        if (0 > g)
                            e.closeCountDown();
                        else if (g < u)
                            e.pauseCountDown();
                        else {
                            var g = g.toString()
                              , l = a.toString().length - g.length;
                            f = 0;
                            if (0 < l)
                                for (f = 
                                0; f < l; f++)
                                    b.el("#cd_" + String(f)).style.backgroundPosition = "0 -200px";
                            for (j = g.length - 1; 0 <= j; j--) {
                                var l = 20 * parseInt(g.charAt(j))
                                  , h = b.el("#cd_" + String(j + f));
                                if (b.existEl(h))
                                    h.style.backgroundPosition = "0 " + -l + "px";
                                else {
                                    clearInterval(e.countdownTimer);
                                    clearInterval(e.processTimer);
                                    break
                                }
                            }
                        }
                    }
                    , 500)
                }
        },
        renderBigPlay: function(a) {
            if (b.canBeClicked) {
                var d = this
                  , c = l.staticVars.countdownElem
                  , e = b.el("#btn_a_resume");
                b.existEl(e) && b.removeElem(e);
                e = q.createElement("div", {
                    id: "btn_a_resume",
                    className: "hv_ico_pasued"
                });
                e.style.display = "block";
                c.appendChild(e);
                p(e).on("click", function(b) {
                    b.stopPropagation();
                    b.cancelBubble = !0;
                    d.closeBigPlay(a);
                    l.callback2Player(l.config.CALL_PLAYER_TYPE.resumeAD)
                }
                )
            }
        },
        seeDetail: function() {
            if (b.canBeClicked) {
                var a = this
                  , d = b.el("#a_see_detail")
                  , c = b.el("#a_see_more")
                  , e = l.staticVars.countdownElem
                  , f = b.el(".hv_ico_pasued")
                  , g = l._getCtUrl(a, 2);
                b.existEl(c) ? (b.el("#a_see_detail").setAttribute("href", g),
                b.el("#a_see_more").setAttribute("href", g)) : (d = q.createElement("a", {
                    target: "_blank",
                    href: g,
                    id: "a_see_detail",
                    className: "aps_mask_cont"
                }),
                c = q.createElement("div", {
                    className: "vdo_post_detail"
                }),
                c.innerHTML = ['<div class="vdo_post_rlt"> <div class="vdo_detail_bg"></div>', '<div class="vdo_detail_info"><a id="a_see_more" href="' + g + '" target="_blank">\u4e86\u89e3\u8be6\u60c5<i></i></a></div>', "</div>"].join(""),
                b.existEl(f) ? (b.isUC || e.insertBefore(d, f),
                e.insertBefore(c, f)) : (b.isUC || e.appendChild(d),
                e.appendChild(c)),
                e = function(c) {
                    c.stopPropagation();
                    c.cancelBubble = !0;
                    !1 !== l.dynamicVars.hasPlayed && 
                    (g = l._getCtUrl(a, 2),
                    b.el("#a_see_detail").setAttribute("href", g),
                    b.el("#a_see_more").setAttribute("href", g),
                    l.callback2Player(l.config.CALL_PLAYER_TYPE.pauseAD),
                    l._sendUserLog(2, {
                        curAD: a,
                        curIndex: 0
                    }),
                    l._sendArkTracking(2, {
                        curAD: a,
                        curIndex: 0
                    }),
                    a.pid && a.vid && a.openInApp(a.pid, a.vid))
                }
                ,
                p(d).on("click", e),
                p(c).on("click", e))
            }
        },
        openInApp: function(a, b, c) {
            a = "letvclient://msiteAction?actionType=0&pid=" + encodeURIComponent(a) + "&vid=" + encodeURIComponent(b) + "&from=mletv";
            r.Android ? (b = d.createElement("iframe"),
            b.style.cssText = "width:0px;height:0px;position:fixed;top:0;left:0;",
            b.src = a,
            d.body.appendChild(b)) : location.href = a
        },
        closeSeeDetail: function() {
            if (b.canBeClicked) {
                var a = b.el("#a_see_detail")
                  , d = b.el(".vdo_post_detail");
                b.existEl(a) && b.removeElem(a);
                b.existEl(d) && b.removeElem(d)
            }
        },
        closeBigPlay: function(a) {
            b.canBeClicked && (a = b.el("#btn_a_resume"),
            b.existEl(a) && b.removeElem(a))
        },
        closeCountDown: function() {
            if (b.canBeClicked) {
                clearInterval(this.countdownTimer);
                clearInterval(this.processTimer);
                var a = b.el("#vdo_post_time");
                b.existEl(a) && (this.pauseCountDown(),
                b.removeElem(a));
                this.closeBigPlay();
                this.closeSeeDetail()
            }
        },
        pauseCountDown: function() {
            b.canBeClicked && (clearInterval(this.countdownTimer),
            clearInterval(this.processTimer))
        },
        skipAd: function() {
            var a = l, d = a.config, c = d.CALL_PLAYER_TYPE, e = a.callback2Player, f = a.staticVars.countdownElem, g;
            g = b.el(".aps_pop_poster");
            e.call(a, c.pauseAD);
            b.existEl(g) || (g = q.createElement("div", {
                className: "aps_pop_poster",
                id: "aps_login"
            }),
            g.innerHTML = '<div class="hv_pop_poster"><p class="hv_p1">\u5982\u679c\u60a8\u5df2\u662f\u4f1a\u5458\uff0c\u8bf7\u767b\u5f55</p><p><a href="javascript:;" id="aps_login_button">\u767b\u5f55</a></p><p>\u770b\u5927\u7247\u65e0\u5e7f\u544a\uff0c<span class="hv_org">7\u5929</span>\u4f1a\u5458\u514d\u8d39\u4f53\u9a8c</p><p><a href="http://yuanxian.letv.com/zt2014/7days/index.shtml?ref=H5PADQad" target="_blank" class="blu">\u7acb\u5373\u9886\u53d6</a></p><a href="javascript:;" id="aps_login_close" class="close"><i></i><i class="i_1"></i></a></div>',
            f.appendChild(g),
            a._sendData(d.SKIP_AD_CLICK),
            p("#aps_login_button").on("click", function(a) {
                e(c.doLogin)
            }
            ),
            p("#aps_login_close").on("click", function(d) {
                e.call(a, c.resumeAD);
                b.removeElem(b.el("#aps_login"))
            }
            ));
            b.debug("\u70b9\u51fb\u8df3\u8fc7\u5e7f\u544a")
        },
        loginAc: function(a) {
            var d = l
              , c = d.config
              , e = c.CALL_PLAYER_TYPE
              , f = d.callback2Player;
            a ? (f(e.stopAD),
            this.closeCountDown(),
            d._sendData(c.SKIP_AD_SUCC)) : f(e.resumeAD);
            b.debug("\u767b\u5f55\u5b8c\u6210\uff0c\u8fd4\u56delevel\uff1a" + a);
            b.removeElem(p(".aps_pop_poster")[0])
        }
    };
    m.prototype = {
        open: function() {
            var a = this;
            a.support ? (ws = new WebSocket(a.target),
            ws.onopen = function(b) {
                a.onopen.apply(a, arguments)
            }
            ,
            ws.onmessage = function(b) {
                a.onmessage.apply(a, arguments)
            }
            ,
            ws.onerror = function(b) {
                a.onerror.apply(a, arguments)
            }
            ,
            ws.onclose = function() {
                a.onclose.apply(a, arguments)
            }
            ,
            a.socket = ws) : alert("your br not support ws");
            a.soldier()
        },
        addLog: function(a) {
            this.mq.push({
                time: +new Date,
                data: a
            })
        },
        send: function(a, b) {
            this.socket.send("[" + b + "]," + a)
        },
        sendHttp: function(a, d) {
            b.sendLogs(a, d)
        },
        close: function() {
            this.support && 
            this.socket.close()
        },
        onopen: function(a) {
            this.ready = !0;
            console.log("onopen:");
            console.log(arguments)
        },
        onmessage: function(a) {
            var b = ""
              , c = f.curAd
              , e = l.callback2Player
              , d = l.config.CALL_PLAYER_TYPE;
            if (a.data)
                switch (b = a.data.split(":")[1].replace("\r", "").replace("\n", ""),
                b) {
                case "connect":
                case "connected":
                    break;
                case "closecd":
                    c.closeCountDown();
                    break;
                case "closedetail":
                    c.closeSeeDetail();
                    break;
                case "requestad":
                    l.initAD();
                    break;
                case "refresh":
                    location.reload();
                    break;
                case "stopad":
                    c.closeCountDown();
                    e(d.stopAD);
                    break;
                case "resumead":
                    e(d.resumeAD);
                    break;
                case "pausead":
                    e(d.pauseAD);
                    break;
                default:
                    this.send("error command!")
                }
        },
        onerror: function() {
            alert("ws:error:");
            this.ready = !1
        },
        onclose: function() {
            alert("ws:close:");
            this.ready = !1
        },
        soldier: function() {
            var a = this, d = 0, c;
            a.mqTimer = setInterval(function() {
                var e, f;
                for (c = a.support && a.ready && a.socket ? a.send : a.sendHttp; e = a.mq.shift(); )
                    f = e.data,
                    "string" !== typeof f && (f = b.json(f)),
                    c.call(a, f, e.time);
                16 < ++d && 0 == a.mq.length && (b.debug("ws: soldier time out!"),
                clearInterval(a.mqTimer))
            }
            , 
            2E3)
        }
    };
    window.H5AD = l
}
(document, void 0);
(function(d, h, f) {
    var m = {}
      , r = -1
      , p = {
        publish: function(d, f) {
            if (!m[d])
                return !1;
            setTimeout(function() {
                for (var h = m[d], b = h ? h.length : 0; b--; )
                    h[b].func(d, f)
            }
            , 0);
            return !0
        },
        subscribe: function(d, f) {
            m[d] || (m[d] = []);
            var h = (++r).toString();
            m[d].push({
                token: h,
                func: f
            });
            return h
        },
        unsubscribe: function(d) {
            for (var f in m)
                if (m[f])
                    for (var h = 0, b = m[f].length; h < b; h++)
                        if (m[f][h].token === d)
                            return m[f].splice(h, 1),
                            d;
            return !1
        }
    };
    getPubSubz = function() {
        return p
    }
    ;
    d.bcloudnH5PlayerPubsubz = getPubSubz()
}
)(this, this.document);
function EventType() {}
EventType.startPlayTrueMovie = "start_Play_True_Movie";
var DataCenter = function() {
    function d() {
        var d = {
            isvip: 0,
            up: 0,
            isTrylook: !1,
            ver: 10,
            p1: 3,
            p2: 31,
            cid: 78
        }
          , h = 0
          , r = 0;
        return {
            setAdInitData_cont: function(h) {
                d.cont = h
            },
            setAdInitData_isvip: function(h) {
                d.isvip = h
            },
            setAdInitData_up: function(h) {
                d.up = h
            },
            setAdInitData_isTrylook: function(h) {
                d.isTrylook = h
            },
            setAdInitData_ver: function(h) {
                d.ver = h
            },
            setAdInitData_uuid: function(h) {
                d.uuid = h
            },
            setAdInitData_lc: function(h) {
                d.lc = h
            },
            setAdInitData_islive: function(h) {
                d.islive = h
            },
            setAdInitData_p1: function(h) {
                d.p1 = h
            },
            setAdInitData_p2: function(h) {
                d.p2 = 
                h
            },
            setAdInitData_p3: function(h) {
                d.p3 = h
            },
            setAdInitData_cid: function(h) {
                d.cid = h
            },
            setAdInitData_vid: function(h) {
                d.vid = h
            },
            setAdInitData_mmsid: function(h) {
                d.mmsid = h
            },
            setAdInitData_gdur: function(h) {
                d.gdur = h
            },
            setAdInitData_ark: function(h) {
                d.ark = h
            },
            getAdInitData: function() {
                return d
            },
            setPlugin_crtVideoID: function(d) {
                h = d
            },
            getPlugin_crtVideoID: function() {
                return h
            },
            setPlugin_SwitchingRate: function(d) {
                r = d
            },
            getPlugin_SwitchingRate: function() {
                return r
            }
        }
    }
    var h;
    return {
        getInstance: function() {
            h || (h = d());
            return h
        }
    }
}
();
function Reportor() {
    var d = Util.getUUID()
      , h = Util.getLC()
      , f = [];
    return {
        timer: null ,
        timeChunkQueue: [],
        playStartTime: 0,
        actStartTime: 0,
        firstPlay: !0,
        videoInfo: {
            vid: "",
            vlen: 0,
            ch: "",
            ap: 1
        },
        video: null ,
        isPlayingBefore: !1,
        isEndedBefore: !0,
        turnOnPlayingStatus: function() {
            this.isPlayingBefore = !0
        },
        turnOffPlayingStatus: function() {
            this.isPlayingBefore = !1
        },
        turnOffFirstPlaystatus: function() {
            this.firstPlay = !1
        },
        turnOnEndStatus: function() {
            this.isEndedBefore = !0
        },
        turnOffEndStatus: function() {
            this.isEndedBefore = !1
        },
        emptyChunkQueue: function() {
            this.timeChunkQueue = 
            []
        },
        init: function() {
            var d = this;
            this.timer = new Util.Timer(18E4,function() {
                d.sendTimeAction()
            }
            )
        },
        startTimer: function() {
            var d = this
              , h = setTimeout(function() {
                console.log("\u76f8\u969415\u79d2\u4e0a\u62a5\u4e00\u6b21");
                d.sendTimeAction()
            }
            , 15E3);
            f.push(h);
            h = setTimeout(function() {
                console.log("\u76f8\u969460\u79d2\u4e0a\u62a5\u4e00\u6b21");
                d.sendTimeAction()
            }
            , 75E3);
            f.push(h);
            h = setTimeout(function() {
                console.log("\u76f8\u9694180\u79d2\u4e0a\u62a5\u4e00\u6b21");
                d.sendTimeAction();
                d.timer.start()
            }
            , 255E3);
            f.push(h)
        },
        stopTimer: function() {
            null  != this.timer && this.timer.stop();
            for (var d = 0, h = f.length; d < h; d++)
                clearTimeout(f[d])
        },
        startTiming: function() {
            this.timer.startTiming()
        },
        stopTiming: function() {
            this.timer.stopTiming()
        },
        setTimeChunkPaused: function() {
            this.setTimeChunk();
            this.turnOffPlayingStatus()
        },
        setTimeChunk: function() {
            this.video && !this.video.paused && (this.isPlayingBefore = !0);
            if (this.isPlayingBefore) {
                var d = this.timer.stopTiming().getTimeM();
                this.timeChunkQueue.push(d)
            }
            this.startTiming()
        },
        initVideoInfo: function(d, 
        f) {
            var h = d.data.video_info
              , q = h.default_play;
            f.rate && h.media[f.rate] && (q = f.rate);
            var s = d.data.video_info;
            this.videoInfo = {
                vid: s.video_id,
                vlen: s.video_duration,
                ch: "bcloud_" + s.user_id,
                ap: f.autoplay,
                vt: h.media[q].play_url.vtype
            }
        },
        getVideoLenM: function() {
            return Math.round(this.videoInfo.vlen / 60)
        },
        getPlayTimeAHeartBeat: function() {
            this.setTimeChunk();
            for (var d = this.timeChunkQueue, f = d.length, h = 0, q = 0; q < f; q++)
                h += d[q];
            this.emptyChunkQueue();
            return Math.round(h / 1E3)
        },
        countStartPlayTime: function() {
            this.timer.startPlayTimeFun()
        },
        sendPlay: function() {
            this.sendPlayAction({
                ac: "play",
                pt: 0,
                err: 0,
                tc: 1
            })
        },
        sendPlayAction: function(f) {
            var r = this.videoInfo;
            f = Util.extend({
                ver: "2.0",
                p1: 3,
                p2: 31,
                p3: Util.getCrtOS(),
                uid: "-",
                auid: "-",
                cid: 100,
                pid: "-",
                pv: "H5Vod2.3",
                py: "-",
                url: Util.getBroswerUrl(),
                vid: r.vid,
                vlen: r.vlen,
                ch: r.ch,
                ap: r.ap,
                uuid: d,
                lc: h,
                ry: 0,
                ty: 0,
                ref: "-",
                st: "_",
                ilu: "_",
                weid: "_",
                r: Math.round(1E5 + 1E5 * Math.random())
            }, f);
            Util.send("http://apple.www.letv.com/cloud_pl/?" + Util.addParams(f));
            return this
        },
        sendEnvInfo: function(f) {
            f = Util.extend({
                p1: 3,
                p2: 31,
                p3: Util.getCrtOS(),
                ip: "-",
                mac: "-",
                os: Util.getOS(),
                app: "2.1",
                lc: h,
                uuid: d,
                r: Math.round(1E5 + 1E5 * Math.random())
            }, f);
            Util.send("http://apple.www.letv.com/env/?" + Util.addParams(f))
        },
        sendDragAction: function() {
            this.sendPlayAction({
                ac: "drag",
                pt: 0,
                err: 0,
                ut: 0
            })
        },
        sendFinishAction: function() {
            this.stopTimer();
            this.sendTimeAction();
            this.sendPlayAction({
                ac: "finish",
                pt: 0,
                err: 0,
                ut: 0
            });
            this.turnOnEndStatus()
        },
        sendEndAction: function() {
            this.sendPlayAction({
                ac: "end",
                pt: 0,
                err: 0,
                ut: 0
            })
        },
        sendTimeAction: function() {
            this.sendPlayAction({
                ac: "time",
                pt: this.getPlayTimeAHeartBeat(),
                err: 0,
                ut: 0
            })
        },
        sendBlockAction: function() {
            var d = this.timer.blockTimeStop();
            this.sendPlayAction({
                ac: "block",
                bt: 0,
                err: 0,
                ut: d
            })
        },
        sendWaitingAction: function() {
            this.video && this.timer.blockTimeStart()
        },
        sendErrMessage: function(f) {
            f = Util.extend({
                ver: "2.0",
                p1: 3,
                p2: 31,
                p3: Util.getCrtOS(),
                uid: "-",
                auid: "-",
                cid: 100,
                pid: "-",
                pv: "2.2",
                py: "-",
                url: Util.getBroswerUrl(),
                vid: videoInfo.vid,
                vlen: videoInfo.vlen,
                ch: videoInfo.ch,
                ap: videoInfo.ap,
                uuid: d,
                lc: h,
                ry: 0,
                ty: 0,
                ref: "-",
                st: "_",
                ilu: "_",
                weid: "_",
                r: Math.round(1E5 + 1E5 * Math.random())
            }, f);
            Util.send("http://apple.www.letv.com/er/?" + Util.addParams(f))
        }
    }
}
function getCrtOS() {
    var d = navigator.userAgent;
    return {
        ios: !!d.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: -1 < d.indexOf("Android") || -1 < d.indexOf("Linux")
    }
}
function initAdModule(d, h, f) {
    function m(a) {
        e && H5AD.sendEvent(a, {
            curAD: e,
            curIndex: n
        })
    }
    function r() {
        x.forEach(function(a) {
            l.addEventListener ? l.addEventListener(a, function(a) {
                return function() {
                    p(a)
                }
            }
            (a)) : l.attachEvent && l.attachEvent(a, function(a) {
                return function() {
                    p(a)
                }
            }
            (a))
        }
        )
    }
    function p(a) {
        switch (a) {
        case "play":
            g < c.length && m("AD_PLAY");
            break;
        case "pause":
            g < c.length && m("AD_PAUSE");
            break;
        case "ended":
            g += 1;
            g == c.length ? (m("AD_ENDED"),
            s(),
            l.removeAttribute("src"),
            bcloudnH5PlayerPubsubz.publish(EventType.startPlayTrueMovie)) : 
            g < c.length && (m("AD_ENDED"),
            q(++n));
            break;
        case "error":
            g < c.length ? (q(n),
            m("AD_ERROR", {
                error: l.error
            })) : bcloudnH5PlayerPubsubz.publish(EventType.startPlayTrueMovie)
        }
    }
    function q(a) {
        c && 0 != c.length ? a < c.length && (e = c[a],
        l.setAttribute("src", e.url),
        l.play()) : c && 0 == c.length && bcloudnH5PlayerPubsubz.publish(EventType.startPlayTrueMovie)
    }
    function s() {
        x.forEach(function(a) {
            l.removeEventListener ? l.removeEventListener(a, function(a) {
                return function() {
                    p(a)
                }
            }
            (a)) : l.detachEvent && l.detachEvent(a, function(a) {
                return function() {
                    p(a)
                }
            }
            (a))
        }
        )
    }
    function u() {
        getCrtOS.ios ? DataCenter.getInstance().setAdInitData_p3(311) : getCrtOS.android ? DataCenter.getInstance().setAdInitData_p3(312) : DataCenter.getInstance().setAdInitData_p3(310);
        var a = DataCenter.getInstance().getAdInitData();
        H5AD.initAD(a, b)
    }
    function b(a, b) {
        try {
            switch (console.log(a),
            a) {
            case "login":
                console.log("\u8df3\u8fc7\u5e7f\u544a");
                break;
            case "playAD":
                c = b;
                q(0);
                console.log("\u5f00\u59cb\u64ad\u653e");
                break;
            case "stopAD":
                console.log("\u505c\u6b62\u64ad\u653e");
                bcloudnH5PlayerPubsubz.publish(EventType.startPlayTrueMovie);
                break;
            case "resumeAD":
                console.log("\u7ee7\u7eed\u64ad\u653e");
                l.play();
                break;
            case "pauseAD":
                console.log("\u6682\u505c\u64ad\u653e");
                l.pause();
                break;
            case "getCurrTime":
                return l.currentTime || 0;
            case "getVideoRect":
                return {
                    w: l.offsetWidth,
                    h: l.offsetHeight
                }
            }
        } catch (d) {
            alert(d)
        }
    }
    var l = d
      , a = f.data.video_info;
    d = a.video_id;
    var k = a.media_id, a = a.video_duration, c = [], e, n = 0, g = 0;
    f = f.data.user_info.ark;
    var x = "progress error play playing ended pause".split(" ");
    DataCenter.getInstance().setAdInitData_cont(h.parentId);
    DataCenter.getInstance().setAdInitData_ver(l.VERSION);
    DataCenter.getInstance().setAdInitData_uuid(Util.getUUID());
    DataCenter.getInstance().setAdInitData_lc(Util.getLC());
    DataCenter.getInstance().setAdInitData_vid(d);
    DataCenter.getInstance().setAdInitData_mmsid(k);
    DataCenter.getInstance().setAdInitData_gdur(a);
    DataCenter.getInstance().setAdInitData_ark(f);
    "undefined" != typeof H5AD && "function" == typeof H5AD.initAD ? (u(),
    r()) : bcloudnH5PlayerPubsubz.publish(EventType.startPlayTrueMovie)
}
(function() {
    function d(b) {
        b = window.document.getElementsByTagName("script");
        b = b[b.length - 1];
        b.getAttribute("depend");
        b = b.getAttribute("data");
        var d = null ;
        b && (b = eval("(" + b + ")"),
        d = {
            w: Util.checkParam(b.width),
            h: Util.checkParam(b.height),
            vu: b.vu,
            uu: b.uu,
            autoplay: b.auto_play,
            version: 10,
            swf: null ,
            flashvars: Util.paramstr(b),
            parentId: "playerbox" + ("" + Math.random()).split(".")[1]
        },
        void 0 != b.payer_name && (d.payer_name = b.payer_name),
        void 0 != b.check_code && (d.check_code = b.check_code),
        void 0 != b.callback && (d.callback = 
        b.callback),
        void 0 != b.type && (d.type = b.type),
        void 0 != b.rate && (d.rate = b.rate),
        void 0 != b.letvad && (d.letvad = b.letvad),
        void 0 != b.ark && (d.ark = b.ark));
        return d
    }
    function h(b, d, a) {
        function h(g) {
            if (g.code) {
                if (m = m.replace(m.match(/http:\/\/([^\/]+)\//i)[1], e[c++]),
                GUELib.GetJSON(m, d, h),
                c == e.length) {
                    a.stopTiming();
                    a.timer.getTimeM();
                    a.sendPlayAction({
                        ac: "init",
                        err: 192
                    });
                    if (b.callback)
                        window[b.callback](null );
                    // GUELib.Video.setup(b.parentId, [], b.w, b.h);
                    // 此处的playObj.videoElId为视频虽在元素id
                    GUELib.Video.setup(playObj.videoElId, [], b.w, b.h);
                    return p("\u64ad\u653e\u5931\u8d25\u4e86\uff0c\u4e0d\u5982\u5237\u65b0\u4e00\u4e0b\u8bd5\u8bd5", 
                    g.code)
                }
            } else
                Util.backData = g,
                f(a, b, g)
        }
        var c = 0
          , e = ["111.206.211.221", "106.39.244.239"]
          , m = b.url;
        GUELib.GetJSON(b.url, d, h)
    }
    function f(b, d, a) {
        function f() {
            bcloudnH5PlayerPubsubz.unsubscribe(s);
            b.initVideoInfo(a, d);
            b.sendPlayAction({
                ac: "init",
                pt: 0,
                err: 0,
                ut: 0
            });
            t.video.addEventListener("seeking", function() {
                b.setTimeChunkPaused()
            }
            , !1);
            t.video.addEventListener("pause", function() {
                b.setTimeChunkPaused()
            }
            , !1);
            t.video.addEventListener("ended", function() {
                b.sendFinishAction()
            }
            , !1);
            t.video.addEventListener("canplay", 
            function() {
                b.sendBlockAction()
            }
            , !1);
            t.video.addEventListener("waiting", function() {
                b.sendWaitingAction()
            }
            , !1);
            t.video.addEventListener("error", function(a) {
                p("\u64ad\u653e\u5931\u8d25\u4e86\uff0c\u4e0d\u5982\u5237\u65b0\u4e00\u4e0b\u8bd5\u8bd5", a.code);
                b.sendErrMessage({
                    err: a.code
                })
            }
            , !1);
            t.upDataPlugins({
                event: {
                    playing: function() {
                        b.turnOnPlayingStatus();
                        b.startTiming();
                        b.firstPlay && (b.turnOffFirstPlaystatus(),
                        b.sendPlayAction({
                            ac: "play"
                        }));
                        b.isEndedBefore && (b.emptyChunkQueue(),
                        b.stopTiming(),
                        b.startTimer(),
                        b.turnOffEndStatus())
                    }
                }
            });
            b.video = t.video;
            r = c.media[h].play_url.main_url;
            var e = a.data.play_info && a.data.play_info.init_pic;
            e && t.poster(e);
            e = m(r);
            t.source(e);
            d.callback ? (b.sendPlay(),
            window[d.callback](t.video)) : "0" != d.autoplay ? (t.video.autoplay = "autoplay",
            t.play()) : t.video.autoplay = ""
        }
        var c = a.data.video_info, e = c.default_play, h, g = {
            yuanhua: "yuanhua",
            "super": "1300",
            high: "800",
            low: "350"
        }, q = {
            yuanhua: "yuanhua",
            1300: "super",
            800: "high",
            350: "low"
        }[d.rate];
        q && c.media[q] ? h = q : (d.rate = g[e],
        h = e);
        // var r, s, t = GUELib.Video.setup(d.parentId, 
        // [], d.w, d.h, {}, d.rate);
        // 此处的playObj.videoElId为视频虽在元素id
        var r, s, t = GUELib.Video.setup(playObj.videoElId, 
        [], d.w, d.h, {}, d.rate);
        null  != t.video && (d.hasOwnProperty("letvad") && "0" == d.letvad ? f() : (s = bcloudnH5PlayerPubsubz.subscribe(EventType.startPlayTrueMovie, f),
        initAdModule(t.video, d, a)))
    }
    function m(b) {
        b = BaseCode.decode(b);
        -1 == b.indexOf("uuid=") && (b = -1 == b.indexOf("?") ? b + ("?uuid=" + Util.getUUID()) : b + ("&uuid=" + Util.getUUID()));
        return b
    }
    function r(b) {
        var d = b.w ? b.w + "px" : "100%"
          , a = b.h ? b.h + "px" : "100%";
        b.vu ? s = document.getElementById(b.parentId) : (document.getElementById(playObj.superElId).innerHTML=('<div id="crtErrorArea" style="width:' + d + ";height:" + a + 
        ';margin-right:auto;margin-left:auto;position:relative"></div>'),
        s = document.getElementById("crtErrorArea"));
        s.innerHTML = '<div id="showError" style="width:' + d + ";height:" + a + ';margin-right:auto;margin-left:auto;position:absolute;z-index:1"></div>';
        q = document.getElementById("showError");
        q.style.color = "#dbdbd5";
        q.style.textAlign = "center";
        q.style.fontSize = "2em";
        q.style.backgroundColor = "#454545";
        q.style.display = "none"
    }
    function p(b, d) {
        q.style.display = "";
        q.innerHTML = b + " \u9519\u8bef\u4ee3\u7801\uff1a" + d;
        var a = 
        q;
        a.innerHTML = "<span>" + a.innerHTML + "</span>";
        var f = a.getElementsByTagName("span")[0].offsetHeight
          , c = a.offsetHeight - parseInt(u(a, "borderBottomWidth")) - parseInt(u(a, "borderTopWidth"));
        a.style.paddingTop = (c - f) / 2 + "px";
        a.style.height = c - (c - f) / 2 + "px"
    }
    var q, s, u = function(b, d) {
        return b.currentStyle ? b.currentStyle[d] : document.defaultView.getComputedStyle(b, null )[d]
    }
    ;
    Query = GUELib.Query;
    Query.initQuery();
    (function() {
        var b = Util.trim(Query.get("skip"))
          , d = Util.trim(Query.get("page_url"));
        "fenxiang" == b && "" != d && (window.location.href = 
        unescape(d))
    }
    )();
    (function() {
        var b;
        void 0 == window.domainname ? (b = {
            w: Query.get("width") || 750,
            h: Query.get("height") || 422,
            vu: Query.get("vu"),
            uu: Query.get("uu"),
            pu: Query.get("pu"),
            parentId: "player",
            autoplay: Query.get("auto_play"),
            version: 10,
            swf: null ,
            flashvars: Query.getall("string")
        },
        Query.get("payer_name") && (b.payer_name = Query.get("payer_name")),
        Query.get("check_code") && (b.check_code = Query.get("check_code")),
        Query.get("rate") && (b.rate = Query.get("rate")),
        Query.get("letvad") && (b.letvad = Query.get("letvad")),
        "100%" == b.w && (b.w = 0),
        "100%" == b.h && (b.h = 0),
        Query.get("ark") && (b.ark = Query.get("ark"))) : b = d();
        option = b;
        option.cf = GUELib.Support.ipad || GUELib.Support.ipod || GUELib.Support.iphone ? "html5_ios" : "html5";
        // option.cf = "html5_ios";
        option.url = Util.getHttpsDomain("http://api.letvcloud.com") + "/gpc.php?cf=" + option.cf + "&sign=signxxxxx&ver=2.1&format=jsonp&pver=html5_1.1.1&bver=" + encodeURIComponent(Util.getBrowserVersion()) + "&uuid=" + Util.getUUID();
        option.ark && (option.url += "&ark=" + option.ark);
        b = Util.getHttpsDomain("http://yuntv.letv.com") + 
        "/bcloud.swf";
        if ("undefined" != typeof _user_defined && _user_defined[option.uu]) {
            var f = _user_defined[option.uu][option.pu || "default"];
            f && (b = f)
        }
        option.swf = b;
        DataCenter.getInstance().setPlugin_crtVideoID(option.parentId);
        if ((b = option) && !b.vu)
            r(b),
            p("SDK\u5bf9\u63a5\u53c2\u6570\u4e0d\u6b63\u786e", 1);
        else if (document.getElementById(playObj.superElId).innerHTML=('<div id="' + b.parentId + '" style="width:' + (b.w ? b.w + "px" : "100%") + ";height:" + (b.h ? b.h + "px" : "100%") + ';margin-right:auto;margin-left:auto;position:relative"></div>'),
        r(b),
        b.vu) {
            void 0 == window.ReviveSWF && 
            (ReviveSWF = null );
            var f = GUELib
              , a = !1
              , k = ReviveSWF
              , c = !!document.createElement("video").canPlayType;
              k.flashPlat={mac:true,win:false};
            b.type ? "video" == b.type ? a = !1 : "flash" == b.type && (a = !0) : k.flashPlat.win ? a = -1 < navigator.userAgent.indexOf("WebView") || -1 < navigator.userAgent.indexOf("WPDesktop") ? !1 : !0 : k.flashPlat.mac ? a = !0 : f.Support.linux ? k.swfPlayEnable(10) ? a = !0 : c && (a = !1) : a = !1;
            // b.type ? "video" == b.type ? a = !1 : "flash" == b.type && (a = !0) : k.flashPlat.win ? a = -1 < navigator.userAgent.indexOf("WebView") || -1 < navigator.userAgent.indexOf("WPDesktop") ? !1 : !0 : k.flashPlat.mac ? a = !0 : f.Support.linux ? k.swfPlayEnable(10) ? a = !0 : c && (a = !1) : a = !1;
            "LETV" == Query.get("dbd") && (a = !1);
            window.letvcloud_player_conf && "LETV" == letvcloud_player_conf.dbd && (a = !1);
            a ? ReviveSWF.echo(b.parentId, b) : (f = new Reportor,
            f.init(),
            f.sendEnvInfo({}),
            f.startTiming(),
            a = {
                vu: b.vu,
                uu: b.uu
            },
            "undefined" != typeof b.payer_name && "undefined" != typeof b.check_code && (a = {
                vu: b.vu,
                uu: b.uu,
                payer_name: b.payer_name,
                check_code: b.check_code
            }),
            h(b, a, f))
        } else
            p("SDK\u5bf9\u63a5\u53c2\u6570\u4e0d\u6b63\u786e", 1)
    }
    )()
}
)();
