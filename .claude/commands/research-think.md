# /research-think - Academic Thinking Formula Application

Apply genius-level thinking formulas to research development: topic exploration, question formulation, methodology design, and results interpretation.

## Usage

```bash
/research-think <mode> [arguments]
```

**Modes**:
- `topic` - Multi-dimensional research topic analysis
- `questions` - Research question formulation and refinement
- `methods` - Innovative methodology design
- `interpret` - Deep results interpretation

---

## Mode 1: Topic Development

Apply multi-dimensional analysis to discover novel research directions.

### Usage

```bash
/research-think topic --topic "<research domain>" [options]
```

### Arguments

- `--topic <topic>` (required) - Research domain or broad area
- `--formula <formulas>` - Comma-separated formulas to apply (default: mda,cc,pr)
  - `mda` - Multi-Dimensional Analysis
  - `cc` - Creative Connection Matrix
  - `pr` - Problem Redefinition
  - `gi` - Genius Insight Formula
- `--output <file>` - Save analysis to file (optional)
- `--discipline <discipline>` - natural-science | social-science (affects analysis approach)

### Examples

```bash
# Basic topic exploration
/research-think topic --topic "climate change adaptation in coastal cities"

# With specific formulas
/research-think topic --topic "AI in healthcare" --formula mda,cc --output ideas.md

# Social science research
/research-think topic --topic "remote work productivity" --discipline social-science
```

### Output

**Multi-Dimensional Analysis (MDA)**:
- D1 (Temporal): Past → Present → Future analysis
- D2 (Spatial): Local → Global analysis
- D3 (Abstraction): Concrete → Abstract levels
- D4 (Causality): Causes → Mechanisms → Outcomes
- D5 (Scale): Micro → Meso → Macro levels
- **MDA Score**: Overall comprehensiveness rating
- **Research Gaps**: Underexplored dimensions and intersections

**Creative Connection Matrix (CC)**:
- Direct connections (common elements)
- Indirect connections (via mediating concepts)
- Paradoxical connections (tensions to explore)
- Metaphorical connections (analogies from other fields)
- Systemic connections (cross-level mechanisms)
- **Total CC Score**: Number of novel connections identified

**Problem Redefinition (PR)**:
- Opposite perspective (180° rotation)
- Zoom out (10x scope expansion)
- Zoom in (0.1x detailed focus)
- Meta-level up (epistemological questions)
- Meta-level down (practical applications)
- Domain transfer (analogies from other fields)
- **6+ reframed research problems**

**Final Output**:
- 10-20 novel research directions ranked by potential
- Gap analysis with evidence
- Recommended next steps

---

## Mode 2: Question Formulation

Refine research questions through iterative amplification.

### Usage

```bash
/research-think questions --context "<research gap or finding>" [options]
```

### Arguments

- `--context <context>` (required) - Literature review findings, research gap, or initial idea
- `--formula <formulas>` - Comma-separated formulas (default: gi,ia)
  - `gi` - Genius Insight Formula
  - `ia` - Insight Amplification
  - `pr` - Problem Redefinition
- `--iterations <n>` - Number of refinement cycles (default: 3, max: 5)
- `--output <file>` - Save questions to file (optional)
- `--discipline <discipline>` - Affects question format (natural-science | social-science)

### Examples

```bash
# Basic question development
/research-think questions --context "Literature shows mixed effects of technology on learning"

# With more iterations
/research-think questions \
  --context "Gap: limited research on farmer technology adoption" \
  --iterations 5 \
  --output research-questions.md

# Social science research questions
/research-think questions \
  --context "Social comparison theory suggests social media impacts wellbeing" \
  --discipline social-science
```

### Output

**Genius Insight Formula (GI)**:
- Observation depth score (1-10)
- Connection originality score (1-10)
- Pattern recognition score (1-10)
- Synthesis capacity score (1-10)
- Assumptions identified (minimize)
- Biases identified (minimize)
- **GI Score**: Overall insight quality

**Insight Amplification (IA)** - 3 Iteration Rounds:

**Round 1: 5 Whys (Root Cause Analysis)**:
- Why #1 → Why #2 → Why #3 → Why #4 → Why #5
- **Deeper Insight**: Root cause identification

**Round 2: What-If Scenarios**:
- What if [assumption A is wrong]?
- What if [opposite is true]?
- What if [no constraints]?
- **Amplified Insight**: Alternative framings

