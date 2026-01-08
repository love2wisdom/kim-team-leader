# SuperClaude Custom Commands

**Professional AI-assisted development framework** built on Claude Code with intelligent persona activation, MCP server orchestration, and evidence-based workflows.

---

## 🚀 Quick Start

All commands follow the SuperClaude framework principles from your global CLAUDE.md configuration.

### Basic Usage
```bash
/analyze @src/api --focus security
/implement "User authentication" --type feature --with-tests
/improve @components --focus performance --iterations 3
/test --type e2e --coverage
```

### With Advanced Flags
```bash
/analyze --think-hard --seq --c7
/build --type production --optimize --validate
/spawn "Security audit" --mode parallel --focus security,quality
```

---

## 📋 Command Categories

### 🔍 Analysis Commands

**`/analyze [target] [flags]`**
- Multi-dimensional code and system analysis
- Auto-activates: analyzer, architect, security personas
- MCP: Sequential (primary), Context7, Magic
- Use for: System analysis, architecture review, investigation

**`/troubleshoot [symptoms] [flags]`**
- Systematic problem investigation and debugging
- Auto-activates: analyzer, qa personas
- MCP: Sequential, Playwright (reproduction)
- Use for: Bug investigation, root cause analysis

**`/explain [topic] [flags]`**
- Educational explanations with knowledge transfer
- Auto-activates: mentor, scribe personas
- MCP: Context7, Sequential
- Use for: Learning, code understanding, documentation

---

### 🛠️ Development Commands

**`/build [target] [flags]`**
- Intelligent project building with framework detection
- Auto-activates: frontend, backend, architect, devops personas
- MCP: Magic (UI), Context7 (patterns), Sequential (logic)
- Use for: Project builds, optimization, deployment prep

**`/implement [feature] [flags]`**
- Feature and code implementation following patterns
- Auto-activates: frontend, backend, architect, security personas
- MCP: Magic (UI), Context7 (patterns), Sequential (logic)
- Use for: Feature development, component creation, API implementation

**`/design [domain] [flags]`**
- System and component design planning
- Auto-activates: architect, frontend, backend personas
- MCP: Magic (UI), Sequential (system), Context7 (patterns)
- Use for: Architecture planning, component design, system design

---

### 📋 3-Step AI Coding Workflow (PRD-Based Development)

**`/prd [feature-description]`**
- Generate Product Requirements Document (PRD)
- Auto-activates: scribe, mentor personas
- Process:
  1. Ask clarifying questions (numbered format with nested sub-questions)
  2. Generate comprehensive PRD
  3. Save as `tasks/prd-[feature-name].md`
- Use for: New feature planning, requirements gathering

**`/tasks @tasks/prd-[feature-name].md`**
- Generate task list from existing PRD
- Auto-activates: architect, qa personas
- MCP: Sequential (systematic breakdown)
- Process:
  1. Phase 1: Generate 3-5 parent tasks
  2. Wait for user "Go" confirmation
  3. Phase 2: Break down into sub-tasks
  4. Save as `tasks/tasks-prd-[feature-name].md`
- Use for: Breaking down PRD into actionable tasks

**`/implement-tasks @tasks/tasks-[file].md`**
- Implement tasks one-by-one with strict approval protocol
- Auto-activates: Domain-specific personas based on task
- MCP: Sequential (systematic implementation)
- Protocol:
  1. Implement ONE sub-task at a time
  2. Mark completed as [x]
  3. Wait for user approval ("yes", "y", or "go")
  4. Update Relevant Files section
- Use for: Step-by-step task implementation with TDD integration

**📚 Guide**: See `3-step-workflow-guide.md` for complete tutorial

---

### ✨ Quality Commands

**`/improve [target] [flags]`**
- Evidence-based code enhancement with iterative refinement
- Auto-activates: refactorer, performance, architect, qa personas
- MCP: Sequential (analysis), Context7 (patterns), Magic (UI)
- Flags: `--loop` (auto-activates for iterative improvement)
- Use for: Code quality, performance, maintainability

**`/cleanup [target] [flags]`**
- Technical debt reduction and code quality cleanup
- Auto-activates: refactorer persona
- MCP: Sequential (systematic cleanup)
- Use for: Dead code removal, formatting, dependency cleanup

**`/test [type] [flags]`**
- Comprehensive testing strategy and implementation
- Auto-activates: qa persona
- MCP: Playwright (E2E), Sequential (planning)
- Use for: Test creation, test execution, coverage analysis

