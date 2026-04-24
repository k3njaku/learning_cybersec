/* ============================================================
   APP.JS — shared helpers for every page
   - Progress bar
   - Brain Power toggles
   - Quiz answer handler
   - Confetti
   - Global search (searches topics + glossary)
   - Topbar active link
   - Progress tracking (localStorage): which pages you've viewed
   ============================================================ */

/* ---------- SITE MAP (topics only — glossary is pulled from window.GLOSSARY) ----------
   LANES:
     'web'    = web app pentesting (PRIMARY LANE — bug bounty territory)
     'misc'   = random itch-scratching (networking, crypto, OS internals, etc.)
     'python' = Python as a weapon (scraping gigs, cybersec scripting, automation)
   Add new topics here when you create a new topics/<lane>/<slug>/index.html page.
-------------------------------------------------------------------------------------- */
window.SITE_TOPICS = [
  {
    slug: "sql-injection",
    lane: "web",
    name: "SQL Injection",
    icon: "💉",
    blurb: "Break databases. Log in as admin. The OG web vuln.",
    path: "topics/web/sql-injection/index.html",
    subpages: [
      // future subpages get added here
      // { name: "UNION Attacks", path: "topics/web/sql-injection/union-attacks.html" },
    ],
    progress: 0.3, // 0..1 — we update this as you check off chapters
    tags: ["OWASP Top 10", "Injection", "Database"]
  },
  {
    slug: "leaky-commits",
    lane: "web",
    name: "Leaky Commits",
    icon: "🗑️",
    blurb: "Beyond API keys — what else devs leak on GitHub and why attackers love it.",
    path: "topics/web/leaky-commits/index.html",
    subpages: [],
    progress: 1.0,
    tags: ["OSINT", "Recon", "GitHub", "Bug Bounty"]
  },
  {
    slug: "textile-scraper",
    lane: "python",
    name: "Project: Textile Scraper 🧵",
    icon: "🕷️",
    blurb: "Build a real scraper for textilepages.com. Learn Python AS you hunt leads.",
    path: "topics/python/textile-scraper/index.html",
    subpages: [
      { name: "Ch 01 — Recon: Know Your Prey", path: "topics/python/textile-scraper/chapter-01-recon.html" },
      { name: "Ch 02 — First Blood: Fetching the Page", path: "topics/python/textile-scraper/chapter-02-first-fetch.html" }
    ],
    progress: 0.15,
    tags: ["Python", "Scraping", "Lead Gen", "requests", "BeautifulSoup"]
  }
];

/* ---------- LAB TRACKS + LABS (FreeCodeCamp-for-pentesting) ---------------------------
   Each TRACK groups labs by vulnerability class (SQLi, XSS, CSRF, etc.).
   Labs are ordered (position 1..N). Each lab page is a guided walkthrough
   that avoids Burp Suite in favour of curl + browser DevTools.
   Only add a lab entry here AFTER you create its HTML page.
-------------------------------------------------------------------------------------- */
window.SITE_LABS = {
  platforms: [
    {
      slug: "portswigger",
      name: "PortSwigger Web Security Academy",
      icon: "🧪",
      blurb: "Free, industry-standard labs. Every vuln, a purpose-built broken app.",
      path: "labs/portswigger/index.html",
      tracks: [
        {
          slug: "sql-injection",
          name: "SQL Injection",
          icon: "💉",
          blurb: "The OG. Bypass logins, dump databases, talk to DBs they don't want you talking to.",
          path: "labs/portswigger/sql-injection/index.html",
          labs: [
            {
              slug: "01-retrieve-hidden-data",
              position: 1,
              name: "SQLi in WHERE clause — retrieve hidden data",
              difficulty: "apprentice",
              estMinutes: 10,
              path: "labs/portswigger/sql-injection/01-retrieve-hidden-data.html",
              upstreamUrl: "https://portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data",
              blurb: "Your first injection. Turn a product filter into an all-access pass."
            },
            {
              slug: "02-login-bypass",
              position: 2,
              name: "SQLi allowing login bypass",
              difficulty: "apprentice",
              estMinutes: 10,
              path: "labs/portswigger/sql-injection/02-login-bypass.html",
              upstreamUrl: "https://portswigger.net/web-security/sql-injection/lab-login-bypass",
              blurb: "Log in as admin. No password. Just vibes and a single quote."
            },
            {
              slug: "03-union-column-count",
              position: 3,
              name: "UNION attack — determine number of columns",
              difficulty: "practitioner",
              estMinutes: 15,
              path: "labs/portswigger/sql-injection/03-union-column-count.html",
              upstreamUrl: "https://portswigger.net/web-security/sql-injection/union-attacks/lab-determine-number-of-columns",
              blurb: "UNION is a cheat code. But first you have to count the columns."
            }
          ]
        }
      ]
    }
  ]
};

