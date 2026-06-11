import { json } from "../../lib/response";
export async function onRequestGet(): Promise<Response> { return json({ spaces: [] }); }
