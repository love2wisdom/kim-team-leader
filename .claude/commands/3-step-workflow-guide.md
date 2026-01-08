# 3-Step AI Coding Workflow - Quick Reference

Reference: @3-step-AI-coding-workflow/

---

## 🎯 Workflow Overview

```
Step 1: PRD         Step 2: Tasks       Step 3: Implement
   ↓                    ↓                     ↓
Questions  →  PRD  →  Parent  →  Go  →  Sub-tasks  →  One-by-one  →  Done
```

---

## 📝 Step 1: Create PRD

### Command
```bash
/prd [feature-description]
```

### Process
1. **AI asks clarifying questions** (numbered format)
2. **You answer** all questions
3. **AI generates PRD** with all sections
4. **AI saves** to `tasks/prd-[feature-name].md`

### Example
```bash
User: /prd user profile editing feature

AI: I'll help create a PRD for user profile editing. Let me ask some clarifying questions:

1. What information can users edit in their profile?
2. Who can edit profiles?
    2.1. Can users edit only their own profiles?
    2.2. Can admins edit any profile?
3. What validation rules should apply?
...

[After answers]

AI: PRD generated and saved to tasks/prd-user-profile-editing.md
```

### PRD Structure
- Introduction/Overview
- Goals
- User Stories
- Functional Requirements
- Non-Goals (Out of Scope)
- Design Considerations
- Technical Considerations
- Success Metrics
- Open Questions

---

## 📋 Step 2: Generate Tasks

### Command
```bash
/tasks @tasks/prd-[feature-name].md
```

### Process
1. **AI analyzes PRD**
2. **AI generates 3-5 parent tasks**
3. **AI asks**: "Ready to generate sub-tasks? Respond with 'Go' to proceed."
4. **You respond**: "Go"
5. **AI generates sub-tasks**
6. **AI saves** to `tasks/tasks-prd-[feature-name].md`

### Example
```bash
User: /tasks @tasks/prd-user-profile-editing.md

AI: Based on the PRD, here are the parent tasks:

## Tasks
- [ ] 1.0 Create profile editing UI components
- [ ] 2.0 Implement backend API endpoints
- [ ] 3.0 Add validation and error handling
- [ ] 4.0 Write tests and documentation

Ready to generate sub-tasks? Respond with 'Go' to proceed.

User: Go

AI: Generating sub-tasks...

- [ ] 1.0 Create profile editing UI components
    - [ ] 1.1 Create ProfileEditForm component
    - [ ] 1.2 Add form fields (name, email, bio)
    - [ ] 1.3 Implement form state management
- [ ] 2.0 Implement backend API endpoints
    - [ ] 2.1 Create PUT /api/profile endpoint
    - [ ] 2.2 Add authentication middleware
...

Saved to tasks/tasks-prd-user-profile-editing.md
```

### Task List Structure
```markdown
### Relevant Files
- `components/ProfileEditForm.tsx` - Main profile editing component
- `api/profile.ts` - Profile API endpoints

## Tasks
- [ ] 1.0 Parent Task
    - [ ] 1.1 Sub-task
    - [ ] 1.2 Sub-task
```

---

## 💻 Step 3: Implement Tasks

### Command
```bash
/implement-tasks @tasks/tasks-[file].md
```

### Process
1. **AI reads next unmarked sub-task** `[ ]`
2. **AI announces**: "I'm about to implement sub-task X.X"
3. **AI implements** the sub-task
4. **AI updates task list**: Marks `[x]` and updates Relevant Files
5. **AI waits**: "Sub-task X.X completed. Ready to proceed? (yes/y/go)"
6. **You respond**: "yes", "y", or "go"
7. **Repeat** for all sub-tasks

### Example
```bash
User: /implement-tasks @tasks/tasks-prd-user-profile-editing.md

AI: I'm about to implement sub-task 1.1: "Create ProfileEditForm component"

AI: [creates component file, writes code]

AI: [updates task list]
- [x] 1.1 Create ProfileEditForm component

AI: [updates Relevant Files]
- `components/ProfileEditForm.tsx` - Profile editing form component with validation

AI: Sub-task 1.1 completed. Ready to proceed to sub-task 1.2? (yes/y/go)

User: yes

AI: I'm about to implement sub-task 1.2: "Add form fields (name, email, bio)"
...
```

### Approval Keywords
- `yes` ✅
- `y` ✅
- `go` ✅
- Any other response → AI waits for valid approval

---

## 🔄 Integration with TDD

When working on TDD projects (like this one), each sub-task may include:

```
Sub-task 1.1: Add user validation
  1. Write failing test for validation
  2. Implement validation to pass test
  3. Refactor if needed
  → Mark [x] when all 3 steps complete
```

