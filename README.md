<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=28&duration=3000&pause=1000&color=00FF41&center=true&vCenter=true&width=700&lines=☕+Cybersec+Learning+Vault;Interactive+%7C+ADHD-Friendly+%7C+Free;Web+App+Pentesting+%26+Bug+Bounty;No+textbooks.+All+hacking." alt="Typing SVG" />

<br/>

[![Stars](https://img.shields.io/github/stars/ExploitCraft/learning_cybersec?style=for-the-badge&logo=github&color=FFD700&labelColor=0d1117)](https://github.com/ExploitCraft/learning_cybersec/stargazers)
[![Forks](https://img.shields.io/github/forks/ExploitCraft/learning_cybersec?style=for-the-badge&logo=github&color=00FF41&labelColor=0d1117)](https://github.com/ExploitCraft/learning_cybersec/network/members)
[![Issues](https://img.shields.io/github/issues/ExploitCraft/learning_cybersec?style=for-the-badge&logo=github&color=FF4444&labelColor=0d1117)](https://github.com/ExploitCraft/learning_cybersec/issues)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&labelColor=0d1117)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge&labelColor=0d1117)](CONTRIBUTING.md)

<br/>

[![GitHub Pages](https://img.shields.io/badge/Live_Site-GitHub_Pages-222?style=for-the-badge&logo=githubpages&logoColor=white&color=0d1117)](https://exploitcraft.github.io/learning_cybersec/)
[![Last Commit](https://img.shields.io/github/last-commit/ExploitCraft/learning_cybersec?style=for-the-badge&color=purple&labelColor=0d1117)](https://github.com/ExploitCraft/learning_cybersec/commits)
[![Contributors](https://img.shields.io/github/contributors/ExploitCraft/learning_cybersec?style=for-the-badge&color=cyan&labelColor=0d1117)](https://github.com/ExploitCraft/learning_cybersec/graphs/contributors)

<br/>

> **🎯 Mission:** An interactive, ADHD-friendly cybersecurity learning site.  
> **Head First** × **NetworkChuck** energy. Zero textbooks. All interaction. Pure hacking.

<a href="https://exploitcraft.github.io/learning_cybersec/">
  <img src="https://img.shields.io/badge/🚀_LAUNCH_THE_VAULT-Click_Here-00FF41?style=for-the-badge&labelColor=0d1117" alt="Launch Vault" />
</a>

</div>

---

## 🧭 Table of Contents

- [Why This Exists](#-why-this-exists)
- [What's Inside](#-whats-inside)
- [Quick Start](#-quick-start)
- [Learning Paths](#-learning-paths)
- [Content Overview](#-content-overview)
- [Progress System](#-progress-system)
- [Skill Badges](#-skill-badges)
- [Docker Labs](#-docker-labs)
- [Contributing](#-contributing)
- [Community](#-community)
- [Roadmap](#-roadmap)
- [Ethical Disclaimer](#%EF%B8%8F-ethical-disclaimer)

---

## 💡 Why This Exists

Most cybersecurity learning resources are either:
- 🥱 Dense textbooks with zero interactivity
- 💸 $2,000 Udemy courses that go on sale for $14.99
- 📋 Boring walls of bullet points

This vault is different. It's built by a self-taught bug-bounty hunter (with ADHD) who learns by **doing** — not reading. Every page is an interactive experience with:

| Feature | Description |
|---------|-------------|
| 🧩 **Live Demos** | Try attacks directly in-browser |
| 🔗 **Hover Glossary** | 50+ terms with popup previews |
| 📊 **Progress Tracking** | localStorage-based, 100% private |
| 🎮 **Mini Challenges** | "Try it yourself" at every section |
| 🔍 **Global Search** | Press `/` anywhere to search |
| 🐳 **Docker Labs** | One-command vulnerable environments |
| 🏆 **Skill Badges** | Track your level per topic |

---

## 🗂️ What's Inside

```
learning_cybersec/
│
├── 📁 00-Prerequisites/           🐣 Start here if you're new
│   ├── linux-essentials/          Linux CLI survival guide
│   ├── networking-101/            TCP/IP, DNS, HTTP explained visually
│   ├── python-for-hackers/        Scripting from zero → recon tools
│   └── burp-suite-setup/          Your browser + Burp = power
│
├── 📁 01-Reconnaissance/          🐣→🐥 OSINT & passive recon
│   ├── shodan-cli/                Shodan from the terminal
│   ├── leaky-commits/             Mining GitHub for secrets
│   ├── subdomain-enum/            amass, subfinder workflows
│   └── google-dorks/              Advanced search operators
│
├── 📁 02-Web-App-Attacks/         🐥→🦅 The core lane
│   ├── sql-injection/             ★ Interactive SQLi playground
│   ├── xss/                       Reflected, Stored, DOM-based
│   ├── csrf/                      Token bypass techniques
│   ├── ssrf/                      Server-Side Request Forgery
│   ├── idor/                      Broken access control
│   ├── jwt-attacks/               Algorithm confusion, none-alg
│   ├── xxe/                       XML External Entity attacks
│   ├── ssti/                      Template injection (Flask/Jinja2)
│   └── wordpress-pentesting/      WPScan, CVE exploits, mass scan
│
├── 📁 03-Network-Pentesting/      🐥 Network layer attacks
│   ├── nmap-mastery/              Port scanning → NSE scripts
│   ├── metasploit/                Framework basics → automation
│   ├── password-attacks/          Hydra, hashcat, wordlists
│   └── wireshark/                 Traffic analysis & secrets
│
├── 📁 04-Privilege-Escalation/    🐥→🦅 Post-shell takeover
│   ├── linux-privesc/             SUID, sudo abuse, cron jobs
│   ├── windows-privesc/           Token impersonation, AlwaysInstallElevated
│   └── privesc-checklist/         Interactive checklist tool
│
├── 📁 05-Post-Exploitation/       🦅 Advanced red team
│   ├── persistence/               Backdoors, scheduled tasks
│   ├── lateral-movement/          Pass-the-hash, Mimikatz
│   └── c2-basics/                 Command & Control concepts
│
├── 📁 06-CTF-Walkthroughs/        🐣→🦅 Real machines
│   ├── tryhackme/                 Rebuilt THM rooms (non-boring)
│   ├── htb-academy/               HackTheBox Academy notes
│   └── portswigger-labs/          Web Security Academy solutions
│
├── 📁 07-Career-Resources/        💼 Turn skills into $$$
│   ├── oscp-prep/                 90-day OSCP roadmap
│   ├── bug-bounty-methodology/    Recon → report workflow
│   ├── interview-prep/            Common questions + answers
│   └── certifications/            CEH, eJPT, OSCP comparison
│
├── 📁 tools/                      🔧 Cheat sheets & scripts
│   ├── cheatsheets/               One-page references for every tool
│   └── wp-vuln-scanner.sh         WordPress automation script
│
├── 📁 labs/                       🐳 Hands-on environments
│   ├── docker/                    One-command vulnerable apps
│   └── portswigger/               PortSwigger lab walkthroughs
│
├── 📁 glossary/                   📖 50+ term definitions
│   └── [50+ .html files]
│
└── 📁 docs/                       📊 Meta & progress tracking
    ├── CONTRIBUTING.md
    ├── CHANGELOG.md
    └── progress-tracker/
```

---

## 🚀 Quick Start

**Option 1: Just open it (zero dependencies)**
```bash
git clone https://github.com/ExploitCraft/learning_cybersec.git
cd learning_cybersec
open index.html   # macOS
xdg-open index.html  # Linux
```

**Option 2: Local server (recommended)**
```bash
python3 -m http.server 8000
# → http://localhost:8000
```

**Option 3: Docker Labs** *(for hands-on attack practice)*
```bash
docker-compose -f labs/docker/wp-lab/docker-compose.yml up -d
# → Vulnerable WordPress at http://localhost:8080
# → phpMyAdmin at http://localhost:8081
```

---

## 🗺️ Learning Paths

Choose your goal and follow the path:

### 🎯 Path 1: Bug Bounty Hunter *(Recommended)*
```
00-Prerequisites → 01-Reconnaissance → 02-Web-App-Attacks → 07-Career-Resources/bug-bounty
Duration: 3-6 months | Goal: First bounty payout
```

### 🛡️ Path 2: Junior Penetration Tester
```
00-Prerequisites → 03-Network-Pentesting → 04-Privilege-Escalation → 07-Career-Resources/oscp-prep
Duration: 6-12 months | Goal: eJPT or OSCP certification
```

### 🏴‍☠️ Path 3: CTF Player
```
00-Prerequisites → 02-Web-App-Attacks → 06-CTF-Walkthroughs
Duration: 2-4 months | Goal: Top 1000 on CTFTime
```

### 📚 Path 4: Complete Beginner
```
00-Prerequisites (all) → 01-Reconnaissance → 06-CTF-Walkthroughs/tryhackme
Duration: 1-2 months | Goal: TryHackMe Top 5%
```

---

## 📈 Progress System

Every page you visit is tracked privately in `localStorage` — it never leaves your device.

| Feature | How it works |
|---------|-------------|
| 📍 Recently Viewed | Home page shows last 10 pages visited |
| ✅ Chapter Progress | Green checkmarks appear as you scroll |
| 🏆 Skill Badges | Auto-awarded when you complete a section |
| 🔍 Global Search | Press `/` to search all topics + glossary |
| 📊 Dashboard | Home page shows completion % per lane |

---

## 🏅 Skill Badges

| Badge | Meaning | How to Earn |
|-------|---------|-------------|
| 🐣 **Beginner** | Fundamentals | Complete Prerequisites |
| 🐥 **Intermediate** | Applied skills | Complete any primary lane (Web/Network) |
| 🦅 **Advanced** | Exploitation | Complete PrivEsc or Post-Exploitation |
| 💀 **Elite** | Full-stack attacker | Complete all 7 sections |

---

## 🐳 Docker Labs

Spin up real vulnerable environments in one command:

| Lab | Stack | Port | Command |
|-----|-------|------|---------|
| 🟦 Vulnerable WordPress | WordPress 5.6 + PHP 7.4 + MySQL | 8080 | `docker-compose up -f labs/docker/wp-lab` |
| 🔴 DVWA | PHP + MySQL | 8081 | `docker-compose up -f labs/docker/dvwa` |
| 🟠 Juice Shop | Node.js | 3000 | `docker-compose up -f labs/docker/juiceshop` |
| 🟢 SQLi Lab | Custom Flask app | 5000 | `docker-compose up -f labs/docker/sqli-lab` |

> ⚠️ **These are intentionally vulnerable. Only run on a private network.**

---

## 🤝 Contributing

Contributions are what make this vault grow. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

**Quick contribution types:**
- 🐛 **Bug fix** → Fix broken links, typos, code errors
- 📝 **New topic** → Add a new attack technique page
- 🧪 **New lab** → Dockerized vulnerable environment  
- 🌐 **Translation** → Translate pages to other languages
- 📷 **Screenshots** → Add step-by-step visuals

**First-time contributors:** Look for issues tagged [`good first issue`](https://github.com/ExploitCraft/learning_cybersec/issues?q=label%3A%22good+first+issue%22)

---

## 🌐 Community

<div align="center">

[![Discord](https://img.shields.io/badge/Discord-Join_Server-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/YOUR_INVITE)
[![Reddit](https://img.shields.io/badge/Reddit-r/learncybersec-FF4500?style=for-the-badge&logo=reddit&logoColor=white)](https://reddit.com)
[![Twitter/X](https://img.shields.io/badge/Twitter-@ExploitCraft-000000?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com)

</div>

**Weekly Challenge** — Every Monday a new CTF-style challenge drops in Discussions. Solve it, write a writeup, earn credit.

---

## 📅 Roadmap

- [x] Interactive SQL Injection playground
- [x] WordPress pentesting with CVE examples
- [x] TryHackMe room rebuilds
- [x] Glossary with hover previews
- [x] Docker lab (WordPress)
- [ ] XSS interactive playground *(in progress)*
- [ ] OSCP 90-day tracker *(planned)*
- [ ] Weekly CTF challenge calendar *(planned)*
- [ ] Progress export (PDF report card) *(planned)*
- [ ] Mobile-responsive redesign *(planned)*

---

## ⚖️ Ethical Disclaimer

> This repository is created for **educational purposes only**.  
> All techniques demonstrated here are intended to be practiced in:
> - Your own controlled lab environments
> - Platforms like HackTheBox, TryHackMe, PortSwigger Academy
> - Bug bounty programs with explicit scope
>
> **Unauthorized access to computer systems is illegal** under the Computer Fraud and Abuse Act (CFAA) and equivalent laws worldwide. The author and contributors are not responsible for misuse of this material.
>
> **Hack ethically. Disclose responsibly. Get paid legally.** 🤝

---

## 📜 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.  
Feel free to use, fork, and share. Attribution appreciated but not required.

---

<div align="center">

**☕ Happy hacking. Break things ethically. Learn things deeply. Repeat.**

<br/>

*If this vault helped you, please consider giving it a ⭐ — it helps others find it!*

<br/>

[![Star History Chart](https://api.star-history.com/svg?repos=ExploitCraft/learning_cybersec&type=Date)](https://star-history.com/#ExploitCraft/learning_cybersec)

</div>
