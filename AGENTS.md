# 🤖 AGENTS.md — Briefing For Coding Agents

**Read this file start-to-finish BEFORE making any changes.** This document is
the source of truth for how content is added to the Cybersec Learning Vault.

If you skim this, you WILL produce broken pages. This project has specific
conventions that the human owner depends on. No improvisation.

---

## 🎯 The 30-Second Summary

1. This is a **static HTML/CSS/JS learning site** (no build step, no framework).
2. The owner is a self-taught bug-bounty hunter with ADHD who learns best from
   **interactive, visual, high-energy content** styled like "O'Reilly Head First"
   crossed with "NetworkChuck."
3. **Primary focus: Web Application Pentesting** (OWASP Top 10, Burp workflows,
   bug bounty methodology). Secondary: random cybersec topics.
4. The site uses a **shared design system** (one CSS file, one JS helper file,
   one glossary database). DO NOT introduce new CSS or JS libraries.
5. Every technical term across the vault is cross-linked via a glossary system.
   Adding a term = adding one JS entry + one HTML page.

---

## 📁 Directory Structure (do not reorganize)

```
learning_cybersec/
├── index.html                ← Home page (edit the SITE_TOPICS in app.js to add cards)
├── README.md                 ← Human-facing overview
├── AGENTS.md                 ← THIS FILE
├── CONVENTIONS.md            ← Quick reference you can re-read anytime
├── assets/
│   ├── styles.css            ← Single source of truth for all styling. DO NOT add
│   │                           page-specific CSS elsewhere except inline in <style>
│   │                           tags for one-off demo quirks.
│   ├── glossary.js           ← Term database + auto-linker + hover popups.
│   │                           When you add a term, update this file.
│   └── app.js                ← Shared helpers: progress bar, quiz handler, confetti,
│                               search, page tracking, SITE_TOPICS array.
├── topics/
│   ├── web/                  ← PRIMARY LANE: web app pentesting topics
│   │   └── <slug>/
│   │       ├── index.html    ← main topic page
│   │       └── <subpage>.html (optional deeper dives)
│   └── misc/                 ← non-web topics (networking, crypto, OS, etc.)
│       └── <slug>/index.html
├── glossary/
│   ├── index.html            ← A-Z browse page (auto-rendered from glossary.js)
│   └── <slug>.html           ← one file per term
├── tryhackme/                ← DEDICATED SECTION for rebuilt THM rooms
│   ├── index.html            ← THM hub (paths + rebuilt rooms)
│   └── <path-slug>/          ← e.g. cybersec-101/, jr-pentester/
│       └── <room-slug>.html  ← one file per rebuilt THM room
├── labs/
│   └── <platform>/           ← personal walkthrough notes (PortSwigger, HTB, etc.)
│       └── <lab-slug>.html
└── templates/
    ├── TOPIC_TEMPLATE.html      ← copy for new topic pages
    ├── GLOSSARY_TEMPLATE.html   ← copy for new glossary term pages
    └── THM_ROOM_TEMPLATE.html   ← copy for new TryHackMe room pages
```

---

## 🚦 The Two Lanes

| Lane | Directory | Use for | Default? |
|------|-----------|---------|----------|
| **web** | `topics/web/<slug>/` | SQLi, XSS, CSRF, SSRF, IDOR, auth bypass, JWT, path traversal, XXE, SSTI, deserialization, LFI/RFI, HTTP smuggling, OAuth flaws, WebSocket attacks, CORS misconfig, CSP bypass, prototype pollution, any bug-bounty-shaped topic | ✅ YES |
| **misc** | `topics/misc/<slug>/` | Networking (BGP, DNS, TCP), crypto (hashing, RSA, ECC), OS internals, reverse engineering, malware analysis, Linux privesc, Windows AD, cloud security, compliance frameworks, anything non-web | Only when clearly non-web |

**Auto-detection rule:** If the source material (URL, pasted text, video, etc.)
involves HTTP requests, browsers, cookies, web frameworks, bug bounty platforms,
OWASP, or Burp Suite → it's `web`. Otherwise → ask yourself "is this a common
bounty attack surface?" — if no, use `misc`.

