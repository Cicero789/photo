import { lazy, type ComponentType } from "react";
import type { TemplateProps } from "./types";

export const templateComponents: Record<string, ComponentType<TemplateProps>> = {
  "clean-minimal": lazy(() => import("./Template1Clean")),
  "cinematic-dark": lazy(() => import("./Template2Cinematic")),
  "editorial-magazine": lazy(() => import("./Template3Editorial")),
  "instagram-grid": lazy(() => import("./Template4Instagram")),
  "masonry-wall": lazy(() => import("./Template5Masonry")),
  "split-hero": lazy(() => import("./Template6Split")),
  "vertical-scroll": lazy(() => import("./Template7Vertical")),
  "carousel-spotlight": lazy(() => import("./Template8Carousel")),
  "story-cards": lazy(() => import("./Template9StoryCards")),
  "brutalist-bold": lazy(() => import("./Template10Brutalist")),
};

export { TEMPLATE_REGISTRY } from "./types";
export type { TemplateProps, TemplateInfo } from "./types";
