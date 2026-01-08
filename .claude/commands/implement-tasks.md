---
command: "/implement-tasks"
category: "Development"
purpose: "Implement tasks from task list one by one with strict approval protocol"
---

# Implement Tasks Step-by-Step

Reference: @3-step-AI-coding-workflow/task-list.mdc

## Purpose

Guide AI in implementing tasks from a task list file, following strict one-at-a-time protocol with user approval at each step.

## Usage

```bash
/implement-tasks @tasks/tasks-prd-[feature-name].md
```

**Examples**:
- `/implement-tasks @tasks/tasks-prd-user-profile-editing.md`
- `/implement-tasks @tasks/tasks-prd-data-export.md`

## Task Implementation Protocol

### Core Rules

1. **One sub-task at a time**: Do NOT start next subtask until user gives permission
2. **Completion protocol**:
   - When you finish a **subtask**, immediately mark it as `[x]`
   - If **all** subtasks under a parent are `[x]`, also mark **parent task** as `[x]`
3. **Stop after each subtask**: Wait for user's go-ahead ("yes", "y", or "go")

### Workflow

#### Before Starting Work
1. Read the task list file
2. Identify the next unmarked sub-task `[ ]`
3. Announce which sub-task you're about to implement

#### During Implementation
1. Implement ONLY the current sub-task
2. Write code, create/modify files as needed
3. Follow TDD principles if applicable
4. Run tests if applicable

#### After Completing Sub-Task
1. **Immediately update task list file**:
   - Mark completed sub-task as `[x]`
   - If all sub-tasks under parent complete, mark parent as `[x]`
2. **Update "Relevant Files" section**:
   - Add any new files created
   - Update descriptions if needed
3. **Pause and wait**: Ask user for approval to continue
4. **User must respond** with "yes", "y", or "go" before proceeding

## Task List Maintenance

### Update as You Work
- Mark tasks/subtasks as completed `[x]` per protocol above
- Add new tasks as they emerge during implementation
- Keep task list file synchronized with actual progress

### Maintain "Relevant Files" Section
- List every file created or modified
- Give each file a one-line description of its purpose
- Update descriptions as implementation evolves

## AI Instructions

When working with task lists, the AI must:

1. **Regularly update the task list file** after finishing any significant work
2. **Follow completion protocol**:
   - Mark each finished **sub-task** `[x]`
   - Mark **parent task** `[x]` once **all** its subtasks are `[x]`
3. **Add newly discovered tasks** if implementation reveals additional work
4. **Keep "Relevant Files" accurate and up to date**
5. **Before starting work**: Check which sub-task is next
6. **After implementing sub-task**: Update file, then **pause for user approval**

## Example Interaction

```
AI: I'm about to implement sub-task 1.1: "Create user profile component"
AI: [implements the code]
AI: [updates task list, marks 1.1 as [x]]
AI: Sub-task 1.1 completed. Ready to proceed to sub-task 1.2? (yes/y/go)

User: yes

AI: I'm about to implement sub-task 1.2: "Add form validation"
AI: [implements the code]
...
```

## Integration with TDD

If the project follows TDD (like this one):
- Each sub-task may involve: write test → implement code → refactor
- Still pause after completing the entire sub-task
- Run all tests before marking sub-task complete

## Auto-Activations

- Persona: Based on task domain (frontend, backend, qa, etc.)
- MCP: `--seq` (systematic implementation)
- Flags: `--think` (for complex tasks)

## Important Reminders

- **NEVER skip ahead**: One sub-task at a time
- **ALWAYS update task list**: Immediately after completion
- **ALWAYS wait for approval**: Before starting next sub-task
- **MAINTAIN context**: Keep task list and Relevant Files synchronized
