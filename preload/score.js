module.exports = (function() {
  const { ipcRenderer: e } = require("electron"),
    r = async (e = !1) => {
      const r = e
          ? "https://pc-api.xuexi.cn/open/api/score/today/query"
          : "https://pc-api.xuexi.cn/open/api/score/get",
        t = await fetch(r, { credentials: "include" }),
        a = await t.json();
      if (200 != a.code) throw new Error(a.error);
      return a.data.score;
    },
    t = async () => {
      const e = await fetch(
          "https://pc-api.xuexi.cn/open/api/score/today/queryrate",
          { credentials: "include" }
        ),
        r = await e.json();
      if (200 != r.code) throw new Error(r.error);
      return r.data.dayScoreDtos;
    },
    a = e => e.currentScore >= e.dayMaxScore,
    o = async () => {
      return ((e, r) =>
        r.map(
          ([r, t]) => e.find(e => e.name == r) || e.find(e => e.ruleId == t)
        ))(await t(), [
        ["阅读文章", 1],
        ["视听学习", 2],
        ["文章时长", 1002],
        ["视听学习时长", 1003]
      ]);
    };
  return {
    getScore: r,
    getScoreMethods: t,
    isDone: a,
    getTheGapOf: e => (a(e) ? 0 : e.dayMaxScore - e.currentScore),
    findScoreMethodsByNames: (e, r) => r.map(r => e.find(e => e.name == r)),
    getUsableScoreMethods: o,
    showScore: async () => {
      const t = await r(!0),
        a = await r(),
        n = new Date().toLocaleString("zh-CN", { hour12: !1 }),
        c = (await o()).map(
          e => e.name + "积分: " + e.currentScore + " / " + e.dayMaxScore
        ),
        s = `${n} 今日积分: ${t} 总积分: ${a} ${c.join(" ")}`;
      e.send("log", s);
      const i = { today: t, total: a, types: c };
      return e.send("refresh-menu", { score: i }), i;
    }
  };
})();
