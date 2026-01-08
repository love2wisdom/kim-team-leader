# Paper Cite

**Purpose**: Manage citations, generate BibTeX, and validate references using Citation Management and Research Lookup skills.

**Auto-Activations**:
- Persona: analyzer, scribe
- MCP: Sequential (citation organization)
- Skills: citation-management, research-lookup, openalex-database
- Flags: --validate (citation verification)

**Arguments**:
- `<action>` - Action to perform: search | add | validate | format | generate
- `--query <query>` - Search query for papers
- `--doi <doi>` - Specific DOI to add
- `--source <source>` - google-scholar | pubmed | openalex | research-lookup
- `--output <file>` - Output BibTeX file (default: references.bib)
- `--style <style>` - Citation style: nature | science | apa | vancouver | ieee

**Citation Workflow**:

## 1. Search for Papers

**Using OpenAlex** (recommended for bulk):
```bash
/paper-cite search --query "CRISPR gene editing" --source openalex --output crispr.bib
```

**Using Research Lookup** (recommended for latest):
```bash
/paper-cite search --query "Recent advances in mRNA vaccines 2024" --source research-lookup
```

**Using PubMed** (biomedical focus):
```bash
/paper-cite search --query "Alzheimer's disease treatment" --source pubmed
```

## 2. Add Specific Papers

**By DOI**:
```bash
/paper-cite add --doi 10.1038/s41586-021-03819-2
```

**Multiple DOIs**:
```bash
/paper-cite add --doi "10.1038/nature12345,10.1126/science.abc1234"
```

**From file**:
```bash
/paper-cite add --input dois.txt --output references.bib
```

## 3. Validate Citations

**Comprehensive validation**:
```bash
/paper-cite validate --output references.bib
```

**Validation checks**:
- DOI verification via doi.org
- Required fields completeness
- Duplicate detection
- Format compliance
- Broken links check

## 4. Format and Clean

**Format BibTeX file**:
```bash
/paper-cite format --output references.bib --style nature
```

**Operations**:
- Remove duplicates
- Standardize formatting
- Sort by year/author
- Fix common errors
- Validate syntax

## 5. Generate Bibliography

**For specific section**:
```bash
/paper-cite generate --section introduction --topic "AI drug discovery"
```

**Complete bibliography**:
```bash
/paper-cite generate --topic "machine learning protein folding" --output final_refs.bib
```

**Automated Workflow**:

```
1. Search multiple sources
   ↓
2. Extract metadata → BibTeX
   ↓
3. Combine and deduplicate
   ↓
4. Format and validate
   ↓
5. Generate final bibliography
```

**Source Selection Guide**:

| Source | Best For | Coverage | Speed |
|--------|----------|----------|-------|
| **OpenAlex** | Bulk search, trends | 240M+ papers | Fast |
| **Research Lookup** | Latest papers, analysis | Current (2024) | Medium |
| **PubMed** | Biomedical | 35M+ papers | Fast |
| **Google Scholar** | Comprehensive | Broadest | Slow |

**Example Combined Workflow**:

```bash
# 1. Search for papers (multiple sources)
/paper-cite search --query "quantum computing" --source openalex --output quantum_oa.bib
/paper-cite search --query "Recent quantum computing advances 2024" --source research-lookup --output quantum_rl.bib

# 2. Add specific key papers
/paper-cite add --doi "10.1038/nature12345,10.1126/science.abc"

# 3. Combine all sources
# (Automatically merges into references.bib)

# 4. Format and validate
/paper-cite format --output references.bib
/paper-cite validate --output references.bib

# 5. Ready to use in LaTeX
# \bibliography{references}
```

**Integration with Paper Writing**:

```bash
# Write section with auto-citation
/paper-write introduction --topic "CRISPR" --citations
# → Automatically calls /paper-cite to gather relevant papers

# Then validate all citations
/paper-cite validate
```

**Citation Style Formatting**:

| Journal/Style | Command |
|---------------|---------|
| Nature | `--style nature` |
| Science | `--style science` |
| PLOS | `--style vancouver` |
| APA | `--style apa` |
| IEEE | `--style ieee` |

**Output**:
- Formatted BibTeX file
- Validation report (errors, warnings, duplicates)
- Citation statistics
- Ready-to-use bibliography

Execute citation management with automated search, validation, and formatting.
