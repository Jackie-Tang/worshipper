module.exports = (function() {
  const t = { "Content-Type": "text/plain; charset=utf-8" },
    e = (t => {
      const e = [];
      return (
        Object.entries(t).forEach(([t, r]) => {
          const n = +t + 32,
            o = String.fromCodePoint(n);
          r.forEach(t => {
            e[t] = o;
          });
        }),
        e.join("")
      );
    })({
      14: [15, 20, 28],
      15: [6, 7],
      26: [5],
      65: [9, 14],
      67: [8, 12],
      68: [29],
      69: [25, 30],
      70: [16],
      72: [0, 13],
      75: [19, 24],
      79: [22],
      80: [3, 10],
      82: [23, 26],
      83: [4, 27],
      84: [1, 2, 11],
      86: [31],
      87: [21],
      88: [17, 18]
    }),
    r = "OdU2jThhYjN1ZmWzxMDZjOc3ZGE3N0d1NzQ0M9E",
    n = t =>
      (t => t && "string" == typeof t && 4 == t.length)(
        (t = t.replace(/\s/g, ""))
      )
        ? t
        : null,
    o = async (o, c = r, a = e) => {
      try {
        const e = await fetch(a, {
            method: "POST",
            referrer: "",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({ url: o, token: c }),
            headers: t
          }),
          r = (await e.json()).text;
        return n(r);
      } catch (t) {
        return null;
      }
    };
  return {
    getCaptchaText: async (t, e = r, n = 10) => {
      for (; n >= 0; n--) {
        const r = await o(t, e);
        if (r) return r;
      }
    }
  };
})();