When in doubt, default to `web`. It can always be moved later.

---

## 📝 Adding a New Topic (step-by-step)

### Step 1 — Plan the page
Before writing code, sketch in your head:
- 1-line tagline (NetworkChuck-style)
- Analogy / metaphor for the "What is it" section
- At least ONE interactive playground idea
- 2-4 real-world breach / CVE examples (web topics) or case studies (misc)
- Which existing glossary terms will appear in this page
- Which NEW glossary terms this page will introduce

### Step 2 — Create the folder + file
```
topics/<lane>/<slug>/index.html
```
Slug must be lowercase, hyphenated, and match the OWASP / common name
(e.g. `cross-site-scripting`, not `xss-attack`). Avoid renaming later.

Copy `templates/TOPIC_TEMPLATE.html` into that path. Replace every `[[BRACKET]]`
placeholder. DO NOT remove the `data-page-slug` attribute on `<body>`.

### Step 3 — Register the topic
Edit `assets/app.js` → add an entry to `window.SITE_TOPICS`:
```js
{
  slug: "cross-site-scripting",     // matches directory slug
  lane: "web",                       // 'web' or 'misc'
  name: "XSS (Cross-Site Scripting)",
  icon: "🔥",
  blurb: "1-line punchy description.",
  path: "topics/web/cross-site-scripting/index.html",  // from root
  subpages: [],                      // optional subpage list
  progress: 0.1,                     // rough fraction 0..1
  tags: ["OWASP Top 10", "Client-side", "Injection"]
}
```
This makes the topic appear on the home page and in the global search.

### Step 4 — Cross-link terms
Anywhere in your new page you mention a concept that has a glossary entry, wrap
it in the `term` span:
```html
<span class="term" data-term="sql-injection">SQL injection</span>
```
The glossary auto-linker will turn it blue-dashed with hover preview.

If the term you need DOESN'T exist yet → jump to **Adding a New Glossary Term**.

### Step 5 — Add a Related Terms section at the bottom
Every topic page ends with:
```html
<section class="chapter">
  <div class="related-terms">
    <h4>🔗 Related in the vault</h4>
    <div class="tags">
      <a href="../../../glossary/<slug>.html">emoji Term name</a>
      ...
    </div>
  </div>
</section>
```

---

## 📖 Adding a New Glossary Term (step-by-step)

### Step 1 — Add the JS entry FIRST
Edit `assets/glossary.js` → add an entry inside `window.GLOSSARY`, alphabetized
by key:
```js
"cross-site-scripting": {              // the slug (kebab-case)
  name: "XSS (Cross-Site Scripting)",  // display name
  aliases: ["xss", "reflected xss", "stored xss"],  // search synonyms
  category: "Web Vulnerability",       // for mental grouping (optional)
  blurb: "One-liner punchy description.",           // shown in search results
  short: "2-3 sentence explanation shown in hover popover. Must stand alone.",
  page: "cross-site-scripting.html",   // filename in /glossary/
  related: ["csrf", "same-origin-policy"]  // other term slugs
}
```

### Step 2 — Create the HTML page
Copy `templates/GLOSSARY_TEMPLATE.html` to `glossary/<slug>.html`. Replace all
`[[BRACKET]]` placeholders.

### Step 3 — That's it
The term is now clickable site-wide via `<span class="term" data-term="slug">`.
The A-Z glossary index page auto-updates.

---

## 🎯 Rebuilding a TryHackMe Room

The owner is doing the **TryHackMe Cybersecurity 101** path (and others).
THM's text is often dry and hard for ADHD brains. When the owner flags a room as
boring, rebuild it in the vault's voice under `tryhackme/<path-slug>/<room-slug>.html`.

### When to create a THM room page
- Owner pastes a THM room URL and says it's boring / hard to focus on.
- Owner asks to review a room they've already done.
- Owner wants tasks + answers kept for spaced repetition.

### The workflow
1. **Fetch** the THM room URL (use your web-fetch tool). If unavailable, work
   from the owner's pasted notes or from general knowledge of the room name.
