You are an expert security and quality auditor. Perform a comprehensive audit of the FrameNest v2 codebase and produce a structured audit report as a `.txt` file.

## What to Read First

Read these two files in order — they contain everything you need to know:
1. `C:\Users\shant\framenest-v2\docs\ARCHITECTURE.md` — system architecture, current state, naming conventions
2. `C:\Users\shant\framenest-v2\docs\AUDIT-GUIDE.md` — known issues, what to check, audit template

## What to Audit

### 1. Deployed Site (https://framenest.photos)
Test every API endpoint listed in ARCHITECTURE.md. For each one, record:
- Does it return the expected response?
- Does it enforce authentication where required?
- Does it leak sensitive data (password_hash, internal IDs)?
- Does it handle invalid input gracefully?

Key tests:
```
# Auth flow
curl -X POST https://framenest.photos/api/auth/signup -H 'Content-Type: application/json' -d '{"name":"Audit","email":"audit@test.com","password":"audit1234","spaceName":"Audit","spaceSlug":"audit-test","gateKey":"audit1234"}'
curl -X POST https://framenest.photos/api/auth/login -H 'Content-Type: application/json' -d '{"email":"audit@test.com","password":"audit1234"}'

# Security: access private event without auth
curl https://framenest.photos/api/events/ANY_EVENT_ID

# Security: access media without signed URL
curl -sI "https://framenest.photos/api/media/photos/events/{eventId}/{photoId}.jpg"

# Health
curl https://framenest.photos/api/health
```

### 2. Source Code (C:\Users\shant\framenest-v2)
Check every file in these directories:
- `packages/backend/src/routes/` — all route handlers
- `packages/backend/src/middleware/` — auth, CORS, security headers, rate limiting
- `packages/backend/src/services/` — business logic
- `packages/backend/src/repos/` — database access
- `packages/frontend/src/pages/` — all page components
- `packages/shared/src/` — types, validation, constants

For each file, check:
- Is authentication enforced on protected endpoints?
- Are there any hardcoded secrets, tokens, or URLs?
- Is error handling present (try/catch)?
- Are there any `as any` casts or type safety escapes?
- Do SQL queries use parameterized binds (not string interpolation)?
- Do soft-deletable queries include `deleted_at IS NULL`?

### 3. Compare Against v1 (C:\Users\shant\photo)
The v1 codebase is the reference implementation. For every `.ts` file in:
- `C:\Users\shant\photo\functions\api\` — list all endpoints
- `C:\Users\shant\photo\src\pages\` — list all pages
- `C:\Users\shant\photo\src\components\` — list all components

Check which ones are MISSING from v2. List every gap.

### 4. Verify These Claims
ARCHITECTURE.md Section E lists 13 things v2 "fixed." Verify each one is actually true:
- `framenest:auth:token` not `photo_token` in localStorage
- `/admin/*` not `/citysite/*`
- `professionals` table not `photographers`
- `template_config` column not `gallery_config`
- `love_count` column not `loves`
- No `events.public` boolean column
- All foreign keys declared (check schema.sql)
- Atomic rate limiting (UPSERT, not read-count-write)
- Structured AppError with codes (not ad-hoc strings)
- Prefixed IDs (usr_, evt_, spc_, etc.)
- Template renderer + registry (not 323 individual files)
- BaseRepo.active() auto soft-delete filter
- No password_hash in login response

### 5. Find New Issues
Look for anything NOT mentioned in AUDIT-GUIDE.md:
- SQL injection vectors
- XSS vulnerabilities
- Missing input validation
- Race conditions
- Incomplete features that should work
- Broken UI flows
- Performance issues (N+1 queries, missing indexes)
- Incorrect business logic

## Output Format

Produce a file at `C:\Users\shant\framenest-v2\docs\AUDIT-REPORT.txt` with this exact structure:

```
================================================================================
FRAMENEST V2 AUDIT REPORT
================================================================================
Date: [today]
Auditor: [your name]
Codebase: C:\Users\shant\framenest-v2
Deployment: https://framenest.photos
Reference v1: C:\Users\shant\photo

================================================================================
1. EXECUTIVE SUMMARY
================================================================================
Overall health: [CRITICAL / NEEDS WORK / STABLE / EXCELLENT]
Critical issues: [count]
High issues: [count]
Medium issues: [count]
Low issues: [count]
API endpoints deployed: [count] / 103
Pages functional: [count] / 30
Tests passing: [count]

================================================================================
2. CRITICAL SECURITY ISSUES
================================================================================
[For each issue, include: SEVERITY, file path, line number, description,
 steps to reproduce, impact, and recommended fix. List HIGH first, then MEDIUM.]

================================================================================
3. MISSING API ENDPOINTS
================================================================================
[Group by subsystem. For each: v1 source file, endpoint path, HTTP method,
 priority (P1=critical, P2=important, P3=needed, P4=nice-to-have)]

================================================================================
4. FRONTEND GAPS
================================================================================
4A. Stub Pages (render only a title, no functionality)
4B. Missing Components (exist in v1, absent from v2)
4C. Missing Library Files

================================================================================
5. CODE QUALITY ISSUES
================================================================================
5A. Type Safety (as any casts, unknown types, missing types)
5B. Naming Inconsistencies (old names still in use)
5C. Hardcoded Values (URLs, colors, secrets)
5D. Design Smells (anti-patterns, tech debt)
5E. Missing Error Handling

================================================================================
6. VERIFIED FIXES (from v1 claims)
================================================================================
[Check each of the 13 claims. Mark CONFIRMED or REFUTED with evidence.]

================================================================================
7. NEW ISSUES FOUND
================================================================================
[Anything not documented in AUDIT-GUIDE.md]

================================================================================
8. PRIORITIZED RECOMMENDATIONS
================================================================================
[What to fix first, second, third. Include estimated effort.]

P1 (fix immediately — security/data loss):
  1. ...
  2. ...

P2 (fix this week — missing core features):
  1. ...
  2. ...

P3 (fix this month — quality improvements):
  1. ...
  2. ...

P4 (fix when possible — polish):
  1. ...
  2. ...
```

## Rules

1. Be exhaustive — check every file, test every endpoint
2. Cite exact file paths and line numbers for every issue
3. Provide reproduction steps for every bug
4. Recommend specific fixes, not vague suggestions
5. Mark severity honestly — don't inflate or minimize
6. If you're unsure about something, mark it as NEEDS VERIFICATION
7. Cross-reference v1 for every missing feature claim
8. Test on the live deployment at framenest.photos, not just local code
