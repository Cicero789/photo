# Candle Vision

Public site: `/candle-vision`. Studio: `/candle-vision/admin`.

The studio uses the existing FrameNest login and requires `platform_owner`, so other photographers on the platform cannot change this website. The existing platform homepage and other photographer sites remain available.

## Photographer workflow

1. Open Photographer login on the website and sign in with the existing owner account.
2. In Website, choose Warm ivory & sage (recommended), Coastal linen & blue, or Soft rose & charcoal. Edit the copy, public email, session descriptions and rates, then save.
3. In Portfolio, upload JPEG, PNG or WebP files up to 20 MB, and edit each title, description and category. These photographs are public. The illustrative Unsplash mood-board images disappear after the first real upload.
4. In Client galleries, create an album, optionally add a password, upload the customer's photos, and copy the unique link. The final part of that link is also their gallery key. Keep this link private.
5. Customers choose photographs and one or more products per photograph, specify quantities and send a request. The Inbox stores inquiries and selections. Refresh it to check for new requests.
6. Reply to the customer to confirm pricing, cropping, payment and fulfillment. The site does not automatically charge customers, email notifications, or place print-lab orders.

Customer originals are stored in the existing private R2 bucket. Their viewer receives signed media links lasting up to one hour after successful gallery access. Public portfolio photos have their own `studio/` namespace. D1 stores metadata, editable content, inquiries and selections. No customer album photos are added to the public portfolio automatically.

## Deployment

Apply the additive `db/migrations/007_candle_vision.sql` migration to `photo-db` before deploying the application. Back up D1 first. The existing `DB`, `PHOTOS`, `JWT_SECRET` and `MEDIA_SIGNING_SECRET` bindings/secrets are reused. Do not apply the entire legacy schema to an existing database as a migration.

Run `npm run build` and `npm test`. The new `tests/studio.test.ts` exercises real endpoint handlers for authentication, role enforcement, invalid/expired gallery keys, passwords, cross-album selections, and valid persistence. The existing template registry has three unrelated failing tests on the starting revision.

Use the repository's feature-branch/PR workflow, then deploy with Wrangler to the existing `photo` Pages project. Never commit `.env`, backups or local QA records.
