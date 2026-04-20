/* ============================================================
   GLOSSARY SYSTEM
   - Central database of all terms + definitions
   - Auto-links any <span class="term" data-term="slug"> in pages
   - Hover preview with mini definition + link to full page
   - Used by the glossary index page too
   ============================================================ */

window.GLOSSARY = {
  /* ---------- A ---------- */
  "access-control": {
    name: "Access Control (A01)",
    aliases: ["broken-access-control", "authorization", "authz", "bac"],
    category: "Web Vulnerability",
    blurb: "Rules about WHO can do WHAT. When they break, any user can do admin things.",
    short: "The mechanism that decides if an authenticated user is ALLOWED to access a resource or perform an action. Broken Access Control (OWASP A01 — the #1 web vuln) = these rules are missing or bypassable. Examples: viewing other users' data by changing an ID in the URL (IDOR), accessing /admin as a regular user, deleting someone else's post. Highest-paying class of bugs in bug bounty.",
    page: "access-control.html",
    related: ["idor", "authentication", "sql-injection"]
  },
  "arbitrary-code-execution": {
    name: "Arbitrary Code Execution",
    aliases: ["ACE", "RCE", "Remote Code Execution", "Code Execution"],
    category: "Exploitation Outcome",
    blurb: "The holy grail of attacks — running YOUR code on someone else's computer.",
    short: "When an attacker can run ANY code of their choice on a target system. Usually the final boss of a vulnerability chain — game over for the victim. If it's remote (over the network), we call it RCE.",
    page: "arbitrary-code-exec.html",
    related: ["rce", "sql-injection", "reverse-shell", "privilege-escalation"]
  },
  "authentication": {
    name: "Authentication",
    aliases: ["authn", "login", "auth"],
    category: "Web Security",
    blurb: "Proving you are who you say you are. Usually: password, key, or 2FA code.",
    short: "The process of verifying identity. Classic auth = username + password, but modern apps layer MFA, SSO, OAuth, biometrics. Not to be confused with authorization (what you're allowed to do AFTER logging in). OWASP A07 'Identification and Authentication Failures' covers weak passwords, missing rate limits, session hijacking, credential stuffing.",
    page: "authentication.html",
    related: ["access-control", "brute-force", "ssh"]
  },
  "blind-sqli": {
    name: "Blind SQL Injection",
    aliases: ["blind sqli"],
    category: "SQL Injection",
    blurb: "SQLi when the app shows no query results OR errors. You attack by asking yes/no questions.",
    short: "A form of SQL injection where the application doesn't return query results or database errors in its response. You extract data by asking questions the database answers through differences in page behavior, timing, or out-of-band channels.",
    page: "blind-sqli.html",
    related: ["sql-injection", "time-based-sqli", "boolean-sqli", "oast"]
  },
  "brute-force": {
    name: "Brute Force Attack",
    aliases: ["bruteforce", "password-guessing", "credential-stuffing"],
    category: "Attack Technique",
    blurb: "Guessing passwords by trying millions of combinations until one works.",
    short: "An attack where you try every possible password (or a big wordlist of common ones) until the login accepts one. Tools like Hydra, Medusa, Burp Intruder automate it. Works great against logins with no rate limiting or account lockout. Credential stuffing = same idea but using leaked username+password pairs from other breaches.",
    page: "brute-force.html",
    related: ["authentication", "ssh", "payload"]
  },
  "bug-bounty": {
    name: "Bug Bounty",
    aliases: ["bug-bounty program"],
    category: "Industry",
    blurb: "Companies paying hackers to legally find bugs in their systems.",
    short: "A program where companies pay ethical hackers to find and report security vulnerabilities. Platforms like HackerOne and Bugcrowd host these programs. Rewards range from a t-shirt to $100,000+ per bug.",
    page: "bug-bounty.html",
    related: ["ethical-hacking", "cve", "disclosure"]
  },

  /* ---------- C ---------- */
  "chmod": {
    name: "chmod",
    aliases: ["chmod command", "change-mode", "change-permissions"],
    category: "Linux Command",
    blurb: "The Linux command that changes file permissions. Lives in every privesc writeup.",
    short: "Short for 'change mode.' Changes who can read, write, or execute a file/directory. Used with symbolic (u+x) or numeric (755, 644, 777) syntax. A misconfigured chmod is a classic privilege-escalation goldmine — world-writable scripts that root executes, world-readable password files, SUID binaries.",
    page: "chmod.html",
    related: ["linux-permissions", "su", "privilege-escalation"]
  },
  "cryptographic-failure": {
    name: "Cryptographic Failure (A02)",
    aliases: ["crypto-failure", "sensitive-data-exposure", "weak-crypto"],
    category: "Web Vulnerability",
    blurb: "Sending data in the clear, using broken crypto, or hardcoding weak keys.",
    short: "OWASP A02. The umbrella for every way sensitive data leaks because of bad crypto choices: HTTP instead of HTTPS, MD5 for password hashing, hardcoded '1234' as an encryption key, missing encryption on backups. Previously called 'Sensitive Data Exposure.' Leads to mass credential theft, PII breaches, and compliance nightmares (GDPR, PCI-DSS).",
    page: "cryptographic-failure.html",
    related: ["https", "pii", "authentication"]
  },
  "csrf": {
    name: "CSRF (Cross-Site Request Forgery)",
    aliases: ["csrf", "xsrf"],
    category: "Web Vulnerability",
    blurb: "Tricking a logged-in user's browser into making requests they didn't intend.",
    short: "An attack that forces a user's authenticated browser to submit a forged request to a target site — changing their email, transferring money, etc. — without their knowledge.",
    page: "csrf.html",
    related: ["xss", "same-origin-policy"]
  },

  /* ---------- D ---------- */
  "ddos": {
    name: "DDoS (Distributed Denial of Service)",
    aliases: ["ddos", "denial of service", "dos"],
    category: "Attack Type",
    blurb: "Flooding a server with traffic until it dies.",
    short: "An attack that overwhelms a server with so much traffic (often from thousands of infected machines) that legitimate users can't reach it. Takes services offline.",
    page: "ddos.html",
    related: ["botnet"]
  },

  /* ---------- E ---------- */
  "encoding": {
    name: "Encoding",
    aliases: ["url encoding", "html encoding", "base64"],
    category: "Data Transformation",
    blurb: "Reversibly rewriting characters so they survive in different contexts.",
    short: "Converting characters into a different representation (e.g., %27 for ' in URLs, &#x53; for S in HTML/XML). Used legitimately to move data safely — and used by attackers to bypass input filters.",
    page: "encoding.html",
    related: ["obfuscation", "waf"]
  },

  /* ---------- H ---------- */
  "https": {
    name: "HTTPS",
    aliases: ["http over tls", "tls", "ssl", "secure-http"],
    category: "Network Protocol",
    blurb: "HTTP + encryption. The padlock icon in your browser. Table stakes in 2026.",
    short: "Hypertext Transfer Protocol Secure. It's regular HTTP wrapped inside a TLS (formerly SSL) encrypted tunnel. Prevents eavesdroppers on the network from reading your traffic (credentials, cookies, bank details). Runs on port 443 by default. If a login page is still on HTTP in 2026, it's a finding — treat it as an OWASP A02 Cryptographic Failure.",
    page: "https.html",
    related: ["cryptographic-failure", "ssh"]
  },

  /* ---------- I ---------- */
  "idor": {
    name: "IDOR (Insecure Direct Object Reference)",
    aliases: ["insecure-direct-object-reference", "direct-object-reference"],
    category: "Web Vulnerability",
    blurb: "Change the ID in the URL, access someone else's stuff. The bug bounty gold mine.",
    short: "A web vulnerability where the app uses user-supplied input (usually an ID in the URL or request body) to look up data — but doesn't check if the user is ALLOWED to see that data. Change ?id=16 to ?id=17 and you're reading another user's profile. A subclass of Broken Access Control (OWASP A01). One of the most common and most lucrative classes in bug bounty because it's easy to find and hard for devs to catch with automated tools.",
    page: "idor.html",
    related: ["access-control", "bug-bounty", "authentication"]
  },

  /* ---------- L ---------- */
  "linux-permissions": {
    name: "Linux Permissions (rwx)",
    aliases: ["file permissions", "unix permissions", "rwx", "chmod permissions", "posix permissions"],
    category: "Linux Fundamentals",
    blurb: "rwx for owner/group/others. The reason hackers live for misconfigured chmod.",
    short: "Every file and directory on Linux has permissions split into three groups (owner / group / others), each with three rights: read (r=4), write (w=2), execute (x=1). Add them up per group = numeric mode (e.g. 755 = rwxr-xr-x). Pentesters scan for world-writable files and readable shadow files because lazy admins give `chmod 777` a run.",
    page: "linux-permissions.html",
    related: ["chmod", "su", "privilege-escalation"]
  },

  /* ---------- M ---------- */
  "man-page": {
    name: "Man Page",
    aliases: ["manual page", "man", "man command", "unix manual"],
    category: "Linux Fundamentals",
    blurb: "The built-in Linux manual. `man <command>` = RTFM, but friendly.",
    short: "Short for 'manual page.' Every standard Linux command ships with docs accessible via `man <cmd>`. Shows synopsis, flags, examples. Navigate with arrow keys, search with `/pattern`, quit with `q`. Knowing how to read man pages is the difference between guessing flags and actually owning the shell.",
    page: "man-page.html",
    related: ["linux-permissions", "chmod"]
  },

  /* ---------- O ---------- */
  "oast": {
    name: "OAST (Out-of-Band Application Security Testing)",
    aliases: ["out-of-band", "oob"],
    category: "Testing Technique",
    blurb: "Making the target phone home to YOUR server to confirm a vuln.",
    short: "A technique where the vulnerable target is made to initiate a network request to an attacker-controlled server (via DNS, HTTP, etc.). Lets you detect and exploit vulnerabilities that don't reflect anything in responses. Burp Collaborator is the classic tool.",
    page: "oast.html",
    related: ["blind-sqli", "ssrf", "burp-collaborator"]
  },

  /* ---------- P ---------- */
  "parameterized-query": {
    name: "Parameterized Query",
    aliases: ["prepared statement", "parameterized-queries", "prepared-statements"],
    category: "Defense",
    blurb: "The PROPER way to mix user input into a SQL query — as data, never as code.",
    short: "A way of writing database queries where the SQL structure is defined first with placeholders (?) and then user input is sent separately as data. The database never treats user input as SQL code, making injection impossible.",
    page: "parameterized-query.html",
    related: ["sql-injection", "orm", "input-validation"]
  },
  "payload": {
    name: "Payload",
    aliases: ["payloads", "malicious-payload"],
    category: "Offensive Terminology",
    blurb: "The specific piece of input an attacker crafts to exploit a vuln.",
    short: "The exact string, file, or data an attacker submits to trigger a vulnerability. For SQLi it's like `' OR 1=1--`. For XSS it's like `<script>alert(1)</script>`. The weapon, basically.",
    page: "payload.html",
    related: ["exploit", "injection"]
  },
  "pii": {
    name: "PII (Personally Identifiable Information)",
    aliases: ["personal data"],
    category: "Data Classification",
    blurb: "Data that can identify a real human — names, SSNs, emails, phone numbers.",
    short: "Any info that can be used on its own or with other info to identify a specific person. Regulated under laws like GDPR (EU) and CCPA (California). Leaking PII triggers breach notifications and huge fines.",
    page: "pii.html",
    related: ["ssn", "gdpr", "data-breach"]
  },

  /* ---------- R ---------- */
  "rce": {
    name: "RCE (Remote Code Execution)",
    aliases: ["remote code execution"],
    category: "Exploitation Outcome",
    blurb: "Running your code on a target machine — over the network. Ultimate pwnage.",
    short: "Arbitrary Code Execution achieved over a network (i.e., without physical access). Usually the top severity finding. Often follows a chain of lesser vulns that get escalated.",
    page: "arbitrary-code-exec.html#rce",
    related: ["arbitrary-code-execution", "reverse-shell", "sql-injection"]
  },
  "reverse-shell": {
    name: "Reverse Shell",
    aliases: ["reverse-shell"],
    category: "Post-Exploitation",
    blurb: "Making the victim's machine connect back to YOU, giving you command-line access.",
    short: "Instead of you connecting into the victim (which firewalls often block outbound), you make the victim's machine open an outbound connection to a server you control, then type commands into their shell. Classic persistence move after an RCE.",
    page: "reverse-shell.html",
    related: ["rce", "arbitrary-code-execution", "netcat"]
  },

  /* ---------- S ---------- */
  "single-quote": {
    name: "Single Quote ( ' )",
    aliases: ["apostrophe", "single-quote-delimiter", "string-delimiter"],
    category: "SQL Syntax",
    blurb: "The tiny character that can break the internet. A string delimiter in SQL.",
    short: "In SQL (and many languages), the single quote character ' marks the beginning and end of a string. When developers glue user input between two single quotes without escaping, attackers can insert their own ' to break out of the string context and inject SQL commands. THE root cause of classic SQLi.",
    page: "single-quote.html",
    related: ["sql-injection", "string-escape", "sql-comment", "parameterized-query"]
  },
  "sql-comment": {
    name: "SQL Comment ( -- )",
    aliases: ["double-dash", "sql-comments"],
    category: "SQL Syntax",
    blurb: "Two dashes = 'ignore the rest of the line.' The attacker's cleanup tool.",
    short: "In SQL, -- (two hyphens followed by a space in some dialects) starts a comment. Everything after it on that line is ignored by the database. Attackers use this to chop off the rest of a query they don't need — like the password check in a login query.",
    page: "sql-comment.html",
    related: ["single-quote", "sql-injection"]
  },
  "sql-injection": {
    name: "SQL Injection",
    aliases: ["sqli", "sql-injection"],
    category: "Web Vulnerability",
    blurb: "Sneaking SQL commands into user input so they get executed by the database.",
    short: "A vulnerability where attacker-controlled input gets concatenated into a SQL query. The database then executes the attacker's SQL alongside the app's. Can leak data, bypass auth, destroy tables, or even lead to RCE.",
    page: "sql-injection-term.html",
    related: ["blind-sqli", "union-attack", "single-quote", "parameterized-query"]
  },
  "ssn": {
    name: "SSN (Social Security Number)",
    aliases: ["social security", "social-security-number"],
    category: "Sensitive Data",
    blurb: "9-digit US government ID. The master key to someone's financial identity.",
    short: "A 9-digit number issued by the US Social Security Administration. Originally for retirement tracking, now used (often incorrectly) as a universal ID for banks, credit, and employment. Leaked SSNs enable identity theft — loans, tax fraud, accounts opened in your name.",
    page: "ssn.html",
    related: ["pii", "identity-theft", "data-breach"]
  },
  "ssh": {
    name: "SSH (Secure Shell)",
    aliases: ["secure-shell", "ssh command", "ssh protocol"],
    category: "Network Protocol",
    blurb: "Encrypted remote shell. The pentester's / sysadmin's front door.",
    short: "A network protocol (port 22 by default) for securely logging into a remote machine's command line over an encrypted channel. Uses passwords or (better) key pairs for auth. Every CTF/bounty target with SSH exposed is a juicy target — weak creds, leaked keys, or old CVEs can hand you a shell.",
    page: "ssh.html",
    related: ["reverse-shell", "linux-permissions", "su"]
  },
  "ssrf": {
    name: "SSRF (Server-Side Request Forgery)",
    aliases: ["ssrf"],
    category: "Web Vulnerability",
    blurb: "Making the SERVER make requests on your behalf — often reaching internal networks.",
    short: "A vulnerability where you can trick a server into making HTTP requests to URLs you choose. Used to reach internal-only services, cloud metadata endpoints (hello AWS IMDSv1), or probe internal networks from outside.",
    page: "ssrf.html",
    related: ["oast", "internal-network"]
  },
  "string-escape": {
    name: "String Escaping",
    aliases: ["escape-character"],
    category: "Defense",
    blurb: "Replacing dangerous characters with safe versions (e.g. ' → \\' or '').",
    short: "A legacy defense where special characters in user input are prefixed with a backslash or doubled so they're treated as literal data. Modern advice: DON'T rely on this — use parameterized queries instead. Escaping is error-prone and easy to bypass.",
    page: "string-escape.html",
    related: ["parameterized-query", "single-quote", "sql-injection"]
  },
  "su": {
    name: "su (Switch User)",
    aliases: ["su command", "switch-user", "substitute-user"],
    category: "Linux Command",
    blurb: "Become another user. `su -` = drop into their shell like you logged in as them.",
    short: "The Linux `su` command switches your current shell to another user. Needs their password (unless you're root). `su - <user>` (with -l or --login) loads that user's full environment — shell, PATH, home directory. Classic post-exploit move: pop a low-priv shell, then `su` into another compromised account.",
    page: "su.html",
    related: ["ssh", "linux-permissions", "chmod", "privilege-escalation"]
  },

  /* ---------- U ---------- */
  "union-attack": {
    name: "UNION Attack",
    aliases: ["union-select", "union-based-sqli"],
    category: "SQL Injection",
    blurb: "Using the SQL UNION keyword to append your OWN query's results to the original.",
    short: "A SQLi technique where you inject a UNION SELECT to append data from ANY table onto the original query's results. Requires matching the original query's column count and compatible data types.",
    page: "union-attack.html",
    related: ["sql-injection", "blind-sqli"]
  },

  /* ---------- W ---------- */
  "waf": {
    name: "WAF (Web Application Firewall)",
    aliases: ["web-application-firewall"],
    category: "Defense",
    blurb: "A filter that sits in front of web apps and tries to block obvious attacks.",
    short: "Software or hardware that inspects incoming HTTP requests and blocks ones that look malicious (SQLi keywords, XSS payloads, etc.). Helpful as defense-in-depth, but NEVER a replacement for fixing the underlying vuln — WAFs can usually be bypassed with encoding tricks.",
    page: "waf.html",
    related: ["encoding", "bypass", "sql-injection"]
  },

  /* ---------- X ---------- */
  "xss": {
    name: "XSS (Cross-Site Scripting)",
    aliases: ["xss", "cross-site-scripting"],
    category: "Web Vulnerability",
    blurb: "Injecting JavaScript into a web page so it runs in other users' browsers.",
    short: "A vulnerability where attacker-controlled input ends up in HTML/JS rendered by the browser. The attacker's code runs in the victim's context — steal cookies, hijack sessions, keylog, deface.",
    page: "xss.html",
    related: ["csrf", "same-origin-policy"]
  }
};

