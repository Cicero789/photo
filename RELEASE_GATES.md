# FrameNest Release Gates

All gates must pass before any production deployment.

## Build & Lint
```bash
npm run build          # TypeScript strict compilation (tsc -b + tsc -p functions)
npm run lint           # ESLint including @typescript-eslint/no-floating-promises
```

## Tests
```bash
npm test               # All vitest tests must pass
```

### Test Coverage
- `tests/auth-policy.test.ts` — Authorization policy matrix (visibility × role × operation)
- `tests/signed-url.test.ts` — Signed media URL generation and verification
- `tests/upload-adversarial.test.ts` — File content inspection (rejects HTML/SVG/polyglot)
- `tests/stripe-webhook.test.ts` — Webhook idempotency + signature validation
- `tests/validation.test.ts` — Input validation patterns (email, slug, rating, coords, categories)

## Database Integrity
```bash
# Fresh migration test (from empty DB)
npx wrangler d1 execute photo-db --local --file=./db/schema.sql

# Foreign key check
npx wrangler d1 execute photo-db --remote --command="PRAGMA foreign_key_check"
# Must return 0 rows (no violations)

# Previous-version upgrade test
# 1. Export current remote DB
# 2. Import into local
# 3. Apply schema.sql
# 4. Verify all routes work
```

## Security Checks
- [ ] Gate token cannot fetch a private event by direct ID
- [ ] User from another space cannot list or fetch gate events
- [ ] Raw R2 storage key is insufficient to fetch private media (signed URL required)
- [ ] Expired/revoked media links stop working
- [ ] Renamed HTML/SVG/polyglot uploads are rejected
- [ ] Gate viewer cannot create invitations, reviews, purchases
- [ ] Buying a subscription never changes identity verification
- [ ] Fresh D1 database supports every current route after migrations
- [ ] Demo event page renders with zero photos and zero videos

## Bundle Budget
```
Main JS chunk:       < 550 KB (currently ~500 KB)
PhotoEditor chunk:   < 1000 KB (lazy-loaded, acceptable)
CSS:                 < 70 KB
Total first-load:    < 620 KB
```

## Mobile & Accessibility
- [ ] All primary routes render correctly at 320px width
- [ ] No horizontal scroll on mobile
- [ ] All interactive elements are keyboard-accessible
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Images have alt text
- [ ] Forms have labels

## Deployment
```bash
npm run build
npm test
npm run deploy         # wrangler pages deploy ./dist --project-name photo
```

## Rollback Procedure
If a deployment causes issues:

1. **Immediate**: Revert via Cloudflare Dashboard
   - Pages > photo > Deployments > find previous working deployment > "Rollback to this deployment"
   - Takes effect in < 60 seconds

2. **Code rollback**:
   ```bash
   git log --oneline -10          # Find the last good commit
   git revert HEAD                # Revert the bad commit
   npm run build && npm run deploy
   ```

3. **Database rollback**:
   - D1 has automatic backups (30-day retention)
   - Cloudflare Dashboard > D1 > photo-db > Backups > Restore
   - ⚠️ This is destructive — restores entire DB to the backup point

4. **Secret rotation**:
   ```bash
   npx wrangler pages secret put STRIPE_SECRET_KEY --project-name photo
   npx wrangler pages secret put STRIPE_WEBHOOK_SECRET --project-name photo
   npx wrangler pages secret put JWT_SECRET --project-name photo
   ```

## Post-Deployment Smoke Test
After every deployment, verify:
```
GET  /                          → 200 (homepage)
GET  /s/demo                    → 200 (demo space)
GET  /inspiration               → 200 (map loads, pins visible)
GET  /photographers             → 200 (listing loads)
GET  /login                     → 200
GET  /album/{any-invalid-token} → 404
POST /api/auth/login            → 401 (without credentials)
GET  /api/health                → 200 (with auth)
```

## Dependency Audit
```bash
npm audit --production    # Must have 0 high/critical vulnerabilities
```
