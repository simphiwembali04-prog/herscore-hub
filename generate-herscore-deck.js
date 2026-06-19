const PptxGenJS = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

const pres = new PptxGenJS();
pres.layout = "LAYOUT_16x9";
pres.author = "HerScore";
pres.title = "HerScore — Pitch Deck";
pres.subject = "Women's sports live scores, athlete profiles, and storytelling";
pres.company = "HerScore";

const colors = {
  pink: "FF4FA3",
  purple: "5B2C83",
  gold: "D4AF37",
  dark: "0F172A",
  light: "F8FAFC",
  muted: "94A3B8",
  white: "FFFFFF",
  surface: "1E293B",
};

const fonts = {
  display: "Outfit",
  body: "Inter",
};

// Ensure output directory exists
const outputDir = "/mnt/documents";
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

function addSlideTitle() {
  const slide = pres.addSlide();
  slide.background = { color: colors.dark };

  // Abstract gradient-like shapes
  slide.addShape(pres.shapes.OVAL, {
    x: 6.8, y: -1.5, w: 5.5, h: 5.5,
    fill: { color: colors.pink, transparency: 85 },
    line: { color: colors.pink, transparency: 90 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: -1.5, y: 3.8, w: 4.5, h: 4.5,
    fill: { color: colors.purple, transparency: 80 },
    line: { color: colors.purple, transparency: 90 },
  });

  // Gold accent line
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 2.8, w: 2.2, h: 0.06,
    fill: { color: colors.gold }, line: { color: colors.gold },
  });

  slide.addText("HerScore", {
    x: 0.8, y: 1.4, w: 8, h: 1.2,
    fontSize: 80, fontFace: fonts.display, bold: true,
    color: colors.white, margin: 0,
  });
  slide.addText("Women's sports, first.", {
    x: 0.8, y: 2.95, w: 8, h: 0.7,
    fontSize: 32, fontFace: fonts.body,
    color: colors.gold, margin: 0,
  });
  slide.addText("The leading destination for live scores, athlete profiles, and storytelling in women's sports.", {
    x: 0.8, y: 3.8, w: 6.5, h: 1.2,
    fontSize: 22, fontFace: fonts.body,
    color: colors.muted, margin: 0,
  });

  slide.addText("Visual MVP · June 2026", {
    x: 0.8, y: 5.1, w: 3, h: 0.4,
    fontSize: 14, fontFace: fonts.body,
    color: colors.muted, margin: 0,
  });
}

function addSlideOpportunity() {
  const slide = pres.addSlide();
  slide.background = { color: colors.light };

  slide.addText("The Opportunity", {
    x: 0.8, y: 0.6, w: 8, h: 0.8,
    fontSize: 48, fontFace: fonts.display, bold: true,
    color: colors.dark, margin: 0,
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.35, w: 1.2, h: 0.08,
    fill: { color: colors.pink }, line: { color: colors.pink },
  });

  const stats = [
    { number: "$1.3B", label: "Projected women's sports revenue by 2026" },
    { number: "+300%", label: "Growth in women's football viewership since 2019" },
    { number: "68%", label: "Of fans want a dedicated women's sports platform" },
  ];

  stats.forEach((stat, i) => {
    const x = 0.8 + i * 3.0;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.0, w: 2.6, h: 2.8,
      fill: { color: colors.white },
      line: { color: "E2E8F0", width: 1 },
      shadow: { type: "outer", color: "000000", blur: 10, offset: 2, angle: 90, opacity: 0.08 },
    });
    slide.addText(stat.number, {
      x, y: 2.4, w: 2.6, h: 0.8,
      fontSize: 46, fontFace: fonts.display, bold: true,
      color: colors.pink, align: "center", margin: 0,
    });
    slide.addText(stat.label, {
      x: x + 0.15, y: 3.3, w: 2.3, h: 1.2,
      fontSize: 18, fontFace: fonts.body,
      color: colors.dark, align: "center", margin: 0,
    });
  });

  slide.addText("Women's sports are the fastest-growing segment in global media — yet still underserved by existing platforms.", {
    x: 0.8, y: 5.1, w: 8.4, h: 0.6,
    fontSize: 20, fontFace: fonts.body, italic: true,
    color: colors.surface, margin: 0,
  });
}

