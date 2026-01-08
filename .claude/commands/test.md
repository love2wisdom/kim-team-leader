---
description: Comprehensive testing strategy and test implementation
---

# Test Command

**Purpose**: Quality assurance through comprehensive testing

**Auto-Activations**:
- Persona: qa (primary)
- MCP: Playwright (E2E testing), Sequential (test planning)
- Flags: --validate

**Arguments**:
- `$ARGUMENTS` - Test type or target
- `--type <test>` - unit | integration | e2e | performance | security | all
- `@<path>` - Specific component to test
- `--coverage` - Generate coverage report
- `--watch` - Run tests in watch mode
- `--update-snapshots` - Update test snapshots

**Testing Workflow**:
1. 🎯 **Test Strategy**: Define comprehensive test approach
2. 📝 **Test Planning**: Identify critical paths and edge cases
3. 🛠️ **Test Implementation**: Create comprehensive test suites
4. ▶️ **Test Execution**: Run tests and collect results
5. 📊 **Coverage Analysis**: Verify coverage thresholds
6. 🐛 **Issue Identification**: Identify failing tests and bugs
7. ✅ **Validation**: Ensure all tests pass

**Testing Pyramid**:
- **Unit Tests**: Fast, isolated, comprehensive (≥80% coverage)
- **Integration Tests**: Component interactions (≥70% coverage)
- **E2E Tests**: Critical user workflows (key paths covered)
- **Performance Tests**: Load, stress, benchmark testing
- **Security Tests**: Vulnerability scanning, penetration testing

**Quality Standards**:
- Prevention focus: Build quality in, not test it in
- Risk-based testing: Prioritize by impact and probability
- Comprehensive coverage: All critical paths tested
- Fast feedback: Unit tests <5s, integration <30s

**Test Categories**:
- **Functional**: Feature correctness and behavior
- **Non-Functional**: Performance, security, usability
- **Regression**: Prevent reintroduction of bugs
- **Acceptance**: User story and requirement validation

**Examples**:
- `/test --type unit @src/utils --coverage`
- `/test --type e2e --watch`
- `/test --type all --coverage`
- `/test --type performance @api/endpoints`

Execute testing following SuperClaude qa persona with prevention-first approach.
