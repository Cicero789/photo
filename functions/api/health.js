// packages/backend/src/lib/response.ts
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

// packages/backend/src/routes/health.ts
async function onRequestGet(context) {
  try {
    const tables = await context.env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
    const names = (tables.results || []).map((r) => r.name);
    return json({ status: "ok", tables: names.length, tableList: names, timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  } catch (err) {
    return json({ status: "down", error: String(err) }, 500);
  }
}
export {
  onRequestGet
};