/* ---------- THM PATHS + ROOMS --------------------------------------------------------
   Each PATH (learning path) has a list of ROOMS you've rebuilt.
   Only add a room entry here AFTER you create the HTML page for it.
   `thmUrl` = the original THM room URL (so the page can link back to it).
-------------------------------------------------------------------------------------- */
window.SITE_THM = {
  paths: [
    {
      slug: "cybersec-101",
      name: "Cybersecurity 101",
      icon: "🎓",
      blurb: "THM's intro path — Linux, networking, Windows, crypto, pentest basics.",
      rooms: [
        {
          slug: "linux-fundamentals-part-2",
          name: "Linux Fundamentals Part 2",
          icon: "🐧",
          blurb: "SSH in, read man pages, break files with chmod, and decode rwx like a wizard.",
          path: "tryhackme/cybersec-101/linux-fundamentals-part-2.html",
          thmUrl: "https://tryhackme.com/room/linuxfundamentalspart2",
          completed: false,
          tags: ["linux", "ssh", "permissions", "cli", "fundamentals"]
        },
        {
          slug: "web-application-security",
          name: "Web Application Security",
          icon: "🕸️",
          blurb: "What web apps ARE, how attackers break them, and a hands-on IDOR takedown.",
          path: "tryhackme/cybersec-101/web-application-security.html",
          thmUrl: "https://tryhackme.com/room/introwebapplicationsecurity",
          completed: false,
          tags: ["web", "owasp", "idor", "fundamentals", "bug-bounty"]
        },
        {
          slug: "linux-fundamentals-part-3",
          name: "Linux Fundamentals Part 3",
          icon: "🐧",
          blurb: "Nano vs vim, wget, scp, cron, systemd, apt & logs — the daily-driver Linux toolkit.",
          path: "tryhackme/cybersec-101/linux-fundamentals-part-3.html",
          thmUrl: "https://tryhackme.com/room/linuxfundamentalspart3",
          completed: false,
          tags: ["linux", "cron", "systemd", "apt", "logs", "automation", "fundamentals"]
        }
      ]
    }
  ]
};

/* ============================================================
   ROOT PATH DETECTION
   ============================================================ */
window.rootBase = (function () {
  const path = window.location.pathname;
  // Any page under /topics/<lane>/<slug>/<file>, /labs/<plat>/<file>,
  // /tryhackme/<path>/<file>, or /glossary/<file>. Walk up to vault root.
  const m = path.match(/\/(topics|labs|glossary|tryhackme)\/(.+)/);
  if (m) {
    const segs = m[2].split('/');
    const dirs = segs.length - 1;        // directories beneath the section
    const up = 1 + dirs;                  // 1 to leave section + dirs inside
    return '../'.repeat(up);
  }
  return './';
})();

/* ============================================================
   PROGRESS BAR (scroll)
   ============================================================ */
(function () {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = pct + '%';
  });
})();

/* ============================================================
   BRAIN POWER TOGGLE
   ============================================================ */
window.toggleAnswer = function (btn) {
  const ans = btn.nextElementSibling;
  ans.classList.toggle('open');
  btn.textContent = ans.classList.contains('open') ? 'Hide answer' : 'Reveal answer';
};

/* ============================================================
   QUIZ
   ============================================================ */
window.quizAnswer = function (el, isCorrect) {
  const quiz = el.closest('.quiz');
  const fb = quiz.querySelector('.feedback');
  el.parentElement.querySelectorAll('.opt').forEach(o => o.classList.remove('correct', 'wrong'));
  if (isCorrect) {
    el.classList.add('correct');
    fb.className = 'feedback win';
    fb.textContent = '🎉 BOOM. You got it. Your brain is cooking.';
    confetti();
  } else {
    el.classList.add('wrong');
    fb.className = 'feedback lose';
    fb.textContent = '❌ Not quite — re-read the section and try again!';
  }
};

/* ============================================================
   CONFETTI
   ============================================================ */
