# Paper Fix

**Purpose**: Fix paper issues based on review reports, direct specifications, or issue lists with automated categorization and smart handling.

**Auto-Activations**:
- Persona: analyzer, scribe, qa
- MCP: Sequential (systematic fix planning)
- Skills: scientific-writing
- Flags: --think (for complex fixes)

**Arguments**:
- `<source>` - Review report file path (e.g., `@tasks/final-topic/review-report.md`)
- `--issue <description>` - Direct issue specification
- `--section <name>` - Target specific section
- `--priority <level>` - Filter by priority: high | medium | low | all
- `--interactive` - Confirm each fix before applying
- `--dry-run` - Show what would be fixed without applying changes

**Usage Patterns**:

## Pattern 1: Review Report Based (Recommended)

```bash
# Fix all issues from review report
/paper-fix @tasks/final-topic/review-report.md

# Fix only high-priority issues
/paper-fix @tasks/final-topic/review-report.md --priority high

# Interactive mode (confirm each fix)
/paper-fix @tasks/final-topic/review-report.md --interactive

# Dry run (preview fixes)
/paper-fix @tasks/final-topic/review-report.md --dry-run
```

## Pattern 2: Direct Issue Specification

```bash
# Fix specific issue
/paper-fix --issue "Fix broken citations refs 23, 31"

# Fix section-specific issue
/paper-fix --section introduction --issue "Reduce by 200 words"

# Multiple issues
/paper-fix --issue "Define acronyms ATP, PCR, ELISA at first use"
```

## Pattern 3: Section-Targeted Fixes

```bash
# Fix all issues in specific section
/paper-fix introduction

# Fix discussion interpretation
/paper-fix discussion --issue "Soften claims in paragraph 3"

# Fix methods reproducibility
/paper-fix methods --issue "Add parameter details"
```

## Pattern 4: Issue List from File

```bash
# Fix from custom issue list
/paper-fix @tasks/issues-to-fix.txt

# Combined with filters
/paper-fix @tasks/issues-to-fix.txt --priority high --interactive
```

**Fix Workflow**:

## 1. Input Processing

**Review Report Format**:
```markdown
# Paper Quality Review Report

## Overall Score: 85/100

### High Priority Issues:
1. ❌ Fix broken citations (refs 23, 31)
2. ❌ Figure 3 resolution: 150 dpi (needs ≥300 dpi)

### Medium Priority Issues:
3. ⚠ Reduce Introduction by ~200 words
4. ⚠ Soften interpretation in Discussion para 3

### Low Priority Issues:
5. ℹ️ Consider adding more recent citations (2024)
```

**Direct Issue Format**:
```
Fix broken citations in references 23 and 31
Define acronyms: ATP, PCR, ELISA
Soften claims in Discussion paragraph 3
```

## 2. Issue Categorization

### Auto-Fixable (AI can fix completely)

**Type 1: Undefined Acronyms**
- ✓ Add definitions at first use
- ✓ Format: "adenosine triphosphate (ATP)"
- ✓ Auto-detection and fix

**Type 2: Citation Formatting**
- ✓ Standardize citation format
- ✓ Fix bracket/parenthesis issues
- ✓ Correct numbering sequence

**Type 3: Tense Errors**
- ✓ Methods → past tense
- ✓ Results → past tense
- ✓ Facts → present tense
- ✓ Auto-correction with context

**Type 4: Strong Claims Softening**
- ✓ "proves" → "suggests/indicates"
- ✓ "definitely" → "likely"
- ✓ "always" → "typically/generally"
- ✓ Context-aware replacement

**Type 5: Minor Formatting**
- ✓ Consistent heading levels
- ✓ Proper punctuation
- ✓ Unit formatting
- ✓ Abbreviation consistency

**Type 6: Caption Improvements**
- ✓ Add missing methods details
- ✓ Ensure self-explanatory
- ✓ Format consistency

### Manual-Fixable (AI-assisted)

**Type 1: Content Length Adjustments**
- 🤝 AI suggests specific cuts
- 🤝 User approves deletions
- 🤝 Preserve key information

**Type 2: Paragraph Restructuring**
- 🤝 AI proposes new structure
- 🤝 User reviews flow
- 🤝 Apply if approved

**Type 3: Claim Refinement**
- 🤝 AI identifies over-interpretation
- 🤝 Suggests alternative phrasing
- 🤝 User selects preferred version

**Type 4: Citation Addition**
- 🤝 AI finds relevant papers
- 🤝 User selects citations
- 🤝 AI integrates into text

**Type 5: Figure/Table Caption Enhancement**
- 🤝 AI proposes improvements
- 🤝 User reviews accuracy
- 🤝 Apply with user approval

### User-Action Required

**Type 1: Figure Resolution Upgrades**
- ❌ Cannot upgrade image files
- 📋 Provide clear instructions
- 📋 List required specifications

**Type 2: Broken DOI Fixes (Complex)**
- ❌ May require finding correct reference
- 📋 Provide search suggestions
- 📋 Offer alternative sources

