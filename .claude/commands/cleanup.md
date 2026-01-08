---
description: Technical debt reduction and code quality cleanup
---

# Cleanup Command

**Purpose**: Systematic technical debt reduction and code quality improvement

**Auto-Activations**:
- Persona: refactorer (primary)
- MCP: Sequential (systematic cleanup)
- Flags: --validate, --safe-mode

**Arguments**:
- `$ARGUMENTS` - Cleanup target or scope
- `@<path>` - Specific path to clean
- `--type <cleanup>` - unused | dead-code | duplicates | formatting | all
- `--aggressive` - More aggressive cleanup (use cautiously)
- `--dry-run` - Show cleanup plan without executing

**Cleanup Workflow**:
1. 🔍 **Debt Identification**: Scan for technical debt and quality issues
2. 📊 **Impact Analysis**: Assess cleanup impact and dependencies
3. 🎯 **Prioritization**: Order cleanup by safety and impact
4. 🛠️ **Execution**: Remove unused code, fix formatting, eliminate duplication
5. ✅ **Validation**: Verify no functionality broken
6. 🧪 **Testing**: Run full test suite
7. 📝 **Documentation**: Update documentation to reflect changes

**Cleanup Categories**:
- **Unused Code**: Imports, functions, variables not referenced
- **Dead Code**: Unreachable code paths
- **Duplicates**: Duplicate code that should be abstracted
- **Formatting**: Code style and formatting inconsistencies
- **Dependencies**: Unused dependencies in package.json
- **Comments**: Outdated or misleading comments

**Safety Protocols**:
- Always run with --validate flag
- Create backup before aggressive cleanup
- Run full test suite after cleanup
- Review changes before committing

**Quality Standards**:
- Zero functional regressions
- All tests pass after cleanup
- Code quality metrics improve

**Examples**:
- `/cleanup --type unused --dry-run`
- `/cleanup @src --type all --validate`
- `/cleanup --type dead-code @utils`

Execute cleanup following SuperClaude refactorer persona with simplicity and safety first.
