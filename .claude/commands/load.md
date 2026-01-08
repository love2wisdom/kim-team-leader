---
description: Intelligent project context loading with framework detection
---

# Load Command

**Purpose**: Comprehensive project context loading and understanding

**Auto-Activations**:
- Persona: analyzer, architect, scribe (context-dependent)
- MCP: All servers (comprehensive analysis)
- Flags: --delegate (for large projects), --uc (compression)

**Arguments**:
- `$ARGUMENTS` - Path or project scope to load
- `@<path>` - Specific directory to load
- `--scope <level>` - quick | standard | comprehensive | deep
- `--focus <domain>` - frontend | backend | infrastructure | all
- `--pattern <glob>` - File pattern to include (e.g., "**/*.ts")

**Load Workflow**:
1. 🔍 **Project Discovery**: Identify project structure and framework
2. 📊 **Dependency Analysis**: Analyze dependencies and configuration
3. 🏗️ **Architecture Mapping**: Understand system architecture
4. 📁 **File Categorization**: Organize files by type and domain
5. 🔗 **Relationship Mapping**: Identify module dependencies
6. 📝 **Context Summary**: Generate comprehensive project summary
7. 💾 **Context Caching**: Cache context for session efficiency

**Load Scopes**:

### Quick (≈5K tokens)
- Project structure overview
- Key configuration files
- Main entry points

### Standard (≈15K tokens)
- Full project structure
- All configuration files
- Core modules and components
- Dependency graph

### Comprehensive (≈30K tokens)
- Complete project analysis
- Detailed architecture mapping
- Pattern identification
- Quality assessment

### Deep (≈50K+ tokens)
- Enterprise-scale analysis
- Cross-module dependencies
- Performance profiling
- Security audit preparation

**Delegation Strategy**:
- **>7 directories**: Auto-enable `--delegate --parallel-dirs`
- **>50 files**: Auto-enable sub-agent delegation
- **Monorepo**: Use `--delegate --parallel-dirs` by default
- **Complex architecture**: Enable wave mode for systematic loading

**Output Includes**:
- Project framework and technology stack
- Directory structure and organization
- Key files and entry points
- Dependency graph and relationships
- Code patterns and conventions
- Potential issues or technical debt
- Recommended next steps

**Examples**:
- `/load @src --scope standard` - Load src directory
- `/load --scope comprehensive --focus backend` - Comprehensive backend analysis
- `/load @packages/** --pattern "**/*.ts" --delegate` - Load monorepo packages
- `/load --scope deep` - Enterprise-scale project analysis

Execute context loading following SuperClaude framework with intelligent delegation.
