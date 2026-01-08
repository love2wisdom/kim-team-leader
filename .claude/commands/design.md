---
description: System and component design with architectural planning
---

# Design Command

**Purpose**: Comprehensive system and component design planning

**Auto-Activations**:
- Persona: architect, frontend (for UI), backend (for APIs)
- MCP: Magic (UI design), Sequential (system design), Context7 (design patterns)
- Flags: --think-hard, --plan, --validate

**Arguments**:
- `$ARGUMENTS` - Design domain or component
- `--domain <area>` - ui | api | database | architecture | system
- `--scope <level>` - component | module | system | enterprise
- `--with-diagrams` - Include architectural diagrams
- `--scalability` - Focus on scalability considerations

**Design Workflow**:
1. 🎯 **Requirements Analysis**: Understand functional and non-functional requirements
2. 🔍 **Existing Pattern Review**: Analyze current architecture and patterns
3. 🏗️ **Architecture Design**: Create scalable, maintainable design
4. 📊 **Trade-off Analysis**: Evaluate design alternatives
5. 🛡️ **Security Design**: Incorporate security by design
6. 📈 **Scalability Planning**: Design for growth and performance
7. 📝 **Documentation**: Create comprehensive design documentation

**Design Principles**:
- SOLID principles compliance
- Scalability and performance by design
- Security and reliability first
- Maintainability and modularity
- Future-proof architecture

**Quality Standards**:
- Clear architectural decisions with rationale
- Scalability to 10x current load
- Security threat modeling included
- Performance budgets defined

**Examples**:
- `/design "Microservices architecture for e-commerce" --domain system --scalability`
- `/design "User dashboard component" --domain ui --with-diagrams`
- `/design "REST API versioning strategy" --domain api --scope system`

Execute design following SuperClaude architect persona principles and long-term thinking.
