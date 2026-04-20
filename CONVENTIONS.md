# ⚡ CONVENTIONS.md — Quick Reference

**For detailed rules, see `AGENTS.md`.** This file is the cheat sheet.

---

## 📁 File locations
- **Home:** `index.html`
- **Topics:** `topics/web/<slug>/index.html` (primary lane) or `topics/misc/<slug>/index.html`
- **Glossary terms:** `glossary/<slug>.html` — always alphabetize by slug in `assets/glossary.js`
- **TryHackMe rooms:** `tryhackme/<path-slug>/<room-slug>.html` (hub at `tryhackme/index.html`)
- **Labs:** `labs/<platform>/<lab-slug>.html` (PortSwigger walkthroughs, HTB notes, etc.)
- **Shared assets (do not split):** `assets/styles.css`, `assets/glossary.js`, `assets/app.js`
- **Templates:** `templates/TOPIC_TEMPLATE.html`, `templates/GLOSSARY_TEMPLATE.html`, `templates/THM_ROOM_TEMPLATE.html`

---

## 🔗 Relative paths cheat sheet
| From | Root | Assets | Glossary file |
|------|------|--------|---------------|
| `index.html` | `./` | `assets/` | `glossary/x.html` |
| `glossary/x.html` | `../` | `../assets/` | `x.html` |
| `tryhackme/index.html` | `../` | `../assets/` | `../glossary/x.html` |
| `tryhackme/<path>/<room>.html` | `../../` | `../../assets/` | `../../glossary/x.html` |
| `topics/<lane>/<slug>/index.html` | `../../../` | `../../../assets/` | `../../../glossary/x.html` |
| `labs/<plat>/x.html` | `../../` | `../../assets/` | `../../glossary/x.html` |

---

## ➕ New topic (5 steps)
1. `mkdir -p topics/<lane>/<slug>`
2. Copy `templates/TOPIC_TEMPLATE.html` → `topics/<lane>/<slug>/index.html`
3. Replace every `[[BRACKET]]` placeholder
4. Add entry to `window.SITE_TOPICS` in `assets/app.js`
5. Wrap every technical term with `<span class="term" data-term="slug">…</span>`

---

## ➕ New glossary term (3 steps)
1. Add entry to `window.GLOSSARY` in `assets/glossary.js` (alphabetized)
2. Copy `templates/GLOSSARY_TEMPLATE.html` → `glossary/<slug>.html`
3. Replace every `[[BRACKET]]` placeholder

---

## ➕ New TryHackMe room rebuild (4 steps)
1. Fetch the THM room URL (if not provided, work from pasted notes/room name)
2. Add room entry to `window.SITE_THM.paths[<path>].rooms[]` in `assets/app.js`
3. Copy `templates/THM_ROOM_TEMPLATE.html` → `tryhackme/<path-slug>/<room-slug>.html`
4. Replace every `[[BRACKET]]`. Include TL;DR cards, concept chapters, task-by-task answer cards with `<details>`, and a retention quiz.
   Set `<body data-page-slug="thm-<room-slug>">`.

---

## 🎨 Reusable component classes

Use these — **never reinvent them**:

```
.hero .hero-content .coffee-badge        → hero section
.chapter .chapter-num                    → content sections (h2 gets .emoji span)
.paper / .paper.right                    → Head First notebook-paper analogy block
.brain-power                             → pause-and-reveal question
.playground .url-bar .query-preview      → interactive demo container
.preset-chips .chip / .chip.evil         → clickable preset buttons
.quiz .opt                               → quizAnswer(this, true|false)
.code / .code.evil / .code.safe          → code blocks (+ .kw .str .com .inject spans)
.callout / .callout.danger/info/success  → alert boxes
.grid.cols-2 / .cols-3 + .card           → responsive card grids
.related-terms .tags                     → end-of-page cross-links
.divider                                 → chapter break
.term[data-term="slug"]                  → glossary-linked inline term
code.inline                              → inline code
```

---

## 🎨 Color variables (never override)
- `--accent` = matrix green (success / code keywords)
- `--accent-2` = hot pink (attacker / evil)
- `--accent-3` = cyan (glossary links only)
- `--warn` = orange
- `--danger` = red
- `--ink` / `--ink-dim` / `--ink-mute` = text hierarchy

---

## 🚫 Do not
- Add frameworks, bundlers, CDN assets
- Inline styles when a component class exists
- Forget `data-page-slug` on `<body>`
- Forget to load `glossary.js` then `app.js` at the bottom
- Create a glossary page without first adding the JS entry
- Use absolute paths (`/assets/...`) — always relative
- Change the color palette
- Break the writing voice (energetic, conversational, NetworkChuck-coded)

---

## ✅ Page checklist

Every page: DOCTYPE • UTF-8 meta • viewport meta • `data-page-slug` • progress bar div • topbar • breadcrumb • hero • at least one interactive block • related-terms section • footer • `glossary.js` then `app.js` at bottom.

---

## 🚦 Lane auto-detection

Content involves HTTP / browsers / cookies / Burp / OWASP / bug bounty? → `web`.
Otherwise (networking, crypto, OS, reversing, compliance) → `misc`.
Ambiguous? Default to `web`.
