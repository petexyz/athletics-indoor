// Run:  node check.js      Validates data.js, time.js and the page wiring. Exit code 1 on any failure.
// Adapted from the sister cyclocross project's check.js.
const vm = require("vm"), fs = require("fs");
let failures = 0, passes = 0;
const check = (cond, msg) => { if (cond) passes++; else { failures++; console.log("FAIL: " + msg); } };

const sb = { Intl, Date, Math, URL }; sb.window = sb; vm.createContext(sb);
for (const f of ["data.js", "time.js", "banner.js"]) vm.runInContext(fs.readFileSync(f, "utf8"), sb, { filename: f });
const D = sb.WA, { etTime } = sb.WATime, B = sb.WABanner;
const html = fs.readFileSync("index.html", "utf8"), app = fs.readFileSync("app.js", "utf8"), css = fs.readFileSync("style.css", "utf8");

// --- contrast helper (WCAG) ---
const lum = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4)); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };

// --- series and broadcast ---
const shapeBlock = (app.match(/const SHAPES = \{([\s\S]*?)\n  \};/) || [])[1] || "";
const shapeKeys = [...shapeBlock.matchAll(/(\w+): '</g)].map(m => m[1]);
check(shapeKeys.length >= Object.keys(D.series).length, `app.js defines enough pin shapes (${shapeKeys.join(", ")})`);
for (const [k, s] of Object.entries(D.series)) {
  check(/^#[0-9a-f]{6}$/i.test(s.color), `series ${k}: colour is a 6-digit hex`);
  check(shapeKeys.includes(s.shape), `series ${k}: shape "${s.shape}" exists in app.js`);
  check(contrast("#ffffff", s.color) >= 4.5, `series ${k}: white text on ${s.color} needs 4.5:1, has ${contrast("#ffffff", s.color).toFixed(2)}`);
  const b = D.broadcast[k];
  check(b && b.badge && b.primary && b.detail && b.fallback, `broadcast ${k}: badge, primary, detail and fallback present`);
  check(b && ["listed", "last-season", "unknown"].includes(b.status), `broadcast ${k}: valid status`);
}
check(new Set(Object.values(D.series).map(s => s.shape)).size === Object.keys(D.series).length, "each series has its own pin shape");

// --- events ---
const seen = new Set();
D.events.forEach(e => {
  const id = `${e.d} ${e.n}`;
  check(/^\d{4}-\d{2}-\d{2}$/.test(e.d) && !isNaN(Date.parse(e.d)), `${id}: valid start date`);
  check(!e.e || (/^\d{4}-\d{2}-\d{2}$/.test(e.e) && e.e >= e.d), `${id}: end date on/after start`);
  check(D.series[e.s], `${id}: known series`);
  check(D.geo[e.p], `${id}: coordinates for "${e.p}"`);
  check(/, [A-Z]{3}$/.test(e.p), `${id}: place ends in a 3-letter country code`);
  const key = `${e.d}|${e.s}|${e.p}`; check(!seen.has(key), `${id}: not a duplicate`); seen.add(key);
  const l = Object.assign({}, (D.seriesLinks || {})[e.s] || {}, e.l || {});
  for (const k of ["site", "results"]) if (l[k]) { let u; try { u = new URL(l[k]); } catch (x) {} check(u && u.protocol === "https:", `${id}: ${k} link is a valid https URL`); }
  if (e.b) check(e.b.t && ["listed", "last-season", "unknown"].includes(e.b.s), `${id}: valid broadcast override`);
});
Object.entries(D.geo).forEach(([p, ll]) => check(Array.isArray(ll) && ll[0] >= -90 && ll[0] <= 90 && ll[1] >= -180 && ll[1] <= 180, `geo ${p}: plausible lat/lng`));
check(D.events.length === 6, `event count is 6 (was ${D.events.length})`);
check(new Set(D.events.map(e => e.n)).size === D.events.length, "no duplicate race names");

// --- start times (none published yet, but the mechanism must still work) ---
const eventKeys = new Set(D.events.map(e => `${e.d}|${e.s}`));
Object.entries(D.times || {}).forEach(([k, t]) => {
  check(eventKeys.has(k), `times key ${k} matches an event`);
  for (const w of ["w", "m"]) if (t[w]) check(/^([01]\d|2[0-3]):[0-5]\d$/.test(t[w]), `times ${k}.${w} is HH:MM`);
});
// Eastern conversion sanity check (the mechanism is shared with the cyclocross project and already proven there;
// this just confirms it still works once copied into this project's namespace).
{
  const r = etTime("2027-02-10", "20:00", "Europe/Paris");   // Lievin is on CET (winter time) in February
  check(r.time === "2:00 PM" && r.dayShift === 0, `etTime sanity check -> ${r.time} (want 2:00 PM)`);
}

// --- themes: every text/background pair passes contrast in all three, the two dark definitions match, and
// grey is excluded from the system-preference block ---
const vars = block => Object.fromEntries([...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(m => [m[1], m[2].trim()]));
const pick1 = re => { const m = css.match(re); return m ? vars(m[1]) : null; };
const themes = {
  light: pick1(/:root \{([^}]*)\}/),
  "dark (toggle)": pick1(/:root\[data-theme="dark"\] \{([^}]*)\}/),
  "dark (system)": pick1(/:root:not\(\[data-theme="light"\]\):not\(\[data-theme="grey"\]\) \{([^}]*)\}/),
  grey: pick1(/:root\[data-theme="grey"\] \{([^}]*)\}/)
};
Object.entries(themes).forEach(([name, v]) => {
  check(v && v.bg && v.fg, `theme ${name}: found in style.css`);
  if (!v) return;
  [["fg", "bg", 4.5], ["muted", "bg", 4.5], ["muted", "head", 4.5], ["fg", "head", 4.5], ["warn", "warn-bg", 4.5], ["ok", "bg", 4.5], ["focus", "bg", 3], ["bg", "fg", 4.5]]
    .forEach(([a, b, min]) => check(contrast(v[a], v[b]) >= min, `theme ${name}: ${a} on ${b} needs ${min}:1, has ${contrast(v[a], v[b]).toFixed(2)}`));
});
check(themes["dark (toggle)"] && themes["dark (system)"] && JSON.stringify(themes["dark (toggle)"]) === JSON.stringify(themes["dark (system)"]), "the two dark theme definitions are identical");
check(/<select class="btn" id="theme" aria-label="Color scheme">/.test(html), "the color scheme control is a <select> menu");