**`/refactor [target] [flags]`**
- Systematic code refactoring for simplicity
- Auto-activates: refactorer persona
- MCP: Sequential (analysis), Context7 (patterns)
- Use for: Code simplification, pattern application, maintainability

---

### 🔒 Security & Performance

**`/security [focus] [flags]`**
- Comprehensive security audit and vulnerability assessment
- Auto-activates: security, backend personas
- MCP: Sequential (threat analysis), Context7 (patterns)
- Use for: Vulnerability scanning, threat modeling, compliance

**`/perf [target] [flags]`**
- Performance optimization with measurement-driven approach
- Auto-activates: performance persona
- MCP: Playwright (metrics), Sequential (analysis)
- Use for: Performance profiling, optimization, benchmarking

---

### 📝 Documentation & Git

**`/document [target] [flags]`**
- Professional documentation with cultural adaptation
- Auto-activates: scribe, mentor personas
- MCP: Context7 (patterns), Sequential (organization)
- Use for: API docs, README, guides, inline documentation

**`/git [operation] [flags]`**
- Git workflow assistant with best practices
- Auto-activates: devops, scribe, qa personas
- MCP: Sequential (workflow)
- Use for: Commits, PRs, branch management, reviews

---

### 🔧 Meta & Orchestration

**`/index [query] [flags]`**
- Command catalog browsing and framework navigation
- Auto-activates: mentor, analyzer personas
- Use for: Discovering commands, learning framework

**`/load [path] [flags]`**
- Intelligent project context loading
- Auto-activates: analyzer, architect, scribe personas
- MCP: All servers (comprehensive)
- Flags: `--delegate` (auto for large projects)
- Use for: Project understanding, context building

**`/spawn [operation] [flags]`**
- Task orchestration with multi-agent coordination
- Auto-activates: analyzer, architect, devops personas
- MCP: All servers
- Use for: Complex operations, parallel execution, enterprise tasks

**`/estimate [task] [flags]`**
- Evidence-based task estimation and breakdown
- Auto-activates: analyzer, architect personas
- MCP: Sequential (analysis), Context7 (benchmarks)
- Use for: Planning, complexity analysis, task breakdown

---

## 🎯 Common Workflows

### Feature Development
```bash
/design "User authentication" --domain system
/implement "JWT authentication" --type feature --with-tests
/test --type all --coverage
/document @src/auth --type api
/git --operation commit --validate
```

### Code Quality Improvement
```bash
/analyze @src --focus quality --scope project
/improve @src --focus quality --iterations 3 --interactive
/cleanup @src --type all --validate
/test --type unit --coverage
```

### Performance Optimization
```bash
/perf @app --type all --profile
/improve @components --focus performance --loop
/test --type performance --benchmark
```

### Security Audit
```bash
/security @app --type all --severity all
/security "Audit auth system" --type threat-model
/improve @src --focus security --validate
/test --type security
```

---

## 🧩 SuperClaude Framework Integration

### Auto-Activated Personas
Commands automatically activate appropriate personas based on context:
- **architect**: System design, long-term planning
- **frontend**: UI/UX, accessibility, responsive design
- **backend**: APIs, reliability, data integrity
- **analyzer**: Root cause analysis, investigation
- **security**: Threat modeling, vulnerability assessment
- **mentor**: Education, knowledge transfer
- **refactorer**: Code quality, simplification
- **performance**: Optimization, bottleneck elimination
- **qa**: Testing, quality assurance
- **devops**: Infrastructure, deployment
- **scribe**: Documentation, professional writing

### MCP Server Coordination
- **Context7**: Documentation, framework patterns, best practices
- **Sequential**: Complex analysis, multi-step reasoning, systematic workflows
- **Magic**: UI component generation, design systems
- **Playwright**: E2E testing, performance metrics, browser automation

### Intelligent Flag System
**Auto-Activation Patterns**:
- `--think` → Complex analysis, multi-file understanding
- `--seq` → Systematic workflows, structured problem-solving
- `--c7` → Framework documentation, library patterns
- `--magic` → UI component generation
- `--play` → E2E testing, performance validation
- `--loop` → Iterative improvement (auto for polish/refine/enhance)
- `--delegate` → Large-scale operations (auto for >7 dirs or >50 files)
- `--wave-mode` → Multi-stage orchestration (auto for complexity >0.7)
- `--validate` → Quality gates, safety checks
- `--uc` → Token compression (auto at 75% context usage)

