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
     'web'  = web app pentesting (PRIMARY LANE — bug bounty territory)
     'misc' = random itch-scratching (networking, crypto, OS internals, etc.)
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
  }
];

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
    const tagLabel = { topic: 'Topic', glossary: 'Term', thm: 'THM' };
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
