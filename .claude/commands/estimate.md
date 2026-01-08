---
description: Evidence-based task estimation with complexity analysis
---

# Estimate Command

**Purpose**: Accurate task estimation based on evidence and historical data

**Auto-Activations**:
- Persona: analyzer, architect (primary)
- MCP: Sequential (complexity analysis), Context7 (benchmarks)
- Flags: --think, --validate

**Arguments**:
- `$ARGUMENTS` - Task or feature to estimate
- `@<path>` - Specific scope to estimate
- `--breakdown` - Provide detailed task breakdown
- `--complexity` - Include complexity analysis
- `--comparison` - Compare with similar past tasks

**Estimation Workflow**:
1. 📋 **Requirement Analysis**: Understand full scope and requirements
2. 🔍 **Complexity Assessment**: Evaluate technical complexity
3. 🏗️ **Task Breakdown**: Decompose into estimable units
4. 📊 **Historical Analysis**: Compare with similar past work
5. ⚠️ **Risk Assessment**: Identify unknowns and risks
6. 📈 **Estimation**: Provide realistic estimates with confidence intervals
7. 📝 **Actionable Plan**: Convert estimate into executable tasks

**Complexity Factors**:
- **Technical Complexity**: Algorithm complexity, integration points
- **Scope**: Lines of code, files affected, modules involved
- **Dependencies**: External dependencies, team coordination
- **Unknowns**: Research needed, new technologies
- **Quality Requirements**: Testing, documentation, performance

**Estimation Output**:
- **Best Case**: Optimistic scenario (20th percentile)
- **Most Likely**: Realistic estimate (50th percentile)
- **Worst Case**: Conservative scenario (90th percentile)
- **Confidence Level**: Estimation confidence (low/medium/high)
- **Risk Factors**: Potential blockers and unknowns
- **Task Breakdown**: Granular task list with estimates

**IMPORTANT**:
- Provide concrete implementation steps WITHOUT time estimates
- Focus on WHAT needs to be done, not WHEN or HOW LONG
- Break work into actionable steps and let users decide scheduling
- Never suggest timelines like "this will take 2-3 weeks"

**Quality Standards**:
- Evidence-based estimates, not guesses
- Include confidence intervals
- Document assumptions and risks
- Provide actionable breakdown

**Examples**:
- `/estimate "User authentication with OAuth" --breakdown`
- `/estimate @src/api --complexity`
- `/estimate "Migrate to TypeScript" --comparison`

Execute estimation following SuperClaude framework with evidence-based approach.
