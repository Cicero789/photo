import { z } from "zod";

export const themes = { warm: "Warm ivory & sage", coastal: "Coastal linen & blue", rose: "Soft rose & charcoal" };
export const products = ["Digital image", "4 × 6 print", "5 × 7 print", "8 × 10 print", "11 × 14 print", "16 × 20 print", "20 × 24 print", "24 × 13 panoramic print", "Canvas", "Photo mug", "Mouse pad"] as const;
export const studioSchema = z.object({
  name: z.string().trim().min(1).max(80), theme: z.enum(["warm", "coastal", "rose"]),
  headline: z.string().trim().min(1).max(150), intro: z.string().max(800), about: z.string().max(3000),
  location: z.string().max(120), email: z.union([z.literal(""), z.string().email().max(200)]),
  services: z.array(z.object({ name: z.string().min(1).max(80), description: z.string().max(400), rate: z.string().min(1).max(80) })).min(1).max(8),
});
export type Studio = z.infer<typeof studioSchema>;
export interface StudioPhoto { id: string; url: string; title: string; description: string; category: string; sample?: boolean }
export const defaultStudio: Studio = {
  name: "Candle Vision", theme: "warm", headline: "The little moments.\nThe whole feeling.",
  intro: "Honest laughter. Quiet connections. The beautiful, everyday magic of being you. Photography that brings you back to how it felt.",
  about: "The best photographs begin with feeling comfortable. I take time to talk, listen, and help you settle in—so your real personality has room to shine.\n\nI'm drawn to genuine happiness: the in-between laugh, the familiar embrace, the moment you forget the camera is there. With softly lifted blacks and a natural feel, I turn those fleeting seconds into something you can keep.\n\nMy hope is that you return to these photographs and remember who you were, see who you've become, and feel those cherished moments all over again.",
  location: "Irvine, California", email: "",
  services: [
    { name: "Families & connection", description: "Room to play, be close, and be yourselves. A relaxed session for the people who feel like home.", rate: "Request a quote" },
    { name: "Couples & togetherness", description: "Your own kind of love, in your own kind of way. The glances, the laughter, the little rituals.", rate: "Request a quote" },
    { name: "Portraits & milestones", description: "A new chapter, a personal celebration, or simply you, right now. Let's remember this version of you.", rate: "Request a quote" },
  ],
};
const sample = (id: string, image: string, title: string, category: string): StudioPhoto => ({ id, url: `https://images.unsplash.com/${image}?auto=format&fit=crop&w=1200&q=85`, title, category, description: "Mood-board image illustrating the site's visual direction. Replace with your own photography in the studio editor.", sample: true });
export const samplePhotos: StudioPhoto[] = [
  sample("sample-1", "photo-1511895426328-dc8714191300", "Together is a good place", "Families"),
  sample("sample-2", "photo-1516589178581-6cd7833ae3b2", "Just the two of you", "Couples"),
  sample("sample-3", "photo-1471286174890-9c112ffca5b4", "A little wild, a little wonderful", "Families"),
  sample("sample-4", "photo-1519741497674-611481863552", "A day to hold onto", "Milestones"),
  sample("sample-5", "photo-1524504388940-b1c1722653e1", "Beautifully yourself", "Portraits"),
  sample("sample-6", "photo-1511632765486-a01980e01a18", "The everyday kind of magic", "Families"),
];
export const requestSchema = z.object({
  kind: z.enum(["inquiry", "selection"]), name: z.string().trim().min(1).max(120), email: z.string().email().max(200),
  message: z.string().max(3000).default(""), token: z.string().max(100).optional(),
  items: z.array(z.object({ key: z.string().min(1).max(500), product: z.enum(products), quantity: z.number().int().min(1).max(99) })).max(100).default([]),
}).superRefine((value, ctx) => {
  if (value.kind === "selection" && (!value.token || value.items.length === 0)) ctx.addIssue({ code: "custom", message: "Select at least one photo and product." });
});
