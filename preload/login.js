module.exports = (function() {
  const { ipcRenderer: e } = require("electron"),
    t = require("./qrcode.js"),
    { passwdLoginPage: o } = require("./paths.js"),
    { getRandomNumberBetween: n } = require("./util.js"),
    { getCaptchaText: r } = require("./captcha.js"),
    c = document.createElement.bind(document),
    i = async () => {
      const o = await new Promise(e => {
          const t = new MutationObserver(() => {
            const o = document.querySelector("#ddlogin-iframe");
            o && (t.disconnect(), e(o.contentWindow));
          });
          t.observe(document.querySelector("#ddlogin"), { childList: !0 });
        }),
        n = await new Promise(e => {
          const t = setInterval(() => {
            o.currentCode && (e(o.currentCode), clearInterval(t));
          }, 1e3);
        });
      (e => {
        const t = e.document.querySelector(".login_qrcode_refresh");
        new MutationObserver(() => {
          "block" == t.style.display && top.location.reload();
        }).observe(t, { attributes: !0 });
      })(o)
      const r = new URL(o.GOTO).searchParams,
        c = r.get("appid"),
        i = r.get("redirect_uri"),
        s = `https://oapi.dingtalk.com/connect/qrcommit?showmenu=false&code=${n}&appid=${c}&redirect_uri=${encodeURIComponent(
          i
        )}`,
        d = await t.generatePromise(s, { small: !0 });
      return (
        console.log(s),
        e.send("log", `\n请使用学习强国APP扫码登录:\n${d}\n`),
        e.send("log", `或者使用学习强国APP打开此链接:\n${s}\n`),
        s
      );
    },
    s = /^(?:(\+\d+)-)?(\d+)$/;

  
  const beautify = () => {
    const header = document.createElement('div');
    // header.innerHTML = '亲爱的希希'
    header.style.color = '#FF0000';
    header.style.textAlign = 'center';

    const app = document.body.querySelector('#app');
    app.prepend(header);

    // document.querySelector("#ddlogin-iframe").contentWindow.document.querySelector('.login_content').style.background = 'transparent';
  }


  return {
    onLogin: () => {
      document.querySelectorAll(".header, .redflagbox, .footer").forEach(e => {
        e.style.display = "none";
      }),
        e.sendSync("isHeadless") && i();
      const t = c("a");
      (t.href = o),
        // (t.style.color = "#2db7f5"),
        // (t.text = "使用用户名和密码登录123"),
        document.querySelector(".ddlogintext").append(c("br"), c("br"), t),
        document.querySelector(".ddlogintext").prepend('希希同学，'),
        document.querySelector(".ddlogintext").style.color = '#fff',
        [document.documentElement, document.body].forEach(e => {
          e.style.minWidth = "unset";
          e.style.display = 'flex';
          e.style.justifyContent = 'center';
          e.style.alignItems = 'center';
          e.style.background="#333333"
          // e.style.background='url("http://hbfile.huabanimg.com/img/home/banner/031537c507ec8cbb6c9e912a8694117baabcc39ca28db")';
          e.style.backgroundRepeat="no-repeat";
          e.style.backgroundSize="cover";
        });
        beautify();
        
    },
    isLoggedIn: () => document.cookie.includes("token="),
    onAutoLogin: e => {
      if (!e) return;
      const { userName: t, passwd: o } = e,
        c = t.match(s);
      if (!c) return;
      const i = c[1],
        d = c[2],
        u = document.querySelector("#mobile"),
        l = document.querySelector("#pwd");
      [u, l].forEach(e => e.previousElementSibling.click()),
        (u.value = d),
        (l.value = o),
        i && (document.querySelector("#countryCode").value = i);
      const a = document.querySelector("#loginBtn");
      setTimeout(() => {
        a.click();
      }, 1e3 * (10 + n(0, 3)));
      const m = document.querySelector(".indentify_content > img"),
        y = document.querySelector("#identifyCode");
      new MutationObserver(async () => {
        if (m.src) {
          const e = await r(m.src);
          (y.value = e), a.click();
        }
      }).observe(m, { attributes: !0, attributeFilter: ["src"] });
    }
  };
})();