**Round 3: How-Might-We Questions**:
- HMW [address root cause]?
- HMW [leverage opportunity]?
- HMW [overcome barrier]?
- **Final Insight**: Actionable research questions

**Final Output**:
- 2-5 refined, testable research questions
- For social science: Research questions (RQ1-RQ5) ready for Literature Review section
- For natural science: Hypotheses (H1-H5) ready for Methods section
- Rationale for each question
- Expected contributions

---

## Mode 3: Methodology Design

Generate innovative methodological approaches.

### Usage

```bash
/research-think methods --problem "<research question or challenge>" [options]
```

### Arguments

- `--problem <problem>` (required) - Research question or methodological challenge
- `--formula <formulas>` - Comma-separated formulas (default: is,cs)
  - `is` - Innovative Solution Generation
  - `cs` - Complexity Solution Matrix
  - `iw` - Integrated Wisdom (ethical considerations)
- `--constraints <constraints>` - Budget, ethical, practical constraints (optional)
- `--output <file>` - Save methodology design to file (optional)
- `--discipline <discipline>` - Affects methodology recommendations

### Examples

```bash
# Basic methodology design
/research-think methods --problem "How to measure creativity in AI systems?"

# With constraints
/research-think methods \
  --problem "Measuring real-time farmer decision-making" \
  --constraints "Rural setting, low literacy, limited budget"

# Social science methods with ethics
/research-think methods \
  --problem "Impact of social media on adolescent mental health" \
  --formula is,cs,iw \
  --discipline social-science
```

### Output

**Innovative Solution Generation (IS)** - 5 Approaches:

1. **New Combination** (Combine existing elements):
   - Elements identified
   - Novel combination proposed
   - Novelty × Feasibility × Value / Risk score

2. **Cross-Domain Transfer** (Apply methods from other fields):
   - Source domain
   - Target domain
   - Transfer approach
   - IS score

3. **Constraint Exploitation** (Turn limitations into strengths):
   - Constraint identified
   - Creative solution
   - IS score

4. **Reverse Engineering** (Study the opposite):
   - Reverse approach
   - Insights gained
   - IS score

5. **System Redesign** (Paradigm shift):
   - Radical solution
   - IS score

**Ranked by Total IS Score** (highest = most promising)

**Complexity Solution Matrix (CS)** (if problem is complex):
- System decomposition into subsystems
- Complexity score per subsystem
- Solution approach per subsystem
- Interaction mapping
- Leverage points identified
- **Phased research roadmap**

**Integrated Wisdom (IW)** (if requested):
- Knowledge gaps identified
- Ethical considerations
- Compassion for participants
- Action/implementation plan
- Humility about limitations
- **IW Score**: Holistic research quality

**Final Output**:
- 3-5 methodological approaches with detailed designs
- Ranked by innovation score
- Feasibility analysis
- Ethical considerations
- Recommended approach with rationale

---

## Mode 4: Results Interpretation

Generate deep, multi-faceted interpretations of findings.

### Usage

```bash
/research-think interpret --results-file "<path>" [options]
```

### Arguments

- `--results-file <file>` (required) - Path to results section or summary
- `--formula <formulas>` - Comma-separated formulas (default: il,mda)
  - `il` - Intuitive Leap
  - `mda` - Multi-Dimensional Analysis
  - `cc` - Creative Connection
  - `te` - Thinking Evolution
- `--literature-file <file>` - Path to literature review (for connecting findings to theory)
- `--output <file>` - Save interpretation to file (optional)
- `--discipline <discipline>` - Affects interpretation approach

### Examples

```bash
# Basic interpretation
/research-think interpret --results-file results.md

# With literature connection
/research-think interpret \
  --results-file results.md \
  --literature-file literature-review.md \
  --output discussion-insights.md

# Social science interpretation
/research-think interpret \
  --results-file results.md \
  --formula il,mda,te \
  --discipline social-science
```

### Output

**Intuitive Leap (IL)**:
- Pattern recognition across results
- Unconscious connections surfaced
- Breakthrough interpretations
- **IL Score**: Conditions for insight

**Multi-Dimensional Analysis (MDA)**:
- Temporal interpretation (implications over time)
- Spatial interpretation (generalizability)
- Abstraction levels (concrete to theoretical)
- Causal interpretation (mechanisms)
- Scale interpretation (micro to macro)
- **MDA Score**: Comprehensiveness of discussion

