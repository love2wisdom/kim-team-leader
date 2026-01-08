---
command: "/tasks"
category: "Planning"
purpose: "Generate task list from PRD"
---

# Generate Task List from PRD

Reference: @3-step-AI-coding-workflow/generate-tasks.mdc

## Purpose

Guide AI in creating a detailed, step-by-step task list based on an existing Product Requirements Document (PRD). The task list should be suitable for a developer to follow for implementation.

## Usage

```bash
/tasks @tasks/prd-[feature-name].md
```

**Examples**:
- `/tasks @tasks/prd-user-profile-editing.md`
- `/tasks @tasks/prd-data-export.md`

## Process

### Phase 1: Generate Parent Tasks

1. **Receive PRD Reference**: User points to specific PRD file
2. **Analyze PRD**: Read functional requirements, user stories, and other sections
3. **Generate Parent Tasks**: Create 3-5 main, high-level tasks
4. **Present to User**: Show parent tasks without sub-tasks
5. **Wait for Confirmation**: Say "Ready to generate sub-tasks? Respond with 'Go' to proceed."
6. **Pause**: Wait for user to respond with "Go"

### Phase 2: Generate Sub-Tasks

7. **Break Down Tasks**: Create smaller, actionable sub-tasks for each parent
8. **Identify Relevant Files**: List files to be created/modified with descriptions
9. **Generate Final Output**: Combine parent tasks, sub-tasks, and relevant files
10. **Save Task List**: Save as `tasks/tasks-[prd-file-name].md`

## Output Format

```markdown
### Relevant Files

- `path/to/potential/file.ts` - Brief description (e.g., Contains main component)
- `path/to/another/file.tsx` - Brief description (e.g., API route handler)
- `lib/utils/helpers.ts` - Brief description (e.g., Utility functions)

## Tasks

- [ ] 1.0 Parent Task Title
    - [ ] 1.1 Sub-task description
    - [ ] 1.2 Sub-task description
- [ ] 2.0 Parent Task Title
    - [ ] 2.1 Sub-task description
    - [ ] 2.2 Sub-task description
    - [ ] 2.3 Sub-task description
- [ ] 3.0 Parent Task Title (may not have sub-tasks if simple enough)
```

## Interaction Model

**Two-Phase Approach**:
1. Generate parent tasks → present → wait
2. User confirms "Go" → generate sub-tasks → save

This ensures high-level plan aligns with user expectations before diving into details.

## Target Audience

Primary reader: **Developer** who will implement the feature

## File Naming

- Input: `prd-user-profile-editing.md`
- Output: `tasks-prd-user-profile-editing.md`

## Auto-Activations

- Persona: `--persona-architect` (high-level task planning)
- Persona: `--persona-qa` (ensure testability)
- MCP: `--seq` (systematic task breakdown)
