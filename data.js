// Edit this file to update the guide. app.js renders everything from here.
// Last researched: 2026-10-03.
//
// Scope: major indoor track and field meets in the USA and Europe for the 2027 indoor season (Jan-Mar 2027).
// There is no World Athletics Indoor Championships in 2027 (the last was Toruń, March 2026); the next one was
// not found. Sibling to the outdoor "athletics" project and to cx-sched/road-sched.
//
// broadcast.status:  "listed" = a named, current US source confirms this   "last-season" = historical pattern,
// not confirmed for 2027   "unknown" = no US information found

window.WA = {
  updated: "2026-10-03",

  series: {
    us:     { name: "United States", short: "USA", color: "#0b6fb8", shape: "circle", note: "Major US indoor meets." },
    europe: { name: "Europe", short: "Europe", color: "#c8102e", shape: "star", note: "World Athletics Indoor Tour Gold meets." }
  },

  // No confirmed US broadcaster found for any of these 6 meets specifically. The outdoor Diamond League's US
  // rights are held by FloTrack (see the sibling "athletics" project), and these European meets are also World
  // Athletics Indoor Tour events, so FloTrack is a plausible guess -- but it is only that, not confirmed.
  broadcast: {
    us:     { badge: "Unknown", primary: "Unknown", status: "unknown",
      detail: "No confirmed US broadcaster found for the New Balance Indoor Grand Prix, Millrose Games or USATF Indoor Championships for 2027. FloTrack carries USATF's outdoor championships in some recent years and holds the Diamond League deal, so it's a reasonable guess for indoor too, but that is not confirmed.",
      fallback: "Check each meet's own site and FloTrack closer to February 2027." },
    europe: { badge: "Unknown", primary: "Unknown", status: "unknown",
      detail: "Madrid, Karlsruhe and Liévin are World Athletics Indoor Tour Gold meets -- the same World Athletics family as the Diamond League, whose US rights are held by FloTrack (see the sibling \"athletics\" project) -- but no indoor-specific US broadcast confirmation was found.",
      fallback: "Check FloTrack and each meet's own site closer to February 2027." }
  },

  prices: [
    { name: "FloTrack (FloSports)", cost: "Part of a FloSports subscription", note: "Confirmed for the outdoor Diamond League; not confirmed for these indoor meets specifically." }
  ],

  // Elite calendar. d: "YYYY-MM-DD"  e: end date (multi-day)  n: name  p: "City, CCC"  s: series key
  events: [
    { d: "2027-02-04", n: "World Indoor Tour Gold Madrid", p: "Madrid, ESP", s: "europe" },
    { d: "2027-02-06", n: "New Balance Indoor Grand Prix", p: "Boston, USA", s: "us" },
    { d: "2027-02-07", n: "Indoor Meeting Karlsruhe", p: "Karlsruhe, GER", s: "europe" },
    { d: "2027-02-10", n: "Meeting Hauts-de-France Pas-de-Calais", p: "Liévin, FRA", s: "europe", note: "Also known as Meeting de Liévin." },
    { d: "2027-02-13", n: "Millrose Games", p: "New York, USA", s: "us", l: { site: "https://www.nyrr.org/millrose" } },
    { d: "2027-02-19", e: "2027-02-21", n: "USATF Indoor Championships", p: "Indianapolis, USA", s: "us" }
  ],

  // Approximate town-centre coordinates [lat, lng], from general geographic knowledge, NOT a cited source.
  geo: {
    "Madrid, ESP": [40.417, -3.703], "Boston, USA": [42.361, -71.057], "Karlsruhe, GER": [49.007, 8.404],
    "Liévin, FRA": [50.417, 2.779], "New York, USA": [40.713, -74.006], "Indianapolis, USA": [39.768, -86.158]
  },

  open: [
    "US broadcaster for any of these 6 meets -- nothing confirmed for the 2027 indoor season yet.",
    "Whether a 2027 World Athletics Indoor Championships exists at all -- none found (the last was Toruń, Poland, March 2026).",
    "Start times for all 6 meets -- not published this far out.",
    "Other World Athletics Indoor Tour Gold meets (Birmingham, Toruń) -- 2027 dates not confirmed, so left out rather than guessed.",
    "The DeLoss Dodds Invitational (29-30 Jan 2027) and a few other Jan/Feb US meets came up in research but weren't confirmed well enough (venue, status) to include confidently."
  ],

  sources: [
    ["Millrose Games 2027 date (search of multiple results)", "https://en.wikipedia.org/wiki/Millrose_Games"],
    ["New Balance Indoor Grand Prix (meet site)", "https://www.nbindoorgrandprix.com/meet-info/"],
    ["Indoor Meeting Karlsruhe (meet site)", "https://meeting-karlsruhe.de/en/indoor-meeting/"],
    ["Meeting Hauts-de-France Pas-de-Calais (Wikipedia)", "https://en.wikipedia.org/wiki/Meeting_Hauts-de-France_Pas-de-Calais"],
    ["2027 USATF Indoor Championships, Indianapolis host announcement (USATF)", "https://www.usatf.org/news/2026/indianapolis-to-host-usatf-indoor-championships-in"],
    ["2026 World Athletics Indoor Championships, Toruń (Wikipedia, for context -- no 2027 edition found)", "https://en.wikipedia.org/wiki/2026_World_Athletics_Indoor_Championships"]
  ]
};
