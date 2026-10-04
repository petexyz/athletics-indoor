# Research log

Project: guide to major USA and Europe indoor track and field meets for the 2027 season. Fourth sibling project (after cx-sched, road-sched, athletics), built the same way, same session.

Tags: **[official]** (meet/federation's own page), **[secondary]** (news/guide article).

---

## Session 1: 2026-10-03

### Scope
User asked for a separate "athletics-indoor" folder, "at the same level" as the others, for "major indoor track meets in USA and Europe." Unlike the outdoor `athletics` project (built around the Diamond League, one circuit with a fixed, pre-announced calendar), the indoor season doesn't have one comprehensive early calendar this far out -- most 2027 indoor dates are announced meet-by-meet through the second half of 2026. Searched each major meet individually rather than hoping for one combined source, which worked better than the generic "World Athletics Indoor Tour 2027 schedule" searches that came back mostly empty.

### What has a confirmed 2027 date (used)
| Meet | Date | City | Source type |
|---|---|---|---|
| World Indoor Tour Gold Madrid | 4 Feb 2027 | Madrid, ESP | **[secondary]** |
| New Balance Indoor Grand Prix | 6 Feb 2027 | Boston, USA | **[official]**, meet's own site |
| Indoor Meeting Karlsruhe | 7 Feb 2027 | Karlsruhe, GER | **[official]**, meet's own site |
| Meeting Hauts-de-France Pas-de-Calais (Liévin) | 10 Feb 2027 | Liévin, FRA | **[secondary]** |
| Millrose Games | 13 Feb 2027 | New York, USA | **[secondary]** |
| USATF Indoor Championships | 19-21 Feb 2027 | Indianapolis, USA | **[official]**, usatf.org host announcement |

A clean 3 USA / 3 Europe split, matching the user's framing exactly -- not engineered, just how the confirmed dates happened to land.

### What was found but NOT included, and why
- **2027 World Athletics Indoor Championships**: no edition found. The last was Toruń, Poland, 20-22 March 2026. Not clear whether the event skips 2027 or hasn't been awarded/announced yet. Noted in `open` rather than guessed at.
- **Birmingham and Toruń** (both past World Athletics Indoor Tour Gold hosts): came up in searches but no 2027 date was found for either. Left out rather than estimated from a prior year's slot -- consistent with this whole family of projects' rule never to invent a date.
- **DeLoss Dodds Invitational** (29-30 Jan 2027): has a confirmed date, but its venue/status wasn't pinned down well enough (it surfaced via a tangential K-State hosting article) to include with confidence in the time available. Noted in `open` as a candidate for a follow-up pass.
- **NYC Indoor Grand Prix**: appeared in a couple of search snippets alongside the New Balance Indoor Grand Prix in a way that suggested possible confusion between the two (same city, similar name); not included separately to avoid risking a duplicate or a wrong one.

### Broadcast
**Nothing confirmed for any of the 6 meets.** No US broadcaster search turned up a named platform for the New Balance Indoor Grand Prix, Millrose Games, USATF Indoor Championships, Madrid, Karlsruhe or Liévin for 2027. The `europe` series entry notes that Madrid/Karlsruhe/Liévin are World Athletics Indoor Tour Gold meets -- the same World Athletics family as the Diamond League, whose US rights are confirmed to FloTrack (see the sibling `athletics` project's research) -- as a plausible lead, explicitly marked as a guess, not a finding. Every event shows an "Unknown" badge; none were marked "listed" or even "last-season", since even last season's indoor broadcaster wasn't established in this pass.

### Build notes
- `banner.js` and `style.css` copied unchanged from the `athletics` project -- same World Athletics brand (orange `#FE8A4C`, purple `#B68CFF`), no reason for this to look different.
- `time.js` copied from `athletics` with no changes (already namespaced `WATime`); both outdoor and indoor projects share that name internally, which is fine since each page only loads its own copy.
- Unlike `athletics`, there is no separate region filter -- the two Series categories (USA / Europe) already are the two regions, so a second "Continent"-style filter would just duplicate the Series filter. Removed that whole code path from `app.js` rather than leaving an unused one in.
- One deliberate naming fix: the theme menu's `localStorage` key was changed from `athletics`'s `wa-theme` to `wai-theme`. Both sites are served from the same GitHub Pages origin (`petexyz.github.io`), so `localStorage` is shared between them by the browser; reusing the same key would have meant picking a theme on one site silently changed the other's remembered theme too.
- `check.js` adapted from `athletics`'s: dropped the continent-mapping and continent-filter checks (not applicable), added one that greps for any leftover continent-filter code from the outdoor project. Verified it fails correctly on a corrupted date in a scratch copy.
- Rendered light theme only, desktop width, for time; same gap as the `athletics` project -- dark/grey and phone width not yet checked.