/* ============================================================
   AUTO-LINKER
   Turn every <span class="term" data-term="slug">…</span>
   into a hoverable / clickable link to /glossary/<page>
   ============================================================ */

(function () {
  const G = window.GLOSSARY;
  let popover = null;
  let popoverTimer = null;

  // Figure out relative path to /glossary/ from current page.
  // Works for any nesting depth by counting segments after the vault root.
  // Key sections: /topics/<lane>/<slug>/..., /glossary/..., /labs/<plat>/...,
  // /tryhackme/<path>/...
  function glossaryBase() {
    const path = window.location.pathname;
    if (path.includes('/glossary/')) return './';
    const m = path.match(/\/(topics|labs|tryhackme)\/(.+)/);
    if (m) {
      const segs = m[2].split('/');
      const dirs = segs.length - 1;
      const up = 1 + dirs;
      return '../'.repeat(up) + 'glossary/';
    }
    return './glossary/'; // root (index.html)
  }

  function createPopover() {
    if (popover) return popover;
    popover = document.createElement('div');
    popover.className = 'term-popover';
    document.body.appendChild(popover);
    popover.addEventListener('mouseenter', () => clearTimeout(popoverTimer));
    popover.addEventListener('mouseleave', hidePopover);
    return popover;
  }

  function showPopover(el, entry) {
    const pop = createPopover();
    const base = glossaryBase();
    pop.innerHTML = `
      <h5>${entry.name}</h5>
      <p>${entry.short}</p>
      <a class="more" href="${base}${entry.page}">Read full page →</a>
    `;
    pop.classList.add('open');

    // Position below the term, clamped to viewport
    const rect = el.getBoundingClientRect();
    const popWidth = 320;
    let left = rect.left + window.scrollX;
    const maxLeft = window.scrollX + document.documentElement.clientWidth - popWidth - 12;
    if (left > maxLeft) left = maxLeft;
    if (left < window.scrollX + 12) left = window.scrollX + 12;
    pop.style.left = left + 'px';
    pop.style.top = (rect.bottom + window.scrollY + 6) + 'px';
  }

  function hidePopover() {
    if (!popover) return;
    popoverTimer = setTimeout(() => popover.classList.remove('open'), 150);
  }

  function initTerms() {
    const base = glossaryBase();
    document.querySelectorAll('.term[data-term]').forEach(el => {
      const slug = el.dataset.term;
      const entry = G[slug];
      if (!entry) {
        console.warn('Unknown glossary term:', slug);
        el.style.color = 'var(--danger)';
        el.title = `Unknown term: ${slug}`;
        return;
      }
      el.title = entry.name;
      el.addEventListener('mouseenter', () => {
        clearTimeout(popoverTimer);
        showPopover(el, entry);
      });
      el.addEventListener('mouseleave', hidePopover);
      el.addEventListener('click', e => {
        // Allow ctrl/cmd-click for new tab via anchor behavior simulated
        window.location.href = base + entry.page;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerms);
  } else {
    initTerms();
  }

  // Expose for glossary index page
  window.glossaryBase = glossaryBase;
})();
