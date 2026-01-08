---
description: Professional documentation creation with cultural adaptation
---

# Document Command

**Purpose**: Create comprehensive, audience-appropriate documentation

**Auto-Activations**:
- Persona: scribe, mentor (primary)
- MCP: Context7 (documentation patterns), Sequential (content organization)
- Flags: --verbose (for comprehensive documentation)

**Arguments**:
- `$ARGUMENTS` - Documentation target or type
- `--type <doc>` - api | readme | wiki | guide | changelog | inline
- `@<path>` - Specific code to document
- `--lang <language>` - en | es | fr | de | ja | zh | pt | it | ru | ko
- `--audience <level>` - beginner | intermediate | advanced | mixed
- `--format <style>` - markdown | jsdoc | sphinx | javadoc

**Documentation Workflow**:
1. 🎯 **Audience Analysis**: Understand reader expertise and needs
2. 📋 **Content Planning**: Structure documentation logically
3. ✍️ **Content Creation**: Write clear, comprehensive documentation
4. 🌐 **Cultural Adaptation**: Adapt for language and cultural context
5. 📝 **Examples & Code**: Include practical examples
6. ✅ **Review & Validation**: Verify accuracy and completeness
7. 🔄 **Maintenance Plan**: Establish update strategy

**Documentation Types**:
- **API Documentation**: Endpoints, parameters, responses, examples
- **README**: Project overview, setup, usage, contributing
- **Wiki/Guides**: Tutorials, how-tos, architecture guides
- **Changelog**: Version history, breaking changes, migrations
- **Inline Documentation**: Code comments, JSDoc, docstrings

**Quality Standards**:
- Clarity and accessibility for target audience
- Comprehensive coverage with examples
- Cultural sensitivity and localization
- Accurate and up-to-date information
- Professional tone and structure

**Content Framework**:
- **What**: Clear description of functionality
- **Why**: Purpose and use cases
- **How**: Step-by-step instructions
- **When**: Appropriate usage contexts
- **Examples**: Practical, working examples
- **Gotchas**: Common pitfalls and solutions

**Examples**:
- `/document --type api @src/api/users`
- `/document --type readme --lang ko --audience beginner`
- `/document @utils/validation.ts --type inline --format jsdoc`
- `/document --type guide "Setting up development environment"`

Execute documentation following SuperClaude scribe persona with audience-first approach.
