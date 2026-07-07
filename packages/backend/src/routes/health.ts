import { json } from '../lib/response.js';
export async function onRequestGet(context: { request: Request; env: { DB: D1Database } }): Promise<Response> {
  try {
    const tables = await context.env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
    const names = (tables.results || []).map((r: any) => r.name);
    return json({ status: 'ok', tables: names.length, tableList: names, timestamp: new Date().toISOString() });
  } catch (err) { return json({ status: 'down', error: String(err) }, 500); }
}