### Wave Orchestration
Multi-stage execution with compound intelligence:
- **Auto-activates**: complexity ≥0.7 + files >20 + operation_types >2
- **Strategies**: progressive | systematic | adaptive | enterprise
- **Wave-enabled commands**: `/analyze`, `/build`, `/design`, `/implement`, `/improve`, `/task`

### Quality Gates (8-Step Validation)
1. Syntax validation
2. Type checking
3. Linting and code quality
4. Security scanning
5. Test execution (≥80% unit, ≥70% integration)
6. Performance validation
7. Documentation completeness
8. Integration testing

---

## 🎨 Advanced Usage

### Scope Control
```bash
--scope file       # Single file
--scope module     # Module/directory
--scope project    # Entire project
--scope system     # System-wide
```

### Focus Areas
```bash
--focus performance     # Performance optimization
--focus security       # Security hardening
--focus quality        # Code quality
--focus architecture   # System design
--focus accessibility  # UI/UX accessibility
```

### Thinking Depth
```bash
--think           # Multi-file analysis (~4K tokens)
--think-hard      # System-wide analysis (~10K tokens)
--ultrathink      # Critical redesign (~32K tokens)
```

### Delegation & Waves
```bash
--delegate files         # File-level delegation
--delegate folders       # Directory-level delegation
--delegate auto          # Auto-detect strategy

--wave-mode auto         # Auto-activate based on complexity
--wave-mode force        # Force wave orchestration
--wave-strategy progressive   # Iterative enhancement
--wave-strategy systematic    # Methodical analysis
--wave-strategy enterprise    # Large-scale (>100 files)
```

### Iterative Improvement
```bash
--loop                   # Enable iterative mode (default 3 iterations)
--iterations 5           # Custom iteration count
--interactive            # Confirm between iterations
```

---

## 📊 Performance & Efficiency

### Token Optimization
- Automatic compression at 75% context usage (`--uc`)
- Symbol system for 30-50% token reduction
- MCP caching for repeated operations
- Intelligent delegation for large operations

### Execution Speed
- Parallel tool calls when possible
- MCP result caching
- Sub-agent delegation (40-70% time savings)
- Wave orchestration (30-50% better results)

---

## 🔗 Framework Components

### Core Principles (PRINCIPLES.md)
- Evidence > assumptions
- Code > documentation
- Efficiency > verbosity
- SOLID principles
- Senior developer mindset

### Operational Rules (RULES.md)
- Read before Write/Edit
- Validate before execution
- Framework compliance
- Quality gates enforcement

### MCP Integration (MCP.md)
- Context7: Documentation & research
- Sequential: Complex analysis
- Magic: UI components
- Playwright: Testing & automation

### Persona System (PERSONAS.md)
- 11 specialized AI personalities
- Auto-activation based on context
- Cross-persona collaboration
- Domain-specific expertise

### Orchestration (ORCHESTRATOR.md)
- Intelligent routing
- Resource management
- Quality gates
- Performance optimization

---

## 💡 Tips & Best Practices

1. **Start with Analysis**: Use `/analyze` or `/load` to understand codebase
2. **Use Validation**: Always include `--validate` for critical operations
3. **Leverage Iteration**: Use `--loop` for progressive refinement
4. **Enable Delegation**: Large projects benefit from `--delegate`
5. **Wave for Complex**: Use wave mode for multi-domain operations
6. **Measure Performance**: Profile before optimizing with `/perf`
7. **Security First**: Run `/security` audits regularly
8. **Document Changes**: Use `/document` after significant changes

---

## 🆘 Getting Help

- `/index` - Browse all available commands
- `/index "keyword"` - Search for specific capabilities
- `/explain [command]` - Learn about command usage
- Check global CLAUDE.md files for framework details

---

## 🌟 Examples by Scenario

### New Project Setup
```bash
/load --scope comprehensive
/design "Project architecture" --domain system
/document --type readme
```

### Bug Investigation
```bash
/troubleshoot "Error on login" @src/auth
/analyze @src/auth --focus security --think-hard
/test @src/auth --type all
```

### Code Quality Sprint
```bash
/analyze --scope project --focus quality
/cleanup --type all --validate
/refactor @src --goal simplify --loop
/improve @src --iterations 3 --interactive
```

### Performance Optimization
```bash
/perf @app --type all --profile --benchmark
/improve @components --focus performance --loop
/test --type performance
```

### Security Hardening
```bash
/security --type all --severity all
/improve @src --focus security --validate
/test --type security
/document "Security measures" --type wiki
```

---

**Built with Claude Code + SuperClaude Framework**

Generated using evidence-based AI development principles with intelligent persona activation and MCP server orchestration.
