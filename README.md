# World Athletics Indoor 2027

Major indoor track and field meets in the USA and Europe for the 2027 indoor season, with where to watch in the US, start times in Eastern once published, and a map. Sibling to [athletics](../athletics) (the outdoor version), [road-sched](../road-sched) and [cx-sched](../cx-sched), reusing the same structure.

Open `index.html` locally to run it. No build step; the map needs an internet connection.

- `data.js`: all the data. Edit here.
- `app.js`, `style.css`, `banner.js`: the page and its World Athletics orange/purple banner (reused as-is from the `athletics` project -- same brand, same two colors).
- `time.js`: converts venue-local start times to US Eastern.
- `check.js`: run with `node check.js` before publishing.
- `RESEARCH_LOG.md`: sources and what's still unconfirmed.

Scope, for now: 6 confirmed-date meets (3 USA, 3 Europe). No World Indoor Championships in 2027 -- none was found. US broadcast is unconfirmed for every meet; see `RESEARCH_LOG.md`.
