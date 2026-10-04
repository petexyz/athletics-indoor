// Banner artwork and favicon: World Athletics' two official brand colors (orange and purple), used as this
// site's single fixed banner. Pure functions (no DOM) so check.js can test them. app.js draws these onto a canvas.
(function () {
  "use strict";
  const BANDS = ["#FE8A4C", "#B68CFF"];   // World Athletics brand orange, then purple
  const INFO = { bandRatio: 0.667, flutter: false };

  function art(W, H) {
    const bh = H / BANDS.length;
    return BANDS.map((c, i) => ({ t: "rect", x: 0, y: bh * i, w: W, h: bh + 0.5, c }));
  }
  function favicon() {
    const bh = 10 / BANDS.length;
    const rects = BANDS.map((c, i) => "<rect y='" + (bh * i).toFixed(3) + "' width='19' height='" + (bh + 0.1).toFixed(3) + "' fill='" + c + "'/>").join("");
    return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 19 10'>" + rects + "</svg>";
  }

  window.WABanner = { info: INFO, bands: BANDS, art, favicon };
})();
