/**
 See http://casual-effects.com/markdeep for @license and documentation.

 markdeep.min.js version 0.09
 Copyright 2015-2016, Morgan McGuire
 All rights reserved.
 (BSD 2-clause license)

 highlight.min.js 8.8.0 from https://highlightjs.org/
 Copyright 2006, Ivan Sagalaev
 All rights reserved.
 (BSD 3-clause license)
*/
if (markdeepOptions !== undefined) window.markdeepOptions = markdeepOptions

! function() {
    "use strict";

    function e(e, t, r) {
        return "<" + e + (r ? " " + r : "") + ">" + t + "</" + e + ">"
    }

    function t(e) {
        return window.markdeepOptions && void 0 !== window.markdeepOptions[e] ? window.markdeepOptions[e] : void 0 !== S[e] ? S[e] : void 0
    }

    function r(e) {
        return (e + "").rp(/&/g, "&amp;").rp(/</g, "&lt;").rp(/>/g, "&gt;").rp(/"/g, "&quot;")
    }

    function n(e) {
        return e.rp(/&lt;/g, "<").rp(/&gt;/g, ">").rp(/&quot;/g, '"').rp(/&#39;/g, "'").rp(/&ndash;/g, "--").rp(/&mdash;/g, "---").rp(/&amp;/g, "&")
    }

    function i(e) {
        return e.rp(/<.*?>/g, "")
    }

    function a(e) {
        return encodeURI(e.rp(/\s/g, "").toLowerCase())
    }

    function s() {
        for (var t = "", r = 1; 6 >= r; ++r) {
            t += "h" + r + "::before {\ncontent:";
            for (var n = 1; r >= n; ++n) t += "counter(h" + n + ') "' + (r > n ? "." : " ") + '"';
            t += ";\ncounter-increment: h" + r + ";margin-right:10px}"
        }
        return e("style", t)
    }

    function o(e, t) {
        var r = e.innerHTML;
        return r = r.rp(/(?:<style class="fallback">[\s\S]*?<\/style>[\s\S]*)<\/\S+@\S+\.\S+?>/gim, ""), r = r.rp(/<\/h?ttps?:.*>/gi, ""), r = r.rp(/<(https?): (.*?)>/gi, function(e, t, r) {
            var n = "<" + t + "://" + r.rp(/=""\s/g, "/");
            return '=""' === n.ss(n.length - 3) && (n = n.ss(0, n.length - 3)), n = n.rp(/"/g, ""), n + ">"
        }), r = r.rp(/<style class=["']fallback["']>.*?<\/style>/gim, ""), r = n(r)
    }

    function c(e) {
        function t() {
            l = e.indexOf("\n", a) + 1, u = u || /\S/.test(e.ss(a, a + s)), d = d || /\S/.test(e.ss(a + o + 1, l))
        }
        for (var r = {
                g: e,
                h: "",
                j: "",
                m: ""
            }, n = e.indexOf(j); n >= 0; n = e.indexOf(j, n + j.length)) {
            var i, a = L(0, e.lastIndexOf("\n", n)) + 1,
                s = n - a;
            for (i = n + j.length; e[i] === M; ++i);
            var o = i - a - 1,
                c = {
                    g: e.ss(0, a),
                    h: "",
                    j: "center",
                    m: e.ss(a, n).rp(/[ \t]*[ \t]$/, " ")
                },
                l = 0,
                u = !1,
                d = !1;
            t();
            for (var p = !0, h = i; p;) {
                if (a = l, t(), 0 === a) return r;
                if (u ? c.j = "floatright" : d && (c.j = "floatleft"), e[a + s] === M && e[a + o] === M) {
                    for (var f = s; o > f && e[a + f] === M; ++f);
                    var b = a + s,
                        g = a + o;
                    if (c.m += e.ss(h, b).rp(/^[ \t]*[ \t]/, " ").rp(/[ \t][ \t]*$/, " "), f === o) return c.m += e.ss(a + o + 1), c;
                    c.h += e.ss(b + 1, g) + "\n", h = g + 1
                } else p = !1
            }
        }
        return r
    }

    function l(e, t, r, n) {
        var i = t.source,
            a = "[^ \\t\\n" + i + "]",
            s = "(" + i + ")(" + a + ".*?(\\n.+?)*?)" + i + "(?![A-Za-z0-9])";
        return e.rp(RegExp(s, "g"), "<" + r + (n ? " " + n : "") + ">$2</" + r + ">")
    }

    function u(t, r) {
        function n(e) {
            return e.trim().rp(/^\||\|$/g, "")
        }
        var i = /(?:\n\|?[ \t\S]+?(?:\|[ \t\S]+?)+\|?(?=\n))/.source,
            a = /\n\|? *\:?-+\:?(?: *\| *\:?-+\:?)+ *\|?(?=\n)/.source,
            s = /\n[ \t]*\[[^\n\|]+\][ \t]*(?=\n)/.source,
            o = RegExp(i + a + i + "+(" + s + ")?", "g");
        return t = t.rp(o, function(t) {
            var i = t.split("\n"),
                a = "",
                s = "" === i[0] ? 1 : 0,
                o = i[i.length - 1].trim();
            o.length > 3 && "[" === o[0] && "]" === o[o.length - 1] ? (i.pop(), o = o.ss(1, o.length - 1)) : o = void 0;
            var c = [];
            n(i[s + 1]).rp(/:?-+:?/g, function(e) {
                var t = ":" === e[0],
                    n = ":" === e[e.length - 1];
                c.push(r(' style="text-align:' + (t && n ? "center" : n ? "right" : "left") + '"'))
            });
            for (var l = "th", u = s; i.length > u; ++u) {
                var d = n(i[u].trim());
                a += "<tr>";
                var p = 0;
                a += "<" + l + c[0] + ">" + d.rp(/\|/g, function() {
                    return ++p, "</" + l + "><" + l + c[p] + ">"
                }) + "</" + l + ">", a += "</tr>\n", u == s && (++u, l = "td")
            }
            return a = e("table", a, r('class="table"')), o && (a = "<div " + r('class="tablecaption"') + ">" + o + "</div>" + a), a
        })
    }

    function d(e, t) {
        for (var r = /^\s*\n/.source, n = /[:,]\s*\n/.source, i = RegExp("(" + n + "|" + r + ")" + /((?:[ \t]*(?:\d+\.|-|\+|\*)(?:[ \t]+.+\n\n?)+)+)/.source, "gm"), a = !0, s = {
                "+": t('class="plus"'),
                "-": t('class="minus"'),
                "*": t('class="asterisk"')
            }, o = t('class="number"'); a;) a = !1, e = e.rp(i, function(e, t, r) {
            var n = t,
                i = [],
                c = {
                    o: -1
                };
            for (r.split("\n").forEach(function(e) {
                    var t = e.rp(/^\s*/, ""),
                        r = e.length - t.length,
                        l = s[t[0]],
                        u = !!l;
                    l = l || o;
                    var d = /^\d+\.[ \t]/.test(t);
                    if (c)
                        if (d || u) {
                            if (r !== c.o)
                                if (-1 !== c.o && c.o > r)
                                    for (; c && c.o > r;) i.pop(), n += "</li></" + c.tag + ">", c = i[i.length - 1];
                                else c = {
                                    o: r,
                                    tag: d ? "ol" : "ul",
                                    p: e.ss(0, r)
                                }, i.push(c), n += "<" + c.tag + ">";
                            else -1 !== c.o && (n += "</li>");
                            c ? n += "\n" + c.p + "<li " + l + ">" + t.rp(/^(\d+\.|-|\+|\*) /, "") : (n += "\n" + e, a = !0)
                        } else n += "\n" + c.p + e;
                    else n += "\n" + e
                }), c = i.pop(); c; c = i.pop()) n += "</li></" + c.tag + ">\n";
            return n
        });
        return e
    }

    function p(t, r) {
        var n = /^(?:[^\|<>\s-\+\*\d].*[12]\d{3}(?!\d).*?|(?:[12]\d{3}(?!\.).*\d.*?)|(?:\d{1,3}(?!\.).*[12]\d{3}(?!\d).*?))/.source,
            i = "(" + n + "):" + /[ \t]+([^ \t\n].*)\n/.source,
            a = /(?:[ \t]*\n)?((?:[ \t]+.+\n(?:[ \t]*\n){0,3})*)/.source,
            s = i + a,
            o = RegExp(s, "gm"),
            c = r('valign="top"'),
            l = r('style="width:100px;padding-right:15px" rowspan="2"'),
            u = r('style="padding-bottom:25px"'),
            d = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            p = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
            h = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        try {
            var f = 0;
            t = t.rp(RegExp("(" + s + "){2,}", "gm"), function(t) {
                ++f;
                var n = [];
                t.rp(o, function(t, i, a, s) {
                    var o = "",
                        h = "",
                        b = "",
                        g = i.match(/([0123]?\d)\D+([01]?\d|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\D+([12]\d{3})/i);
                    if (g) b = g[1], h = g[2], o = g[3];
                    else if (g = i.match(/([12]\d{3})\D+([01]?\d|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\D+([0123]?\d)/i)) b = g[3], h = g[2], o = g[1];
                    else {
                        if (g = i.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\D+([0123]?\d)\D+([12]\d{3})/i), !g) throw "Could not parse date";
                        b = g[2], h = g[1], o = g[3]
                    }
                    i = b + " " + h + " " + o;
                    var m = parseInt(h) - 1;
                    isNaN(m) && (m = p.indexOf(h.toLowerCase()));
                    var v = new Date(parseInt(o), m, parseInt(b));
                    return i = d[v.getDay()] + "<br/>" + i, n.push({
                        date: v,
                        title: a,
                        text: e("tr", e("td", "<a " + r('name="schedule' + f + "_" + v.getFullYear() + "-" + (v.getMonth() + 1) + "-" + v.getDate() + '"') + "></a>" + i, l) + e("td", e("b", a)), c) + e("tr", e("td", "\n\n" + s, u), c)
                    }), ""
                }), n.sort(function(e, t) {
                    return e.date.getTime() - t.date.getTime()
                });
                var i = 864e5,
                    a = (n[n.length - 1].date.getTime() - n[0].date.getTime()) / i,
                    s = new Date;
                s = new Date(s.getFullYear(), s.getMonth(), s.getDay());
                var b = "";
                if (a > 14 && 16 > a / n.length) {
                    var g = r('colspan="2" width="14%" style="padding-top:5px;text-align:center;font-style:italic"'),
                        m = r('width="1px" height="30px" style="text-align:right;border:1px solid #EEE;border-right:none;"'),
                        v = r('width="1px" height="30px" style="color:#BBB;text-align:right;"'),
                        y = r('width="14%" style="border:1px solid #EEE;border-left:none;"'),
                        x = n[0].date,
                        w = 0;
                    x = new Date(x.getFullYear(), x.getMonth(), 1);
                    for (var N = function(e, t) {
                            return Math.abs(e.getTime() - t.getTime()) < i / 2
                        }; x.getTime() < n[n.length - 1].date.getTime();) {
                        for (b += "<table " + r('class="calendar"') + ">\n" + e("tr", e("th", h[x.getMonth()] + " " + x.getFullYear(), r('colspan="14"'))) + "<tr>", d.forEach(function(t) {
                                b += e("td", t, g)
                            }), b += "</tr>"; 0 !== x.getDay();) x = new Date(x.getTime() - i);
                        if (1 !== x.getDate())
                            for (b += "<tr " + c + ">"; 1 !== x.getDate();) b += "<td " + v + ">" + x.getDate() + "</td><td>&nbsp;</td>", x = new Date(x.getTime() + i);
                        do {
                            0 === x.getDay() && (b += "<tr " + c + ">");
                            var _ = n[w],
                                k = "";
                            N(x, s) && (k = r(' class="today"')), _ && N(_.date, x) ? (b += e("td", e("b", x.getDate()), m + k) + e("td", e("a", _.title, r('href="#schedule' + f + "_" + x.getFullYear() + "-" + (x.getMonth() + 1) + "-" + x.getDate() + '"')), y + k), ++w) : b += "<td " + m + k + "></a>" + x.getDate() + "</td><td " + y + k + "> &nbsp; </td>", 6 === x.getDay() && (b += "</tr>"), x = new Date(x.getTime() + i)
                        } while (x.getDate() > 1);
                        if (0 !== x.getDay()) {
                            for (; 0 !== x.getDay();) b += "<td " + v + ">" + x.getDate() + "</td><td>&nbsp</td>", x = new Date(x.getTime() + i);
                            b += "</tr>"
                        }
                        b += "</table><br/>\n", x = new Date(x.getFullYear(), x.getMonth(), 1)
                    }
                }
                return t = "", n.forEach(function(e) {
                    t += e.text
                }), b + e("table", t, r('class="schedule"')) + "\n\n"
            })
        } catch (b) {}
        return t
    }

    function h(t) {
        var r = /^\w.*\n:/.source,
            n = "(s*\n|[: 	].+\n)+";
        return t = t.rp(RegExp("(" + r + n + ")+", "gm"), function(t) {
            var r = "";
            return t.split("\n").forEach(function(e, t) {
                0 === e.trim().length ? r += "\n" : /\s/.test(e[0]) || ":" === e[0] ? (":" === e[0] && (e = " " + e.ss(1)), r += e + "\n") : (t > 0 && (r += "</dd>"), r += "<dt>\n" + e + "\n</dt>\n<dd>\n\n")
            }), e("dl", r + "</dd>")
        })
    }

    function f(e) {
        var t = "",
            r = "",
            n = [0],
            a = 0,
            s = 0,
            o = {};
        e = e.rp(/<h([1-6])>(.*?)<\/h\1>/gi, function(e, c, l) {
            c = parseInt(c), l = l.trim();
            for (var u = a; c > u; ++u) n[u] = 0;
            n.splice(c, a - c), a = c, ++n[a - 1];
            var d = n.join("."),
                p = "toc" + d;
            return o[i(l).trim().toLowerCase()] = d, 3 >= c && (t += Array(c).join("&nbsp;&nbsp;") + '<a href="#' + p + '">' + d + "&nbsp; " + l + "</a><br/>\n", 1 === c ? r += ' &middot; <a href="#' + p + '">' + l + "</a>" : ++s), '<a name="' + p + '"></a>' + e
        }), r.length > 0 && (r = r.ss(10));
        var c = n[0],
            l = c + s,
            u = "";
        4 > l && 1 >= c || 2048 > e.length || (u = 7 > c && 2.5 > l / c ? '<div class="shortTOC">' + r + "</div>" : '<div class="longTOC"><center><b>Contents</b></center><p>' + t + "</p></div>");
        var d = !1;
        return e = e.rp(/<div class="afterTitles"><\/div>/, function(e) {
            return d = !0, e + u
        }), d || (e = u + e), [e, o]
    }

    function b(e) {
        return e.rp(/([\.\[\]\(\)\*\+\?\^\$\\\{\}\|])/g, "\\$1")
    }

    function g(t, n) {
        function s(e) {
            for (var t = ($.push(e) - 1).toString(C); M > t.length;) t = "0" + t;
            return k + t
        }

        function o(e) {
            var e = parseInt(e.ss(1), C);
            return $[e]
        }

        function g(e, t) {
            return s(t)
        }

        function m(e, t, r) {
            return t + s(r)
        }

        function v(t) {
            return function(r, n) {
                return "\n<a " + s('name="' + a(i(n)) + '"') + "></a>" + e("h" + t, n) + "\n\n"
            }
        }

        function x(e) {
            var t = c(e);
            return t.h ? t.g + y(t.h, t.j) + "\n" + x(t.m) : e
        }
        var w = {},
            N = 0,
            _ = {},
            k = "\ue010",
            C = 36,
            $ = [],
            M = 4,
            j = RegExp(k + "[0-9a-z]{" + M + "," + M + "}", "g");
        void 0 === n && (n = !0), void 0 !== t.innerHTML && (t = t.innerHTML), t = t.rp(/<script\s+type\s*=\s*['"]preformatted['"]\s*>([\s\S]*?)<\/script>/gi, "$1"), t = "\n" + t;
        var E = function(r, n) {
            var i = RegExp("\n" + n + "{3,}.*\n([\\s\\S]+?)\n" + n + "{3,}\n([ 	]*\\[.*\\])?", "g");
            t = t.rp(i, function(t, n, i) {
                var a = "\n";
                return i && (i = i.trim(), a += "<div " + s('class="listingcaption ' + r + '"') + ">" + i.ss(1, i.length - 1) + "</div>\n"), a + s(e("pre", e("code", hljs.highlightAuto(n).value), 'class="listing ' + r + '"')) + "\n"
            })
        };
        E("tilde", "~"), E("backtick", "`"), t = t.rp(/(<code\b.*?<\/code>)/gi, g), t = x(t), t = t.rp(/<svg( .*?)?>([\s\S]*?)<\/svg>/gi, function(e, t, r) {
            return "<svg" + s(t) + ">" + s(r) + "</svg>"
        }), t = t.rp(/(`)(.+?(?:\n.+?)?)`(?!\d)/g, e("code", "$2")), t = t.rp(/(<code(?: .*?)?>)([\s\S]*?)<\/code>/gi, function(e, t, n) {
            return s(t + r(n) + "</code>")
        }), t = t.rp(/(<pre\b[\s\S]*?<\/pre>)/gi, g), t = t.rp(/(\$\$[\s\S]+?\$\$)/g, g), t = t.rp(/(<\w[^ \n<>]*?[ \t]+)(.*?)(?=\/?>)/g, m), t = t.rp(/((?:[^\w\d]))\$([ \t][^\$]+[ \t])\$(?![\w\d])/g, "$1\\($2\\)"), t = t.rp(/((?:[^\w\d]))\$(\S(?:[^\$]*?\S(?!US))??)\$(?![\w\d])/g, "$1\\($2\\)"), t = t.rp(/(?:^|\n)(.+?)\n[ \t]*={3,}[ \t]*\n/g, v(1)), t = t.rp(/(?:^|\n)(.+?)\n[ \t]*-{3,}[ \t]*\n/g, v(2));
        for (var B = 6; B > 0; --B) t = t.rp(RegExp(/^[ \t]*/.source + "#{" + B + "," + B + "}(?:[ 	])([^\n#]+)#*[ 	]*\n", "gm"), v(B));
        t = t.rp(/\n((?:_[ \t]*){3,}|(?:-[ \t]*){3,}|(?:\*[ \t]*){3,})\s*?\n/g, "\n<hr/>\n");
        var A = s('class="fancyquote"');
        t = t.rp(/\n>[ \t]*"(.*(?:\n>.*)*)"[ \t]*(?:\n>[ \t]*)?(\n>[ \t]{2,}\S.*)?\n/g, function(t, r, n) {
            return e("blockquote", e("span", r.rp(/\n>/g, "\n") + "&rdquo;", A) + (n ? e("span", n.rp(/\n>/g, "\n"), s('class="author"')) : ""), A)
        }), t = t.rp(/(?:\n>.*){2,}/g, function(t) {
            return e("blockquote", t.rp(/\n>/g, "\n"))
        }), t = t.rp(/\s*\[\^(.*?)\](?!:)/g, function(e, t) {
            return t = t.toLowerCase().trim(), t in w || (++N, w[t] = N), "<sup><a " + s('href="#endnote-' + t + '"') + ">" + w[t] + "</a></sup>"
        }), t = t.rp(/\[#(.*?)\](?!:)/g, function(e, t) {
            return t = t.trim(), "[<a " + s('href="#citation-' + t.toLowerCase() + '"') + ">" + t + "</a>]"
        }), t = t.rp(/\n\[#(.*?)\]:((?:.+?\n?)*)/g, function(e, t, r) {
            return t = t.trim(), "<div " + s('class="bib"') + ">[<a " + s('name="citation-' + t.toLowerCase() + '"') + "></a><b>" + t + "</b>] " + r + "</div>"
        }), t = u(t, s), t = t.rp(/^\[([^\^#].*?)\]:(.*?)$/gm, function(e, t, r) {
            return _[t.toLowerCase().trim()] = r.trim(), ""
        }), t = t.rp(/(?:<|(?!<)\b)(\S+@(\S+\.)+?\S{3,}?)(?:$|>|(?=<)|(?=\s)(?!>))/g, function(e, t) {
            return "<a " + s('href="mailto:' + t + '"') + ">" + t + "</a>"
        }), t = t.rp(/(\n[\t ]*){2}(!\[([\s\S]*?)\]\([^\t \)]+(.*?)\))(?=[ \t]*\n){2}/g, "$1" + e("center", "$2"));
        var q = function(t, r, n) {
            n = n || "";
            var i, a;
            return /(.mp4|.m4v|.avi|.mpg|.mov)$/i.test(r) ? i = "<video " + s('class="markdeep" src="' + r + '"' + n + ' width="480px" controls="true"') + "/>" : (a = r.match(/^https:\/\/(?:www\.)?youtube.com\/\S*?v=([\w\d-]+)(&.*)?$/i)) ? i = "<iframe " + s('class="markdeep" src="https://www.youtube.com/embed/' + a[1] + '"' + n + ' width="480px" height="300px" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen') + "></iframe>" : (a = r.match(/^https:\/\/(?:www\.)?vimeo.com\/\S*?\/([\w\d-]+)$/i)) ? i = "<iframe " + s('class="markdeep" src="https://player.vimeo.com/video/' + a[1] + '"' + n + ' width="480px" height="300px" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen') + "></iframe>" : (i = "<img " + s('class="markdeep" src="' + r + '"' + n) + "/>", /\b(width|height)\b/i.test(n) && (i = e("a ", i, s('href="' + r + '" target="_blank"')))), i
        };
        t = t.rp(/!\[\]\(([^\)\s]+?)([ \t].*?)?\)/g, q), t = t.rp(/!\[([\s\S]+?)?\]\(([^\)\s]+?)([ \t].*?)?\)/g, function(t, r, n, i) {
            var a = q(t, n, i);
            return e("div", a + e("div", r, s('class="imagecaption"')), s('class="image"'))
        }), t = t.rp(/\[([^\[]+)\]\(([^\)]+?)\)/g, function(e, t, r) {
            return "<a " + s('href="' + r + '"') + ">" + t + "</a>"
        }), t = l(t, /\*\*/, "strong", s('class="asterisk"')), t = l(t, /__/, "strong", s('class="underscore"')), t = l(t, /\*/, "em", s('class="asterisk"')), t = l(t, /_/, "em", s('class="underscore"')), t = t.rp(/\~\~([^~].*?)\~\~/g, e("del", "$1")), t = t.rp(/(^|[ \t->])(")(?=\w)/gm, "$1&ldquo;"), t = t.rp(/([\w\.,:;\?!=<])(")(?=$|\W)/gm, "$1&rdquo;"), t = t.rp(/(\s)==>(\s)/g, "$1&rarr;$2"), t = t.rp(/(\s)<==(\s)/g, "$1&larr;$2"), t = t.rp(/([^-!\:\|])---([^->\:\|])/g, "$1&mdash;$2"), t = t.rp(/([^-!\:\|])--([^->\:\|])/g, "$1&ndash;$2"), t = t.rp(/(\d+)x(\d+)/g, "$1&times;$2"), t = t.rp(/(\s)-(\d)/g, "$1&minus;$2"), t = t.rp(/(\d) - (\d)/g, "$1 &minus; $2"), t = p(t, s), t = h(t), t = d(t, s), t = t.rp(/(\d+?)[ \t-]degree(?:s?)/g, "$1&deg;"), t = t.rp(/\n[\s\n]*?\n/g, "\n\n</p><p>\n\n"), t = t.rp(/\[(.+?)\]\[(.*?)\]/g, function(e, t, r) {
            return r.trim() || (r = t), r = r.toLowerCase().trim(), "<a " + s('href="' + _[r] + '"') + ">" + t + "</a>"
        }), t = t.rp(/\n\[\^(.*?)\]:((?:.+?\n?)*)/g, function(e, t, r) {
            return t = t.toLowerCase().trim(), t in w ? "\n<div " + s('class="endnote"') + "><a " + s('name="endnote-' + t + '"') + "></a><sup>" + w[t] + "</sup> " + r + "</div>" : "\n"
        });
        var S = t.match(/<h([1-6])>(.*?)<\/h\1>/gi);
        S && S.forEach(function(e) {
            e = i(e.ss(4, e.length - 5)).trim();
            var r = "<a " + s('href="#' + a(e) + '"') + ">";
            t = t.rp(RegExp("(" + b(e) + ")(?=\\ssubsection|\\ssection)", "gi"), r + "$1</a>")
        });
        var L = {},
            R = {};
        if (t = t.rp(/($|>)\s*(figure|table|listing)\s\[(.+?)\]:/gim, function(t, r, n, i) {
                n = n.toLowerCase();
                var o = L[n] = (0 | L[n]) + 1,
                    i = n + "_" + a(i.toLowerCase().trim());
                return R[i] = o, r + e("a", "", s('name="' + i + '"')) + e("b", n[0].toUpperCase() + n.ss(1) + " " + o + ":", s('style="font-style:normal;"'))
            }), t = t.rp(/\b(figure|fig\.|table|tbl\.|listing|lst.)\s\[(.+?)\]/gi, function(e, t, r) {
                var n = t.toLowerCase();
                switch (n) {
                    case "fig.":
                        n = "figure";
                        break;
                    case "tbl.":
                        n = "table";
                        break;
                    case "lst.":
                        n = "listing"
                }
                var r = n + "_" + a(r.toLowerCase().trim()),
                    i = R[r];
                return i ? "<a " + s('href="#' + r + '"') + ">" + t + " " + i + "</a>" : t + " ?"
            }), t = t.rp(/(?:<|(?!<)\b)(\w{3,6}:\/\/.+?)(?:$|>|(?=<)|(?=\s)(?!<))/g, function(e, t) {
                return "<a " + s('href="' + t + '"') + ">" + t + "</a>"
            }), !n) {
            var T = /^\s*<strong.*?>([^ \t\*].*?[^ \t\*])<\/strong>[ \t]*\n/.source,
                z = /([ {4,}\t][ \t]*\S.*\n)*/.source;
            t = t.rp(RegExp(T + z, "g"), function(t, r) {
                r = r.trim();
                var n = t.ss(t.indexOf("\n", t.indexOf("</strong>")));
                return n = n ? n.rp(/[ \t]*(\S.*?)\n/g, '<div class="subtitle"> $1 </div>\n') : "", e("title", i(r)) + '<div class="title"> ' + r + " </div>\n" + n + '<div class="afterTitles"></div>\n'
            })
        }
        if (!n) {
            var I = f(t);
            t = I[0];
            var O = I[1];
            t = t.rp(/\b(sec\.|section|subsection)\s\[(.+?)\]/gi, function(e, t, r) {
                var n = O[r.toLowerCase().trim()];
                return n ? t + "  <a " + s('href="#toc' + n + '"') + ">" + n + "</a>" : t + " ?"
            })
        }
        for (; t.indexOf(k) + 1;) t = t.rp(j, o);
        return '<span class="md">' + e("p", t) + "</span>"
    }

    function m(e) {
        var t = e.split("\n"),
            r = 0;
        t.forEach(function(e) {
            r = L(r, e.length)
        });
        var n = Array(r + 1).join(" "),
            i = "";
        return t.forEach(function(e) {
            i += e + n.ss(e.length) + "\n"
        }), i
    }

    function v(e) {
        var t = e.split("\n"),
            r = 1 / 0;
        if (t.forEach(function(e) {
                if ("" !== e.trim()) {
                    var t = e.match(/^([ \t]*)/);
                    t && (r = R(r, t[0].length))
                }
            }), 0 === r) return e;
        var n = "";
        return t.forEach(function(e) {
            n += e.ss(r) + "\n"
        }), n
    }

    function y(e, t) {
        function n(e) {
            return H.indexOf(e) + 1
        }

        function i(e) {
            return -1 !== W.indexOf(e)
        }

        function a(e) {
            return n(e) || "." === e
        }

        function s(e) {
            return n(e) || "'" === e
        }

        function o(e) {
            return i(e) || "<" === e || v(e)
        }

        function c(e) {
            return i(e) || ">" === e || v(e)
        }

        function l(e) {
            return Z.indexOf(e) + 1
        }

        function u(e) {
            return K.indexOf(e) + 1
        }

        function d(e) {
            return "-" === e || n(e) || g(e)
        }

        function p(e) {
            return h(e) || g(e) || v(e)
        }

        function h(e) {
            return "|" === e || n(e)
        }

        function f(e) {
            return "/" === e || n(e)
        }

        function b(e) {
            return "\\" === e || n(e)
        }

        function g(e) {
            return F.indexOf(e) + 1
        }

        function v(e) {
            return D.indexOf(e) + 1
        }

        function y(e) {
            return P.indexOf(e) + 1
        }

        function x(e, t) {
            return this instanceof x ? (void 0 === t && (void 0 === e ? e = t = 0 : e instanceof x && (t = e.y, e = e.x)), this.x = e, this.y = t, void Object.seal(this)) : new x(e, t)
        }

        function w(e) {
            var t = function(r, n) {
                return void 0 === n && r instanceof x && (n = r.y, r = r.x), r >= 0 && t.width > r && n >= 0 && t.height > n ? e[n * (t.width + 1) + r] : " "
            };
            return t._used = [], t.width = e.indexOf("\n"), t.height = e.split("\n").length, "\n" === e[e.length - 1] && --t.height, t.q = function(e, r) {
                void 0 === r && e instanceof x && (r = e.y, e = e.x), e >= 0 && t.width > e && r >= 0 && t.height > r && (t._used[r * (t.width + 1) + e] = !0)
            }, t.s = function(e, t) {
                return void 0 === t && e instanceof x && (t = e.y, e = e.x), this._used[t * (this.width + 1) + e] === !0
            }, t.u = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e, r - 1),
                    i = t(e, r),
                    o = t(e, r + 1),
                    c = t(e + 1, r - 1),
                    l = t(e - 1, r - 1);
                return h(i) ? a(n) || "^" === n || h(n) || g(n) || s(o) || "v" === o || h(o) || g(o) || v(n) || v(o) || "_" === t(e, r - 1) || "_" === l || "_" === c || (a(l) || a(c)) && (s(t(e - 1, r + 1)) || s(t(e + 1, r + 1))) : a(i) || "^" === i ? h(o) || g(o) && "." !== i : s(i) || "v" === i ? h(n) || g(n) && "'" !== i : v(i) ? h(n) || h(o) : !1
            }, t.F = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e - 2, r),
                    a = t(e - 1, r),
                    s = t(e + 0, r),
                    l = t(e + 1, r),
                    u = t(e + 2, r);
                return d(s) || d(a) && g(s) ? d(a) ? d(l) || c(l) || d(n) || o(n) : o(a) ? d(l) : d(l) && (d(u) || c(u)) : "<" === s ? d(l) && d(u) : ">" === s ? d(a) && d(n) : i(s) ? d(a) && d(n) || d(l) && d(u) : !1
            }, t.G = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e, r),
                    o = t(e - 1, r - 1),
                    c = t(e + 1, r + 1);
                return "\\" === n ? b(c) || s(c) || v(c) || "v" === c || b(o) || a(o) || v(o) || "^" === o || "/" === t(e, r - 1) || "/" === t(e, r + 1) || "_" === c || "_" === o : "." === n ? "\\" === c : "'" === n ? "\\" === o : "^" === n ? "\\" === c : "v" === n ? "\\" === o : i(n) || v(n) || "|" === n ? b(o) || b(c) : void 0
            }, t.H = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e, r),
                    o = t(e - 1, r + 1),
                    c = t(e + 1, r - 1);
                return "/" !== n || "\\" !== t(e, r - 1) && "\\" !== t(e, r + 1) ? f(n) ? f(c) || a(c) || v(c) || "^" === c || "_" === c || f(o) || s(o) || v(o) || "v" === o || "_" === o : "." === n ? "/" === o : "'" === n ? "/" === c : "^" === n ? "/" === o : "v" === n ? "/" === c : i(n) || v(n) || "|" === n ? f(o) || f(c) : !1 : !0
            }, t.toString = function() {
                return e
            }, Object.freeze(t)
        }

        function N(e, t, r, n, i) {
            this.A = e, this.B = t, r && (this.C = r, this.D = n ? n : r), this.dashed = i || !1, Object.freeze(this)
        }

        function M() {
            this.Z = []
        }

        function j(e) {
            return function(t, r) {
                for (var n = 0; this.Z.length > n; ++n)
                    if (e.call(this.Z[n], t, r)) return !0;
                return !1
            }
        }

        function E() {
            this._ = []
        }

        function B(e, t) {
            function r(t, r, n) {
                var i, a, s = T(r.x - t.x),
                    o = T(r.y - t.y);
                for (i = t.x, a = t.y; i !== r.x || a !== r.y; i += s, a += o)
                    if (e(i, a) === n) return !0;
                return e(i, a) === n
            }
            for (var n = 0; e.width > n; ++n)
                for (var o = 0; e.height > o; ++o)
                    if (e.u(n, o)) {
                        var c = x(n, o);
                        do e.q(n, o), ++o; while (e.u(n, o));
                        var l = x(n, o - 1),
                            u = e(c),
                            f = e(c.x, c.y - 1);
                        (!i(u) && ("-" === f || "_" === f || "_" === e(c.x - 1, c.y - 1) || "_" === e(c.x + 1, c.y - 1) || s(f)) || g(f)) && (c.y -= .5);
                        var b = e(l),
                            m = e(l.x, l.y + 1);
                        (!i(b) && ("-" === m || a(m)) || g(m) || "_" === e(l.x - 1, l.y) || "_" === e(l.x + 1, l.y)) && (l.y += .5), (c.x !== l.x || c.y !== l.y) && t.$(new N(c, l))
                    } else "'" === e(n, o) && ("-" === e(n - 1, o) && "_" === e(n + 1, o - 1) && !p(e(n - 1, o - 1)) || "_" === e(n - 1, o - 1) && "-" === e(n + 1, o) && !p(e(n + 1, o - 1))) ? t.$(new N(x(n, o - .5), x(n, o))) : "." === e(n, o) && ("_" === e(n - 1, o) && "-" === e(n + 1, o) && !p(e(n + 1, o + 1)) || "-" === e(n - 1, o) && "_" === e(n + 1, o) && !p(e(n - 1, o + 1))) && t.$(new N(x(n, o), x(n, o + .5)));
            for (var o = 0; e.height > o; ++o)
                for (var n = 0; e.width > n; ++n)
                    if (e.F(n, o)) {
                        var c = x(n, o);
                        do e.q(n, o), ++n; while (e.F(n, o));
                        var l = x(n - 1, o);
                        !i(e(c.x - 1, c.y)) && (a(e(c)) && p(e(c.x - 1, c.y + 1)) || s(e(c)) && p(e(c.x - 1, c.y - 1))) && ++c.x, !i(e(l.x + 1, l.y)) && (a(e(l)) && p(e(l.x + 1, l.y + 1)) || s(e(l)) && p(e(l.x + 1, l.y - 1))) && --l.x, (c.x !== l.x || c.y !== l.y) && t.$(new N(c, l))
                    }
            for (var y = -e.height; e.width > y; ++y)
                for (var n = y, o = 0; e.height > o; ++o, ++n)
                    if (e.G(n, o)) {
                        var c = x(n, o);
                        do e.q(n, o), ++n, ++o; while (e.G(n, o));
                        var l = x(n - 1, o - 1);
                        if (r(c, l, "\\")) {
                            var w = e(c),
                                u = e(c.x, c.y - 1),
                                _ = e(c.x - 1, c.y - 1);
                            "/" === u || "_" === _ || "_" === u || !i(w) && (d(_) || h(_)) ? (c.x -= .5, c.y -= .5) : v(_) && (c.x -= .25, c.y -= .25);
                            var k = (e(l), e(l.x + 1, l.y + 1));
                            "/" === e(l.x, l.y + 1) || "_" === e(l.x + 1, l.y) || "_" === e(l.x - 1, l.y) || !i(e(l)) && (d(k) || h(k)) ? (l.x += .5, l.y += .5) : v(k) && (l.x += .25, l.y += .25), t.$(new N(c, l))
                        }
                    }
            for (var y = -e.height; e.width > y; ++y)
                for (var n = y, o = e.height - 1; o >= 0; --o, ++n)
                    if (e.H(n, o)) {
                        var c = x(n, o);
                        do e.q(n, o), ++n, --o; while (e.H(n, o));
                        var l = x(n - 1, o + 1);
                        if (r(c, l, "/")) {
                            var u = e(l.x, l.y - 1),
                                C = e(l.x + 1, l.y - 1);
                            e(l);
                            "\\" === u || "_" === u || "_" === C || !i(e(l)) && (d(C) || h(C)) ? (l.x += .5, l.y -= .5) : v(C) && (l.x += .25, l.y -= .25);
                            var $ = e(c.x - 1, c.y + 1),
                                w = e(c);
                            "\\" === e(c.x, c.y + 1) || "_" === e(c.x - 1, c.y) || "_" === e(c.x + 1, c.y) || !i(e(c)) && (d($) || h($)) ? (c.x -= .5, c.y += .5) : v($) && (c.x -= .25, c.y += .25), t.$(new N(c, l))
                        }
                    }
            for (var o = 0; e.height > o; ++o)
                for (var n = 0; e.width > n; ++n) {
                    var M = e(n, o);
                    a(M) && (d(e(n - 1, o)) && h(e(n + 1, o + 1)) && (e.q(n - 1, o), e.q(n, o), e.q(n + 1, o + 1), t.$(new N(x(n - 1, o), x(n + 1, o + 1), x(n + 1.1, o), x(n + 1, o + 1)))), d(e(n + 1, o)) && h(e(n - 1, o + 1)) && (e.q(n - 1, o + 1), e.q(n, o), e.q(n + 1, o), t.$(new N(x(n + 1, o), x(n - 1, o + 1), x(n - 1.1, o), x(n - 1, o + 1))))), ")" !== M && !v(M) || "." !== e(n - 1, o - 1) || "'" !== e(n - 1, o + 1) || (e.q(n, o), e.q(n - 1, o - 1), e.q(n - 1, o + 1), t.$(new N(x(n - 2, o - 1), x(n - 2, o + 1), x(n + .6, o - 1), x(n + .6, o + 1)))), "(" !== M && !v(M) || "." !== e(n + 1, o - 1) || "'" !== e(n + 1, o + 1) || (e.q(n, o), e.q(n + 1, o - 1), e.q(n + 1, o + 1), t.$(new N(x(n + 2, o - 1), x(n + 2, o + 1), x(n - .6, o - 1), x(n - .6, o + 1)))), s(M) && (d(e(n - 1, o)) && h(e(n + 1, o - 1)) && (e.q(n - 1, o), e.q(n, o), e.q(n + 1, o - 1), t.$(new N(x(n - 1, o), x(n + 1, o - 1), x(n + 1.1, o), x(n + 1, o - 1)))), d(e(n + 1, o)) && h(e(n - 1, o - 1)) && (e.q(n - 1, o - 1), e.q(n, o), e.q(n + 1, o), t.$(new N(x(n + 1, o), x(n - 1, o - 1), x(n - 1.1, o), x(n - 1, o - 1)))))
                }
            for (var o = 0; e.height > o; ++o)
                for (var n = 0; e.width - 2 > n; ++n)
                    if ("_" === e(n, o) && "_" === e(n + 1, o)) {
                        var c = x(n - .5, o + .5),
                            j = e(n - 1, o),
                            E = e(n - 2, o);
                        "|" === j || "|" === e(n - 1, o + 1) || "." === j || "'" === e(n - 1, o + 1) ? (c.x -= .5, "." !== j || "-" !== E && "." !== E || "(" !== e(n - 2, o + 1) || (c.x -= .5)) : "/" === j && (c.x -= 1), "(" === j && "(" === E && "'" === e(n, o + 1) && "." === e(n, o - 1) && (c.x += .5), j = E = void 0;
                        do e.q(n, o), ++n; while ("_" === e(n, o));
                        var l = x(n - .5, o + .5),
                            M = e(n, o),
                            B = e(n + 1, o),
                            b = e(n, o + 1);
                        "|" === M || "|" === b || "." === M || "'" === b ? (l.x += .5, "." !== M || "-" !== B && "." !== B || ")" !== e(n + 1, o + 1) || (l.x += .5)) : "\\" === M && (l.x += 1), ")" === M && ")" === B && "'" === e(n - 1, o + 1) && "." === e(n - 1, o - 1) && (l.x += -.5), t.$(new N(c, l))
                    }
        }

        function A(e, t, r) {
            function n(e) {
                return " " === e || /[^a-zA-Z0-9]|[ov]/.test(e)
            }

            function i(e, t, r, i) {
                return (n(t) || v(t)) && (n(e) || v(e)) && n(i) && n(r)
            }
            for (var a = 0; e.width > a; ++a)
                for (var s = 0; e.height > s; ++s) {
                    var o = e(a, s),
                        c = s;
                    if (g(o)) t.U(a, c - .5) && t.O(a, c + .5) && (r.$(a, c, o), e.q(a, c));
                    else if (v(o)) {
                        var d = e(a, c - 1),
                            p = e(a, c + 1),
                            h = e(a - 1, c),
                            f = e(a + 1, c);
                        (t.W(a - 1, c) || t.V(a + 1, c) || t.U(a, c - 1) || t.O(a, c + 1) || t.O(a, c) || t.U(a, c) || i(d, p, h, f)) && (r.$(a, c, o), e.q(a, c))
                    } else if (l(o)) r.$(a, c, o), e.q(a, c);
                    else if (u(o)) r.$(a, c, o), e.q(a, c);
                    else {
                        var b = 0;
                        ">" === o && (t.W(a, c) || t.Y(a, c)) ? (v(e(a + 1, c)) && (b = -.5), r.$(a + b, c, ">", 0), e.q(a, c)) : "<" === o && (t.V(a, c) || t.Y(a, c)) ? (v(e(a - 1, c)) && (b = .5), r.$(a + b, c, ">", 180), e.q(a, c)) : "^" === o ? t.O(a, c - .5) ? (r.$(a, c - .5, ">", 270), e.q(a, c)) : t.O(a, c) ? (r.$(a, c, ">", 270), e.q(a, c)) : t.P(a + .5, c - .5) ? (r.$(a + .5, c - .5, ">", 270 + I), e.q(a, c)) : t.P(a + .25, c - .25) ? (r.$(a + .25, c - .25, ">", 270 + I), e.q(a, c)) : t.P(a, c) ? (r.$(a, c, ">", 270 + I), e.q(a, c)) : t.S(a, c) ? (r.$(a, c, o, 270 - I), e.q(a, c)) : t.S(a - .5, c - .5) ? (r.$(a - .5, c - .5, o, 270 - I), e.q(a, c)) : t.S(a - .25, c - .25) ? (r.$(a - .25, c - .25, o, 270 - I), e.q(a, c)) : t.X(a, c) && (r.$(a, c - .5, ">", 270), e.q(a, c)) : "v" === o && (t.U(a, c + .5) ? (r.$(a, c + .5, ">", 90), e.q(a, c)) : t.U(a, c) ? (r.$(a, c, ">", 90), e.q(a, c)) : t.R(a, c) ? (r.$(a, c, ">", 90 + I), e.q(a, c)) : t.R(a - .5, c + .5) ? (r.$(a - .5, c + .5, ">", 90 + I), e.q(a, c)) : t.R(a - .25, c + .25) ? (r.$(a - .25, c + .25, ">", 90 + I), e.q(a, c)) : t.T(a, c) ? (r.$(a, c, ">", 90 - I), e.q(a, c)) : t.T(a + .5, c + .5) ? (r.$(a + .5, c + .5, ">", 90 - I), e.q(a, c)) : t.T(a + .25, c + .25) ? (r.$(a + .25, c + .25, ">", 90 - I), e.q(a, c)) : t.X(a, c) && (r.$(a, c + .5, ">", 90), e.q(a, c)))
                    }
                }
        }
        e = m(e);
        var q = "\ue004";
        e = e.rp(/([a-z]|[A-Z])o([a-z]|[A-Z])/g, "$1" + q + "$2");
        var S = 8,
            z = 2,
            I = 180 * Math.atan(1 / z) / Math.PI,
            O = 1e-6,
            U = ">v<^",
            D = "o*",
            F = "()",
            H = "+",
            W = H + ".'",
            Z = "\u2591\u2592\u2593\u2594\u2589",
            K = "\u25e2\u25e3\u25e4\u25e5",
            P = U + D + F + Z + K;
        x.prototype.toString = x.prototype.toSVG = function() {
            return "" + this.x * S + "," + this.y * S * z + " "
        };
        var Q = N.prototype;
        Q.I = function() {
            return this.B.x === this.A.x
        }, Q.J = function() {
            return this.B.y === this.A.y
        }, Q.K = function() {
            var e = this.B.x - this.A.x,
                t = this.B.y - this.A.y;
            return Math.abs(t + e) < O
        }, Q.L = function() {
            var e = this.B.x - this.A.x,
                t = this.B.y - this.A.y;
            return Math.abs(t - e) < O
        }, Q.M = function() {
            return void 0 !== this.C
        }, Q.N = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.A.x === e && this.A.y === t || this.B.x === e && this.B.y === t
        }, Q.O = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.I() && this.A.x === e && R(this.A.y, this.B.y) === t
        }, Q.P = function(e, t) {
            return this.K() ? (void 0 === t && (t = e.y, e = e.x), this.B.y > this.A.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.R = function(e, t) {
            return this.K() ? (void 0 === t && (t = e.y, e = e.x), this.A.y > this.B.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.S = function(e, t) {
            return this.L() ? (void 0 === t && (t = e.y, e = e.x), this.B.y > this.A.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.T = function(e, t) {
            return this.L() ? (void 0 === t && (t = e.y, e = e.x), this.A.y > this.B.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.U = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.I() && this.A.x === e && L(this.A.y, this.B.y) === t
        }, Q.V = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.y === t && R(this.A.x, this.B.x) === e
        }, Q.W = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.y === t && L(this.A.x, this.B.x) === e
        }, Q.X = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.I() && this.A.x === e && R(this.A.y, this.B.y) <= t && L(this.A.y, this.B.y) >= t
        }, Q.Y = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.y === t && R(this.A.x, this.B.x) <= e && L(this.A.x, this.B.x) >= e
        }, Q.toSVG = function() {
            var e = '<path d="M ' + this.A;
            return e += this.M() ? "C " + this.C + this.D + this.B : "L " + this.B, e += '" style="fill:none;stroke:#000;"', this.dashed && (e += ' stroke-dasharray="3,6"'), e += "/>"
        };
        var V = M.prototype;
        V.$ = function(e) {
            this.Z.push(e)
        }, V.O = j(Q.O), V.P = j(Q.P), V.S = j(Q.S), V.R = j(Q.R), V.T = j(Q.T), V.U = j(Q.U), V.V = j(Q.V), V.W = j(Q.W), V.N = j(Q.N), V.X = j(Q.X), V.Y = j(Q.Y), V.toSVG = function() {
            for (var e = "", t = 0; this.Z.length > t; ++t) e += this.Z[t].toSVG() + "\n";
            return e
        };
        var G = E.prototype;
        G.$ = function(e, t, r, n) {
            void 0 === r && (r = t, t = e.y, e = e.x), !y(r);
            var i = {
                C: x(e, t),
                type: r,
                angle: n || 0
            };
            v(r) ? this._.push(i) : this._.unshift(i)
        }, G.toSVG = function() {
            for (var e = "", t = 0; this._.length > t; ++t) {
                var r = this._[t],
                    n = r.C;
                if (g(r.type)) {
                    var i = ")" === r.type ? .75 : -.75,
                        a = x(n.x, n.y - .5),
                        s = x(n.x, n.y + .5),
                        o = x(n.x + i, n.y - .5),
                        c = x(n.x + i, n.y + .5);
                    e += '<path d="M ' + s + " C " + c + o + a + '" style="fill:none;stroke:#000;"/>'
                } else if (v(r.type)) e += '<circle cx="' + n.x * S + '" cy="' + n.y * S * z + '" r="' + (S - $) + '" style="fill:' + ("*" === r.type ? "#000" : "#FFF") + ';stroke:#000;"/>';
                else if (l(r.type)) {
                    var d = Math.round(63.75 * (3 - Z.indexOf(r.type)));
                    e += '<rect x="' + (n.x - .5) * S + '" y="' + (n.y - .5) * S * z + '" width="' + S + '" height="' + S * z + '" fill="rgb(' + d + "," + d + "," + d + ')"/>'
                } else if (u(r.type)) {
                    var p = K.indexOf(r.type),
                        h = .5 - (1 & p),
                        f = .5 - (p >> 1);
                    h *= T(f);
                    var b = x(n.x + h, n.y - f),
                        a = x(n.x + h, n.y + f),
                        s = x(n.x - h, n.y + f);
                    e += '<polygon points="' + b + a + s + '" style="fill:#000""/>\n'
                } else {
                    var b = x(n.x + 1, n.y),
                        a = x(n.x - .5, n.y - .35),
                        s = x(n.x - .5, n.y + .35);
                    e += '<polygon points="' + b + a + s + '" style="fill:#000" transform="rotate(' + r.angle + "," + n + ')"/>\n'
                }
            }
            return e
        };
        var Y = w(e),
            J = new M,
            X = new E;
        B(Y, J), A(Y, J, X);
        var ee = '<svg class="diagram" xmlns="http://www.w3.org/2000/svg" version="1.1" height="' + (Y.height + 1) * S * z + '" width="' + (Y.width + 1) * S + '"';
        if ("floatleft" === t ? ee += ' style="float:left;margin: 15px 30px 15px 0px;"' : "floatright" === t ? ee += ' style="float:right;margin: 15px 0px 15px 30px;"' : "center" === t && (ee += ' style="margin: 0px auto 0px auto;"'), ee += '><g transform="translate(' + x(1, 1) + ')">\n', _) {
            ee += '<g style="opacity:0.1">\n';
            for (var te = 0; Y.width > te; ++te)
                for (var re = 0; Y.height > re; ++re) ee += '<rect x="' + ((te - .5) * S + 1) + '" + y="' + ((re - .5) * S * z + 2) + '" width="' + (S - 2) + '" height="' + (S * z - 2) + '" style="fill:', ee += Y.s(te, re) ? "red;" : " " === Y(te, re) ? "gray; opacity:0.05" : "blue;", ee += '"/>\n';
            ee += "</g>\n"
        }
        if (ee += J.toSVG(), ee += X.toSVG(), !C) {
            ee += '<g transform="translate(0,0)">';
            for (var re = 0; Y.height > re; ++re)
                for (var te = 0; Y.width > te; ++te) {
                    var ne = Y(te, re);
                    /[\u2B22\u2B21]/.test(ne) ? ee += '<text text-anchor="middle" x="' + te * S + '" y="' + (4 + re * S * z) + '" style="fill:#000;font-size:20.5px">' + r(ne) + "</text>" : " " === ne || Y.s(te, re) || (ee += '<text text-anchor="middle" x="' + te * S + '" y="' + (4 + re * S * z) + '" style="fill:#000">' + r(ne) + "</text>")
                }
            ee += "</g>"
        }
        if (k) {
            ee += '<g transform="translate(2, 2)">\n';
            for (var te = 0; Y.width > te; ++te)
                for (var re = 0; Y.height > re; ++re) {
                    var ne = Y(te, re);
                    " " !== ne && (ee += '<text text-anchor="middle" x="' + te * S + '" y="' + (4 + re * S * z) + '" style="fill:#F00;font-family:Menlo,monospace;font-size:12px;text-align:center">' + r(ne) + "</text>")
                }
            ee += "</g>"
        }
        return ee += "</g></svg>", ee = ee.rp(RegExp(q, "g"), "o")
    }

    function x(e) {
        return -1 !== e.search(/markdeep\S*?\.js$/i)
    }

    function w(e) {
        return Array.prototype.slice.call(e)
    }
    var N = String.prototype;
    N.rp = N.replace, N.ss = N.substring;
    var _ = !1,
        k = _,
        C = k,
        $ = 2,
        M = "*",
        j = Array(6).join(M),
        E = e("style", 'body { max-width: 680px;margin:auto;padding:20px;text-align:justify;line-height:140%; color:#222;font-family: Palatino,Georgia,"Times New Roman",serif;}'),
        B = e("style", "body{counter-reset: h1 h2 h3 h4 h5 h6;}.md div.title{font-size:26px;font-weight:800;padding-bottom:5px;line-height:120%;text-align:center;}.md div.afterTitles{height:10px;}.md div.subtitle{text-align:center;}.md .image{display:inline-block}.md div.imagecaption,.md div.tablecaption,.md div.listingcaption{margin:10px 0 10px 0;font-style:italic;}.md div.tilde{margin:20px 0 -10px 0;text-align:center;}.md blockquote.fancyquote{margin-top:25px;margin-bottom:25px;text-align:left;line-height:160%;}.md blockquote.fancyquote:before{color: #DDD;content: \"\u201c\";font-family:Times New Roman;font-size: 45px;line-height: 0;margin-right: 6px;vertical-align: -0.3em;}.md span.fancyquote{font-size:118%;color:#777;font-style:italic;}.md blockquote.fancyquote .author{width:100%;margin-top: 10px;display:inline-block;text-align:right;}.md div.title,h1,h2,h3,h4,h5,h6, .md .shortTOC,.md .longTOC{font-family:Verdana,Helvetica,Arial,sans-serif;}.md svg.diagram{display:block;font-family:Menlo,'Lucida Console',monospace;font-size:13.1px;text-align:center;stroke-linecap:round;stroke-width:" + $ + "px;}h1{padding-bottom:3px;padding-top:15px;border-bottom:3px solid;border-top:none;font-size:20px;counter-reset: h2 h3 h4 h5 h6;clear:both;}h2{counter-reset: h3 h4 h5 h6;font-family:Helvetica,Arial,sans-serif;padding-bottom:3px;padding-top:15px;border-bottom:2px solid #999;border-top:none;color:#555;font-size:18px;clear:both;}h3,h4,h5,h6{font-family:Helvetica,Arial,sans-serif;padding-bottom:3px;padding-top:15px;border-top:none;color:#555;font-size:16px;clear:both;}h3{counter-reset: h4 h5 h6;}h4{counter-reset: h5 h6;}h5{counter-reset: h6;}.md table{border-collapse:collapse;line-height:140%; }.md table.table{margin:auto;}.md table.calendar{width:100%;margin:auto;font-size:11px;font-family:Helvetica,Arial,sans-serif;}.md table.calendar th{font-size:16px;}.md .today{background:#ECF8FA;}.md div.tablecaption{text-align: center;}.md table.table th{color:#FFF;background-color:#AAA;border:1px solid #888;padding:8px 15px 8px 15px;}.md table.table td{padding:5px 15px 5px 15px;border:1px solid #888;}.md table.table tr:nth-child(even){background:#EEE;}.md pre.tilde{border-top: 1px solid #CCC;border-bottom: 1px solid #CCC;padding: 5px 0 5px 20px;margin-bottom: 30px;background: #FCFCFC;}.md a:link, .md a:visited{color:#38A;text-decoration:none;}.md a:hover{text-decoration:underline}.md dt{font-weight:700;}.md dd{padding-bottom:18px;}.md code{white-space:pre;}.md .endnote{font-size:13px;line-height:15px;padding-left:10px;text-indent:-10px;}.md .bib{padding-left:80px;text-indent:-80px;text-align:left;}.markdeepFooter{font-size:9px;text-align:right;padding-top:80px;color:#999;}.md .longTOC{float:right;font-size:12px;line-height:15px;border-left:1px solid #CCC;padding-left:15px;margin:15px 0px 15px 25px;}.md .shortTOC{text-align:center;font-weight:bold;margin-top:15px;font-size:14px;}"),
        A = '<!-- Markdeep: --><style class="fallback">body{visibility:hidden;white-space:pre;font-family:monospace}</style><script src="markdeep.min.js"></script><script src="https://casual-effects.com/markdeep/latest/markdeep.min.js"></script><script>window.alreadyProcessedMarkdeep||(document.body.style.visibility="visible")</script>',
        q = '<div class="markdeepFooter"><i>formatted by <a href="http://casual-effects.com/markdeep" style="color:#999">Markdeep&nbsp;&nbsp;&nbsp;</a></i><div style="display:inline-block;font-size:13px;font-family:\'Times New Roman\',serif;vertical-align:middle;transform:translate(-3px,-1px)rotate(135deg);">&#x2712;</div></div>',
        S = {
            mode: "markdeep",
            detectMath: !0
        },
        L = Math.max,
        R = Math.min,
        T = Math.sign || function(e) {
            return +e === e ? 0 === e ? e : e > 0 ? 1 : -1 : NaN;
        },
        z = "<style>.hljs{display:block;overflow-x:auto;padding:0.5em;background:#fff;color:#000;-webkit-text-size-adjust:none}.hljs-comment{color:#006a00}.hljs-keyword,.hljs-literal,.nginx .hljs-title{color:#aa0d91}.method,.hljs-list .hljs-title,.hljs-tag .hljs-title,.setting .hljs-value,.hljs-winutils,.tex .hljs-command,.http .hljs-title,.hljs-request,.hljs-status,.hljs-name{color:#008}.hljs-envvar,.tex .hljs-special{color:#660}.hljs-string{color:#c41a16}.hljs-tag .hljs-value,.hljs-cdata,.hljs-filter .hljs-argument,.hljs-attr_selector,.apache .hljs-cbracket,.hljs-date,.hljs-regexp{color:#080}.hljs-sub .hljs-identifier,.hljs-pi,.hljs-tag,.hljs-tag .hljs-keyword,.hljs-decorator,.ini .hljs-title,.hljs-shebang,.hljs-prompt,.hljs-hexcolor,.hljs-rule .hljs-value,.hljs-symbol,.hljs-symbol .hljs-string,.hljs-number,.css .hljs-function,.hljs-function .hljs-title,.coffeescript .hljs-attribute{color:#1c00cf}.hljs-class .hljs-title,.smalltalk .hljs-class,.hljs-type,.hljs-typename,.hljs-tag .hljs-attribute,.hljs-doctype,.hljs-class .hljs-id,.hljs-built_in,.setting,.hljs-params,.clojure .hljs-attribute{color:#5c2699}.hljs-variable{color:#3f6e74}.css .hljs-tag,.hljs-rule .hljs-property,.hljs-pseudo,.hljs-subst{color:#000}.css .hljs-class,.css .hljs-id{color:#9b703f}.hljs-value .hljs-important{color:#ff7700;font-weight:bold}.hljs-rule .hljs-keyword{color:#c5af75}.hljs-annotation,.apache .hljs-sqbracket,.nginx .hljs-built_in{color:#9b859d}.hljs-preprocessor,.hljs-preprocessor *,.hljs-pragma{color:#643820}.tex .hljs-formula{background-color:#eee;font-style:italic}.diff .hljs-header,.hljs-chunk{color:#808080;font-weight:bold}.diff .hljs-change{background-color:#bccff9}.hljs-addition{background-color:#baeeba}.hljs-deletion{background-color:#ffc8bd}.hljs-comment .hljs-doctag{font-weight:bold}.method .hljs-id{color:#000}</style>";
    if (!window.alreadyProcessedMarkdeep) {
        window.alreadyProcessedMarkdeep = !0;
        var I = -1 !== window.location.href.search(/\?.*noformat.*/i);
        window.markdeep = Object.freeze({
            format: g,
            formatDiagram: y,
            stylesheet: function() {
                return B + s() + z
            }
        });
        var O = t("mode");
        switch (O) {
            case "script":
                return;
            case "html":
            case "doxygen":
                return w(document.getElementsByClassName("diagram")).concat(w(document.getElementsByTagName("diagram"))).forEach(function(e) {
                    var t = n(e.innerHTML);
                    t = t.rp(/(:?^[ \t]*\n)|(:?\n[ \t]*)$/g, ""), "doxygen" === O && (t = t.rp(RegExp("\u2013", "g"), "--"), t = t.rp(RegExp("\u2014", "g"), "---"), t = t.rp(/<a class="el" .*>(.*)<\/a>/g, "$1")), e.outerHTML = '<center class="md">' + y(v(t), "") + "</center>"
                }), w(document.getElementsByClassName("markdeep")).concat(w(document.getElementsByTagName("markdeep"))).forEach(function(e) {
                    var t = document.createElement("div");
                    t.innerHTML = g(v(n(e.innerHTML)), !0), e.parentNode.replaceChild(t, e)
                }), void(document.head.innerHTML = window.markdeep.stylesheet() + document.head.innerHTML)
        }
        I || (w(document.getElementsByTagName("script")).forEach(function(e) {
            x(e.src) && e.parentNode.removeChild(e)
        }), document.body.style.visibility = "hidden");
        var U = o(document.body);
        if (I) return U = U.rp(/<!-- Markdeep:.+$/gm, "") + A, U = U.rp(/</g, "&lt;").rp(/>/g, "&gt;"), void(document.body.innerHTML = e("pre", U));
        U = n(U), setTimeout(function() {
            var r = g(U, !1),
                n = t("detectMath") && (-1 !== r.search(/(?:\$\$[\s\S]+\$\$)|(?:\\begin{)/m) || -1 !== r.search(/\\\(.*\\\)/));
            if (n) {
                var i = "$$NC{\\n}{\\hat{n}}NC{\\w}{\\hat{\\omega}}NC{\\wi}{\\w_\\mathrm{i}}NC{\\wo}{\\w_\\mathrm{o}}NC{\\wh}{\\w_\\mathrm{h}}NC{\\Li}{L_\\mathrm{i}}NC{\\Lo}{L_\\mathrm{o}}NC{\\Le}{L_\\mathrm{e}}NC{\\Lr}{L_\\mathrm{r}}NC{\\Lt}{L_\\mathrm{t}}NC{\\O}{\\mathrm{O}}NC{\\degrees}{{^\\circ}}NC{\\T}{\\mathsf{T}}NC{\\mathset}[1]{\\mathbb{#1}}NC{\\Real}{\\mathset{R}}NC{\\Integer}{\\mathset{Z}}NC{\\Boolean}{\\mathset{B}}NC{\\Complex}{\\mathset{C}}$$\n".rp(/NC/g, "\\newcommand");
                r = '<script type="text/x-mathjax-config">MathJax.Hub.Config({ TeX: { equationNumbers: {autoNumber: "AMS"} } });</script><span style="display:none">' + i + "</span>\n" + r
            }
            r += q;
            var a = U.length > 1e3,
                o = E + B + s() + z;
            if (a && (o += e("style", "div.title { padding-top: 40px; } div.afterTitles { height: 15px; }")), document.head.innerHTML = '<meta charset="UTF-8"><meta http-equiv="content-type" content="text/html; charset=UTF-8">' + o + document.head.innerHTML, document.body.innerHTML = r, document.body.style.visibility = "visible", n) {
                var c = document.createElement("script");
                c.type = "text/javascript", c.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML", document.getElementsByTagName("head")[0].appendChild(c)
            }
        }, 0)
    }
}(), ! function(e) {
    "undefined" != typeof exports ? e(exports) : (window.hljs = e({}), "function" == typeof define && define.amd && define("hljs", [], function() {
        return window.hljs
    }))
}(function(e) {
    function t(e) {
        return e.rp(/&/gm, "&amp;").rp(/</gm, "&lt;").rp(/>/gm, "&gt;")
    }

    function r(e) {
        return e.nodeName.toLowerCase()
    }

    function n(e, t) {
        var r = e && e.exec(t);
        return r && 0 == r.index
    }

    function i(e) {
        return /^(no-?highlight|plain|text)$/i.test(e)
    }

    function a(e) {
        var t, r, n, a = e.className + " ";
        if (a += e.parentNode ? e.parentNode.className : "", r = /\blang(?:uage)?-([\w-]+)\b/i.exec(a)) return x(r[1]) ? r[1] : "no-highlight";
        for (a = a.split(/\s+/), t = 0, n = a.length; n > t; t++)
            if (x(a[t]) || i(a[t])) return a[t]
    }

    function s(e, t) {
        var r, n = {};
        for (r in e) n[r] = e[r];
        if (t)
            for (r in t) n[r] = t[r];
        return n
    }

    function o(e) {
        var t = [];
        return function n(e, i) {
            for (var a = e.firstChild; a; a = a.nextSibling) 3 == a.nodeType ? i += a.nodeValue.length : 1 == a.nodeType && (t.push({
                event: "start",
                offset: i,
                node: a
            }), i = n(a, i), r(a).match(/br|hr|img|input/) || t.push({
                event: "stop",
                offset: i,
                node: a
            }));
            return i
        }(e, 0), t
    }

    function c(e, n, i) {
        function a() {
            return e.length && n.length ? e[0].offset != n[0].offset ? n[0].offset > e[0].offset ? e : n : "start" == n[0].event ? e : n : e.length ? e : n
        }

        function s(e) {
            function n(e) {
                return " " + e.nodeName + '="' + t(e.value) + '"'
            }
            u += "<" + r(e) + Array.prototype.map.call(e.attributes, n).join("") + ">"
        }

        function o(e) {
            u += "</" + r(e) + ">"
        }

        function c(e) {
            ("start" == e.event ? s : o)(e.node)
        }
        for (var l = 0, u = "", d = []; e.length || n.length;) {
            var p = a();
            if (u += t(i.substr(l, p[0].offset - l)), l = p[0].offset, p == e) {
                d.reverse().forEach(o);
                do c(p.splice(0, 1)[0]), p = a(); while (p == e && p.length && p[0].offset == l);
                d.reverse().forEach(s)
            } else "start" == p[0].event ? d.push(p[0].node) : d.pop(), c(p.splice(0, 1)[0])
        }
        return u + t(i.substr(l))
    }

    function l(e) {
        function t(e) {
            return e && e.source || e
        }

        function r(r, n) {
            return RegExp(t(r), "m" + (e.cI ? "i" : "") + (n ? "g" : ""))
        }

        function n(i, a) {
            if (!i.compiled) {
                if (i.compiled = !0, i.k = i.k || i.bK) {
                    var o = {},
                        c = function(t, r) {
                            e.cI && (r = r.toLowerCase()), r.split(" ").forEach(function(e) {
                                var r = e.split("|");
                                o[r[0]] = [t, r[1] ? +r[1] : 1]
                            })
                        };
                    "string" == typeof i.k ? c("keyword", i.k) : Object.keys(i.k).forEach(function(e) {
                        c(e, i.k[e])
                    }), i.k = o
                }
                i.lR = r(i.l || /\b\w+\b/, !0), a && (i.bK && (i.b = "\\b(" + i.bK.split(" ").join("|") + ")\\b"), i.b || (i.b = /\B|\b/), i.bR = r(i.b), i.e || i.eW || (i.e = /\B|\b/), i.e && (i.eR = r(i.e)), i.tE = t(i.e) || "", i.eW && a.tE && (i.tE += (i.e ? "|" : "") + a.tE)), i.i && (i.iR = r(i.i)), void 0 === i.r && (i.r = 1), i.c || (i.c = []);
                var l = [];
                i.c.forEach(function(e) {
                    e.v ? e.v.forEach(function(t) {
                        l.push(s(e, t))
                    }) : l.push("self" == e ? i : e)
                }), i.c = l, i.c.forEach(function(e) {
                    n(e, i)
                }), i.starts && n(i.starts, a);
                var u = i.c.map(function(e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                }).concat([i.tE, i.i]).map(t).filter(Boolean);
                i.t = u.length ? r(u.join("|"), !0) : {
                    exec: function() {
                        return null
                    }
                }
            }
        }
        n(e)
    }

    function u(e, r, i, a) {
        function s(e, t) {
            for (var r = 0; t.c.length > r; r++)
                if (n(t.c[r].bR, e)) return t.c[r]
        }

        function o(e, t) {
            if (n(e.eR, t)) {
                for (; e.endsParent && e.parent;) e = e.parent;
                return e
            }
            return e.eW ? o(e.parent, t) : void 0
        }

        function c(e, t) {
            return !i && n(t.iR, e)
        }

        function p(e, t) {
            var r = y.cI ? t[0].toLowerCase() : t[0];
            return e.k.hasOwnProperty(r) && e.k[r]
        }

        function h(e, t, r, n) {
            var i = n ? "" : w.classPrefix,
                a = '<span class="' + i,
                s = r ? "" : "</span>";
            return a += e + '">', a + t + s
        }

        function f() {
            if (!k.k) return t(M);
            var e = "",
                r = 0;
            k.lR.lastIndex = 0;
            for (var n = k.lR.exec(M); n;) {
                e += t(M.substr(r, n.index - r));
                var i = p(k, n);
                i ? (j += i[1], e += h(i[0], t(n[0]))) : e += t(n[0]), r = k.lR.lastIndex, n = k.lR.exec(M)
            }
            return e + t(M.substr(r))
        }

        function b() {
            var e = "string" == typeof k.sL;
            if (e && !N[k.sL]) return t(M);
            var r = e ? u(k.sL, M, !0, C[k.sL]) : d(M, k.sL.length ? k.sL : void 0);
            return k.r > 0 && (j += r.r), e && (C[k.sL] = r.top), h(r.language, r.value, !1, !0)
        }

        function g() {
            return void 0 !== k.sL ? b() : f()
        }

        function m(e, r) {
            var n = e.cN ? h(e.cN, "", !0) : "";
            e.rB ? ($ += n, M = "") : e.eB ? ($ += t(r) + n, M = "") : ($ += n, M = r), k = Object.create(e, {
                parent: {
                    value: k
                }
            })
        }

        function v(e, r) {
            if (M += e, void 0 === r) return $ += g(), 0;
            var n = s(r, k);
            if (n) return $ += g(), m(n, r), n.rB ? 0 : r.length;
            var i = o(k, r);
            if (i) {
                var a = k;
                a.rE || a.eE || (M += r), $ += g();
                do k.cN && ($ += "</span>"), j += k.r, k = k.parent; while (k != i.parent);
                return a.eE && ($ += t(r)), M = "", i.starts && m(i.starts, ""), a.rE ? 0 : r.length
            }
            if (c(r, k)) throw Error('Illegal lexeme "' + r + '" for mode "' + (k.cN || "<unnamed>") + '"');
            return M += r, r.length || 1
        }
        var y = x(e);
        if (!y) throw Error('Unknown language: "' + e + '"');
        l(y);
        var _, k = a || y,
            C = {},
            $ = "";
        for (_ = k; _ != y; _ = _.parent) _.cN && ($ = h(_.cN, "", !0) + $);
        var M = "",
            j = 0;
        try {
            for (var E, B, A = 0; k.t.lastIndex = A, E = k.t.exec(r), E;) B = v(r.substr(A, E.index - A), E[0]), A = E.index + B;
            for (v(r.substr(A)), _ = k; _.parent; _ = _.parent) _.cN && ($ += "</span>");
            return {
                r: j,
                value: $,
                language: e,
                top: k
            }
        } catch (q) {
            if (-1 != q.message.indexOf("Illegal")) return {
                r: 0,
                value: t(r)
            };
            throw q
        }
    }

    function d(e, r) {
        r = r || w.languages || Object.keys(N);
        var n = {
                r: 0,
                value: t(e)
            },
            i = n;
        return r.forEach(function(t) {
            if (x(t)) {
                var r = u(t, e, !1);
                r.language = t, r.r > i.r && (i = r), r.r > n.r && (i = n, n = r)
            }
        }), i.language && (n.second_best = i), n
    }

    function p(e) {
        return w.tabRp && (e = e.rp(/^((<[^>]+>|\t)+)/gm, function(e, t) {
            return t.rp(/\t/g, w.tabRp)
        })), w.useBR && (e = e.rp(/\n/g, "<br>")), e
    }

    function h(e, t, r) {
        var n = t ? _[t] : r,
            i = [e.trim()];
        return e.match(/\bhljs\b/) || i.push("hljs"), -1 === e.indexOf(n) && i.push(n), i.join(" ").trim()
    }

    function f(e) {
        var t = a(e);
        if (!i(t)) {
            var r;
            w.useBR ? (r = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), r.innerHTML = e.innerHTML.rp(/\n/g, "").rp(/<br[ \/]*>/g, "\n")) : r = e;
            var n = r.textContent,
                s = t ? u(t, n, !0) : d(n),
                l = o(r);
            if (l.length) {
                var f = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                f.innerHTML = s.value, s.value = c(l, o(f), n)
            }
            s.value = p(s.value), e.innerHTML = s.value, e.className = h(e.className, t, s.language), e.result = {
                language: s.language,
                re: s.r
            }, s.second_best && (e.second_best = {
                language: s.second_best.language,
                re: s.second_best.r
            })
        }
    }

    function b(e) {
        w = s(w, e)
    }

    function g() {
        if (!g.called) {
            g.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, f)
        }
    }

    function m() {
        addEventListener("DOMContentLoaded", g, !1), addEventListener("load", g, !1)
    }

    function v(t, r) {
        var n = N[t] = r(e);
        n.aliases && n.aliases.forEach(function(e) {
            _[e] = t
        })
    }

    function y() {
        return Object.keys(N)
    }

    function x(e) {
        return e = e.toLowerCase(), N[e] || N[_[e]]
    }
    var w = {
            classPrefix: "hljs-",
            tabRp: null,
            useBR: !1,
            languages: void 0
        },
        N = {},
        _ = {};
    return e.highlight = u, e.highlightAuto = d, e.fixMarkup = p, e.highlightBlock = f, e.configure = b, e.initHighlighting = g, e.initHighlightingOnLoad = m, e.aa = v, e.ba = y, e.ca = x, e.inherit = s, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, e.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [e.BE]
    }, e.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [e.BE]
    }, e.PWM = {
        b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
    }, e.C = function(t, r, n) {
        var i = e.inherit({
            cN: "comment",
            b: t,
            e: r,
            c: []
        }, n || {});
        return i.c.push(e.PWM), i.c.push({
            cN: "doctag",
            b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            r: 0
        }), i
    }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = {
        cN: "number",
        b: e.NR,
        r: 0
    }, e.CNM = {
        cN: "number",
        b: e.CNR,
        r: 0
    }, e.BNM = {
        cN: "number",
        b: e.BNR,
        r: 0
    }, e.CSSNM = {
        cN: "number",
        b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    }, e.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gimuy]*/,
        i: /\n/,
        c: [e.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [e.BE]
        }]
    }, e.TM = {
        cN: "title",
        b: e.IR,
        r: 0
    }, e.UTM = {
        cN: "title",
        b: e.UIR,
        r: 0
    }, e.aa("apache", function(e) {
        var t = {
            cN: "number",
            b: "[\\$%]\\d+"
        };
        return {
            aliases: ["apacheconf"],
            cI: !0,
            c: [e.HCM, {
                cN: "tag",
                b: "</?",
                e: ">"
            }, {
                cN: "keyword",
                b: /\w+/,
                r: 0,
                k: {
                    common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
                },
                starts: {
                    e: /$/,
                    r: 0,
                    k: {
                        literal: "on off all"
                    },
                    c: [{
                        cN: "sqbracket",
                        b: "\\s\\[",
                        e: "\\]$"
                    }, {
                        cN: "cbracket",
                        b: "[\\$%]\\{",
                        e: "\\}",
                        c: ["self", t]
                    }, t, e.QSM]
                }
            }],
            i: /\S/
        }
    }), e.aa("bash", function(e) {
        var t = {
                cN: "variable",
                v: [{
                    b: /\$[\w\d#@][\w\d_]*/
                }, {
                    b: /\$\{(.*?)}/
                }]
            },
            r = {
                cN: "string",
                b: /"/,
                e: /"/,
                c: [e.BE, t, {
                    cN: "variable",
                    b: /\$\(/,
                    e: /\)/,
                    c: [e.BE]
                }]
            },
            n = {
                cN: "string",
                b: /'/,
                e: /'/
            };
        return {
            aliases: ["sh", "zsh"],
            l: /-?[a-z\.]+/,
            k: {
                keyword: "if then else elif fi for while in do done case esac function",
                literal: "true false",
                built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
                operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
            },
            c: [{
                cN: "shebang",
                b: /^#![^\n]+sh\s*$/,
                r: 10
            }, {
                cN: "function",
                b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
                rB: !0,
                c: [e.inherit(e.TM, {
                    b: /\w[\w\d_]*/
                })],
                r: 0
            }, e.HCM, e.NM, r, n, t]
        }
    }), e.aa("coffeescript", function(e) {
        var t = {
                keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
                literal: "true false null undefined yes no on off",
                built_in: "npm require console print module global window document"
            },
            r = "[A-Za-z$_][0-9A-Za-z$_]*",
            n = {
                cN: "subst",
                b: /#\{/,
                e: /}/,
                k: t
            },
            i = [e.BNM, e.inherit(e.CNM, {
                starts: {
                    e: "(\\s*/)?",
                    r: 0
                }
            }), {
                cN: "string",
                v: [{
                    b: /'''/,
                    e: /'''/,
                    c: [e.BE]
                }, {
                    b: /'/,
                    e: /'/,
                    c: [e.BE]
                }, {
                    b: /"""/,
                    e: /"""/,
                    c: [e.BE, n]
                }, {
                    b: /"/,
                    e: /"/,
                    c: [e.BE, n]
                }]
            }, {
                cN: "regexp",
                v: [{
                    b: "///",
                    e: "///",
                    c: [n, e.HCM]
                }, {
                    b: "//[gim]*",
                    r: 0
                }, {
                    b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
                }]
            }, {
                cN: "property",
                b: "@" + r
            }, {
                b: "`",
                e: "`",
                eB: !0,
                eE: !0,
                sL: "javascript"
            }];
        n.c = i;
        var a = e.inherit(e.TM, {
                b: r
            }),
            s = "(\\(.*\\))?\\s*\\B[-=]>",
            o = {
                cN: "params",
                b: "\\([^\\(]",
                rB: !0,
                c: [{
                    b: /\(/,
                    e: /\)/,
                    k: t,
                    c: ["self"].concat(i)
                }]
            };
        return {
            aliases: ["coffee", "cson", "iced"],
            k: t,
            i: /\/\*/,
            c: i.concat([e.C("###", "###"), e.HCM, {
                cN: "function",
                b: "^\\s*" + r + "\\s*=\\s*" + s,
                e: "[-=]>",
                rB: !0,
                c: [a, o]
            }, {
                b: /[:\(,=]\s*/,
                r: 0,
                c: [{
                    cN: "function",
                    b: s,
                    e: "[-=]>",
                    rB: !0,
                    c: [o]
                }]
            }, {
                cN: "class",
                bK: "class",
                e: "$",
                i: /[:="\[\]]/,
                c: [{
                    bK: "extends",
                    eW: !0,
                    i: /[:="\[\]]/,
                    c: [a]
                }, a]
            }, {
                cN: "attribute",
                b: r + ":",
                e: ":",
                rB: !0,
                rE: !0,
                r: 0
            }])
        }
    }), e.aa("cpp", function(e) {
        var t = {
                cN: "keyword",
                b: "\\b[a-z\\d_]*_t\\b"
            },
            r = {
                cN: "string",
                v: [e.inherit(e.QSM, {
                    b: '((u8?|U)|L)?"'
                }), {
                    b: '(u8?|U)?R"',
                    e: '"',
                    c: [e.BE]
                }, {
                    b: "'\\\\?.",
                    e: "'",
                    i: "."
                }]
            },
            n = {
                cN: "number",
                v: [{
                    b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
                }, {
                    b: e.CNR
                }]
            },
            i = {
                cN: "preprocessor",
                b: "#",
                e: "$",
                k: "if else elif endif define undef warning error line pragma ifdef ifndef",
                c: [{
                    b: /\\\n/,
                    r: 0
                }, {
                    bK: "include",
                    e: "$",
                    c: [r, {
                        cN: "string",
                        b: "<",
                        e: ">",
                        i: "\\n"
                    }]
                }, r, n, e.CLCM, e.CBCM]
            },
            a = e.IR + "\\s*\\(",
            s = {
                keyword: "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong",
                built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf",
                literal: "true false nullptr NULL"
            };
        return {
            aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
            k: s,
            i: "</",
            c: [t, e.CLCM, e.CBCM, n, r, i, {
                b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
                e: ">",
                k: s,
                c: ["self", t]
            }, {
                b: e.IR + "::",
                k: s
            }, {
                bK: "new throw return else",
                r: 0
            }, {
                cN: "function",
                b: "(" + e.IR + "[\\*&\\s]+)+" + a,
                rB: !0,
                e: /[{;=]/,
                eE: !0,
                k: s,
                i: /[^\w\s\*&]/,
                c: [{
                    b: a,
                    rB: !0,
                    c: [e.TM],
                    r: 0
                }, {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    k: s,
                    r: 0,
                    c: [e.CLCM, e.CBCM, r, n]
                }, e.CLCM, e.CBCM, i]
            }]
        }
    }), e.aa("cs", function(e) {
        var t = "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield",
            r = e.IR + "(<" + e.IR + ">)?";
        return {
            aliases: ["csharp"],
            k: t,
            i: /::/,
            c: [e.C("///", "$", {
                rB: !0,
                c: [{
                    cN: "xmlDocTag",
                    v: [{
                        b: "///",
                        r: 0
                    }, {
                        b: "<!--|-->"
                    }, {
                        b: "</?",
                        e: ">"
                    }]
                }]
            }), e.CLCM, e.CBCM, {
                cN: "preprocessor",
                b: "#",
                e: "$",
                k: "if else elif endif define undef warning error line region endregion pragma checksum"
            }, {
                cN: "string",
                b: '@"',
                e: '"',
                c: [{
                    b: '""'
                }]
            }, e.ASM, e.QSM, e.CNM, {
                bK: "class interface",
                e: /[{;=]/,
                i: /[^\s:]/,
                c: [e.TM, e.CLCM, e.CBCM]
            }, {
                bK: "namespace",
                e: /[{;=]/,
                i: /[^\s:]/,
                c: [{
                    cN: "title",
                    b: "[a-zA-Z](\\.?\\w)*",
                    r: 0
                }, e.CLCM, e.CBCM]
            }, {
                bK: "new return throw await",
                r: 0
            }, {
                cN: "function",
                b: "(" + r + "\\s+)+" + e.IR + "\\s*\\(",
                rB: !0,
                e: /[{;=]/,
                eE: !0,
                k: t,
                c: [{
                    b: e.IR + "\\s*\\(",
                    rB: !0,
                    c: [e.TM],
                    r: 0
                }, {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    eB: !0,
                    eE: !0,
                    k: t,
                    r: 0,
                    c: [e.ASM, e.QSM, e.CNM, e.CBCM]
                }, e.CLCM, e.CBCM]
            }]
        }
    }), e.aa("css", function(e) {
        var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
            r = {
                cN: "function",
                b: t + "\\(",
                rB: !0,
                eE: !0,
                e: "\\("
            },
            n = {
                cN: "rule",
                b: /[A-Z\_\.\-]+\s*:/,
                rB: !0,
                e: ";",
                eW: !0,
                c: [{
                    cN: "attribute",
                    b: /\S/,
                    e: ":",
                    eE: !0,
                    starts: {
                        cN: "value",
                        eW: !0,
                        eE: !0,
                        c: [r, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                            cN: "hexcolor",
                            b: "#[0-9A-Fa-f]+"
                        }, {
                            cN: "important",
                            b: "!important"
                        }]
                    }
                }]
            };
        return {
            cI: !0,
            i: /[=\/|'\$]/,
            c: [e.CBCM, n, {
                cN: "id",
                b: /\#[A-Za-z0-9_-]+/
            }, {
                cN: "class",
                b: /\.[A-Za-z0-9_-]+/
            }, {
                cN: "attr_selector",
                b: /\[/,
                e: /\]/,
                i: "$"
            }, {
                cN: "pseudo",
                b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"']+/
            }, {
                cN: "at_rule",
                b: "@(font-face|page)",
                l: "[a-z-]+",
                k: "font-face page"
            }, {
                cN: "at_rule",
                b: "@",
                e: "[{;]",
                c: [{
                    cN: "keyword",
                    b: /\S+/
                }, {
                    b: /\s/,
                    eW: !0,
                    eE: !0,
                    r: 0,
                    c: [r, e.ASM, e.QSM, e.CSSNM]
                }]
            }, {
                cN: "tag",
                b: t,
                r: 0
            }, {
                cN: "rules",
                b: "{",
                e: "}",
                i: /\S/,
                c: [e.CBCM, n]
            }]
        }
    }), e.aa("diff", function(e) {
        return {
            aliases: ["patch"],
            c: [{
                cN: "chunk",
                r: 10,
                v: [{
                    b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/
                }, {
                    b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
                }, {
                    b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
                }]
            }, {
                cN: "header",
                v: [{
                    b: /Index: /,
                    e: /$/
                }, {
                    b: /=====/,
                    e: /=====$/
                }, {
                    b: /^\-\-\-/,
                    e: /$/
                }, {
                    b: /^\*{3} /,
                    e: /$/
                }, {
                    b: /^\+\+\+/,
                    e: /$/
                }, {
                    b: /\*{5}/,
                    e: /\*{5}$/
                }]
            }, {
                cN: "addition",
                b: "^\\+",
                e: "$"
            }, {
                cN: "deletion",
                b: "^\\-",
                e: "$"
            }, {
                cN: "change",
                b: "^\\!",
                e: "$"
            }]
        }
    }), e.aa("http", function(e) {
        return {
            aliases: ["https"],
            i: "\\S",
            c: [{
                cN: "status",
                b: "^HTTP/[0-9\\.]+",
                e: "$",
                c: [{
                    cN: "number",
                    b: "\\b\\d{3}\\b"
                }]
            }, {
                cN: "request",
                b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
                rB: !0,
                e: "$",
                c: [{
                    cN: "string",
                    b: " ",
                    e: " ",
                    eB: !0,
                    eE: !0
                }]
            }, {
                cN: "attribute",
                b: "^\\w",
                e: ": ",
                eE: !0,
                i: "\\n|\\s|=",
                starts: {
                    cN: "string",
                    e: "$"
                }
            }, {
                b: "\\n\\n",
                starts: {
                    sL: [],
                    eW: !0
                }
            }]
        }
    }), e.aa("ini", function(e) {
        var t = {
            cN: "string",
            c: [e.BE],
            v: [{
                b: "'''",
                e: "'''",
                r: 10
            }, {
                b: '"""',
                e: '"""',
                r: 10
            }, {
                b: '"',
                e: '"'
            }, {
                b: "'",
                e: "'"
            }]
        };
        return {
            aliases: ["toml"],
            cI: !0,
            i: /\S/,
            c: [e.C(";", "$"), e.HCM, {
                cN: "title",
                b: /^\s*\[+/,
                e: /\]+/
            }, {
                cN: "setting",
                b: /^[a-z0-9\[\]_-]+\s*=\s*/,
                e: "$",
                c: [{
                    cN: "value",
                    eW: !0,
                    k: "on off true false yes no",
                    c: [{
                        cN: "variable",
                        v: [{
                            b: /\$[\w\d"][\w\d_]*/
                        }, {
                            b: /\$\{(.*?)}/
                        }]
                    }, t, {
                        cN: "number",
                        b: /([\+\-]+)?[\d]+_[\d_]+/
                    }, e.NM],
                    r: 0
                }]
            }]
        }
    }), e.aa("java", function(e) {
        var t = e.UIR + "(<" + e.UIR + ">)?",
            r = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",
            n = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
            i = {
                cN: "number",
                b: n,
                r: 0
            };
        return {
            aliases: ["jsp"],
            k: r,
            i: /<\/|#/,
            c: [e.C("/\\*\\*", "\\*/", {
                r: 0,
                c: [{
                    cN: "doctag",
                    b: "@[A-Za-z]+"
                }]
            }), e.CLCM, e.CBCM, e.ASM, e.QSM, {
                cN: "class",
                bK: "class interface",
                e: /[{;=]/,
                eE: !0,
                k: "class interface",
                i: /[:"\[\]]/,
                c: [{
                    bK: "extends implements"
                }, e.UTM]
            }, {
                bK: "new throw return else",
                r: 0
            }, {
                cN: "function",
                b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(",
                rB: !0,
                e: /[{;=]/,
                eE: !0,
                k: r,
                c: [{
                    b: e.UIR + "\\s*\\(",
                    rB: !0,
                    r: 0,
                    c: [e.UTM]
                }, {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    k: r,
                    r: 0,
                    c: [e.ASM, e.QSM, e.CNM, e.CBCM]
                }, e.CLCM, e.CBCM]
            }, i, {
                cN: "annotation",
                b: "@[A-Za-z]+"
            }]
        }
    }), e.aa("javascript", function(e) {
        return {
            aliases: ["js"],
            k: {
                keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await",
                literal: "true false null undefined NaN Infinity",
                built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
            },
            c: [{
                cN: "pi",
                r: 10,
                b: /^\s*['"]use (strict|asm)['"]/
            }, e.ASM, e.QSM, {
                cN: "string",
                b: "`",
                e: "`",
                c: [e.BE, {
                    cN: "subst",
                    b: "\\$\\{",
                    e: "\\}"
                }]
            }, e.CLCM, e.CBCM, {
                cN: "number",
                v: [{
                    b: "\\b(0[bB][01]+)"
                }, {
                    b: "\\b(0[oO][0-7]+)"
                }, {
                    b: e.CNR
                }],
                r: 0
            }, {
                b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
                k: "return throw case",
                c: [e.CLCM, e.CBCM, e.RM, {
                    b: /</,
                    e: />\s*[);\]]/,
                    r: 0,
                    sL: "xml"
                }],
                r: 0
            }, {
                cN: "function",
                bK: "function",
                e: /\{/,
                eE: !0,
                c: [e.inherit(e.TM, {
                    b: /[A-Za-z$_][0-9A-Za-z$_]*/
                }), {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    eB: !0,
                    eE: !0,
                    c: [e.CLCM, e.CBCM]
                }],
                i: /\[|%/
            }, {
                b: /\$[(.]/
            }, {
                b: "\\." + e.IR,
                r: 0
            }, {
                bK: "import",
                e: "[;$]",
                k: "import from as",
                c: [e.ASM, e.QSM]
            }, {
                cN: "class",
                bK: "class",
                e: /[{;=]/,
                eE: !0,
                i: /[:"\[\]]/,
                c: [{
                    bK: "extends"
                }, e.UTM]
            }],
            i: /#/
        }
    }), e.aa("json", function(e) {
        var t = {
                literal: "true false null"
            },
            r = [e.QSM, e.CNM],
            n = {
                cN: "value",
                e: ",",
                eW: !0,
                eE: !0,
                c: r,
                k: t
            },
            i = {
                b: "{",
                e: "}",
                c: [{
                    cN: "attribute",
                    b: '\\s*"',
                    e: '"\\s*:\\s*',
                    eB: !0,
                    eE: !0,
                    c: [e.BE],
                    i: "\\n",
                    starts: n
                }],
                i: "\\S"
            },
            a = {
                b: "\\[",
                e: "\\]",
                c: [e.inherit(n, {
                    cN: null
                })],
                i: "\\S"
            };
        return r.splice(r.length, 0, i, a), {
            c: r,
            k: t,
            i: "\\S"
        }
    }), e.aa("makefile", function(e) {
        var t = {
            cN: "variable",
            b: /\$\(/,
            e: /\)/,
            c: [e.BE]
        };
        return {
            aliases: ["mk", "mak"],
            c: [e.HCM, {
                b: /^\w+\s*\W*=/,
                rB: !0,
                r: 0,
                starts: {
                    cN: "constant",
                    e: /\s*\W*=/,
                    eE: !0,
                    starts: {
                        e: /$/,
                        r: 0,
                        c: [t]
                    }
                }
            }, {
                cN: "title",
                b: /^[\w]+:\s*$/
            }, {
                cN: "phony",
                b: /^\.PHONY:/,
                e: /$/,
                k: ".PHONY",
                l: /[\.\w]+/
            }, {
                b: /^\t+/,
                e: /$/,
                r: 0,
                c: [e.QSM, t]
            }]
        }
    }), e.aa("xml", function(e) {
        var t = "[A-Za-z0-9\\._:-]+",
            r = {
                b: /<\?(php)?(?!\w)/,
                e: /\?>/,
                sL: "php"
            },
            n = {
                eW: !0,
                i: /</,
                r: 0,
                c: [r, {
                    cN: "attribute",
                    b: t,
                    r: 0
                }, {
                    b: "=",
                    r: 0,
                    c: [{
                        cN: "value",
                        c: [r],
                        v: [{
                            b: /"/,
                            e: /"/
                        }, {
                            b: /'/,
                            e: /'/
                        }, {
                            b: /[^\s\/>]+/
                        }]
                    }]
                }]
            };
        return {
            aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
            cI: !0,
            c: [{
                cN: "doctype",
                b: "<!DOCTYPE",
                e: ">",
                r: 10,
                c: [{
                    b: "\\[",
                    e: "\\]"
                }]
            }, e.C("<!--", "-->", {
                r: 10
            }), {
                cN: "cdata",
                b: "<\\!\\[CDATA\\[",
                e: "\\]\\]>",
                r: 10
            }, {
                cN: "tag",
                b: "<style(?=\\s|>|$)",
                e: ">",
                k: {
                    title: "style"
                },
                c: [n],
                starts: {
                    e: "</style>",
                    rE: !0,
                    sL: "css"
                }
            }, {
                cN: "tag",
                b: "<script(?=\\s|>|$)",
                e: ">",
                k: {
                    title: "script"
                },
                c: [n],
                starts: {
                    e: "</script>",
                    rE: !0,
                    sL: ["actionscript", "javascript", "handlebars"]
                }
            }, r, {
                cN: "pi",
                b: /<\?\w+/,
                e: /\?>/,
                r: 10
            }, {
                cN: "tag",
                b: "</?",
                e: "/?>",
                c: [{
                    cN: "title",
                    b: /[^ \/><\n\t]+/,
                    r: 0
                }, n]
            }]
        }
    }), e.aa("markdown", function(e) {
        return {
            aliases: ["md", "mkdown", "mkd"],
            c: [{
                cN: "header",
                v: [{
                    b: "^#{1,6}",
                    e: "$"
                }, {
                    b: "^.+?\\n[=-]{2,}$"
                }]
            }, {
                b: "<",
                e: ">",
                sL: "xml",
                r: 0
            }, {
                cN: "bullet",
                b: "^([*+-]|(\\d+\\.))\\s+"
            }, {
                cN: "strong",
                b: "[*_]{2}.+?[*_]{2}"
            }, {
                cN: "emphasis",
                v: [{
                    b: "\\*.+?\\*"
                }, {
                    b: "_.+?_",
                    r: 0
                }]
            }, {
                cN: "blockquote",
                b: "^>\\s+",
                e: "$"
            }, {
                cN: "code",
                v: [{
                    b: "`.+?`"
                }, {
                    b: "^( {4}|	)",
                    e: "$",
                    r: 0
                }]
            }, {
                cN: "horizontal_rule",
                b: "^[-\\*]{3,}",
                e: "$"
            }, {
                b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
                rB: !0,
                c: [{
                    cN: "link_label",
                    b: "\\[",
                    e: "\\]",
                    eB: !0,
                    rE: !0,
                    r: 0
                }, {
                    cN: "link_url",
                    b: "\\]\\(",
                    e: "\\)",
                    eB: !0,
                    eE: !0
                }, {
                    cN: "link_reference",
                    b: "\\]\\[",
                    e: "\\]",
                    eB: !0,
                    eE: !0
                }],
                r: 10
            }, {
                b: "^\\[.+\\]:",
                rB: !0,
                c: [{
                    cN: "link_reference",
                    b: "\\[",
                    e: "\\]:",
                    eB: !0,
                    eE: !0,
                    starts: {
                        cN: "link_url",
                        e: "$"
                    }
                }]
            }]
        }
    }), e.aa("nginx", function(e) {
        var t = {
                cN: "variable",
                v: [{
                    b: /\$\d+/
                }, {
                    b: /\$\{/,
                    e: /}/
                }, {
                    b: "[\\$\\@]" + e.UIR
                }]
            },
            r = {
                eW: !0,
                l: "[a-z/_]+",
                k: {
                    built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
                },
                r: 0,
                i: "=>",
                c: [e.HCM, {
                    cN: "string",
                    c: [e.BE, t],
                    v: [{
                        b: /"/,
                        e: /"/
                    }, {
                        b: /'/,
                        e: /'/
                    }]
                }, {
                    cN: "url",
                    b: "([a-z]+):/",
                    e: "\\s",
                    eW: !0,
                    eE: !0,
                    c: [t]
                }, {
                    cN: "regexp",
                    c: [e.BE, t],
                    v: [{
                        b: "\\s\\^",
                        e: "\\s|{|;",
                        rE: !0
                    }, {
                        b: "~\\*?\\s+",
                        e: "\\s|{|;",
                        rE: !0
                    }, {
                        b: "\\*(\\.[a-z\\-]+)+"
                    }, {
                        b: "([a-z\\-]+\\.)+\\*"
                    }]
                }, {
                    cN: "number",
                    b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
                }, {
                    cN: "number",
                    b: "\\b\\d+[kKmMgGdshdwy]*\\b",
                    r: 0
                }, t]
            };
        return {
            aliases: ["nginxconf"],
            c: [e.HCM, {
                b: e.UIR + "\\s",
                e: ";|{",
                rB: !0,
                c: [{
                    cN: "title",
                    b: e.UIR,
                    starts: r
                }],
                r: 0
            }],
            i: "[^\\s\\}]"
        }
    }), e.aa("objectivec", function(e) {
        var t = {
                cN: "built_in",
                b: "(AV|CA|CF|CG|CI|MK|MP|NS|UI)\\w+"
            },
            r = {
                keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",
                literal: "false true FALSE TRUE nil YES NO NULL",
                built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
            },
            n = /[a-zA-Z@][a-zA-Z0-9_]*/,
            i = "@interface @class @protocol @implementation";
        return {
            aliases: ["mm", "objc", "obj-c"],
            k: r,
            l: n,
            i: "</",
            c: [t, e.CLCM, e.CBCM, e.CNM, e.QSM, {
                cN: "string",
                v: [{
                    b: '@"',
                    e: '"',
                    i: "\\n",
                    c: [e.BE]
                }, {
                    b: "'",
                    e: "[^\\\\]'",
                    i: "[^\\\\][^']"
                }]
            }, {
                cN: "preprocessor",
                b: "#",
                e: "$",
                c: [{
                    cN: "title",
                    v: [{
                        b: '"',
                        e: '"'
                    }, {
                        b: "<",
                        e: ">"
                    }]
                }]
            }, {
                cN: "class",
                b: "(" + i.split(" ").join("|") + ")\\b",
                e: "({|$)",
                eE: !0,
                k: i,
                l: n,
                c: [e.UTM]
            }, {
                cN: "variable",
                b: "\\." + e.UIR,
                r: 0
            }]
        }
    }), e.aa("perl", function(e) {
        var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
            r = {
                cN: "subst",
                b: "[$@]\\{",
                e: "\\}",
                k: t
            },
            n = {
                b: "->{",
                e: "}"
            },
            i = {
                cN: "variable",
                v: [{
                    b: /\$\d/
                }, {
                    b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/
                }, {
                    b: /[\$%@][^\s\w{]/,
                    r: 0
                }]
            },
            a = [e.BE, r, i],
            s = [i, e.HCM, e.C("^\\=\\w", "\\=cut", {
                eW: !0
            }), n, {
                cN: "string",
                c: a,
                v: [{
                    b: "q[qwxr]?\\s*\\(",
                    e: "\\)",
                    r: 5
                }, {
                    b: "q[qwxr]?\\s*\\[",
                    e: "\\]",
                    r: 5
                }, {
                    b: "q[qwxr]?\\s*\\{",
                    e: "\\}",
                    r: 5
                }, {
                    b: "q[qwxr]?\\s*\\|",
                    e: "\\|",
                    r: 5
                }, {
                    b: "q[qwxr]?\\s*\\<",
                    e: "\\>",
                    r: 5
                }, {
                    b: "qw\\s+q",
                    e: "q",
                    r: 5
                }, {
                    b: "'",
                    e: "'",
                    c: [e.BE]
                }, {
                    b: '"',
                    e: '"'
                }, {
                    b: "`",
                    e: "`",
                    c: [e.BE]
                }, {
                    b: "{\\w+}",
                    c: [],
                    r: 0
                }, {
                    b: "-?\\w+\\s*\\=\\>",
                    c: [],
                    r: 0
                }]
            }, {
                cN: "number",
                b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                r: 0
            }, {
                b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
                k: "split return print reverse grep",
                r: 0,
                c: [e.HCM, {
                    cN: "regexp",
                    b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
                    r: 10
                }, {
                    cN: "regexp",
                    b: "(m|qr)?/",
                    e: "/[a-z]*",
                    c: [e.BE],
                    r: 0
                }]
            }, {
                cN: "sub",
                bK: "sub",
                e: "(\\s*\\(.*?\\))?[;{]",
                r: 5
            }, {
                cN: "operator",
                b: "-\\w\\b",
                r: 0
            }, {
                b: "^__DATA__$",
                e: "^__END__$",
                sL: "mojolicious",
                c: [{
                    b: "^@@.*",
                    e: "$",
                    cN: "comment"
                }]
            }];
        return r.c = s, n.c = s, {
            aliases: ["pl"],
            k: t,
            c: s
        }
    }), e.aa("php", function(e) {
        var t = {
                cN: "variable",
                b: "\\$+[a-zA-Z_-\xff][a-zA-Z0-9_-\xff]*"
            },
            r = {
                cN: "preprocessor",
                b: /<\?(php)?|\?>/
            },
            n = {
                cN: "string",
                c: [e.BE, r],
                v: [{
                    b: 'b"',
                    e: '"'
                }, {
                    b: "b'",
                    e: "'"
                }, e.inherit(e.ASM, {
                    i: null
                }), e.inherit(e.QSM, {
                    i: null
                })]
            },
            i = {
                v: [e.BNM, e.CNM]
            };
        return {
            aliases: ["php3", "php4", "php5", "php6"],
            cI: !0,
            k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
            c: [e.CLCM, e.HCM, e.C("/\\*", "\\*/", {
                c: [{
                    cN: "doctag",
                    b: "@[A-Za-z]+"
                }, r]
            }), e.C("__halt_compiler.+?;", !1, {
                eW: !0,
                k: "__halt_compiler",
                l: e.UIR
            }), {
                cN: "string",
                b: /<<<['"]?\w+['"]?$/,
                e: /^\w+;?$/,
                c: [e.BE, {
                    cN: "subst",
                    v: [{
                        b: /\$\w+/
                    }, {
                        b: /\{\$/,
                        e: /\}/
                    }]
                }]
            }, r, t, {
                b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
            }, {
                cN: "function",
                bK: "function",
                e: /[;{]/,
                eE: !0,
                i: "\\$|\\[|%",
                c: [e.UTM, {
                    cN: "params",
                    b: "\\(",
                    e: "\\)",
                    c: ["self", t, e.CBCM, n, i]
                }]
            }, {
                cN: "class",
                bK: "class interface",
                e: "{",
                eE: !0,
                i: /[:\(\$"]/,
                c: [{
                    bK: "extends implements"
                }, e.UTM]
            }, {
                bK: "namespace",
                e: ";",
                i: /[\.']/,
                c: [e.UTM]
            }, {
                bK: "use",
                e: ";",
                c: [e.UTM]
            }, {
                b: "=>"
            }, n, i]
        }
    }), e.aa("python", function(e) {
        var t = {
                cN: "prompt",
                b: /^(>>>|\.\.\.) /
            },
            r = {
                cN: "string",
                c: [e.BE],
                v: [{
                    b: /(u|b)?r?'''/,
                    e: /'''/,
                    c: [t],
                    r: 10
                }, {
                    b: /(u|b)?r?"""/,
                    e: /"""/,
                    c: [t],
                    r: 10
                }, {
                    b: /(u|r|ur)'/,
                    e: /'/,
                    r: 10
                }, {
                    b: /(u|r|ur)"/,
                    e: /"/,
                    r: 10
                }, {
                    b: /(b|br)'/,
                    e: /'/
                }, {
                    b: /(b|br)"/,
                    e: /"/
                }, e.ASM, e.QSM]
            },
            n = {
                cN: "number",
                r: 0,
                v: [{
                    b: e.BNR + "[lLjJ]?"
                }, {
                    b: "\\b(0o[0-7]+)[lLjJ]?"
                }, {
                    b: e.CNR + "[lLjJ]?"
                }]
            },
            i = {
                cN: "params",
                b: /\(/,
                e: /\)/,
                c: ["self", t, n, r]
            };
        return {
            aliases: ["py", "gyp"],
            k: {
                keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
                built_in: "Ellipsis NotImplemented"
            },
            i: /(<\/|->|\?)/,
            c: [t, n, r, e.HCM, {
                v: [{
                    cN: "function",
                    bK: "def",
                    r: 10
                }, {
                    cN: "class",
                    bK: "class"
                }],
                e: /:/,
                i: /[${=;\n,]/,
                c: [e.UTM, i]
            }, {
                cN: "decorator",
                b: /^[\t ]*@/,
                e: /$/
            }, {
                b: /\b(print|exec)\(/
            }]
        }
    }), e.aa("ruby", function(e) {
        var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
            r = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
            n = {
                cN: "doctag",
                b: "@[A-Za-z]+"
            },
            i = {
                cN: "value",
                b: "#<",
                e: ">"
            },
            a = [e.C("#", "$", {
                c: [n]
            }), e.C("^\\=begin", "^\\=end", {
                c: [n],
                r: 10
            }), e.C("^__END__", "\\n$")],
            s = {
                cN: "subst",
                b: "#\\{",
                e: "}",
                k: r
            },
            o = {
                cN: "string",
                c: [e.BE, s],
                v: [{
                    b: /'/,
                    e: /'/
                }, {
                    b: /"/,
                    e: /"/
                }, {
                    b: /`/,
                    e: /`/
                }, {
                    b: "%[qQwWx]?\\(",
                    e: "\\)"
                }, {
                    b: "%[qQwWx]?\\[",
                    e: "\\]"
                }, {
                    b: "%[qQwWx]?{",
                    e: "}"
                }, {
                    b: "%[qQwWx]?<",
                    e: ">"
                }, {
                    b: "%[qQwWx]?/",
                    e: "/"
                }, {
                    b: "%[qQwWx]?%",
                    e: "%"
                }, {
                    b: "%[qQwWx]?-",
                    e: "-"
                }, {
                    b: "%[qQwWx]?\\|",
                    e: "\\|"
                }, {
                    b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
                }]
            },
            c = {
                cN: "params",
                b: "\\(",
                e: "\\)",
                k: r
            },
            l = [o, i, {
                cN: "class",
                bK: "class module",
                e: "$|;",
                i: /=/,
                c: [e.inherit(e.TM, {
                    b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
                }), {
                    cN: "inheritance",
                    b: "<\\s*",
                    c: [{
                        cN: "parent",
                        b: "(" + e.IR + "::)?" + e.IR
                    }]
                }].concat(a)
            }, {
                cN: "function",
                bK: "def",
                e: "$|;",
                c: [e.inherit(e.TM, {
                    b: t
                }), c].concat(a)
            }, {
                cN: "constant",
                b: "(::)?(\\b[A-Z]\\w*(::)?)+",
                r: 0
            }, {
                cN: "symbol",
                b: e.UIR + "(\\!|\\?)?:",
                r: 0
            }, {
                cN: "symbol",
                b: ":",
                c: [o, {
                    b: t
                }],
                r: 0
            }, {
                cN: "number",
                b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                r: 0
            }, {
                cN: "variable",
                b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
            }, {
                b: "(" + e.RSR + ")\\s*",
                c: [i, {
                    cN: "regexp",
                    c: [e.BE, s],
                    i: /\n/,
                    v: [{
                        b: "/",
                        e: "/[a-z]*"
                    }, {
                        b: "%r{",
                        e: "}[a-z]*"
                    }, {
                        b: "%r\\(",
                        e: "\\)[a-z]*"
                    }, {
                        b: "%r!",
                        e: "![a-z]*"
                    }, {
                        b: "%r\\[",
                        e: "\\][a-z]*"
                    }]
                }].concat(a),
                r: 0
            }].concat(a);
        s.c = l, c.c = l;
        var u = "[>?]>",
            d = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
            p = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
            h = [{
                b: /^\s*=>/,
                cN: "status",
                starts: {
                    e: "$",
                    c: l
                }
            }, {
                cN: "prompt",
                b: "^(" + u + "|" + d + "|" + p + ")",
                starts: {
                    e: "$",
                    c: l
                }
            }];
        return {
            aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
            k: r,
            c: a.concat(h).concat(l)
        }
    }), e.aa("sql", function(e) {
        var t = e.C("--", "$");
        return {
            cI: !0,
            i: /[<>{}*]/,
            c: [{
                cN: "operator",
                bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load rp select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",
                e: /;/,
                eW: !0,
                k: {
                    keyword: "abort",
                    literal: "true false null",
                    built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
                },
                c: [{
                    cN: "string",
                    b: "'",
                    e: "'",
                    c: [e.BE, {
                        b: "''"
                    }]
                }, {
                    cN: "string",
                    b: '"',
                    e: '"',
                    c: [e.BE, {
                        b: '""'
                    }]
                }, {
                    cN: "string",
                    b: "`",
                    e: "`",
                    c: [e.BE]
                }, e.CNM, e.CBCM, t]
            }, e.CBCM, t]
        }
    }), e
});