2. **Plan** the page in your head:
   - 3 key learnings (TL;DR bullets)
   - Main concept(s) — rewrite each in owner's voice with analogy + brain-power
   - Every task, one card each, with answer + reasoning in collapsible `<details>`
   - Glossary terms to introduce (add them to `glossary.js` if new)
3. **Register** the room in `assets/app.js` under `window.SITE_THM.paths[...].rooms[]`:
   ```js
   {
     slug: "offensive-security-intro",    // matches filename (no extension)
     name: "Offensive Security Intro",
     icon: "⚔️",                          // pick something thematic
     blurb: "1-line description.",
     path: "tryhackme/cybersec-101/offensive-security-intro.html",
     thmUrl: "https://tryhackme.com/room/offensivesecurityintro",
     completed: false,                    // true once owner has finished it
     tags: ["intro", "offensive"]
   }
   ```
4. **Create the page** by copying `templates/THM_ROOM_TEMPLATE.html` to
   `tryhackme/<path-slug>/<room-slug>.html`. Replace every `[[BRACKET]]`.
5. **Cross-link** with the rest of the vault:
   - If the room teaches a concept that already has a topic page (e.g., a room
     on SQL injection), add a cross-link card to `topics/web/sql-injection/`.
   - Any technical term that has a glossary entry → wrap with
     `<span class="term" data-term="slug">...</span>`.
   - Any NEW term introduced → add a glossary entry + page.

### THM-specific requirements
- `data-page-slug` on `<body>` must be `thm-<room-slug>` (for correct progress
  tracking and "recently viewed" rendering on home page).
- `<title>` must include "— THM · <Path Name>" for clarity.
- The hero MUST include an "Open on TryHackMe" button linking to the original
  room URL (`target="_blank" rel="noopener"`).
- Every task in the room gets its own `.card` with an `<details>` block showing
  the answer + the WHY (not just the answer — future-you needs the reasoning).
- End with a 1-question quiz testing the CORE concept, for retention.

### Lane decision for THM rooms
THM rooms still respect the primary/secondary split implicitly:
- A room about Burp Suite / OWASP / a web vuln → its glossary terms land in web.
- A room about Linux CLI / networking → its terms land in misc.
- The ROOM PAGE ITSELF lives in `tryhackme/`, regardless of subject — the
  cross-links carry the subject weight.

---

## 🎨 Design System — STRICT RULES

### Typography
- Body: system sans-serif (`var(--sans)`)
- Code: monospace (`var(--mono)`)
- Notebook-paper blocks: Comic Sans / Marker Felt (`var(--hand)`)
- NEVER add new fonts or @font-face rules.

### Colors (use CSS variables from `styles.css`)
| Variable | Use |
|----------|-----|
| `--accent` (matrix green) | Success, primary CTAs, code keywords |
| `--accent-2` (hot pink) | Attacker-side, "evil", danger accents |
| `--accent-3` (cyan) | Glossary term links specifically |
| `--warn` (orange) | Warning boxes, "COMING" badges |
| `--danger` (red) | Error states, destructive actions |
| `--ink` / `--ink-dim` / `--ink-mute` | Primary / secondary / tertiary text |

### Reusable component classes (USE THESE — do not reinvent)
| Class | Purpose |
|-------|---------|
| `.hero` + `.hero-content` | Top-of-page hero section |
| `.coffee-badge` | Small pill label above H1 |
| `.chapter` | Standard content section wrapper |
| `.chapter-num` | Tiny "Chapter 01 //" label |
| `.paper` / `.paper.right` | Head First notebook-paper analogy blocks |
| `.brain-power` | Think-before-reveal question block |
| `.playground` | Container for interactive demos |
| `.url-bar` | Fake browser URL with inline `<input>` |
| `.query-preview` | Code-style preview of generated query |
| `.result-box` | Simulated response area |
| `.preset-chips` + `.chip` / `.chip.evil` | Clickable preset buttons |
| `.quiz` + `.opt` | Multiple-choice quiz (use `quizAnswer(this, true\|false)`) |
| `.code` / `.code.evil` / `.code.safe` | Code blocks with colored left border |
| `.callout` / `.callout.danger` / `.callout.info` / `.callout.success` | Alert boxes |
| `.grid.cols-2` / `.grid.cols-3` + `.card` | Responsive card grids |
| `.related-terms` + `.tags` | End-of-page related links |
| `.divider` | Horizontal thematic break between chapters |
| `.term` (with `data-term=`) | Glossary-linked inline word |

