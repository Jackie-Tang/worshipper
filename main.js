!(function() {
  const e = require("path"),
    { app: n, BrowserWindow: o, ipcMain: t, Menu: s } = require("electron"),
    { getRandomNumberBetween: a } = require("./preload/util.js"),
    r = require("./preload/flags.js");
  let i = null,
    l = !1;
  const {
    headless: u,
    dev: c,
    multiUser: d,
    userID: w,
    UA: p,
    autoLoginSettings: g,
    proxy: m
  } = r();
  let b = void 0;
  w
    ? (b = `persist:${w}`)
    : g && g.userName
    ? (b = `persist:user-${g.userName}`)
    : (!d && n.requestSingleInstanceLock()) || (b = `${Math.random()}`);
  const h = e => {
      s.setApplicationMenu(s.buildFromTemplate(e));
    },
    k = [{ label: "学习强国" }, { label: `v${n.getVersion()}` }];
  let f = [];
  n.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required"),
    n.on("window-all-closed", function() {
      n.quit();
    }),
    n.on("ready", function() {
      if (
        ((i = new o({
          title: "学习强国",
          width: 1e3,
          height: 600,
          show: !1,
          icon: e.join(__dirname, "logo.jpeg"),
          webPreferences: {
            nodeIntegration: !1,
            webSecurity: !u,
            preload: e.join(__dirname, "preload/preload.js"),
            partition: b,
            backgroundThrottling: !1
          }
        })),
        h(k),
        !c && i.webContents.openDevTools(),
        p)
      )
        i.webContents.setUserAgent(p);
      else {
        const e = i.webContents
          .getUserAgent()
          .replace(/\w+-xuexiqiangguo.+? /, "")
          .replace(/Electron.+? /, "");
        i.webContents.setUserAgent(e);
      }
      if (m) {
        const e = { proxyRules: m };
        i.webContents.session.setProxy(e, () => {});
      }

      i.loadURL("https://www.xuexi.cn/"),
        i.once("ready-to-show", () => {
          i.show();
        }),
        i.on("closed", () => {
          i = null;
        }),
        i.webContents.on("new-window", (e, n) => {
          e.preventDefault(), i.webContents.loadURL(n);
        }),
        i.webContents.setAudioMuted(!0),
        setInterval(async () => {
          await new Promise(e => {
            setTimeout(() => {
              e();
            }, 1e3 * a(0, 2e3));
          }),
            l || i.webContents.reload();
        }, 864e5);
    }),
    t.on("lock", () => {
      l = !0;
    }),
    t.on("unlock", () => {
      l = !1;
    }),
    t.on("islocked", e => {
      e.returnValue = l;
    });
  let x = [];
  t.on("tasks-getAll", e => {
    e.returnValue = x;
  }),
    t.on("tasks-set", (e, n) => {
      x = n;
    }),
    t.on("tasks-add", (e, ...n) => {
      c && console.log(n), x.push(...n);
    }),
    t.on("isHeadless", e => {
      e.returnValue = u;
    }),
    t.on("log", (e, ...n) => {
      console.log(...n);
    });
  t.on("save-cookies", async () => {
    const e = i.webContents.session.cookies,
      n = i.webContents.getURL(),
      o = +new Date() / 1e3 + 31536e4,
      t = t => {
        e.set({ url: n, ...t, expirationDate: o }, e => {
          if (e) throw e;
        });
      };
    e.on("changed", (e, n, o) => {
      ("__UID__" != n.name && "token" != n.name) ||
        !(
          "expired" == o ||
          ("explicit" == o &&
            (e => (e - +new Date() / 1e3) / 86400 / 365)(n.expirationDate) < 8)
        ) ||
        (c && console.log([e, n, o]), t(n));
    }),
      (await (() =>
        new Promise((n, o) => {
          e.get({ domain: "xuexi.cn" }, (e, t) => {
            e
              ? o(e)
              : n(t.filter(e => "__UID__" == e.name || "token" == e.name));
          });
        }))()).forEach(e => {
        t(e);
      });
  }),
    t.on("getAutoLoginSettings", e => {
      e.returnValue = g;
    }),
    t.on("refresh-menu", (e, n) => {
      if (n.score) {
        const { today: e, total: o, types: t } = n.score;
        f = [
          { label: `今日积分: ${e}` },
          { label: `总积分: ${o}` },
          ...t.map(e => ({ label: `${e}` }))
        ];
      }
      h([...k, ...f]);
    });
})();