function addSlideProblem() {
  const slide = pres.addSlide();
  slide.background = { color: colors.dark };

  slide.addText("The Problem", {
    x: 0.8, y: 0.6, w: 8, h: 0.8,
    fontSize: 48, fontFace: fonts.display, bold: true,
    color: colors.white, margin: 0,
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.35, w: 1.2, h: 0.08,
    fill: { color: colors.gold }, line: { color: colors.gold },
  });

  const problems = [
    "Women's matches buried under men's fixtures on legacy apps",
    "Inconsistent coverage across football, rugby, cricket, and tennis",
    "No unified athlete identity — stats, stories, and highlights live in silos",
    "Fan communities spread across fragmented social platforms",
  ];

  problems.forEach((p, i) => {
    const y = 2.0 + i * 0.9;
    slide.addShape(pres.shapes.OVAL, {
      x: 1.0, y: y + 0.1, w: 0.2, h: 0.2,
      fill: { color: colors.pink }, line: { color: colors.pink },
    });
    slide.addText(p, {
      x: 1.5, y, w: 8, h: 0.6,
      fontSize: 24, fontFace: fonts.body,
      color: colors.white, margin: 0,
    });
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 8.0, y: 2.0, w: 1.4, h: 3.4,
    fill: { color: colors.pink, transparency: 15 },
    line: { color: "000000", transparency: 100 },
  });
  slide.addText("FANS LOSE.", {
    x: 8.15, y: 3.4, w: 1.1, h: 1.0,
    fontSize: 28, fontFace: fonts.display, bold: true,
    color: colors.pink, align: "center", valign: "middle", margin: 0,
  });
}

function addSlideSolution() {
  const slide = pres.addSlide();
  slide.background = { color: colors.light };

  slide.addText("The Solution", {
    x: 0.8, y: 0.6, w: 8, h: 0.8,
    fontSize: 48, fontFace: fonts.display, bold: true,
    color: colors.dark, margin: 0,
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.35, w: 1.2, h: 0.08,
    fill: { color: colors.purple }, line: { color: colors.purple },
  });

  const points = [
    { title: "Women's-first", desc: "Every list, ranking, and headline prioritizes women's competitions." },
    { title: "Unified coverage", desc: "Football, rugby, cricket, and tennis in one destination." },
    { title: "Athlete-centric", desc: "Rich profiles combine stats, bio, form, and storytelling." },
  ];

  points.forEach((p, i) => {
    const x = 0.8 + i * 3.0;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.0, w: 2.6, h: 3.0,
      fill: { color: colors.white },
      line: { color: "E2E8F0", width: 1 },
      shadow: { type: "outer", color: "000000", blur: 10, offset: 2, angle: 90, opacity: 0.08 },
    });
    slide.addText(p.title, {
      x: x + 0.2, y: 2.3, w: 2.2, h: 0.6,
      fontSize: 26, fontFace: fonts.display, bold: true,
      color: colors.purple, margin: 0,
    });
    slide.addText(p.desc, {
      x: x + 0.2, y: 3.0, w: 2.2, h: 1.8,
      fontSize: 18, fontFace: fonts.body,
      color: colors.surface, margin: 0,
    });
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 5.3, w: 8.4, h: 0.08,
    fill: { color: colors.gold }, line: { color: colors.gold },
  });
}

