---
description: Task orchestration with parallel and sequential agent coordination
---

# Spawn Command

**Purpose**: Meta-orchestration for complex multi-domain operations

**Auto-Activations**:
- Persona: analyzer, architect, devops (orchestration)
- MCP: All servers (comprehensive coordination)
- Flags: --delegate, --wave-mode (for complex operations)

**Arguments**:
- `$ARGUMENTS` - Operation description or workflow
- `--mode <type>` - parallel | sequential | adaptive
- `--agents <n>` - Number of sub-agents to spawn (1-15)
- `--focus <domains>` - Comma-separated focus areas
- `--strategy <plan>` - progressive | systematic | adaptive | enterprise

**Spawn Modes**:

### Parallel Mode
- Execute independent tasks concurrently
- 40-70% time savings for suitable operations
- Ideal for: Multi-directory analysis, independent feature implementation
- Auto-activates: >7 directories or >50 files

### Sequential Mode
- Execute dependent tasks in order
- Maintains dependencies and data flow
- Ideal for: Pipeline workflows, dependent operations
- Auto-activates: Clear dependency chains

### Adaptive Mode
- Dynamic strategy based on task complexity
- Switches between parallel and sequential as needed
- Ideal for: Complex multi-phase operations
- Auto-activates: Wave-eligible operations

**Orchestration Strategies**:

### Progressive Enhancement
- Iterative improvement with validation gates
- Multiple refinement cycles
- Ideal for: Code quality improvement, optimization

### Systematic Analysis
- Methodical comprehensive analysis
- Wave-coordinated investigation
- Ideal for: Audits, security reviews, large refactoring

### Adaptive Configuration
- Dynamic strategy based on complexity
- Real-time adjustment of approach
- Ideal for: Varying complexity, uncertain scope

### Enterprise Scale
- Large-scale coordination (>100 files)
- Multi-domain orchestration
- Ideal for: Enterprise applications, monorepos

**Sub-Agent Specialization**:
- **Quality Agent**: Code quality, maintainability, technical debt
- **Security Agent**: Vulnerabilities, compliance, threat modeling
- **Performance Agent**: Bottlenecks, optimization, profiling
- **Architecture Agent**: Patterns, structure, design decisions
- **API Agent**: Endpoints, contracts, integration

**Coordination Features**:
- Intelligent task distribution
- Result aggregation and synthesis
- Cross-agent communication
- Unified reporting
- Error recovery and retry logic

**Examples**:
- `/spawn "Comprehensive security audit" --mode parallel --focus security,quality`
- `/spawn "Migrate to new architecture" --mode sequential --strategy systematic`
- `/spawn "Performance optimization" --mode adaptive --agents 5`
- `/spawn --mode parallel --focus frontend,backend,testing` - Multi-domain parallel work

Execute orchestration following SuperClaude wave system with intelligent coordination.