**Type 3: Data Collection**
- ❌ Cannot generate missing data
- 📋 Flag missing information
- 📋 Suggest data sources

**Type 4: Major Content Revisions**
- ❌ Requires user decision
- 📋 Explain the issue
- 📋 Offer guidance

**Type 5: Ethics/Compliance Statements**
- ❌ Cannot fabricate required statements
- 📋 Provide templates
- 📋 Request user input

## 3. Fix Execution Process

```
1. Parse Input (report/list/direct)
2. Extract Issues
3. Categorize Each Issue
   ├─ Auto-fixable → Fix immediately
   ├─ Manual-fixable → AI-assist with approval
   └─ User-action → Generate instructions
4. Present Fix Plan to User
5. **WAIT for User Approval**
6. Apply Fixes by Category
7. Validate Fixes
8. Update Files
9. Generate Fix Report
```

## 4. Fix Plan Presentation

```markdown
Fix Plan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Source: tasks/final-topic/review-report.md
Issues Found: 8

Categorization:
- Auto-Fixable: 4 issues
- Manual-Fixable: 2 issues
- User-Action Required: 2 issues

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AUTO-FIXABLE (will fix immediately):

1. ✓ Define acronyms at first use
   - ATP, PCR, ELISA
   - Locations: Lines 145, 203, 267

2. ✓ Soften Discussion claims
   - "proves" → "suggests" (para 4, line 489)
   - "definitely shows" → "indicates" (para 5, line 512)

3. ✓ Fix citation formatting
   - Standardize to numbered format
   - 3 citations affected

4. ✓ Improve Figure 4 caption
   - Add methods detail
   - Ensure self-explanatory

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MANUAL-FIXABLE (AI-assisted, requires approval):

5. 🤝 Reduce Introduction length
   - Current: 1,240 words
   - Target: ~1,000 words (200 word reduction)
   - AI will suggest specific cuts

6. 🤝 Enhance Results paragraph 2
   - Add statistical significance details
   - AI will draft enhancement

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

USER-ACTION REQUIRED:

7. ❌ BLOCKING: Figure 3 resolution upgrade
   - Current: figures/fig3.png (150 dpi)
   - Required: ≥300 dpi
   - Estimated time: 30 min
   - Instructions: [detailed guide]

8. ❌ Fix broken citations
   - Reference 23: DOI not found
   - Reference 31: Invalid format
   - Estimated time: 30 min
   - Suggestions: [search tips]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Estimated Fix Time:
- Auto-fixes: <5 min (AI)
- Manual-fixes: ~15 min (AI + user review)
- User-action: ~1 hour (user work)

Ready to proceed with auto and manual fixes?
Type 'go' to continue.
```

## 5. Fix Application

### Auto-Fixes (Immediate)

Apply all auto-fixable issues without individual approval:

```markdown
Auto-Fixes Applied: 4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Fixed undefined acronyms (3)
  Line 145: ATP → adenosine triphosphate (ATP)
  Line 203: PCR → polymerase chain reaction (PCR)
  Line 267: ELISA → enzyme-linked immunosorbent assay (ELISA)

✓ Softened Discussion claims (2)
  Line 489: "proves" → "suggests"
  Line 512: "definitely shows" → "indicates"

✓ Fixed citation formatting (3)
  Standardized refs 12, 18, 31 to numbered format

✓ Improved Figure 4 caption
  Added: "Error bars represent standard deviation (n=3)"
```

### Manual-Fixes (Interactive)

For each manual-fixable issue:

```markdown
Manual Fix 1/2: Reduce Introduction Length
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Length: 1,240 words
Target: ~1,000 words (reduce by 200)

AI Suggestions:

Option 1: Remove paragraph 2 entirely (210 words)
- Content: Historical context of technique
- Rationale: Already covered briefly in para 1
- Impact: Minimal (background info)

Option 2: Condense paragraphs 3-4 (195 words saved)
- Keep key points, remove elaborations
- Preserve all citations
- Maintain logical flow

Option 3: Cut specific sentences (215 words total)
- Sentence 1.3: Redundant with para 2
- Sentences 3.5-3.7: Over-detailed examples
- Sentence 5.2: Obvious statement

Which option? (1/2/3/custom/skip)
```

User selects → AI applies → Move to next manual fix

### User-Action Instructions

For issues requiring user action:

```markdown
User Action Required 1/2: Figure 3 Resolution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Priority: HIGH (BLOCKING)

Issue: Figure resolution too low
- Current: figures/fig3.png (150 dpi)
- Required: ≥300 dpi for publication

Steps to Fix:
1. Locate source file: figures/fig3.png
2. Options:
   a) Re-export from original software at 300+ dpi
   b) Use image upscaling (not ideal)
   c) Recreate figure from raw data

Recommended: Option (a) - Re-export from source

Instructions:
- If created in R: Add dpi=300 to ggsave()
  ggsave("fig3.png", dpi=300, width=6, height=4)

- If created in Python/matplotlib:
  plt.savefig('fig3.png', dpi=300, bbox_inches='tight')

- If created in Adobe Illustrator:
  Export → PNG → Resolution: 300 ppi

After fixing:
- Replace: figures/fig3.png
- Re-run: /paper-finalize --quick

Estimated Time: 30 minutes
```

