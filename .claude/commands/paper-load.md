# Paper Project Load

**Purpose**: Load and understand an existing paper project, analyzing its structure, content, and completion status.

**Auto-Activations**:
- Persona: analyzer, scribe
- MCP: Sequential (analysis), Context7 (research context)
- Flags: --think (comprehensive understanding)

**Arguments**:
- `@<path>` - Path to paper project directory (required)
- `--scope <level>` - quick | standard | comprehensive (default: standard)
- `--focus <aspect>` - content | structure | citations | figures | all (default: all)
- `--journal <path>` - Path to journal guideline file (optional)
- `--output <file>` - Save analysis report to markdown file (optional)
- `--compare-to <journal>` - Compare against journal requirements (e.g., "Nature", "IEEE")
- `--lang <language>` - Output language: en | ko (default: ko)

**Paper Project Load Workflow**:

1. 🔍 **Project Discovery**
   - Identify paper files (LaTeX, Markdown, Word)
   - Locate figures and data
   - Find citation files (BibTeX, references)
   - Detect supplementary materials

2. 📊 **Content Analysis**
   - Extract existing sections (Abstract, Introduction, Methods, Results, Discussion)
   - Identify completed vs incomplete sections
   - Analyze writing quality and structure
   - Check IMRAD compliance

3. 📚 **Citation Analysis**
   - Count and validate citations
   - Check BibTeX file integrity
   - Identify missing or broken citations
   - Analyze citation distribution

4. 📈 **Figures & Tables Analysis**
   - Inventory all figures and tables
   - Check quality and formatting
   - Verify captions and labels
   - Assess publication readiness

5. 🎯 **Gap Analysis**
   - Identify incomplete sections
   - Find missing citations
   - Note formatting issues
   - List required improvements

6. 📝 **Generate Project Report**
   - Summary of current state
   - Completion percentage by section
   - Priority action items
   - Recommended next steps

7. 🎯 **Journal Guideline Analysis** (if --journal or --compare-to specified)
   - Load journal requirements (word count, structure, citation style)
   - Compare current paper against requirements
   - Identify compliance gaps
   - Generate journal-specific checklist
   - Calculate readiness score (0-100%)

**Output**:
- Comprehensive project understanding
- Section-by-section completion status
- Citation quality report
- Actionable improvement list
- Suggested workflow to completion
- Journal compliance report (if journal specified)
- Markdown analysis report file (if --output specified)

**Example Usage**:

```bash
# Basic: Load paper project with comprehensive analysis
/paper-load @path/to/paper --scope comprehensive --focus all

# Quick load focusing on content
/paper-load @research/my-paper --scope quick --focus content

# Analyze citations specifically
/paper-load @paper-draft --focus citations

# With journal guideline comparison
/paper-load @my-paper --journal tasks/journal-nature.md --output paper-analysis.md

# Compare against known journal
/paper-load @my-paper --compare-to "Nature" --output analysis-report.md

# Comprehensive analysis with journal requirements
/paper-load @my-paper \
  --scope comprehensive \
  --journal tasks/journal-ieee.md \
  --output reports/ieee-compliance-report.md \
  --lang en
```

**Output Report Format** (when --output specified):

