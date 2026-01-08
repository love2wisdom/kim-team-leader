# Paper Review

**Purpose**: Comprehensive quality review of paper using Scientific Writing principles and reporting guidelines.

**Auto-Activations**:
- Persona: analyzer, qa, scribe
- MCP: Sequential (systematic review)
- Skills: scientific-writing
- Flags: --think (thorough analysis)

**Arguments**:
- `--focus <aspect>` - Review focus: structure | content | citations | figures | style | all
- `--guideline <guideline>` - Reporting guideline: consort | strobe | prisma | arrive
- `--depth <level>` - Review depth: quick | standard | comprehensive
- `--output <file>` - Review report output file

**Review Workflow**:

## 1. Structure Review

**IMRAD Compliance**:
- ✓ Abstract present and complete
- ✓ Introduction provides context and gap
- ✓ Methods detailed and reproducible
- ✓ Results objective and clear
- ✓ Discussion interprets findings
- ✓ Conclusions align with results

**Section Balance**:
- Introduction: 15-20% of text
- Methods: 20-25%
- Results: 25-30%
- Discussion: 25-30%
- Appropriate length ratios

## 2. Content Quality Review

**Writing Quality**:
- ✓ Clear, concise language
- ✓ Logical flow and transitions
- ✓ Appropriate technical terminology
- ✓ No bullet points in main text
- ✓ Correct voice and tense
- ✓ No jargon or undefined acronyms

**Scientific Rigor**:
- ✓ Claims supported by data
- ✓ Appropriate statistics
- ✓ Limitations acknowledged
- ✓ Results not over-interpreted
- ✓ Conflicts of interest disclosed

## 3. Citation Review

**Citation Quality**:
- ✓ Recent literature included (last 5 years)
- ✓ Primary sources cited
- ✓ Citation distribution balanced
- ✓ All citations in bibliography
- ✓ Format consistent
- ✓ No broken DOIs

**Citation Statistics**:
- Total citations
- Citations per section
- Average publication year
- Duplicate citations
- Missing citations

## 4. Figures & Tables Review

**Quality Checks**:
- ✓ High resolution (≥300 dpi)
- ✓ Clear labels and legends
- ✓ Self-explanatory captions
- ✓ Consistent formatting
- ✓ Colorblind-friendly palettes
- ✓ Appropriate for venue

**Integration**:
- ✓ Referenced in text
- ✓ Logical placement
- ✓ No redundancy with text
- ✓ One figure per key finding

## 5. Style Review

**Language**:
- ✓ Active vs passive voice appropriate
- ✓ Present tense for facts
- ✓ Past tense for methods/results
- ✓ Consistent terminology
- ✓ Field-specific language correct

**Formatting**:
- ✓ Consistent heading levels
- ✓ Proper punctuation
- ✓ Correct abbreviations
- ✓ Units formatted correctly

## 6. Reporting Guideline Compliance

**CONSORT** (RCTs):
- ✓ Trial design description
- ✓ Participant flow diagram
- ✓ Randomization details
- ✓ Blinding procedures
- ✓ Statistical methods
- ✓ Trial registration

**STROBE** (Observational):
- ✓ Study design clear
- ✓ Setting and dates
- ✓ Eligibility criteria
- ✓ Variables defined
- ✓ Statistical methods
- ✓ Participant flow

**PRISMA** (Systematic Reviews):
- ✓ Search strategy detailed
- ✓ Inclusion/exclusion criteria
- ✓ Study selection flow diagram
- ✓ Quality assessment
- ✓ Synthesis methods
- ✓ Publication bias

**Example Usage**:

```bash
# Comprehensive review
/paper-review --focus all --depth comprehensive

# Quick structure check
/paper-review --focus structure --depth quick

# CONSORT compliance check for RCT
/paper-review --guideline consort

# Review with detailed report
/paper-review --focus all --output review_report.md
```

**Review Report Format**:

```markdown
# Paper Quality Review Report

## Overall Score: 85/100

### Structure (90/100)
✓ IMRAD format followed
✓ Section balance appropriate
⚠ Introduction could be shortened by 10%

### Content Quality (88/100)
✓ Clear, concise writing
✓ Logical flow maintained
✗ 3 undefined acronyms found (ATP, PCR, ELISA)
⚠ Discussion interpretation slightly strong in para 3

### Citations (82/100)
✓ 45 total citations
✓ Good recent coverage (avg year: 2021)
✗ 2 broken DOIs
⚠ Only 1 citation in Results (recommend 0-2)

### Figures & Tables (90/100)
✓ 5 figures, all high quality
✓ Captions clear and complete
⚠ Figure 3 could use colorblind-safe palette

### Style (85/100)
✓ Appropriate tense usage
✓ Field terminology correct
⚠ Some passive voice in Methods (acceptable)

### Reporting Guidelines (CONSORT: 95/100)
✓ 24/25 checklist items complete
✗ Trial registration number not mentioned in Abstract

## Priority Action Items

1. **High Priority**:
   - Fix 2 broken DOIs (Smith2023, Jones2022)
   - Add trial registration to Abstract
   - Define acronyms: ATP, PCR, ELISA at first use

2. **Medium Priority**:
   - Update Figure 3 color palette
   - Reduce Introduction by ~200 words
   - Soften interpretation in Discussion para 3

3. **Low Priority**:
   - Consider adding 1-2 more recent citations (2024)
   - Minor formatting consistency in Table 2

## Submission Readiness: 85%

**Recommendation**: Address high-priority items, then ready for submission.

**Estimated Time to Fix**: 2-3 hours
```

**Integration with Workflow**:

```bash
# After writing
/paper-write all --citations
/paper-review --focus all           # ← Comprehensive review

# Fix identified issues
/paper-write discussion --style improve  # Fix interpretation
/paper-cite validate                     # Fix broken DOIs

# Final review
/paper-review --depth quick         # Quick final check
```

**Review Checklists**:

### Pre-Submission Checklist
- [ ] All sections complete
- [ ] No bullet points in main text
- [ ] Citations validated
- [ ] Figures high quality
- [ ] Reporting guideline followed
- [ ] Word limits met
- [ ] Author guidelines followed
- [ ] Supplementary materials ready

### Common Issues Detected
- Undefined acronyms
- Broken citations
- Low-resolution figures
- Over-interpretation
- Missing statistics
- Inconsistent terminology
- Tense errors
- Formatting issues

**Output**:
- Comprehensive review report
- Quality score by category
- Prioritized action items
- Submission readiness assessment
- Estimated time to fix issues

Execute comprehensive paper review with quality scoring and actionable improvement recommendations.
