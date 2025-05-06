# 🔐 Vulnerable Banking System – Offensive & Defensive Security Project

This project simulates a simple **banking web application** intentionally developed with the **OWASP Top 10 vulnerabilities**, followed by a full **remediation phase**. It demonstrates the exploitation of these flaws, and then shows how to fix them securely, making it a powerful showcase of **offensive and defensive backend security skills**.

---

## 🚀 Project Overview

- ✅ Built a banking system from scratch with key functionalities
- ⚠️ Introduced the **OWASP Top 10 vulnerabilities** intentionally
- 🕵️‍♂️ Performed manual and automated **penetration testing**
- 🛡️ Fixed all issues with secure backend implementation
- 📊 Delivered full technical reports (before & after fix)
- 🔥 Included a ransomware research report mapped to the Cyber Kill Chain

---

## 🧩 Features

### 🏦 Core Banking Functionalities:
- Simulated **user accounts and roles**
- Money **transfer** between accounts
- **View statements** per account
- **Upload complaints** (file upload)
- **Messaging system** to admin
- **Admin dashboard with logs**

### 🔓 Security Exploits:
- Demonstrated each OWASP Top 10 vulnerability:
  - Injection (SQL/Command)
  - Broken Authentication
  - Sensitive Data Exposure
  - XML External Entities (XXE)
  - Broken Access Control
  - Security Misconfiguration
  - XSS
  - Insecure Deserialization
  - Using Components with Known Vulnerabilities
  - Insufficient Logging & Monitoring

### 🛠️ Remediation Phase:
- Hardened all endpoints
- Applied secure coding best practices
- Implemented rate-limiting, validation, encryption
- Secured authentication & session handling
- Refactored upload & input parsing logic

### 🧪 Penetration Testing:
- Manual testing using **Burp Suite**
- Automated scanning using **OWASP ZAP**
- Brute-force attack scenario + fix
- Retest and comparison reports

---

## 🔀 Branches

| Branch | Description |
|--------|-------------|
| `vulnerable-version` | Contains the **intentionally insecure** implementation |
| `main` | Holds the **fully fixed and secure** version of the application |

To switch branches:
```bash
git checkout vulnerable-version  # for insecure version
git checkout main                # for secure, fixed version
