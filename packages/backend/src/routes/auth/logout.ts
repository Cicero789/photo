import { json } from '../../lib/response.js';
export async function onRequestPost(): Promise<Response> {
  return json({ success: true });
}