```markdown
# Paper Analysis Report: [Project Name]

**Analysis Date**: [Date]
**Project Path**: [Path]
**Analysis Scope**: [quick/standard/comprehensive]
**Journal Target**: [Journal name if specified]

---

## 1. Project Overview

- **Paper Title**: [Extracted or "Untitled"]
- **Main File**: [primary .tex/.md/.docx file]
- **Total Word Count**: [N] words
- **Sections Found**: [N] sections
- **Figures**: [N] figures
- **Tables**: [N] tables
- **Citations**: [N] citations

---

## 2. Section-by-Section Analysis

### Abstract
- **Status**: ✅ Complete / ⚠️ Incomplete / ❌ Missing
- **Word Count**: [N] / [Target] words
- **Quality Score**: [0-100]
- **Issues**: [List of issues]

### Introduction
[Same structure...]

### Methods
[Same structure...]

### Results
[Same structure...]

### Discussion
[Same structure...]

### Conclusion
[Same structure...]

---

## 3. Citation Analysis

- **Total Citations**: [N]
- **BibTeX File**: ✅ Found / ❌ Not found
- **Broken Citations**: [N]
- **Citation Distribution**:
  - Introduction: [N]
  - Methods: [N]
  - Results: [N]
  - Discussion: [N]

**Issues**:
- [ ] Missing BibTeX entries: [List]
- [ ] Duplicate citations: [List]
- [ ] Formatting inconsistencies: [List]

---

## 4. Figures & Tables Analysis

### Figures
1. Figure 1: [Caption] - ✅ Complete / ⚠️ Needs work
2. Figure 2: [Caption] - [Status]

### Tables
1. Table 1: [Caption] - [Status]

**Issues**:
- [ ] Missing figure files: [List]
- [ ] Low resolution (<300 DPI): [List]
- [ ] Missing captions: [List]

---

## 5. Journal Compliance Analysis

**Target Journal**: [Journal Name]
**Overall Readiness**: [0-100]%

### Requirements vs Current Status

| Requirement | Target | Current | Status | Gap |
|-------------|--------|---------|--------|-----|
| Word Count | [N] | [N] | ✅/❌ | [±N] |
| Abstract Length | [N] | [N] | ✅/❌ | [±N] |
| Figures Max | [N] | [N] | ✅/❌ | [±N] |
| Tables Max | [N] | [N] | ✅/❌ | [±N] |
| Citation Style | [Style] | [Detected] | ✅/❌ | - |
| Section Structure | [Required] | [Present] | ✅/❌ | - |

### Compliance Checklist

- [ ] Word count within limit
- [ ] Abstract follows journal format
- [ ] All required sections present
- [ ] Citation style matches journal
- [ ] Figure count within limit
- [ ] Figure resolution ≥ journal requirement
- [ ] Keywords provided ([N] required)
- [ ] Conflict of interest statement
- [ ] Data availability statement
- [ ] Author contributions

---

## 6. Gap Analysis & Action Items

### Critical Issues (Must Fix)
1. [Issue 1] - Priority: HIGH
2. [Issue 2] - Priority: HIGH

### Important Issues (Should Fix)
1. [Issue 1] - Priority: MEDIUM
2. [Issue 2] - Priority: MEDIUM

### Minor Issues (Nice to Fix)
1. [Issue 1] - Priority: LOW

---

## 7. Recommended Next Steps

1. **Phase 1: Content Completion** ([N] days estimated)
   - [ ] Complete [Section X]
   - [ ] Complete [Section Y]

2. **Phase 2: Citation & References** ([N] days estimated)
   - [ ] Fix broken citations
   - [ ] Add missing references
   - [ ] Validate BibTeX file

3. **Phase 3: Figures & Tables** ([N] days estimated)
   - [ ] Create missing figures
   - [ ] Improve figure quality
   - [ ] Add missing captions

4. **Phase 4: Journal Formatting** ([N] days estimated)
   - [ ] Adjust word count
   - [ ] Format according to journal style
   - [ ] Add required statements

5. **Phase 5: Final Review** ([N] days estimated)
   - [ ] Run /paper-review --comprehensive
   - [ ] Check /paper-format [journal] --validate
   - [ ] Final proofreading

---

## 8. Suggested Commands

```bash
# Complete missing sections
/paper-write [section-name] --topic "[your topic]"

# Fix citations
/paper-cite validate
/paper-cite search --query "[topic]" --source openalex

# Format for journal
/paper-format [journal-name] --validate

# Final review
/paper-review --focus all --output final-review.md
```

---

**Report Generated**: [Timestamp]
**Next Review Recommended**: [Date]
```

**Integration**:
- Follows /load command pattern
- Prepares context for /paper-write, /paper-cite, /paper-format
- Enables intelligent continuation of existing work
- Identifies which paper writing skills are needed
- Generates actionable reports for project tracking

**Next Steps After Loading**:
- Use /paper-write for incomplete sections
- Use /paper-cite for citation management
- Use /paper-review for quality check
- Use /paper-format for journal submission

Execute project loading with comprehensive analysis of paper structure, content, and completion status.
