module.exports = (function() {
  const { app: e, process: t } = require("electron").remote,
    r = require("original-fs"),
    n = require("crypto"),
    i = e.getVersion(),
    s = t.versions.electron,
    a = e.getAppPath(),
    o =
      "https://cdn.jsdelivr.net/gh/fuck-xuexiqiangguo/Fuck-XueXiQiangGuo@master/",
    u = e => {
      const t = (e = e.replace(/^v/, "").replace(/\+.*$/, "")).includes("-")
          ? e.indexOf("-")
          : e.length,
        r = e.slice(0, t).split(".");
      return r.push(e.slice(t + 1)), r;
    },
    c = e => (isNaN(Number(e)) ? e : Number(e)),
    l = (e, t) => {
      const r = u(e),
        n = u(t);
      for (let e = 0; e < Math.max(r.length - 1, n.length - 1); e++) {
        const t = 0 | +r[e],
          i = 0 | +n[e];
        if (t > i) return 1;
        if (i > t) return -1;
      }
      const i = r.slice(-1)[0],
        s = n.slice(-1)[0];
      if (i && s) {
        const e = i.split(".").map(c),
          t = s.split(".").map(c);
        for (let r = 0; r < Math.max(e.length, t.length); r++) {
          if (
            void 0 === e[r] ||
            ("string" == typeof t[r] && "number" == typeof e[r])
          )
            return -1;
          if (
            void 0 === t[r] ||
            ("string" == typeof e[r] && "number" == typeof t[r])
          )
            return 1;
          if (e[r] > t[r]) return 1;
          if (t[r] > e[r]) return -1;
        }
      } else if (i || s) return i ? -1 : 1;
      return 0;
    };
  return async () => {
    const e = await fetch(o + "version.json"),
      { version: t, sha256: u, electron: c } = await e.json();
    if ((l(c, s), l(t, i) >= 1 && a.endsWith(".asar"))) {
      const e = await fetch(o + "app.asar"),
        t = new Uint8Array(await e.arrayBuffer()),
        i = n.createHash("sha256");
      return i.update(t), u == i.digest("hex") && (r.writeFileSync(a, t), !0);
    }
  };
})();