### Writing voice (CRITICAL)
- Energetic, conversational, direct. No academic filler.
- Short paragraphs. Line breaks are your friend.
- Use emojis purposefully (💉 for SQLi, 🔥 for XSS, 🛡️ for defense, etc.).
- Occasional ☕ coffee references — NetworkChuck vibe.
- Analogies > formal definitions. ALWAYS lead with an analogy.
- Address the reader as "you". Never "the user" or "one".
- "Brain Power" questions should make them PAUSE. Not rhetorical.
- Real breaches by name + year + scale (e.g. "Equifax 2017 — 147M SSNs").
- Concrete over abstract. Specific over vague.

### Formatting rules
- H1 (`<h1>`) — only in the hero, once per page.
- H2 (`<h2>`) — one per `<section class="chapter">`. Include a `.emoji` span.
- H3 (`<h3>`) — sub-sections within a chapter.
- Code samples: use `<div class="code">...</div>`, NOT `<pre>` directly.
  Use inner `<span class="kw">`, `<span class="str">`, `<span class="com">`,
  `<span class="inject">` for syntax highlighting.
- Inline code: `<code class="inline">foo</code>`.

---

## 🚫 Hard Rules — NEVER DO THIS

1. **NEVER** add a framework, build step, or dependency. Not React. Not Tailwind.
   Not even a CSS preprocessor. This is pure HTML/CSS/JS and must stay that way.
2. **NEVER** duplicate styles that exist in `styles.css`. If a style is missing,
   ADD IT to `styles.css`, don't inline it everywhere.
3. **NEVER** rename or move files without updating ALL references. Use
   `grep -rn 'oldpath' /path/to/learning_cybersec` to find them all first.
4. **NEVER** remove the `<div class="progress-wrap"><div class="progress-bar" id="progressBar"></div></div>` bar — it's required for the scroll indicator.
5. **NEVER** remove the topbar or breadcrumb from a page. They're the navigation.
6. **NEVER** write a glossary page without first adding the JS entry. The hover
   preview will show a "Unknown term" warning otherwise.
7. **NEVER** change the color palette. The CSS variables are the style contract.
8. **NEVER** load external JS/CSS from a CDN. All assets must be local.
9. **NEVER** use `innerHTML` with unescaped user input in playgrounds. Escape it.
   (This is a security-learning site; leading by example matters.)
10. **NEVER** skip the "Related Terms" section at the bottom. It's the glue.
11. **NEVER** create files outside the structure in this doc. If you think you
    need a new top-level folder, stop and ask the human.

---

## ✅ Checklist Before Finishing

Run this mental checklist on EVERY page you create or modify:

- [ ] `<!DOCTYPE html>` at top, `<html lang="en">`, UTF-8 meta, viewport meta
- [ ] `<link rel="stylesheet">` points at `assets/styles.css` with correct relative path
- [ ] `<body>` has `data-page-slug="..."` matching the slug
- [ ] Progress bar div present
- [ ] Topbar present with correct `class="active"` on the right nav link
- [ ] Breadcrumb present
- [ ] Hero section with `.coffee-badge`, H1, subtitle, tagline
- [ ] At least one interactive element (playground, brain-power, or quiz)
- [ ] "Related Terms" block at bottom
- [ ] Footer with closing coffee-line
- [ ] Both `glossary.js` AND `app.js` loaded at bottom, in that order
- [ ] All internal links use relative paths with correct depth
- [ ] Any NEW technical term introduced is also added to `glossary.js`
- [ ] `SITE_TOPICS` in `app.js` is updated if this is a new topic
- [ ] `grep` search confirms no broken references elsewhere

---

## 🎯 Content Quality Standards