**Creative Connection (CC)** (if requested):
- Connections to theoretical frameworks
- Connections to other empirical findings
- Unexpected connections across fields
- **Novel theoretical contributions**

**Thinking Evolution (TE)** (if requested):
- How findings changed your understanding
- Evolution from initial hypotheses
- Learning and reflection
- **Epistemological growth**

**Final Output**:
- 5-10 key interpretations organized by dimension
- Theoretical connections
- Practical implications
- Limitations and future directions
- Ready-to-write Discussion section outline

---

## Integration with Paper Writing Workflow

### Standard Workflow

```bash
# === Phase 1: Ideation ===
/research-think topic --topic "your broad domain" --output ideas.md

# Review ideas.md, select most promising direction

# === Phase 2: Question Development ===
/research-think questions \
  --context "selected research gap from ideas.md" \
  --iterations 3 \
  --output research-questions.md

# === Phase 3: Literature Review (Social Science) ===
/paper-cite search --query "your topic" --source openalex
/paper-write literature-review \
  --topic "research domain" \
  --citations \
  --discipline social-science \
  --thinking-mode genius

# Research questions automatically refined through Literature Review

# === Phase 4: Methodology Design ===
/research-think methods \
  --problem "research question from research-questions.md" \
  --constraints "your constraints" \
  --output methodology.md

# Review methodology.md, select approach

/paper-write methods \
  --topic "selected methodology" \
  --discipline social-science

# === Phase 5: Data Collection & Analysis ===
# [Do actual research]

# === Phase 6: Results Interpretation ===
/research-think interpret \
  --results-file results.md \
  --literature-file literature-review.md \
  --output discussion-insights.md

/paper-write discussion \
  --topic "findings from discussion-insights.md" \
  --citations \
  --discipline social-science
```

### Quick Ideation Session

```bash
# Generate 20+ research ideas in 30 minutes
/research-think topic --topic "your domain" --formula mda,cc,pr,gi --output ideas.md

# Refine top 3 ideas into questions
/research-think questions --context "idea 1" --output rq1.md
/research-think questions --context "idea 2" --output rq2.md
/research-think questions --context "idea 3" --output rq3.md

# Compare and select best research direction
```

### Methodology Innovation

```bash
# Generate 5 methodological approaches
/research-think methods \
  --problem "challenging research question" \
  --formula is,cs,iw \
  --output methods-options.md

# Review methods-options.md
# Select highest-scoring approach
# Proceed to detailed research design
```

---

## Formula Reference

### Available Formulas

| Code | Name | Best For |
|------|------|----------|
| `gi` | Genius Insight | Maximizing observation, minimizing bias |
| `mda` | Multi-Dimensional Analysis | Comprehensive exploration across 5 dimensions |
| `cc` | Creative Connection | Finding interdisciplinary links |
| `pr` | Problem Redefinition | Reframing from multiple perspectives |
| `is` | Innovative Solution | Generating novel methodologies |
| `ia` | Insight Amplification | Iterative question refinement |
| `te` | Thinking Evolution | Tracking intellectual growth |
| `cs` | Complexity Solution | Decomposing complex problems |
| `il` | Intuitive Leap | Allowing unconscious insights |
| `iw` | Integrated Wisdom | Holistic ethical research |

### Formula Selection Guide

**For Topic Exploration**:
- Primary: `mda`, `cc`, `pr`
- Optional: `gi`

**For Question Formulation**:
- Primary: `gi`, `ia`
- Optional: `pr`, `te`

**For Methodology Design**:
- Primary: `is`, `cs`
- Optional: `iw`

**For Results Interpretation**:
- Primary: `il`, `mda`
- Optional: `cc`, `te`

---

## Output Format

All `/research-think` outputs follow this structure:

```markdown
# Research Thinking Analysis: [Mode]

**Topic/Problem**: [User input]
**Formulas Applied**: [List]
**Discipline**: [natural-science | social-science]
**Date**: [Timestamp]

---

## [Formula 1 Name]

### Analysis
[Detailed application of formula]

### Scores/Metrics
[Quantitative assessments]

### Key Insights
[Bulleted findings]

---

## [Formula 2 Name]

### Analysis
[Detailed application of formula]

### Scores/Metrics
[Quantitative assessments]

### Key Insights
[Bulleted findings]

---

## Synthesis

### Top Recommendations
1. [Ranked recommendation 1]
2. [Ranked recommendation 2]
3. [Ranked recommendation 3]

### Rationale
[Why these are most promising]

### Next Steps
[Concrete actions to take]

---

## References
[Relevant literature or frameworks cited]
```

