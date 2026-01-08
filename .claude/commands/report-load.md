# Report Project Load

**Purpose**: Load and analyze project materials for report writing, extracting insights and suggesting report structure.

**Auto-Activations**:
- Persona: analyzer, scribe, strategist
- MCP: Sequential (analysis), Context7 (document patterns)
- Flags: --think (comprehensive understanding)

**Arguments**:
- `@<path>` - Path to project/materials directory (required)
- `--type <report-type>` - business | technical | research | executive | general (default: general)
- `--scope <level>` - quick | standard | comprehensive (default: standard)
- `--audience <level>` - executive | technical | mixed | general (default: general)
- `--output <file>` - Save analysis report to markdown file (optional)
- `--format <style>` - summary | outline | insights | full (default: full)
- `--lang <language>` - Output language: en | ko (default: ko)

**Report Project Load Workflow**:

1. 🔍 **Material Discovery**
   - Scan all documents (.pdf, .docx, .md, .txt)
   - Identify data files (.xlsx, .csv, .json)
   - Locate presentations (.pptx, .pdf slides)
   - Find images and figures (.png, .jpg, .svg)
   - Detect supporting materials

2. 📊 **Content Analysis**
   - Extract key information from documents
   - Analyze data patterns and trends
   - Identify main themes and topics
   - Assess information completeness
   - Evaluate data quality

3. 🎯 **Insight Extraction**
   - Identify key findings
   - Extract important statistics
   - Recognize patterns and trends
   - Highlight critical issues
   - Note recommendations

4. 📈 **Data & Visualization Review**
   - Inventory all data sources
   - Review existing charts/graphs
   - Assess visualization quality
   - Suggest additional visualizations
   - Identify data gaps

5. 🏗️ **Report Structure Suggestion**
   - Propose report outline based on type
   - Recommend section organization
   - Suggest content for each section
   - Identify priority areas
   - Map materials to sections

6. 📝 **Generate Analysis Report**
   - Summary of available materials
   - Key insights and findings
   - Recommended report structure
   - Content gaps and needs
   - Suggested next steps
   - Timeline estimation

**Report Type Specifications**:

### Business Report
- **Focus**: ROI, metrics, recommendations
- **Sections**: Executive Summary, Business Context, Analysis, Recommendations, Appendix
- **Emphasis**: Data-driven insights, actionable recommendations

### Technical Report
- **Focus**: Methods, results, technical details
- **Sections**: Abstract, Introduction, Methodology, Results, Discussion, Conclusion
- **Emphasis**: Accuracy, reproducibility, technical depth

### Research Report
- **Focus**: Literature, methodology, findings
- **Sections**: Abstract, Literature Review, Methods, Results, Discussion, References
- **Emphasis**: Academic rigor, citation quality

### Executive Report
- **Focus**: High-level insights, decisions
- **Sections**: Executive Summary, Key Findings, Recommendations, Next Steps
- **Emphasis**: Brevity, clarity, actionability

### General Report
- **Focus**: Flexible structure
- **Sections**: Customized based on materials
- **Emphasis**: Clarity and organization

**Output**:
- Comprehensive material inventory
- Key insights and findings summary
- Recommended report structure
- Content mapping (materials → sections)
- Gap analysis and action items
- Estimated completion timeline
- Markdown analysis report (if --output specified)

**Example Usage**:

```bash
# Basic: Load project materials for general report
/report-load @project-data

# Business report with comprehensive analysis
/report-load @quarterly-data \
  --type business \
  --scope comprehensive \
  --audience executive

# Technical report focusing on research materials
/report-load @research-materials \
  --type technical \
  --audience technical \
  --output tasks/report-analysis.md

# Quick analysis for executive summary
/report-load @project-docs \
  --type executive \
  --scope quick \
  --format summary

# Comprehensive research report planning
/report-load @study-data \
  --type research \
  --scope comprehensive \
  --format full \
  --output tasks/research-report-plan.md \
  --lang en

# Multiple folders analysis
/report-load @data,@documents,@presentations \
  --type business \
  --audience mixed
```

**Output Report Format** (when --output specified):

