---
description: Security audit and vulnerability assessment with threat modeling
---

# Security Command

**Purpose**: Comprehensive security analysis and vulnerability remediation

**Auto-Activations**:
- Persona: security (primary), backend
- MCP: Sequential (threat analysis), Context7 (security patterns)
- Flags: --think-hard, --validate, --safe-mode

**Arguments**:
- `$ARGUMENTS` - Security focus or component
- `@<path>` - Specific code to audit
- `--type <audit>` - vulnerability | compliance | threat-model | penetration | all
- `--severity <filter>` - critical | high | medium | low | all
- `--fix` - Auto-fix vulnerabilities where safe

**Security Workflow**:
1. 🔍 **Threat Modeling**: Identify potential attack vectors
2. 🔎 **Vulnerability Scanning**: Detect security issues
3. 📊 **Risk Assessment**: Evaluate impact and likelihood
4. 🛡️ **Compliance Check**: Verify security standards
5. 🛠️ **Remediation**: Fix vulnerabilities systematically
6. ✅ **Validation**: Verify fixes and retest
7. 📝 **Documentation**: Document findings and fixes

**Security Domains**:
- **Authentication**: Identity verification, session management
- **Authorization**: Access control, permissions
- **Data Protection**: Encryption, PII handling
- **Input Validation**: XSS, SQL injection, command injection
- **Dependencies**: Third-party vulnerabilities
- **Configuration**: Security settings, secrets management
- **Network**: HTTPS, CORS, CSP headers

**Threat Assessment Matrix**:
- **Critical**: Immediate action required (data breach, RCE)
- **High**: Fix within 24h (auth bypass, privilege escalation)
- **Medium**: Fix within 7 days (XSS, CSRF)
- **Low**: Fix within 30 days (information disclosure, minor issues)

**Security Principles**:
1. **Security by Default**: Secure defaults, fail-safe mechanisms
2. **Zero Trust**: Verify everything, trust nothing
3. **Defense in Depth**: Multiple security layers
4. **Least Privilege**: Minimum necessary permissions
5. **Input Validation**: Never trust user input
6. **Secure Communication**: Encryption in transit and at rest

**OWASP Top 10 Coverage**:
- Injection attacks (SQL, NoSQL, Command, LDAP)
- Broken authentication
- Sensitive data exposure
- XML external entities (XXE)
- Broken access control
- Security misconfiguration
- Cross-site scripting (XSS)
- Insecure deserialization
- Using components with known vulnerabilities
- Insufficient logging and monitoring

**Quality Standards**:
- Zero critical vulnerabilities in production
- Compliance with security standards
- Comprehensive threat modeling
- All fixes validated and tested

**Examples**:
- `/security --type vulnerability @src/api --severity critical`
- `/security "Audit authentication system" --type threat-model`
- `/security @app --type all --fix` - Comprehensive audit with auto-fix
- `/security --type compliance` - Check security compliance

Execute security audit following SuperClaude security persona with zero-trust approach.
