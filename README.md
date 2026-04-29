# Drift King School — Courses Microsite

Trilingual (Hebrew default, English, Russian) microsite focused exclusively on the two flagship long-form drift courses plus the customer-car sub-line.

**Live:** https://driftkingschool.github.io/dks-courses/

## Products

### Main page (`/`)
- **Foundation Course** — 200 net minutes (20 sessions of 10 minutes), 10,000 ILS
- **Advanced + Tandem Course** — 400 net minutes (40 sessions of 10 minutes), 17,500 ILS
- **Competition envelope** — race-ready vehicle, spotter, coach, mechanic, tires/fuel for course graduates entering competitions

### Sub-page (`/own-car/`)
- **Single lesson** on customer's vehicle, 1,300 ILS
- **Basic** — 4 sessions, 4,400 ILS
- **Advanced (popular)** — 6 sessions, 6,000 ILS
- **Pro** — 8 sessions, 7,600 ILS
- **Quick-Close** — special 6-session deal at 6,500 ILS

## Tech Stack

- Plain HTML, CSS, vanilla JS (no framework)
- Trilingual via `data-he` / `data-en` / `data-ru` attributes
- Default language: Hebrew (RTL)
- Storage key: `localStorage['dks-courses-lang']`
- Language cycle: HE → EN → RU
- Fonts: Heebo (Hebrew) + Inter (English/Russian)
- Lucide SVG icons inline
- Hosted on GitHub Pages

## Files

```
dks-courses/
├── index.html              Main page (HE/EN/RU)
├── own-car/index.html      Customer-car courses sub-page
├── style.css               Shared styles (BMW-inspired luxury)
├── script.js               Language switching + scroll + reveal animations
├── hero-bg.mp4             Hero video background
├── logo.png                DKS logo
└── images/                 Advantage card backgrounds
```

## Local Preview

Open `index.html` directly in a browser, or serve from this folder.

## Sister Sites

- Main flagship site: https://driftkingschool.github.io/
- Bangkok branch: https://driftkingschool.github.io/dks-bangkok/
