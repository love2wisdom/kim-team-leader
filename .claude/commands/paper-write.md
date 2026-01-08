# Paper Write

**Purpose**: Write or improve paper sections using Scientific Writing skill with 2-stage process and research lookup integration.

**Auto-Activations**:
- Persona: scribe, analyzer
- MCP: Sequential (structured writing), Context7 (research context)
- Skills: scientific-writing, research-lookup, academic-thinking (if --thinking-mode used)
- Flags: --think (for complex sections)

**Arguments**:
- `<section>` - Section to write: abstract | introduction | literature-review | methods | results | discussion | all
- `--topic <topic>` - Research topic for context
- `--style <style>` - Writing approach: from-scratch | improve | expand
- `--citations` - Auto-fetch relevant citations using research-lookup
- `--outline-only` - Stage 1 only (create outline, don't write full paragraphs)
- `--discipline <discipline>` - Specify discipline: natural-science (IMRAD) | social-science (IMeLRAD)
- `--thinking-mode <mode>` - Apply genius thinking formulas: genius | innovative | interpretive

**Two-Stage Writing Process**:

## Stage 1: Create Outline with Key Points

Using research-lookup skill to gather information:

1. 🔍 **Research Lookup**
   - Query relevant literature using research-lookup
   - Gather key findings and citations
   - Extract important statistics and data
   - Note methodological approaches

2. 📋 **Outline Creation**
   - Organize findings into bullet points
   - Structure logical flow
   - Mark citation placements
   - Identify gaps needing more research

## Stage 2: Convert to Full Paragraphs

Using scientific-writing skill:

1. ✍️ **Paragraph Expansion**
   - Transform bullet points into complete sentences
   - Add transitions and flow
   - Integrate citations naturally
   - Ensure proper voice and tense

2. 🎯 **Quality Check**
   - Verify IMRAD structure compliance
   - Check paragraph coherence
   - Validate citation formatting
   - Ensure no bullet points remain

**Section-Specific Guidance**:

### Abstract
- 150-250 words
- Background → Methods → Results → Conclusions
- Standalone summary
- No citations typically

### Introduction
- Establish context using research-lookup
- Literature review with recent citations
- Identify gap
- State objectives
- 3-5 paragraphs

### Methods
- Detailed procedures
- Statistical methods
- Reproducibility focus
- Past tense
- Can use lists for criteria/materials

### Results
- Objective presentation
- Reference figures/tables
- Statistical significance
- Past tense
- No interpretation

### Discussion
- Interpret findings
- Compare with literature using research-lookup
- Acknowledge limitations
- Future directions
- 5-8 paragraphs

**Example Usage**:

```bash
# Write introduction with auto-citations
/paper-write introduction --topic "CRISPR gene editing" --citations

# Create outline only for methods
/paper-write methods --outline-only

# Improve existing results section
/paper-write results --style improve

# Write complete paper
/paper-write all --topic "machine learning drug discovery" --citations
```

**Integration with Research Lookup**:

```
1. User requests section
2. Auto-query research-lookup for relevant papers
3. Create outline with key points (Stage 1)
4. Convert to full paragraphs (Stage 2)
5. Validate no bullet points remain
```

**Critical Rules**:
- ❌ NEVER submit bullet points in final text
- ✅ ALWAYS use complete paragraphs
- ✅ ALWAYS apply 2-stage process
- ✅ ALWAYS integrate citations naturally
- ✅ ALWAYS use appropriate tense

**Output**:
- Section outline (Stage 1)
- Complete paragraphs (Stage 2)
- Integrated citations
- Quality validation report

Execute section writing using scientific-writing skill with 2-stage process and research integration.
