module.exports = (function() {
  const e = require("./channels.js"),
    {
      getChannelsData: t,
      getRandomElement: n,
      getRandomNumberBetween: r
    } = require("./util.js");
  let a = null;
  const o = async () => {
      if (a && Array.isArray(a)) return a;
      {
        const n = await t(e.articles);
        return (a = n), n;
      }
    },
    i = async () => {
      const e = await o();
      return n(e);
    },
    s = async () => (await i()).url;
  return {
    getArticleList: o,
    getRandomArticle: i,
    getRandomArticleURL: s,
    viewArticle: async (e = s(), t = 70, n = !0) => {
      const a = await e;
      window.scrollBy({
        top: window.innerHeight + r(-20, 20),
        behavior: "smooth"
      });
      const o = window.setInterval(() => {
        window.scrollBy({ top: r(-5, 10), behavior: "smooth" });
      }, 1e3);
      let i = 1e3 * t;
      n && (i += 10 * Math.random() * 1e3),
        i > 0 &&
          (await new Promise(e => {
            setTimeout(e, i);
          })),
        window.clearInterval(o),
        (location.href = a);
    }
  };
})();
