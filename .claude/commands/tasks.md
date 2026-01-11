---
command: "/tasks"
category: "Planning"
purpose: "Generate stack-aware task list from PRD"
---

# Generate Task List from PRD

Reference: @3-step-AI-coding-workflow/generate-tasks.mdc

## Purpose

Guide AI in creating a detailed, step-by-step task list based on an existing Product Requirements Document (PRD). The task list should be suitable for a developer to follow for implementation, with stack-specific considerations.

## Usage

```bash
/tasks @tasks/prd-[feature-name].md
```

**Examples**:
- `/tasks @tasks/prd-user-profile-editing.md`
- `/tasks @tasks/prd-data-export.md`

## Process

### Phase 1: Analyze PRD and Stack

1. **Receive PRD Reference**: User points to specific PRD file
2. **Identify Development Stack**: Read the "Development Stack" section from PRD
   - If not specified, assume Rails 8 (default)
3. **Load Stack Configuration**: Reference `@dev-stacks/[stack-id].md` for stack-specific patterns
4. **Analyze PRD**: Read functional requirements, user stories, and other sections
5. **Generate Parent Tasks**: Create 3-5 main, high-level tasks
6. **Present to User**: Show parent tasks without sub-tasks
7. **Wait for Confirmation**: Say "Ready to generate sub-tasks? Respond with 'Go' to proceed."
8. **Pause**: Wait for user to respond with "Go"

### Phase 2: Generate Sub-Tasks

9. **Break Down Tasks**: Create smaller, actionable sub-tasks for each parent
10. **Apply Stack Patterns**: Use stack-specific patterns and conventions
11. **Identify Relevant Files**: List files to be created/modified with stack-specific paths
12. **Generate Final Output**: Combine parent tasks, sub-tasks, and relevant files
13. **Save Task List**: Save as `tasks/tasks-[prd-file-name].md`
14. **Generate Ralph Task** (Optional): Save as `tasks/ralph-[prd-file-name].md`

## Stack-Specific Task Patterns

### Rails 8 (`rails8`)

**File Patterns**:
```
app/
├── controllers/[resource]_controller.rb
├── models/[resource].rb
├── views/[resource]/
├── jobs/[job_name]_job.rb      # Solid Queue
├── channels/[channel]_channel.rb  # Solid Cable
└── javascript/controllers/      # Stimulus
```

**Task Categories**:
- Model + Migration 생성
- Controller + Routes 설정
- Hotwire Views (Turbo Frames/Streams)
- Stimulus Controllers
- Solid Queue Jobs
- Active Storage 설정

### Next.js (`nextjs`)

**File Patterns**:
```
app/
├── (routes)/[page]/page.tsx
├── api/[route]/route.ts
├── components/
└── lib/
prisma/
└── schema.prisma
```

**Task Categories**:
- Prisma Schema + Migration
- API Routes / Server Actions
- Server Components
- Client Components
- Auth Setup (NextAuth)

### Django (`django`)

**File Patterns**:
```
apps/[app_name]/
├── models.py
├── views.py
├── urls.py
├── serializers.py    # DRF
├── admin.py
└── tasks.py          # Celery
templates/
```

**Task Categories**:
- Model + Migration
- Views (CBV/FBV)
- Django Admin 설정
- DRF Serializers/ViewSets
- Celery Tasks
- HTMX Templates

### Laravel (`laravel`)

**File Patterns**:
```
app/
├── Http/Controllers/
├── Models/
├── Jobs/
├── Livewire/
└── Events/
resources/views/
database/migrations/
```

**Task Categories**:
- Model + Migration
- Controller + Routes
- Livewire Components
- Laravel Queue Jobs
- Blade/Livewire Views

## Output Format

```markdown
# Task List: [Feature Name]

## Stack: [Stack ID]

Reference PRD: `tasks/prd-[feature].md`

### Relevant Files

- `path/to/file.ext` - Description (stack-specific path)
- ...

## Tasks

- [ ] 1.0 Parent Task Title
    - [ ] 1.1 Sub-task description
    - [ ] 1.2 Sub-task description
- [ ] 2.0 Parent Task Title
    - [ ] 2.1 Sub-task description
    - [ ] 2.2 Sub-task description
- [ ] 3.0 Parent Task Title

## Stack-Specific Notes

[Any stack-specific implementation notes]
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
- Ralph: `ralph-prd-user-profile-editing.md` (optional)

## Auto-Activations

- Persona: `--persona-architect` (high-level task planning)
- Persona: `--persona-qa` (ensure testability)
- MCP: `--seq` (systematic task breakdown)