// --- UCI banner: five distinct bands, each a valid colour, and the favicon matches ---
const ops = B.art(1200, 72);
check(ops.length === 2, `banner has exactly 2 bands (has ${ops.length})`);
check(ops.every(o => /^#[0-9A-Fa-f]{6}$/.test(o.c)), "every banner colour is a 6-digit hex");
check(B.bands.includes("#FE8A4C") && B.bands.includes("#B68CFF"), "banner uses World Athletics' official orange and purple");
check(new Set(ops.map(o => o.c)).size === 2, "both bands are distinct colours");
const bandSum = ops.reduce((a, o) => a + o.h, 0);
check(bandSum >= 72 && bandSum <= 77, `the 5 bands' heights sum close to the banner height (72px): got ${bandSum.toFixed(1)}`);
const icon = (html.match(/rel="icon" href="data:image\/svg\+xml,([^"]*)"/) || [])[1] || "";
check((icon.match(/%3Crect/g) || []).length === 2, "favicon has the same 2 bands as the banner");
check(!/CXFlags|ROADBanner|flags\.js|data-flag/.test(app), "no leftover reference to the cyclocross or road-cycling sibling projects' banner systems");
check(!/continentOf|state\.continent|f-continent/.test(app), "no leftover continent-filter logic from the outdoor athletics project");

// --- page wiring ---
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
[...app.matchAll(/id='(\w+)'/g)].forEach(m => ids.add(m[1]));
[...app.matchAll(/\$\("([\w-]+)"\)/g)].map(m => m[1]).forEach(id => check(ids.has(id), `app.js looks up #${id}, which exists in index.html`));
[...html.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"]+)"/g)].map(m => m[1]).filter(u => !/^(https?:|data:|#)/.test(u))
  .forEach(f => check(fs.existsSync(f), `index.html references ${f}, which exists`));
[...html.matchAll(/<(script|link)[^>]+(?:src|href)="(https:\/\/cdn[^"]+)"[^>]*>/g)]
  .forEach(m => check(/integrity="sha384-/.test(m[0]) && /crossorigin/.test(m[0]), `CDN file has an integrity hash: ${m[2].split("/").pop()}`));
check(!/http:\/\//.test(html.replace(/xmlns='http:\/\/www\.w3\.org[^']*'/g, "")), "no plain-http resources");
check(/<meta name="description"/.test(html) && /og:title/.test(html) && /rel="icon"/.test(html), "description, share tags and favicon present");
check(/<html lang="en">/.test(html), "html lang set");

console.log(`\n${passes} checks passed, ${failures} failed  (${D.events.length} events, ${Object.keys(D.times || {}).length} timed, ${Object.keys(D.geo).length} places)`);
process.exit(failures ? 1 : 0);
