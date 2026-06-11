import { json } from "../../lib/response";
export async function onRequestPost(): Promise<Response> { return json({ success: true }); }
