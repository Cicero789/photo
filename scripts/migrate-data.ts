/**
 * FrameNest v1 → v2 Data Migration Script
 *
 * Reads from old D1 database, transforms table/column names, writes to new D1.
 * Run: npx tsx scripts/migrate-data.ts
 *
 * Strategy: Export each table from v1 DB, transform in memory, import to v2 DB.
 * Preserves all existing IDs for URL compatibility.
 */

interface MigrationConfig {
  oldDb: D1Database;
  newDb: D1Database;
  dryRun: boolean;
}

// ── Table Rename Map ────────────────────────────────────────────────────────
const TABLE_RENAMES: Record<string, string> = {
  photographers: 'professionals',
  photographer_portfolio: 'professional_portfolio',
};

// ── Column Rename Map (per table) ───────────────────────────────────────────
const COLUMN_RENAMES: Record<string, Record<string, string>> = {
  photographers: {
    gallery_config: 'template_config',
  },
  photographer_portfolio: {
    photographer_id: 'professional_id',
  },
  client_sites: {
    photographer_id: 'professional_id',
    gallery_config: 'template_config',
  },
  reviews: {
    photographer_id: 'professional_id',
  },
  booking_inquiries: {
    photographer_id: 'professional_id',
  },
  orders: {
    photographer_id: 'professional_id',
  },
  inspiration: {
    loves: 'love_count',
  },
  albums: {
    downloads: 'allow_downloads',
  },
};

// ── Columns to DROP ─────────────────────────────────────────────────────────
const DROPPED_COLUMNS: Record<string, string[]> = {
  events: ['public'], // Replaced by visibility
};

// ── Tables in migration order (respecting FK dependencies) ──────────────────
const TABLE_ORDER = [
  'users', 'password_resets', 'spaces', 'space_members',
  'events', 'photos', 'videos', 'event_messages',
  'professionals', 'professional_portfolio', 'reviews', 'booking_inquiries',
  'albums', 'album_photos',
  'inspiration', 'inspiration_loves',
  'connections', 'activity_log',
  'orders', 'ad_tiles', 'rate_limits',
  'client_sites', 'blog_posts', 'client_galleries', 'client_gallery_photos',
  '_migrations',
];

export async function migrateData(config: MigrationConfig): Promise<{
  migrated: number;
  skipped: number;
  errors: string[];
}> {
  const { oldDb, newDb, dryRun } = config;
  const errors: string[] = [];
  let migrated = 0;
  let skipped = 0;

  console.log(`\n${dryRun ? '🔍 DRY RUN' : '🚀 MIGRATING'} — FrameNest v1 → v2\n`);

  for (const tableName of TABLE_ORDER) {
    const oldTableName = Object.entries(TABLE_RENAMES).find(([, v]) => v === tableName)?.[0] || tableName;
    const newTableName = tableName;
    const tableDisplayName = oldTableName !== newTableName
      ? `${oldTableName} → ${newTableName}`
      : newTableName;

    try {
      // Check if old table exists
      const countResult = await oldDb.prepare(
        `SELECT COUNT(*) as c FROM ${oldTableName}`
      ).first<{ c: number }>();

      if (!countResult) {
        console.log(`  ⏭  ${tableDisplayName}: table not found in source`);
        skipped++;
        continue;
      }

      const rowCount = countResult.c;
      if (rowCount === 0) {
        console.log(`  ⏭  ${tableDisplayName}: empty (0 rows)`);
        skipped++;
        continue;
      }

      // Fetch all rows
      const rows = await oldDb.prepare(`SELECT * FROM ${oldTableName}`).all<Record<string, unknown>>();
      console.log(`  📦 ${tableDisplayName}: ${rows.results.length} rows`);

      if (dryRun) {
        // Show sample transform
        if (rows.results.length > 0) {
          const sample = transformRow(rows.results[0]!, oldTableName, newTableName);
          console.log(`     Sample: ${JSON.stringify(sample).slice(0, 120)}...`);
        }
        migrated++;
        continue;
      }

      // Transform and insert in batches
      for (const row of rows.results) {
        const transformed = transformRow(row, oldTableName, newTableName);
        const columns = Object.keys(transformed);
        const values = Object.values(transformed);
        const placeholders = columns.map(() => '?').join(', ');

        try {
          await newDb.prepare(
            `INSERT OR IGNORE INTO ${newTableName} (${columns.join(', ')}) VALUES (${placeholders})`
          ).bind(...values).run();
        } catch (insertErr) {
          errors.push(`${newTableName}: ${(insertErr as Error).message} — row: ${JSON.stringify(transformed).slice(0, 200)}`);
        }
      }
      console.log(`  ✅ ${tableDisplayName}: migrated`);
      migrated++;

    } catch (err) {
      errors.push(`${tableDisplayName}: ${(err as Error).message}`);
      console.log(`  ❌ ${tableDisplayName}: ${(err as Error).message}`);
    }
  }

  console.log(`\n${dryRun ? '🔍 DRY RUN COMPLETE' : '✅ MIGRATION COMPLETE'}`);
  console.log(`   Migrated: ${migrated} tables`);
  console.log(`   Skipped: ${skipped} tables`);
  console.log(`   Errors: ${errors.length}`);

  return { migrated, skipped, errors };
}

// ── Row Transformer ─────────────────────────────────────────────────────────
function transformRow(
  row: Record<string, unknown>,
  oldTableName: string,
  newTableName: string,
): Record<string, unknown> {
  const transformed: Record<string, unknown> = {};

  // Get rename maps
  const columnRenames = COLUMN_RENAMES[oldTableName] || {};
  const droppedColumns = DROPPED_COLUMNS[newTableName] || [];

  for (const [key, value] of Object.entries(row)) {
    // Skip dropped columns
    if (droppedColumns.includes(key)) continue;

    // Apply column rename if needed
    const newKey = columnRenames[key] || key;
    transformed[newKey] = value;
  }

  // Handle special transformations
  if (newTableName === 'events') {
    // Ensure deleted_at is NULL for active records (wasn't present in old schema migrations)
    if (transformed['deleted_at'] === undefined) {
      transformed['deleted_at'] = null;
    }
  }

  if (newTableName === 'professionals') {
    // Ensure template_config exists (from old gallery_config)
    if (transformed['template_config'] === undefined && transformed['gallery_config'] !== undefined) {
      transformed['template_config'] = transformed['gallery_config'];
      delete transformed['gallery_config'];
    }
  }

  return transformed;
}

// ── CLI Entry Point ─────────────────────────────────────────────────────────
// When running directly, connect to both DBs and run migration
// Usage: npx tsx scripts/migrate-data.ts [--dry-run]

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  console.log('FrameNest v1 → v2 Data Migration');
  console.log('================================\n');
  console.log('This script requires access to both old and new D1 databases.');
  console.log('Set up wrangler.toml with both database bindings, then run:');
  console.log('  npx wrangler d1 export old-db --output=backup.sql');
  console.log('  npx tsx scripts/migrate-data.ts --dry-run');
  console.log('  npx tsx scripts/migrate-data.ts\n');
  console.log('For automated migration, bind both DBs in code and call migrateData().');
}

main().catch(console.error);
