---
description: Problem investigation and root cause analysis with systematic debugging
---

# Troubleshoot Command

**Purpose**: Systematic problem investigation and root cause identification

**Auto-Activations**:
- Persona: analyzer, qa (primary)
- MCP: Sequential (systematic analysis), Playwright (reproduction)
- Flags: --think, --seq, --validate

**Arguments**:
- `$ARGUMENTS` - Problem symptoms or error description
- `@<path>` - Specific component to investigate
- `--reproduce` - Attempt to reproduce the issue
- `--trace` - Include detailed execution traces

**Investigation Methodology**:
1. 🔍 **Symptom Documentation**: Record all observable behaviors
2. 📊 **Data Collection**: Gather logs, metrics, stack traces
3. 🧪 **Reproduction**: Attempt to reproduce issue consistently
4. 🎯 **Root Cause Analysis**: Identify underlying causes
5. 🛠️ **Solution Validation**: Test and verify fixes
6. 📝 **Prevention**: Document learnings and preventive measures

**Quality Standards**:
- Reproducible test cases for issues
- Evidence-based root cause identification
- Validated solutions before marking complete

**Examples**:
- `/troubleshoot "API returns 500 on user login" @src/auth`
- `/troubleshoot --reproduce "Memory leak in dashboard"`
- `/troubleshoot @components/DataTable --trace`

Execute systematic debugging following SuperClaude analyzer persona principles.