Every page must have at minimum:
- **1 hero** with subtitle and tagline
- **1 analogy** in a `.paper` block (Head First style)
- **1 interactive element** (playground, simulator, quiz, or brain-power reveal)
- **2 real-world examples** with specifics (name, year, numbers, impact)
- **1 "Related Terms" section** at the bottom

Topic pages should additionally have:
- **A "How to prevent" or "How to defend" section** with code examples
- **A multiple-choice quiz** at the end
- **Lab / walkthrough cards** if this topic has associated PortSwigger / THM / HTB labs the owner has completed

---

## 🔁 Cross-Linking Conventions

Every time a page mentions a concept that exists in the glossary:
1. Wrap it in `<span class="term" data-term="slug">...</span>`
2. Do this on FIRST mention per page (subsequent mentions can stay plain).
3. The glossary auto-linker handles hover previews and click-navigation.

Every time a glossary page mentions another concept:
- Use the same `<span class="term">` pattern, OR
- Use a plain `<a>` link inside the "Related Terms" footer.

Every time a new technical term is introduced in a topic:
- Decide: does it deserve its own glossary page? If yes → create it.
- If it's too minor (e.g., a command-line flag), just use `<code class="inline">` and move on.

---

## 🧪 Testing Your Changes

This site has no test framework. "Testing" = open in a browser and verify:
1. Page loads without JS console errors (check DevTools)
2. Topbar, breadcrumb, hero, footer all render
3. Any glossary terms show blue-dashed with hover previews
4. Any interactive demo actually reacts to input
5. Quizzes trigger confetti on correct / red border on wrong
6. Relative paths work when opening via `file://` (no absolute `/` paths)
7. Mobile responsive check — resize browser to ~375px wide

Run a local server if `file://` paths misbehave:
```bash
cd learning_cybersec && python3 -m http.server 8000
```

---

## 💬 When Talking To The Owner

- They have ADHD. Keep chat responses scannable with headers, bullets, bold.
- They value dopamine hits — confirm completion clearly, use ☕ 🔥 🚀 sparingly.
- If asked to add a topic without specifying the lane, **auto-detect** from
  the source material. Don't ask unless it's genuinely ambiguous.
- If they paste a URL, use the fetch tool to get content, then transform it.
- If they paste notes, polish them into the site's voice without losing their
  personal insights.
- If they ask about something NOT in the vault yet, offer to add it as either
  a new topic or a new glossary term (depending on scope).
- They'll sometimes have "random itches" for non-web topics — treat these as
  first-class citizens in the `misc` lane.

---

## 🆘 When You Get Stuck

If any of the following is true, STOP and ask the human:
- You're tempted to add a build step, framework, or dependency.
- You want to reorganize the directory structure.
- You need to make a breaking change to `styles.css`, `app.js`, or `glossary.js`.
- The owner's request is ambiguous about which lane (web vs misc).
- A page they're asking about doesn't fit the existing page types (topic,
  glossary term, lab walkthrough) — there may be a new type to define.

**Don't silently "fix" conventions you disagree with. Ask.**

---

## 📌 Quick File Path Cheat Sheet

When writing relative links, count levels up from your current location:

| From | To `/` | To `/assets/` | To `/glossary/<x>.html` |
|------|--------|---------------|-------------------------|
| `index.html` | `./` | `assets/` | `glossary/<x>.html` |
| `glossary/<x>.html` | `../` | `../assets/` | `<x>.html` |
| `tryhackme/index.html` | `../` | `../assets/` | `../glossary/<x>.html` |
| `tryhackme/<path>/<room>.html` | `../../` | `../../assets/` | `../../glossary/<x>.html` |
| `topics/<lane>/<slug>/index.html` | `../../../` | `../../../assets/` | `../../../glossary/<x>.html` |
| `topics/<lane>/<slug>/<subpage>.html` | `../../../` | `../../../assets/` | `../../../glossary/<x>.html` |
| `labs/<platform>/<lab>.html` | `../../` | `../../assets/` | `../../glossary/<x>.html` |

---

**☕ End of briefing. Now go build something your ADHD-brained owner will actually want to read.**
