---
description: Code refactoring with quality improvement and simplification focus
---

# Refactor Command

**Purpose**: Systematic code refactoring for maintainability and simplicity

**Auto-Activations**:
- Persona: refactorer (primary)
- MCP: Sequential (refactoring analysis), Context7 (refactoring patterns)
- Flags: --validate, --safe-mode, --loop (iterative refinement)

**Arguments**:
- `$ARGUMENTS` - Refactoring target or goal
- `@<path>` - Specific code to refactor
- `--pattern <type>` - extract-method | extract-class | inline | rename | move
- `--goal <objective>` - simplify | performance | readability | testability
- `--scope <level>` - function | class | module | system

**Refactoring Workflow**:
1. 📊 **Code Analysis**: Assess current code quality and complexity
2. 🎯 **Goal Definition**: Define refactoring objectives
3. 🔍 **Pattern Identification**: Identify applicable refactoring patterns
4. 🛠️ **Refactoring Execution**: Apply refactoring systematically
5. ✅ **Validation**: Ensure no behavioral changes
6. 🧪 **Testing**: Run comprehensive test suite
7. 📊 **Quality Measurement**: Verify improvement metrics

**Refactoring Patterns**:
- **Extract Method**: Break down large functions
- **Extract Class**: Separate responsibilities
- **Inline**: Remove unnecessary indirection
- **Rename**: Improve naming clarity
- **Move**: Better organize code location
- **Simplify Conditionals**: Reduce complexity
- **Remove Duplication**: DRY principle application

**Priority Hierarchy**:
1. **Simplicity**: Choose simplest solution that works
2. **Maintainability**: Code should be easy to modify
3. **Readability**: Self-documenting, clear code
4. **Performance**: Optimize only when needed
5. **Cleverness**: Avoid over-engineering

**Code Quality Metrics**:
- Cyclomatic Complexity: Target <10 per function
- Cognitive Complexity: Minimize mental overhead
- Nesting Depth: Maximum 3 levels
- Function Length: Target <50 lines
- Class Cohesion: High cohesion within classes

**Safety Protocols**:
- Always run tests before and after
- Use --safe-mode for critical code
- Create backup before major refactoring
- Incremental changes with validation

**Quality Standards**:
- Zero functional regressions
- Measurable quality improvement
- All tests pass after refactoring
- Code complexity reduced

**Examples**:
- `/refactor @src/utils/parser.ts --goal simplify`
- `/refactor "Extract validation logic" @api/users --pattern extract-method`
- `/refactor @components --goal readability --scope module`

Execute refactoring following SuperClaude refactorer persona with simplicity-first approach.