## 6. Post-Fix Validation

After applying fixes:

```markdown
Fix Validation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fixes Applied: 6

Auto-Fixes: 4
✓ Undefined acronyms
✓ Tense corrections
✓ Citation formatting
✓ Caption improvements

Manual-Fixes: 2
✓ Introduction reduced (1,240 → 1,015 words)
✓ Results paragraph enhanced

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Quality Re-Check:

Before Fixes: 85/100
After Fixes: 92/100
Improvement: +7 points

Updated Scores:
- Structure: 90 → 95 (+5)
- Content: 88 → 93 (+5)
- Citations: 82 → 90 (+8)
- Style: 85 → 92 (+7)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Remaining Issues: 2 (user-action required)

1. ❌ Figure 3 resolution (BLOCKING)
2. ❌ Broken citations (refs 23, 31)

See detailed instructions above.

After user fixes, re-run:
/paper-finalize tasks/sections-[topic].md [venue] --quick

Files Updated:
✓ tasks/sections-[topic].md
✓ tasks/final-[topic]/fix-report.md
```

## 7. Fix Report Generation

Generate comprehensive fix report: `tasks/final-[topic]/fix-report.md`

```markdown
# Paper Fix Report

## Summary

**Date**: 2024-01-15
**Source**: review-report.md
**Total Issues**: 8
**Issues Fixed**: 6
**Remaining**: 2

## Fixes Applied

### Auto-Fixes (4)

1. **Undefined Acronyms** ✓
   - ATP → adenosine triphosphate (ATP) [line 145]
   - PCR → polymerase chain reaction (PCR) [line 203]
   - ELISA → enzyme-linked immunosorbent assay (ELISA) [line 267]

2. **Discussion Claims Softened** ✓
   - "proves" → "suggests" [line 489]
   - "definitely shows" → "indicates" [line 512]

3. **Citation Formatting** ✓
   - Standardized 3 citations to numbered format

4. **Figure 4 Caption Enhanced** ✓
   - Added methods detail and sample size

### Manual-Fixes (2)

5. **Introduction Length Reduction** ✓
   - Before: 1,240 words
   - After: 1,015 words
   - Reduction: 225 words (Option 2 applied)
   - Method: Condensed paragraphs 3-4

6. **Results Paragraph 2 Enhancement** ✓
   - Added statistical significance details
   - Included confidence intervals
   - Clarified n-values

## Remaining Issues (User Action Required)

### High Priority

7. **Figure 3 Resolution** ❌ BLOCKING
   - Status: Awaiting user action
   - Instructions: See fix-report.md section 3.1
   - Estimated time: 30 min

8. **Broken Citations** ❌
   - Reference 23: DOI not found
   - Reference 31: Invalid format
   - Instructions: See fix-report.md section 3.2
   - Estimated time: 30 min

## Quality Impact

**Before Fixes**: 85/100
**After Fixes**: 92/100
**Improvement**: +7 points

**Category Improvements**:
- Structure: +5
- Content: +5
- Citations: +8
- Style: +7

## Next Steps

1. User completes remaining fixes (~1 hour)
2. Re-run finalize: `/paper-finalize --quick`
3. Final validation
4. Submission ready

**Estimated Time to Submission**: 1-2 hours
```

**Integration with Workflow**:

```bash
# Typical workflow
/paper-review --focus all                    # Step 5.1: Review
/paper-fix @review-report.md                 # Step 5.1.5: Fix issues
# User completes manual actions
/paper-finalize tasks/sections-[topic].md nature --quick  # Step 5.2-5.4
```

**Example Scenarios**:

### Scenario 1: Post-Review Fixes

```bash
# After comprehensive review
/paper-review --focus all --output review-report.md

# Fix high-priority issues only
/paper-fix @review-report.md --priority high

# Review fixes, then complete finalization
/paper-finalize tasks/sections-topic.md nature --quick
```

### Scenario 2: Quick Issue Fix

```bash
# Direct fix during writing
/paper-fix --section discussion --issue "Soften claim in paragraph 3"

# Fix multiple issues
/paper-fix --issue "Define ATP, PCR, fix citation 23"
```

### Scenario 3: Interactive Fix Session

```bash
# Review each fix before applying
/paper-fix @review-report.md --interactive

# Dry run first
/paper-fix @review-report.md --dry-run
/paper-fix @review-report.md  # Apply after review
```

**Output**:
- Fixed paper sections file
- Comprehensive fix report
- Quality improvement metrics
- User action instructions
- Validation results

Execute systematic paper issue fixing with automated categorization, AI-assisted manual fixes, and clear user action guidance.