function addSlideProduct() {
  const slide = pres.addSlide();
  slide.background = { color: colors.dark };

  slide.addText("Product MVP", {
    x: 0.8, y: 0.6, w: 8, h: 0.8,
    fontSize: 48, fontFace: fonts.display, bold: true,
    color: colors.white, margin: 0,
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.35, w: 1.2, h: 0.08,
    fill: { color: colors.pink }, line: { color: colors.pink },
  });

  const features = [
    { title: "Live Scores", desc: "Match cards with status filters and live indicators." },
    { title: "Athletes", desc: "Profiles, stats, career highlights, and trending badges." },
    { title: "News", desc: "Curated stories and featured articles, women's-first." },
    { title: "Rankings", desc: "FIFA-style women's rankings with movement indicators." },
  ];

  features.forEach((f, i) => {
    const x = 0.8 + (i % 2) * 4.4;
    const y = 2.0 + Math.floor(i / 2) * 1.6;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.0, h: 1.3,
      fill: { color: colors.surface },
      line: { color: "334155", width: 1 },
    });
    slide.addText(f.title, {
      x: x + 0.2, y: y + 0.2, w: 3.6, h: 0.5,
      fontSize: 24, fontFace: fonts.display, bold: true,
      color: colors.gold, margin: 0,
    });
    slide.addText(f.desc, {
      x: x + 0.2, y: y + 0.65, w: 3.6, h: 0.5,
      fontSize: 16, fontFace: fonts.body,
      color: colors.muted, margin: 0,
    });
  });

  slide.addText("Built with TanStack Start, Tailwind v4, and shadcn/ui.", {
    x: 0.8, y: 5.2, w: 8.4, h: 0.4,
    fontSize: 16, fontFace: fonts.body,
    color: colors.muted, margin: 0,
  });
}

function addSlideMarket() {
  const slide = pres.addSlide();
  slide.background = { color: colors.light };

  slide.addText("Market Position", {
    x: 0.8, y: 0.6, w: 8, h: 0.8,
    fontSize: 48, fontFace: fonts.display, bold: true,
    color: colors.dark, margin: 0,
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.35, w: 1.2, h: 0.08,
    fill: { color: colors.gold }, line: { color: colors.gold },
  });

  slide.addText("Flashscore", {
    x: 1.5, y: 2.0, w: 3, h: 0.5,
    fontSize: 20, fontFace: fonts.body, bold: true,
    color: colors.surface, margin: 0,
  });
  slide.addText("Speed & reliability", {
    x: 1.5, y: 2.4, w: 3, h: 0.4,
    fontSize: 16, fontFace: fonts.body,
    color: colors.muted, margin: 0,
  });

  slide.addText("ESPN", {
    x: 1.5, y: 3.2, w: 3, h: 0.5,
    fontSize: 20, fontFace: fonts.body, bold: true,
    color: colors.surface, margin: 0,
  });
  slide.addText("Coverage breadth", {
    x: 1.5, y: 3.6, w: 3, h: 0.4,
    fontSize: 16, fontFace: fonts.body,
    color: colors.muted, margin: 0,
  });

  slide.addText("The Athletic", {
    x: 1.5, y: 4.4, w: 3, h: 0.5,
    fontSize: 20, fontFace: fonts.body, bold: true,
    color: colors.surface, margin: 0,
  });
  slide.addText("Storytelling depth", {
    x: 1.5, y: 4.8, w: 3, h: 0.4,
    fontSize: 16, fontFace: fonts.body,
    color: colors.muted, margin: 0,
  });

  // Connecting line
  slide.addShape(pres.shapes.LINE, {
    x: 4.6, y: 2.3, w: 1.2, h: 0,
    line: { color: colors.pink, width: 2, dashType: "sysDash" },
  });
  slide.addShape(pres.shapes.LINE, {
    x: 4.6, y: 3.5, w: 1.2, h: 0,
    line: { color: colors.pink, width: 2, dashType: "sysDash" },
  });
  slide.addShape(pres.shapes.LINE, {
    x: 4.6, y: 4.7, w: 1.2, h: 0,
    line: { color: colors.pink, width: 2, dashType: "sysDash" },
  });

  // HerScore box
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 6.0, y: 2.4, w: 3.4, h: 2.6,
    fill: { color: colors.purple },
    line: { color: colors.purple },
    shadow: { type: "outer", color: "000000", blur: 15, offset: 3, angle: 135, opacity: 0.15 },
  });
  slide.addText("HerScore", {
    x: 6.0, y: 3.1, w: 3.4, h: 0.8,
    fontSize: 36, fontFace: fonts.display, bold: true,
    color: colors.white, align: "center", valign: "middle", margin: 0,
  });
  slide.addText("All three. Women's-first.", {
    x: 6.0, y: 3.9, w: 3.4, h: 0.5,
    fontSize: 18, fontFace: fonts.body,
    color: colors.gold, align: "center", margin: 0,
  });
}