The `/implement-tasks` workflow respects TDD:
- Each sub-task = Red → Green → Refactor cycle
- Pause after complete cycle (not between steps)
- Run all tests before marking `[x]`

---

## 📊 Complete Example Workflow

### Scenario: Adding Email Verification Feature

```bash
# Step 1: Create PRD
User: /prd email verification feature

AI: [asks clarifying questions about verification flow, email templates, etc.]
User: [answers questions]
AI: PRD saved to tasks/prd-email-verification.md

# Step 2: Generate Tasks
User: /tasks @tasks/prd-email-verification.md

AI: [generates 4 parent tasks]
AI: Ready to generate sub-tasks? Respond with 'Go' to proceed.

User: Go

AI: [generates 12 sub-tasks across 4 parent tasks]
AI: Saved to tasks/tasks-prd-email-verification.md

# Step 3: Implement Tasks
User: /implement-tasks @tasks/tasks-prd-email-verification.md

AI: Implementing sub-task 1.1: "Create verification token model"
AI: [implements code]
AI: Sub-task 1.1 completed. Ready to proceed? (yes/y/go)

User: yes

AI: Implementing sub-task 1.2: "Add token generation logic"
AI: [implements code]
AI: Sub-task 1.2 completed. Ready to proceed? (yes/y/go)

User: yes

# ... continues through all 12 sub-tasks ...

AI: All tasks completed! 🎉
- [x] 1.0 Create backend verification system (all sub-tasks complete)
- [x] 2.0 Build email templates (all sub-tasks complete)
- [x] 3.0 Add frontend UI (all sub-tasks complete)
- [x] 4.0 Write tests and docs (all sub-tasks complete)
```

---

## 🎯 When to Use 3-Step Workflow

### ✅ Use When:
- Starting new feature development
- Feature has unclear requirements
- Need systematic breakdown
- Working with junior developers (clear documentation)
- Want to maintain implementation history
- Planning complex features

### ❌ Don't Use When:
- Quick bug fixes
- Simple one-file changes
- Following existing plan.md for TDD
- Urgent hotfixes
- Exploratory coding

---

## 💡 Pro Tips

### 1. Detailed PRD = Better Tasks
More detail in PRD → Better task breakdown → Easier implementation

### 2. Review Before "Go"
Always review parent tasks before confirming "Go" for sub-tasks

### 3. One Sub-Task = One Logical Unit
Each sub-task should be independently testable and completable

### 4. Update Relevant Files
Keep "Relevant Files" section accurate for future reference

### 5. Pause When Stuck
If implementation is unclear, pause and refine the task breakdown

### 6. Combine with Git
After each parent task completion:
```bash
/git --operation commit --message "Complete parent task X.0"
```

---

## 🔄 Comparison: 3-Step vs TDD

### 3-Step Workflow (New Features)
```
PRD → Tasks → Implement (step-by-step)
- For: New features with requirements gathering
- Artifact: PRD + Task list + Code
- Control: User approval at each sub-task
```

### TDD Workflow (Existing Features)
```
plan.md → Test → Code → Refactor
- For: Implementing known requirements
- Artifact: Tests + Code
- Control: Red-Green-Refactor discipline
```

### Both Together (Recommended!)
```
1. Use 3-Step for PLANNING new feature
2. Use TDD for IMPLEMENTING each sub-task
3. Result: Comprehensive planning + disciplined execution
```

---

## 📚 Command Reference

| Command | Purpose | Input | Output |
|---------|---------|-------|--------|
| `/prd [feature]` | Create PRD | Feature description | `tasks/prd-[name].md` |
| `/tasks @prd-file` | Generate tasks | PRD file | `tasks/tasks-[name].md` |
| `/implement-tasks @task-file` | Implement | Task file | Code + Updated task list |

---

## 🆘 Troubleshooting

### "AI didn't save the PRD"
- Check `tasks/` directory exists
- Verify feature name is valid for filename

### "AI skipped waiting for approval"
- Remind: "Wait for my approval after each sub-task"
- Check CLAUDE.md integration

### "Tasks too granular / too broad"
- Adjust during parent task review
- Ask AI to regenerate before "Go"

### "Implementation doesn't match PRD"
- Review PRD clarity
- Ask AI to reference specific PRD section
- Update PRD and regenerate tasks

---

## 🎓 Learning Resources

- **PRD Guidelines**: @3-step-AI-coding-workflow/create-prd.mdc
- **Task Generation**: @3-step-AI-coding-workflow/generate-tasks.mdc
- **Implementation Protocol**: @3-step-AI-coding-workflow/task-list.mdc
- **Command Reference**: .claude/commands/README.md

---

**Ready to start? Try it now!**

```bash
/prd "your feature idea"
```