```markdown
# Report Project Analysis

**Project**: [Project Name]
**Report Type**: [business/technical/research/executive/general]
**Analysis Date**: YYYY-MM-DD
**Scope**: [quick/standard/comprehensive]

---

## 📦 Material Inventory

### Documents (N files)
- file1.docx - Description
- file2.pdf - Description
- ...

### Data Files (N files)
- data1.xlsx - Description, N rows
- data2.csv - Description, N records
- ...

### Presentations (N files)
- slides1.pptx - N slides
- ...

### Images/Figures (N files)
- chart1.png - Description
- ...

---

## 🎯 Key Insights

1. **[Insight Category 1]**
   - Finding 1
   - Finding 2
   - Supporting data: [reference]

2. **[Insight Category 2]**
   - Finding 1
   - Finding 2
   - Supporting data: [reference]

---

## 📊 Data Summary

- **Total data points**: N
- **Date range**: YYYY-MM-DD to YYYY-MM-DD
- **Key metrics**:
  - Metric 1: Value (trend: ↑/↓/→)
  - Metric 2: Value (trend: ↑/↓/→)
- **Data quality**: [Good/Fair/Needs Improvement]

---

## 🏗️ Recommended Report Structure

### 1. Executive Summary
**Content**: [What to include]
**Sources**: [Which materials to use]
**Status**: [Complete/Partial/Missing]

### 2. [Section Name]
**Content**: [What to include]
**Sources**: [Which materials to use]
**Status**: [Complete/Partial/Missing]

### 3. [Section Name]
...

---

## 📈 Visualization Suggestions

1. **[Chart Title]**
   - Type: Bar/Line/Pie/etc.
   - Data: [source file]
   - Purpose: Show [what insight]

2. **[Chart Title]**
   ...

---

## ⚠️ Content Gaps

- [ ] Missing: [Item 1]
- [ ] Incomplete: [Item 2]
- [ ] Needs verification: [Item 3]
- [ ] Additional data needed: [Item 4]

---

## ✅ Next Steps

**Priority**: HIGH
1. [Action item 1]
2. [Action item 2]

**Priority**: MEDIUM
1. [Action item 1]
2. [Action item 2]

**Priority**: LOW
1. [Action item 1]

---

## ⏱️ Estimated Timeline

- **Report drafting**: N hours/days
- **Data analysis**: N hours/days
- **Review & revision**: N hours/days
- **Total estimated time**: N hours/days

---

## 💡 Recommendations

1. **[Recommendation 1]**
   - Rationale: [why]
   - Impact: [expected benefit]

2. **[Recommendation 2]**
   ...
```

**Scope Definitions**:

### Quick (≈5K tokens)
- Material inventory
- Basic insights
- Simple structure suggestion
- High-level gaps

### Standard (≈15K tokens)
- Detailed material analysis
- Key insights extraction
- Structured report outline
- Content mapping
- Gap analysis

### Comprehensive (≈30K tokens)
- Deep content analysis
- Complete insight extraction
- Detailed report structure
- Section-by-section planning
- Visualization suggestions
- Timeline estimation
- Comprehensive recommendations

**Best Practices**:

1. **Before Loading**:
   - Organize materials by type (data/, docs/, images/)
   - Name files descriptively
   - Remove duplicates

2. **After Loading**:
   - Review analysis report
   - Validate insights
   - Adjust structure as needed
   - Fill identified gaps

3. **Report Writing**:
   - Use `/report-write` command (if available)
   - Reference analysis report
   - Follow recommended structure
   - Address all gaps

**Integration with Other Commands**:

```bash
# Workflow: Load → Analyze → Write

# 1. Load materials
/report-load @project-data \
  --type business \
  --output tasks/analysis.md

# 2. Review analysis
cat tasks/analysis.md

# 3. Write report (future command)
/report-write --based-on tasks/analysis.md \
  --section "Executive Summary"
```

**Troubleshooting**:

- **"No materials found"**: Check path, ensure @ prefix
- **"Insufficient data"**: Use --scope quick for preliminary analysis
- **"Mixed content types"**: Use --type general for flexible structure
- **"Large dataset"**: Consider splitting into sub-analyses

**Related Commands**:
- `/paper-load` - For academic papers
- `/load` - For code projects
- `/analyze` - For detailed analysis
- `/document` - For documentation

Execute material loading and analysis following best practices for report preparation.