function addSlideRevenue() {
  const slide = pres.addSlide();
  slide.background = { color: colors.dark };

  slide.addText("Revenue Model", {
    x: 0.8, y: 0.6, w: 8, h: 0.8,
    fontSize: 48, fontFace: fonts.display, bold: true,
    color: colors.white, margin: 0,
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.35, w: 1.2, h: 0.08,
    fill: { color: colors.gold }, line: { color: colors.gold },
  });

  const tiers = [
    { title: "Free", items: ["Live scores", "News feed", "Basic rankings", "Community access"] },
    { title: "Premium", items: ["Advanced stats", "AI insights", "Ad-free", "Exclusive content"] },
  ];

  tiers.forEach((t, i) => {
    const x = 0.8 + i * 4.5;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.0, w: 4.0, h: 3.2,
      fill: { color: i === 0 ? colors.surface : colors.pink },
      line: { color: i === 0 ? "334155" : colors.pink },
    });
    slide.addText(t.title, {
      x: x + 0.2, y: 2.2, w: 3.6, h: 0.5,
      fontSize: 30, fontFace: fonts.display, bold: true,
      color: i === 0 ? colors.white : colors.dark, margin: 0,
    });
    t.items.forEach((item, j) => {
      slide.addText(item, {
        x: x + 0.2, y: 2.9 + j * 0.5, w: 3.6, h: 0.4,
        fontSize: 18, fontFace: fonts.body,
        color: i === 0 ? colors.muted : colors.dark, margin: 0,
      });
    });
  });

  slide.addText("Additional revenue: sponsorships, brand partnerships, non-intrusive ads, and donations.", {
    x: 0.8, y: 5.4, w: 8.4, h: 0.4,
    fontSize: 16, fontFace: fonts.body,
    color: colors.muted, margin: 0,
  });
}

function addSlideRoadmap() {
  const slide = pres.addSlide();
  slide.background = { color: colors.light };

  slide.addText("Roadmap & Ask", {
    x: 0.8, y: 0.6, w: 8, h: 0.8,
    fontSize: 48, fontFace: fonts.display, bold: true,
    color: colors.dark, margin: 0,
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.35, w: 1.2, h: 0.08,
    fill: { color: colors.pink }, line: { color: colors.pink },
  });

  const phases = [
    { phase: "Now", items: "Visual MVP · Sample data · iOS-first web design" },
    { phase: "Q3", items: "Lovable Cloud auth · Real-time data feeds · Follow system" },
    { phase: "2027", items: "AI insights · Premium tiers · Highlights & fantasy" },
  ];

  phases.forEach((p, i) => {
    const x = 0.8 + i * 3.0;
    slide.addShape(pres.shapes.OVAL, {
      x: x + 0.9, y: 2.0, w: 0.8, h: 0.8,
      fill: { color: i === 0 ? colors.pink : i === 1 ? colors.purple : colors.gold },
      line: { color: i === 0 ? colors.pink : i === 1 ? colors.purple : colors.gold },
    });
    slide.addText(p.phase, {
      x, y: 2.15, w: 2.6, h: 0.5,
      fontSize: 20, fontFace: fonts.display, bold: true,
      color: colors.white, align: "center", margin: 0,
    });
    slide.addText(p.items, {
      x: x + 0.1, y: 3.0, w: 2.4, h: 1.6,
      fontSize: 16, fontFace: fonts.body,
      color: colors.surface, align: "center", margin: 0,
    });
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.7, w: 8.4, h: 0.8,
    fill: { color: colors.purple },
    line: { color: colors.purple },
  });
  slide.addText("Seeking design partners and advisors to validate the MVP and shape the next phase.", {
    x: 0.8, y: 4.85, w: 8.4, h: 0.5,
    fontSize: 20, fontFace: fonts.body, bold: true,
    color: colors.white, align: "center", valign: "middle", margin: 0,
  });
}

addSlideTitle();
addSlideOpportunity();
addSlideProblem();
addSlideSolution();
addSlideProduct();
addSlideMarket();
addSlideRevenue();
addSlideRoadmap();

const outputPath = path.join(outputDir, "HerScore-Pitch-Deck.pptx");
pres.writeFile({ fileName: outputPath }).then(() => {
  console.log("Wrote", outputPath);
}).catch((err) => {
  console.error("Failed to write presentation:", err);
  process.exit(1);
});
