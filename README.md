# ☕ Cybersec Learning Vault

A personal, interactive, ADHD-friendly cybersecurity learning site.
**Head First** × **NetworkChuck** energy. Zero textbooks. All interaction.

Open `index.html` in any browser — that's it. No build step, no dependencies.

> **Mission:** Become a sick web app pentester. Bug bounties are the goal.
> Random side quests into other cybersec topics are welcome. 🎯

---

## 📁 Project Structure

```
learning_cybersec/
├── index.html                 ← Home / dashboard / search / recent activity
├── README.md                  ← you are here
├── AGENTS.md                  ← BRIEFING for other AI coding agents
├── CONVENTIONS.md             ← quick-reference cheat sheet
├── assets/
│   ├── styles.css             ← ALL shared styling (single source of truth)
│   ├── glossary.js            ← term database + auto-linker + hover previews
│   └── app.js                 ← progress bar, search, quiz handler, helpers
├── topics/
│   ├── web/                   ← PRIMARY LANE: web app pentesting
│   │   └── sql-injection/index.html
│   └── misc/                  ← SIDE QUESTS: networking, crypto, OS, etc.
├── glossary/
│   ├── index.html             ← A-Z browse page
│   └── <term-slug>.html       ← one file per technical term
├── tryhackme/                 ← REBUILT THM ROOMS (non-boring versions)
│   ├── index.html             ← THM hub with path progress
│   └── cybersec-101/          ← one folder per learning path
│       └── <room-slug>.html   ← one page per rebuilt room
├── labs/
│   └── portswigger/           ← personal lab walkthrough notes
└── templates/
    ├── TOPIC_TEMPLATE.html       ← skeleton for new topic pages
    ├── GLOSSARY_TEMPLATE.html    ← skeleton for new glossary term pages
    └── THM_ROOM_TEMPLATE.html    ← skeleton for rebuilt THM rooms
```

---

## 🧠 How It Works

### The glossary magic
Any inline term on any page becomes clickable + hoverable via:
```html
<span class="term" data-term="sql-injection">SQL injection</span>
```
The `data-term` value must match a key in `assets/glossary.js`. Hover shows a mini
definition; click goes to the full deep-dive page. Build a mental graph, not a flat list.

### Search everything
Press `/` on any page to focus the search bar. Searches topics + glossary in real time.

### Progress tracking
Every page you visit is tracked in localStorage. Home page shows your "Recently Viewed."
(Private — never leaves your device.)

---

## 🚀 Running Locally

Just open `index.html` in a browser. Done.

Optional local server (nicer for development):
```bash
cd learning_cybersec
python3 -m http.server 8000
# visit http://localhost:8000
```

---

## ✏️ Adding New Content

### You want to add something new
Just talk to your AI coding assistant with:
- A URL of the source material, OR
- Pasted text / notes / transcript, OR
- A specific PortSwigger lab you want reviewed, OR
- A **boring TryHackMe room** you want rebuilt (paste the URL)

The assistant will:
1. Auto-detect the lane (`web` vs `misc`) or the section (`topics` / `tryhackme` / `glossary`)
2. Create the right page from the matching template
3. Cross-link with existing terms + topics
4. Keep the design system consistent

### If you (or an agent) are editing files directly
**Read `AGENTS.md` first.** It has the full rulebook. `CONVENTIONS.md` is the cheat sheet.

---

## 🤖 For Coding Agents

**If you are an AI coding agent working on this project, READ `AGENTS.md`
before making ANY changes.** It contains:
- The directory structure (do not reorganize)
- Exact templates to use (see `templates/`)
- Reusable component classes (do not reinvent)
- The writing voice (critical — owner has ADHD)
- Hard "never do this" rules
- A pre-commit checklist

Skim it and you will produce broken pages.

---

## 📦 Making This a Private Repo

```bash
cd learning_cybersec
git init
git add .
git commit -m "Initial vault commit ☕"
# then create a PRIVATE repo on GitHub and push
```

GitHub Pages works out of the box (Settings → Pages → main branch → root). No build needed.

---

**☕ Happy hacking. Break things. Learn things. Repeat.**
