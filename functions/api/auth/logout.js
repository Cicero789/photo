// packages/backend/src/lib/response.ts
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

// packages/backend/src/routes/auth/logout.ts
async function onRequestPost() {
  return json({ success: true });
}
export {
  onRequestPost
};
