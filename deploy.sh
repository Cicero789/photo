#!/bin/bash
# Photo App — Cloudflare Deployment
# Project already created: photo-ll2.pages.dev
# Project ID: 87e102fe-e807-40f2-8e58-05b7439c1e35

set -e
echo "📸 Photo App Deployment"
echo "========================"
echo ""

# Step 1: Login (opens browser — required once)
echo "1️⃣ Logging into Cloudflare..."
npx wrangler login
echo ""

# Step 2: Create D1 database
echo "2️⃣ Creating D1 database..."
npx wrangler d1 create photo-db
echo ""

# Step 3: Get the D1 database ID from the output above and update wrangler.toml
echo "3️⃣ Copy the database_id from the output above"
echo "   Update wrangler.toml: database_id = \"paste-here\""
read -p "   Press enter after updating wrangler.toml..."
echo ""

# Step 4: Create R2 buckets
echo "4️⃣ Creating R2 buckets..."
npx wrangler r2 bucket create photo-uploads
npx wrangler r2 bucket create video-uploads
echo ""

# Step 5: Run schema
echo "5️⃣ Setting up database schema..."
npx wrangler d1 execute photo-db --file=./db/schema.sql
echo ""

# Step 6: Set secrets
echo "6️⃣ Setting secrets..."
npx wrangler pages secret put JWT_SECRET --project-name photo
npx wrangler pages secret put DEEPSEEK_API_KEY --project-name photo
npx wrangler pages secret put RESEND_API_KEY --project-name photo
# Optional — only after verifying your domain in Resend:
# npx wrangler pages secret put EMAIL_FROM --project-name photo
echo ""

# Step 7: Build and deploy
echo "7️⃣ Building and deploying..."
npm run build
npx wrangler pages deploy ./dist --project-name photo
echo ""

echo "✅ Done! Your site: https://photo-ll2.pages.dev"
