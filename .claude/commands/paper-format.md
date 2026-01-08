# Paper Format

**Purpose**: Format paper for specific journal/conference submission using Venue Templates skill.

**Auto-Activations**:
- Persona: scribe
- MCP: Context7 (venue requirements)
- Skills: venue-templates, scientific-writing
- Flags: --validate (format compliance check)

**Arguments**:
- `<venue>` - Target venue: nature | science | plos | neurips | icml | etc.
- `--type <type>` - Document type: article | conference | poster | grant
- `--template` - Get template file
- `--customize` - Customize with project info
- `--validate` - Validate format compliance
- `--compile` - Compile LaTeX to PDF

**Venue Formatting Workflow**:

## 1. Get Venue Requirements

```bash
# Check Nature requirements
/paper-format nature --requirements

# Output:
# - Page limit: ~5 pages (~3000 words)
# - Citation style: Numbered superscript
# - Figures: 300+ dpi, RGB
# - Font: 12pt
```

## 2. Get Template

```bash
# Get Nature template
/paper-format nature --template

# Retrieves:
# - assets/journals/nature_article.tex
# - Formatting guidelines
# - Example structure
```

## 3. Customize Template

```bash
# Customize with project info
/paper-format nature --customize \
  --title "Your Paper Title" \
  --authors "First Author, Second Author" \
  --affiliations "University Name" \
  --email "[email protected]"

# Output: my_nature_paper.tex
```

## 4. Validate Format

```bash
# Validate compliance
/paper-format nature --validate my_paper.pdf

# Checks:
# ✓ Page count (≤5 pages)
# ✓ Font size (12pt)
# ✓ Margins (correct)
# ✓ Citation style (numbered superscript)
# ✓ Figure resolution (≥300 dpi)
```

## 5. Compile

```bash
# Compile LaTeX
/paper-format nature --compile my_paper.tex

# Equivalent to:
# latexmk -pdf my_paper.tex
```

**Supported Venues**:

### Journals
- **Nature Family**: Nature, Nature Methods, Nature Communications, Scientific Reports
- **Science Family**: Science, Science Advances, Science Translational Medicine
- **PLOS**: PLOS ONE, PLOS Biology, PLOS Computational Biology
- **Cell Press**: Cell, Neuron, Immunity
- **IEEE**: Various IEEE Transactions
- **ACM**: ACM Transactions, Communications of ACM

### Conferences
- **ML/AI**: NeurIPS, ICML, ICLR, CVPR, AAAI
- **CS**: ACM CHI, SIGKDD, EMNLP, SIGIR
- **Biology**: ISMB, RECOMB, PSB

### Posters
- **Sizes**: A0, A1, 36"×48", 42"×56"
- **Packages**: beamerposter, tikzposter, baposter

### Grants
- **NSF**: Proposal templates (15 pages)
- **NIH**: R01, R21, K Awards
- **DOE**: Office of Science
- **DARPA**: BAA responses

**Venue-Specific Requirements**:

| Venue | Page Limit | Citation Style | Figures |
|-------|-----------|----------------|---------|
| Nature | ~5 pages | Numbered (superscript) | 300+ dpi |
| Science | ~5 pages | Numbered (superscript) | 300+ dpi |
| PLOS | No limit | Vancouver | 300-600 dpi |
| NeurIPS | 8 pages | Numbered [brackets] | High res |
| ICML | 8 pages | Numbered [brackets] | High res |

**Complete Workflow Example**:

```bash
# 1. Check what's needed
/paper-format nature --requirements

# 2. Get and customize template
/paper-format nature --customize \
  --title "Novel CRISPR Approach" \
  --authors "Jane Doe, John Smith" \
  --affiliations "MIT, Stanford"

# 3. Write paper content
# (Use /paper-write for sections)

# 4. Format citations
/paper-cite format --style nature

# 5. Validate final format
/paper-format nature --validate final_paper.pdf

# 6. Fix any issues
# (Automated suggestions provided)

# 7. Compile final version
/paper-format nature --compile final_paper.tex
```

**Integration with Other Commands**:

```bash
# Complete paper pipeline
/paper-load @my-paper              # Understand current state
/paper-write all --citations       # Write sections
/paper-cite validate               # Validate citations
/paper-format nature --customize   # Format for Nature
/paper-format nature --validate    # Check compliance
```

**Validation Report**:

```
Format Validation Report for Nature
====================================

✓ Page count: 4.8 pages (within 5 page limit)
✓ Font size: 12pt (correct)
✓ Margins: 1 inch all sides (correct)
✓ Citations: Numbered superscript (correct)
✗ Figure 2: 150 dpi (needs ≥300 dpi)
⚠ Warning: Abstract is 280 words (recommended ≤250)

Action Items:
1. Increase Figure 2 resolution to 300+ dpi
2. Consider shortening abstract by 30 words

Submission Readiness: 90%
```

**Output**:
- Formatted LaTeX template
- Compiled PDF
- Validation report
- Submission checklist
- Required supplementary files

Execute venue-specific formatting with template customization and compliance validation.
