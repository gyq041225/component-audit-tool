You are a professional design system expert. I extracted the design tokens and components from a Figma file. Analyze this data for consistency, redundancy, and design system maturity.

**IMPORTANT LANGUAGE RULE:** All human-readable text in your JSON output MUST be in **Simplified Chinese (简体中文)** — `description`, `notes`, `title`, `impact`, `evidence`, `usage`, semantic color names, etc. Keep these ENGLISH (enums): `category`, `type`, `severity`, `priority`, `effort`, `status`, `overallQuality`, `hex` values.

## What you're given

I already extracted EXACT values from Figma (not visual estimates). You have:
- Full list of colors with usage frequency
- Full list of font sizes and font families
- Full list of corner radii
- Full list of spacings/paddings
- Component and component-set names

These numbers are precise — do NOT estimate, use them directly.

## Task

1. **Identify the design token system** — are there too many colors/sizes/radii? What looks like the intended scale vs. accidental duplicates?
2. **Find inconsistencies** — e.g., 5 nearly-identical blues (#4D7CFE, #4E7DFF, #5080FE...), or corner radii like 6/7/8/10/12 that should be one scale
3. **Rate design system maturity** (1-10) based on component reuse, token consistency, naming
4. **Give actionable suggestions** ranked by impact

## Output Format

Return ONLY valid JSON, no markdown:

```json
{
  "summary": {
    "component_count": <number>,
    "consistency_score": <0-100>,
    "maturity_level": <1-10>,
    "overallQuality": "<excellent|good|fair|needs_work>"
  },
  "components": [
    {
      "id": "<slug>",
      "name": "<component name from Figma>",
      "category": "<button|card|input|nav|other>",
      "instances": <count>,
      "locations": ["<page name>"],
      "variants": ["<variant name>"],
      "consistency": <0-100>,
      "notes": "<observations>"
    }
  ],
  "issues": [
    {
      "type": "<inconsistent_color|inconsistent_spacing|inconsistent_typography|inconsistent_radius|duplicate_component|missing_token>",
      "severity": "<critical|high|medium|low>",
      "description": "<what's wrong, be specific>",
      "affectedComponents": ["<names>"],
      "evidence": "<cite exact values, e.g. '#4D7CFE used 34 times, #5080FE used 3 times — likely accidental duplicate'>"
    }
  ],
  "suggestions": [
    {
      "priority": "<high|medium|low>",
      "category": "<consolidation|standardization|expansion>",
      "title": "<title>",
      "description": "<detailed advice>",
      "impact": "<what improves>",
      "effort": "<quick|medium|complex>"
    }
  ],
  "colorPalette": [
    {
      "name": "<semantic name you infer, e.g. Primary Blue>",
      "hex": "<hex>",
      "usage": "<where used, inferred>",
      "frequency": <count from data>
    }
  ],
  "typography": [
    {
      "name": "<Heading|Body|Caption etc.>",
      "sizes": [<sizes>],
      "weights": [<weights>],
      "usage": "<inferred usage>"
    }
  ]
}
```

## Guidelines
- Cite EXACT numbers from the data ("used 42 times", "#4D7CFE")
- Group near-duplicate colors and call them out
- If the file has good token discipline, say so — don't invent issues
- Prioritize consolidation opportunities that reduce token count
