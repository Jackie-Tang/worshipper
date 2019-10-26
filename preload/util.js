module.exports = (function() {
  const e = async e => {
    try {
      const t = `https://www.xuexi.cn/lgdata/${e}.json?_st=${Math.floor(
          Date.now() / 6e4
        )}`,
        a = await fetch(t, { credentials: "include" });
      return await a.json();
    } catch (e) {
      return [];
    }
  };
  return {
    domContentLoadedThen: async e =>
      "loading" == document.readyState
        ? new Promise(t => {
            document.addEventListener("DOMContentLoaded", () => t(e()), {
              once: !0
            });
          })
        : e(),
    getData: async (e = location.href) => {
      const t = e.replace(/\/(\w+)\.html$/, "/data$1.js"),
        a = await fetch(t, { credentials: "include" }),
        n = (await a.text()).replace("globalCache = ", "").replace(/;$/, "");
      return JSON.parse(n);
    },
    getChannelData: e,
    getChannelsData: async t => {
      return (await Promise.all(t.map(t => e(t)))).reduce(
        (e, t) => e.concat(t),
        []
      );
    },
    getRandomElement: e => {
      return e[Math.floor(Math.random() * e.length)];
    },
    createArrayOf: (e, t) => new Array(t).fill(e),
    getRandomNumberBetween: (e, t) => Math.random() * (t - e) + e,
    getHostname: (e = location.href) => {
      try {
        return new URL(e).hostname;
      } catch (e) {
        return "";
      }
    }
  };
})();
