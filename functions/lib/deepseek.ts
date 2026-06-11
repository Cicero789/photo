const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export async function generateSummary(description: string, title: string, category: string, apiKey: string): Promise<string | null> {
  if (!description || description.trim().length < 10) return null;
  if (!apiKey) { console.warn("No DeepSeek API key configured"); return null; }
  try {
    const res = await fetch(DEEPSEEK_API_URL, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` }, body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "system", content: "You are a warm storyteller who summarizes life events in a short, emotional, captivating way." }, { role: "user", content: `Summarize this event in 2-4 emotional sentences (under 150 chars).\n\nEvent: "${title}"\nCategory: ${category}\nDescription: "${description}"` }], max_tokens: 150, temperature: 0.7, stream: false }) });
    if (!res.ok) { console.error(`DeepSeek API error: ${res.status}`); return null; }
    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    return data.choices?.[0]?.message?.content?.trim() ?? null;
  } catch (err) { console.error("DeepSeek API call failed:", err); return null; }
}
