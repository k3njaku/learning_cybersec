# 🤝 Contributing to Cybersec Learning Vault

Thank you for wanting to make this better! This guide walks you through everything.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Types of Contributions](#types-of-contributions)
- [Before You Start](#before-you-start)
- [Development Setup](#development-setup)
- [Content Standards](#content-standards)
- [Submitting a PR](#submitting-a-pr)

## Code of Conduct

This is an educational security resource. We expect:
- Respect for all skill levels (we were all beginners once)
- No promoting illegal activity — all content must be for ethical/educational use
- Constructive, helpful feedback in reviews

## Types of Contributions

### Easy (great first PRs)
- Fix a typo or broken link
- Add a missing glossary term
- Improve an existing explanation
- Add a missing CVE example

### Medium
- Add a new "Try it yourself" challenge
- Write a PortSwigger lab walkthrough
- Add a new tool cheatsheet
- Rebuild a TryHackMe room in our style

### Advanced
- Create a fully new topic page
- Build a Docker lab environment
- Add a new interactive playground (in-browser demo)
- Write a CTF walkthrough (HTB/THM machine)

## Before You Start

1. **Check open issues** — your idea might already be tracked
2. **Read AGENTS.md** — the design system rules (required reading)
3. **Read CONVENTIONS.md** — the quick-reference cheat sheet
4. **Check templates/** — always copy the right template for new pages

## Development Setup

```bash
git clone https://github.com/ExploitCraft/learning_cybersec.git
cd learning_cybersec
python3 -m http.server 8000
# Visit http://localhost:8000
```

No build step, no dependencies. Just a browser.

## Content Standards

Every new page must have:

| Requirement | How |
|------------|-----|
| Difficulty badge | Add 🐣/🐥/🦅 in the hero section |
| Interactive element | Playground, quiz, or demo |
| Real CVE example | With CVSS score + affected versions |
| Challenge | "Try it yourself" section with hints + solution |
| Cross-links | Glossary terms via `<span class="term" data-term="...">` |
| Lab link | Link to Docker lab, THM room, or PortSwigger |

### Writing voice
- Conversational, direct, no corporate speak
- Analogies before technical details
- Code examples over walls of text
- NetworkChuck energy, not CISSP exam manual energy

## Submitting a PR

```bash
# Fork the repo, then:
git checkout -b add-xss-playground
# Make your changes
git add .
git commit -m "Add: XSS reflected/stored/DOM interactive playground"
git push origin add-xss-playground
# Open a PR on GitHub
```

Fill out the PR template completely. PRs without the checklist filled in will be politely asked to complete it first.

---

**☕ Happy contributing. You're helping the next person who Googles "how does XSS work" at 2am.**