---

## Best Practices

### Do's

✅ **Apply multiple formulas** - Each formula provides different perspectives
✅ **Use iterations** - Insight quality improves with refinement
✅ **Save outputs** - Build a portfolio of research ideas
✅ **Combine with literature** - Formulas guide search, literature validates
✅ **Validate empirically** - Formulas generate ideas, data tests them

### Don'ts

❌ **Don't treat scores as absolute** - They're relative comparisons
❌ **Don't skip validation** - Creative ideas must be tested
❌ **Don't apply all formulas always** - Select relevant ones
❌ **Don't ignore constraints** - Creativity within feasibility
❌ **Don't use formulas to justify bad research** - They enhance good ideas, not rescue bad ones

---

## Examples by Discipline

### Natural Science Example

```bash
# Topic: Drug discovery
/research-think topic \
  --topic "antibiotic resistance mechanisms" \
  --discipline natural-science \
  --output drug-ideas.md

# Output includes:
# - MDA: Temporal (evolution), Spatial (geographic spread), Causality (molecular mechanisms)
# - CC: Connections to ecology, computer science (ML for prediction)
# - PR: "Instead of killing bacteria, can we disable resistance genes?"

# Questions:
/research-think questions \
  --context "Gap: CRISPR for bacterial gene editing unexplored" \
  --discipline natural-science

# Output:
# H1: CRISPR-Cas9 can selectively disable β-lactamase genes in E. coli
# H2: Disabled resistance genes will restore antibiotic susceptibility
# H3: Gene editing approach will outperform traditional antibiotics in vitro
```

### Social Science Example

```bash
# Topic: Educational inequality
/research-think topic \
  --topic "digital divide in online learning" \
  --discipline social-science \
  --output edu-ideas.md

# Output includes:
# - MDA: Scale (individual → institutional → societal)
# - CC: Connection to healthcare disparities (same structural causes)
# - PR: "What if we studied who succeeds online, not who fails?"

# Questions:
/research-think questions \
  --context "Gap: Resilience factors for low-income online learners" \
  --discipline social-science \
  --iterations 4

# Output (for Literature Review section):
# RQ1: What individual factors enable online learning success among low-income students?
# RQ2: How do family and community support structures moderate digital access effects?
# RQ3: What institutional policies reduce the digital divide's impact on learning outcomes?

# Methods:
/research-think methods \
  --problem "RQ1-RQ3 above" \
  --constraints "Limited budget, COVID restrictions" \
  --discipline social-science

# Output:
# Approach 1: Mixed-methods sequential design
#   - Phase 1: Surveys (n=500) - identify patterns
#   - Phase 2: Interviews (n=30) - understand mechanisms
#   - Phase 3: Regression + thematic analysis
# IS Score: 156 (highest - combines quant + qual strengths)
```

---

## Tips for Maximum Impact

### Tip 1: Start Broad, Then Narrow

```bash
# Week 1: Cast wide net
/research-think topic --topic "climate change" --output week1-ideas.md
# → 20 research directions

# Week 2: Select 3 most promising, go deeper
/research-think questions --context "direction 1" --output week2-rq1.md
/research-think questions --context "direction 2" --output week2-rq2.md
/research-think questions --context "direction 3" --output week2-rq3.md

# Week 3: Select best, design methods
/research-think methods --problem "best RQ" --output week3-methods.md

# Result: Systematic narrowing from 20 ideas → 1 solid research design
```

### Tip 2: Use Constraints Creatively

```bash
# Turn limitations into innovation opportunities
/research-think methods \
  --problem "measuring behavior change" \
  --constraints "No lab access, limited funding, pandemic restrictions" \
  --formula is

# IS Formula will generate:
# - Constraint Exploitation approach: "Use smartphone sensors for passive data collection"
# - This constraint forced innovation that might be better than lab studies!
```

### Tip 3: Iterate on Insights

```bash
# First pass: Quick ideation
/research-think questions --context "initial idea" --iterations 1 --output v1.md

# Second pass: Deeper refinement
/research-think questions --context "$(cat v1.md)" --iterations 3 --output v2.md

# Third pass: Final polish
/research-think questions --context "$(cat v2.md)" --iterations 5 --output final.md

# Each iteration compounds insights
```

### Tip 4: Combine with Literature Search

