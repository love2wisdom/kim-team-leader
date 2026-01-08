---
description: Git workflow assistant with professional commit practices
---

# Git Command

**Purpose**: Streamlined Git operations with best practices

**Auto-Activations**:
- Persona: devops, scribe, qa (context-dependent)
- MCP: Sequential (workflow planning)
- Flags: --safe-mode (for destructive operations)

**Arguments**:
- `$ARGUMENTS` - Git operation or workflow
- `--operation <op>` - commit | pr | branch | review | history | sync
- `--message <msg>` - Commit or PR message
- `--validate` - Run quality gates before commit
- `--conventional` - Use conventional commit format

**Git Operations**:

### Commit Workflow
1. 📊 **Status Review**: Check git status and diff
2. 🔍 **Change Analysis**: Review all changes for completeness
3. ✅ **Quality Gates**: Run tests, linting, type checking
4. 📝 **Message Crafting**: Create descriptive commit message
5. 💾 **Commit**: Commit with proper attribution
6. ✅ **Verification**: Verify commit success

### PR Creation Workflow
1. 📊 **Branch Analysis**: Review all commits in branch
2. 📝 **PR Summary**: Create comprehensive PR description
3. 🧪 **Test Plan**: Define testing approach
4. 🚀 **PR Creation**: Create pull request with gh CLI
5. 🔗 **Link Return**: Return PR URL for review

**Commit Message Standards**:
- **Conventional Commits**: type(scope): description
- **Types**: feat, fix, docs, style, refactor, test, chore
- **Focus on Why**: Explain motivation, not just what
- **Professional Tone**: Clear, concise, meaningful

**Quality Gates**:
- Run linting and type checking
- Ensure tests pass
- Check for secrets or sensitive data
- Verify no unintended changes

**Safety Protocols**:
- Never auto-push without permission
- Never force push to main/master
- Always validate before destructive operations
- Preserve commit authorship

**Examples**:
- `/git --operation commit --message "feat: add user authentication" --validate`
- `/git --operation pr "Add JWT authentication feature"`
- `/git --operation review` - Review changes before commit
- `/git --operation sync` - Sync with remote

**Conventional Commit Format**:
```
type(scope): subject

body

footer

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

Execute git operations following SuperClaude devops persona with safety-first approach.
