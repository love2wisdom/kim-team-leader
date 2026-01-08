---
command: "/prd"
category: "Planning"
purpose: "Generate Product Requirements Document (PRD)"
---

# Create Product Requirements Document

Reference: @3-step-AI-coding-workflow/create-prd.mdc

## Purpose

Guide AI in creating a detailed Product Requirements Document (PRD) based on user's initial feature request. The PRD should be clear, actionable, and suitable for a junior developer to understand and implement.

## Usage

```bash
/prd [feature-description]
```

**Examples**:
- `/prd user profile editing feature`
- `/prd data export functionality`
- `/prd authentication system`

## Process

1. **Receive Initial Prompt**: User provides brief feature description
2. **Ask Clarifying Questions**:
   - Use numbered format with nested sub-questions (e.g., 1, 2, 2.1, 2.2, 3)
   - One atomic question per list item
   - Cover: Problem/Goal, Target User, Core Functionality, User Stories, Acceptance Criteria, Scope/Boundaries, Data, Design/UI, Edge Cases
3. **Generate PRD**: Based on answers, create comprehensive PRD
4. **Save PRD**: Save as `tasks/prd-[feature-name].md`

## PRD Structure

Generated PRD must include:

1. **Introduction/Overview**: Feature description and problem it solves
2. **Goals**: Specific, measurable objectives
3. **User Stories**: User narratives describing usage and benefits
4. **Functional Requirements**: Specific functionalities (numbered, clear language)
5. **Non-Goals (Out of Scope)**: What feature will NOT include
6. **Design Considerations** (Optional): UI/UX requirements, mockups, components
7. **Technical Considerations** (Optional): Constraints, dependencies, integrations
8. **Success Metrics**: How success will be measured
9. **Open Questions**: Remaining clarifications needed

## Target Audience

Primary reader: **Junior Developer**
- Requirements should be explicit and unambiguous
- Avoid jargon where possible
- Provide enough detail for understanding purpose and core logic

## Final Instructions

1. **Do NOT start implementing the PRD**
2. **Make sure to ask clarifying questions first**
3. **Take user's answers and improve the PRD**
4. **Save to tasks/ directory**

## Auto-Activations

- Persona: `--persona-scribe` (professional writing)
- Persona: `--persona-mentor` (clear explanations for junior devs)
