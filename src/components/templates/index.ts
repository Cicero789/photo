import { lazy, type ComponentType } from "react";
import type { TemplateProps } from "./types";

export const templateComponents: Record<string, ComponentType<TemplateProps>> = {
  // Base templates (10)
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
  // Sports (2)
  "sports-action": lazy(() => import("./TemplateSportsAction")),
  "sports-editorial": lazy(() => import("./TemplateSportsEditorial")),
  // Engagement (2)
  "engagement-blush": lazy(() => import("./TemplateEngagementBlush")),
  "engagement-elegant": lazy(() => import("./TemplateEngagementElegant")),
  // Family (2)
  "family-warm": lazy(() => import("./TemplateFamilyWarm")),
  "family-modern": lazy(() => import("./TemplateFamilyModern")),
  // Corporate (2)
  "corporate-suite": lazy(() => import("./TemplateCorporateSuite")),
  "corporate-pro": lazy(() => import("./TemplateCorporatePro")),
  // Thanksgiving & Christmas (2)
  "holiday-hearth": lazy(() => import("./TemplateHolidayHearth")),
  "golden-feast": lazy(() => import("./TemplateGoldenFeast")),
  // Holiday (2)
  "holiday-festive": lazy(() => import("./TemplateHolidayFestive")),
  "holiday-elegant": lazy(() => import("./TemplateHolidayElegant")),
  // Winter (2)
  "winter-frozen": lazy(() => import("./TemplateWinterFrozen")),
  "winter-cozy": lazy(() => import("./TemplateWinterCozy")),
  // Summer (2)
  "summer-beach": lazy(() => import("./TemplateSummerBeach")),
  "summer-golden": lazy(() => import("./TemplateSummerGolden")),
  // Spring (2)
  "spring-blossom": lazy(() => import("./TemplateSpringBlossom")),
  "spring-fresh": lazy(() => import("./TemplateSpringFresh")),
  // Fall (2)
  "fall-warmth": lazy(() => import("./TemplateFallWarmth")),
  "fall-palette": lazy(() => import("./TemplateFallPalette")),
  // Portraits (2)
  "portrait-studio": lazy(() => import("./TemplatePortraitStudio")),
  "portrait-headshot": lazy(() => import("./TemplatePortraitHeadshot")),
  // Street Photography (2)
  "street-gritty": lazy(() => import("./TemplateStreetGritty")),
  "street-neon": lazy(() => import("./TemplateStreetNeon")),
};

export { TEMPLATE_REGISTRY } from "./types";
export type { TemplateProps, TemplateInfo } from "./types";
