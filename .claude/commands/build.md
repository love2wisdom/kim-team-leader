---
description: Project builder with framework detection and optimization
---

# Build Command

**Purpose**: Intelligent project building with framework-specific optimization

**Auto-Activations**:
- Persona: frontend, backend, architect, devops (context-dependent)
- MCP: Magic (UI builds), Context7 (framework patterns), Sequential (build logic)
- Flags: --validate, auto-compression for large builds

**Arguments**:
- `$ARGUMENTS` - Build target or component
- `@<path>` - Specific build path
- `--type <build>` - production | development | test
- `--optimize` - Enable optimization strategies
- `--analyze-bundle` - Analyze bundle size and composition

**Build Workflow**:
1. 🔍 **Framework Detection**: Identify project framework and build tools
2. 📊 **Dependency Analysis**: Verify dependencies and compatibility
3. 🛠️ **Build Execution**: Run framework-specific build process
4. ✅ **Quality Gates**: Validate syntax, types, linting
5. 📦 **Optimization**: Bundle analysis and performance optimization
6. 🧪 **Validation**: Test build artifacts and integrity

**Performance Budgets**:
- Load Time: <3s on 3G, <1s on WiFi
- Bundle Size: <500KB initial, <2MB total
- Build Time: <60s for development, <5min for production

**Quality Standards**:
- Zero errors in production builds
- Type safety validation
- Security vulnerability scanning

**Examples**:
- `/build --type production --optimize`
- `/build @src/components --analyze-bundle`
- `/build --validate`

Execute build following SuperClaude framework compliance and optimization principles.
