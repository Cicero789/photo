import type { ComponentType } from "react"; import type { TemplateProps } from "./types";
export const templateComponents: Record<string, ComponentType<TemplateProps>> = {};
export function resolveTemplateId(id?: string | null): string { return id || "1-clean"; }
