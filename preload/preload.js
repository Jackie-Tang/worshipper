module.exports = (function() {
  const e = require("./paths.js"),
    { ipcRenderer: t } = require("electron"),
    {
      domContentLoadedThen: o,
      createArrayOf: i,
      getHostname: n
    } = require("./util.js"),
    { onLogin: r, isLoggedIn: s, onAutoLogin: a } = require("./login.js"),
    {
      getUsableScoreMethods: d,
      isDone: c,
      getTheGapOf: l,
      showScore: g
    } = require("./score.js"),
    { lock: u, unlock: h, islocked: f } = require("./lock.js"),
    { TaskList: p, taskTypes: k } = require("./tasks.js"),
    m = require("./update.js"),
    q = ["oapi.dingtalk.com", "login.dingtalk.com", "h5.dingtalk.com"],
    j =
      "https://login.dingtalk.com/login/index.htm?goto=" +
      encodeURIComponent(e.passwdLoginPage);
  o(async () => {
    const o = t.sendSync("getAutoLoginSettings");
    if (location.href.startsWith(e.loginPage)) return void r();
    if (location.href.startsWith(j) && o) return void a(o);
    if (q.includes(n())) return;
    if (!s())
      return void (location.href = o
        ? j
        : "https://pc.xuexi.cn/points/login.html?ref=https://www.xuexi.cn/");
    if (!f()) {
      m();
      const [t, o, n, r] = await d();
      if (
        ((p.tasks = []),
        (c(t) && c(n)) || p.add(k[0]),
        p.add(...i(k[1], l(t)), ...i(k[2], l(n))),
        (c(o) && c(r)) || p.add(k[3]),
        p.add(...i(k[4], l(o)), ...i(k[5], l(r))),
        0 == p.tasks.length)
      )
        return;
      if ((u(), location.href.startsWith(e.myStudyPage)))
        return void (location.href = e.homePage);
    }
    g();
    const L = p.getAll();
    p.doAll(L), 0 == L.length && h();
  });
})();