window.confetti = function () {
  const colors = ['#00ff9d', '#ff2e63', '#ffb627', '#ffd700', '#c9d1d9', '#00d4ff'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'confetti';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.left = (50 + (Math.random() - 0.5) * 30) + '%';
    p.style.top = '50%';
    p.style.borderRadius = Math.random() < 0.5 ? '50%' : '0';
    document.body.appendChild(p);
    const dx = (Math.random() - 0.5) * 600;
    const dy = (Math.random() - 0.5) * 600 - 200;
    p.animate([
      { transform: 'translate(0,0) rotate(0)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], { duration: 1200 + Math.random() * 500, easing: 'cubic-bezier(0.2,0.6,0.3,1)' });
    setTimeout(() => p.remove(), 1800);
  }
};

/* ============================================================
   PROGRESS TRACKING (localStorage)
   ============================================================ */
const PROGRESS_KEY = 'cybersec_vault_progress_v1';

window.getProgress = function () {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || { visited: {}, completed: {} };
  } catch (e) {
    return { visited: {}, completed: {} };
  }
};

window.saveProgress = function (p) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
};

window.markVisited = function (slug) {
  const p = getProgress();
  p.visited[slug] = Date.now();
  saveProgress(p);
};

window.markCompleted = function (slug) {
  const p = getProgress();
  p.completed[slug] = Date.now();
  saveProgress(p);
};

/* Auto-mark current page as visited */
(function () {
  const pageSlug = document.body.dataset.pageSlug;
  if (pageSlug) markVisited(pageSlug);
})();

/* ============================================================
   GLOBAL SEARCH (searches topics + glossary)
   ============================================================ */
(function () {
  const searchInput = document.querySelector('input.search');
  const resultsEl = document.querySelector('.search-results');
  if (!searchInput || !resultsEl) return;

  const base = window.rootBase;

  function buildIndex() {
    const items = [];
    // Topics
    (window.SITE_TOPICS || []).forEach(t => {
      items.push({
        type: 'topic',
        name: t.name,
        blurb: t.blurb,
        aliases: [t.name.toLowerCase()],
        href: base + t.path
      });
    });
    // Glossary
    const G = window.GLOSSARY || {};
    Object.keys(G).forEach(slug => {
      const entry = G[slug];
      items.push({
        type: 'glossary',
        name: entry.name,
        blurb: entry.blurb,
        aliases: [slug, ...(entry.aliases || [])].map(a => a.toLowerCase()),
        href: base + 'glossary/' + entry.page
      });
    });
    // TryHackMe rooms (flattened across all paths)
    const THM = window.SITE_THM || { paths: [] };
    (THM.paths || []).forEach(p => {
      (p.rooms || []).forEach(r => {
        items.push({
          type: 'thm',
          name: `${r.name}`,
          blurb: `THM · ${p.name} · ${r.blurb}`,
          aliases: [r.slug, p.slug, 'tryhackme', 'thm'].map(a => a.toLowerCase()),
          href: base + r.path
        });
      });
    });
    // Labs (flattened across platform > track > lab)
    const LABS = window.SITE_LABS || { platforms: [] };
    (LABS.platforms || []).forEach(plat => {
      (plat.tracks || []).forEach(tr => {
        (tr.labs || []).forEach(lab => {
          items.push({
            type: 'lab',
            name: lab.name,
            blurb: `Lab · ${plat.name} · ${tr.name} · ${lab.blurb}`,
            aliases: [lab.slug, tr.slug, plat.slug, 'lab', 'portswigger'].map(a => a.toLowerCase()),
            href: base + lab.path
          });
        });
      });
    });
    return items;
  }

  const index = buildIndex();

  function render(query) {
    if (!query.trim()) { resultsEl.classList.remove('open'); resultsEl.innerHTML = ''; return; }
    const q = query.toLowerCase();
    const matches = index.filter(it =>
      it.name.toLowerCase().includes(q) ||
      it.blurb.toLowerCase().includes(q) ||
      it.aliases.some(a => a.includes(q))
    ).slice(0, 12);
    if (matches.length === 0) {
      resultsEl.innerHTML = '<div style="padding:14px; color: var(--ink-dim); font-size:13px;">No matches. Add a term? 🤷</div>';
      resultsEl.classList.add('open');
      return;
    }
    const tagLabel = { topic: 'Topic', glossary: 'Term', thm: 'THM', lab: 'Lab' };
    resultsEl.innerHTML = matches.map(m => `
      <a href="${m.href}">
        <span class="tag ${m.type}">${tagLabel[m.type] || m.type}</span>
        <strong>${m.name}</strong>
        <div style="color: var(--ink-dim); font-size: 12px; margin-top: 2px;">${m.blurb}</div>
      </a>
    `).join('');
    resultsEl.classList.add('open');
  }

  searchInput.addEventListener('input', e => render(e.target.value));
  searchInput.addEventListener('focus', e => { if (e.target.value) render(e.target.value); });
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) resultsEl.classList.remove('open');
  });
  // Keyboard shortcut: '/' focuses search
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      searchInput.focus();
    }
  });
})();