```bash
# Use thinking formulas to guide literature search
/research-think topic --topic "your domain" --formula cc --output connections.md

# Review connections.md for interdisciplinary links
# Search literature in connected fields
/paper-cite search --query "connection from connections.md" --source openalex

# Repeat: Formulas → Literature → Refined formulas → More literature
```

---

## Integration with Other Commands

### With /paper-write

```bash
# Thinking formulas enhance paper writing
/paper-write literature-review \
  --topic "research domain" \
  --citations \
  --discipline social-science \
  --thinking-mode genius  # ← Automatically applies GI + IA formulas

# --thinking-mode options:
# - genius: Applies GI + IA (for Literature Review, Research Questions)
# - innovative: Applies IS + CS (for Methods)
# - interpretive: Applies IL + MDA (for Discussion)
```

### With /paper-review

```bash
# After writing sections with thinking formulas, review checks:
/paper-review --focus all --output review.md

# Review checks for:
# - Research questions clearly derived from gaps (IA formula applied?)
# - Methods innovative yet feasible (IS formula scores?)
# - Discussion multi-dimensional (MDA coverage?)
```

### With ideation-to-paper workflow

```bash
# Full integration (see ideation-to-paper.md for complete workflow)
/research-think topic → /paper-cite search → /paper-write literature-review →
/research-think questions → /research-think methods → /paper-write methods →
[research] → /research-think interpret → /paper-write discussion
```

---

## Troubleshooting

### "Output is too abstract"

**Problem**: Thinking formulas generate high-level insights, not concrete designs

**Solution**:
```bash
# Add more iterations to ground insights
/research-think questions --context "gap" --iterations 5

# Use --constraints to force practicality
/research-think methods --problem "question" --constraints "realistic constraints"

# Follow up with literature validation
/paper-cite search --query "generated idea" --source research-lookup
```

### "Too many ideas, can't choose"

**Problem**: Formulas generate 20+ directions, decision paralysis

**Solution**:
```bash
# Use IS formula to rank by feasibility
/research-think methods \
  --problem "idea 1 vs idea 2 vs idea 3" \
  --formula is \
  --output comparison.md

# IS scores help prioritize:
# - Highest Novelty × Feasibility × Value / Risk wins
```

### "Insights don't match my field's norms"

**Problem**: Creative connections seem too unconventional

**Solution**:
```bash
# Use --discipline flag to ground in disciplinary norms
/research-think topic --topic "domain" --discipline natural-science

# Combine creative formulas (CC, PR) with grounding (IW)
/research-think methods --problem "question" --formula is,iw

# IW formula checks ethical/practical/disciplinary fit
```

---

## Advanced Usage

### Custom Formula Combinations

```bash
# Full formula suite for comprehensive analysis
/research-think topic \
  --topic "complex domain" \
  --formula mda,cc,pr,gi,te \
  --output comprehensive.md

# Outputs all 5 formula analyses + synthesis
```

### Batch Processing

```bash
# Process multiple research ideas in parallel
/research-think questions --context "idea 1" --output rq1.md &
/research-think questions --context "idea 2" --output rq2.md &
/research-think questions --context "idea 3" --output rq3.md &
wait

# Compare outputs
cat rq1.md rq2.md rq3.md > all-questions.md
```

### Integration with Version Control

```bash
# Track thinking evolution over time
git init research-ideas
cd research-ideas

# Week 1
/research-think topic --topic "domain" --output week1.md
git add week1.md && git commit -m "Initial ideation"

# Week 5
/research-think questions --context "refined gap" --output week5.md
git add week5.md && git commit -m "Refined research questions"

# Week 10
/research-think methods --problem "final RQ" --output week10.md
git add week10.md && git commit -m "Methodology design"

# View evolution
git log --oneline
```

---

## Related Commands

- `/paper-write` - Write paper sections (integrates thinking formulas via --thinking-mode)
- `/paper-cite` - Literature search (use formula outputs to guide queries)
- `/paper-review` - Quality review (validates formula application)
- `/paper-load` - Load existing research (assess with formulas)

---

## See Also

- `domains/academic-writing/skills/paper-writing/07.Academic Thinking.md` - Full formula documentation
- `domains/academic-writing/workflows/ideation-to-paper.md` - Complete research workflow
- `domains/academic-writing/workflows/5-step-paper/paper-quick-start.md` - Quick examples

---

**Last Updated**: 2025-12-29
**Version**: 1.0
**Status**: Active
