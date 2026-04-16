# Design System Specification: AashaDaan Foundation Dashboard

## 1. Overview & Creative North Star
**Creative North Star: "The Luminous Guardian"**

This design system moves beyond the utility of a standard dashboard to create an editorial, high-end experience that reflects the hope and transparency of the AashaDaan Foundation. We reject the "flat" look of traditional SaaS products in favor of **Organic Glassmorphism**—a style characterized by deep tonal layers, ambient light sources, and a sophisticated interplay between the void (dark navy) and the light (vibrant accents). 

The layout should feel intentional and spacious, utilizing asymmetrical balance to draw focus to high-impact data. We are not just building a reporting tool; we are crafting a digital sanctum where data feels like a living, breathing testament to social impact.

---

## 2. Colors & Surface Philosophy

The color palette is rooted in a deep, nocturnal navy to ensure the accent colors "pop" with an emissive, neon-like quality.

### Color Tokens
*   **Surface Foundation:** `background` (#0b1326) — The deepest layer.
*   **Primary (Hope):** `primary` (#5af0b3) and `primary_container` (#34d399).
*   **Secondary (Action):** `secondary` (#7bd0ff) and `secondary_container` (#00a6e0).
*   **Tertiary (Vision):** `tertiary` (#e8ccff) and `tertiary_container` (#d5a9ff).

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Traditional borders create visual noise that traps the eye. Instead, define boundaries through:
1.  **Background Shifts:** Place a `surface_container_low` card atop a `surface` background.
2.  **Tonal Transitions:** Use a 2dp shift in value to signify a change in content area.
3.  **Negative Space:** Use the spacing scale to create "islands" of information.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested frosted glass sheets. 
*   **Level 0 (The Void):** `surface` (#0b1326).
*   **Level 1 (The Canvas):** `surface_container` (#171f33).
*   **Level 2 (The Card):** `surface_container_high` (#222a3d).
*   **Level 3 (The Interaction):** `surface_container_highest` (#2d3449).

### The "Glass & Gradient" Rule
Floating elements (Modals, Hover Tooltips, Navigation Bars) must utilize **Glassmorphism**:
*   **Fill:** `surface_variant` at 60% opacity.
*   **Blur:** `backdrop-filter: blur(20px)`.
*   **Glow:** Incorporate "Ambient Glow Orbs"—soft, radial gradients of `primary` or `secondary` at 5-10% opacity positioned behind content to simulate light leaking through the glass.

---

## 3. Typography: Editorial Authority

We use two distinct typefaces to balance modern tech with humanistic warmth.

*   **Display & Headlines (Manrope):** A geometric sans-serif that feels expansive and professional.
    *   `display-lg`: 3.5rem (Use for massive impact figures, e.g., total lives impacted).
    *   `headline-md`: 1.75rem (Use for section titles).
*   **Body & Labels (Inter):** A workhorse typeface designed for maximum legibility in dark mode.
    *   `body-lg`: 1rem (Primary reading text).
    *   `label-md`: 0.75rem (Uppercase with 0.05em letter spacing for metadata).

**Typography Strategy:** Use extreme scale contrast. Pair a `display-lg` stat with a `label-sm` caption to create a sense of architectural hierarchy.

---

## 4. Elevation & Depth: Tonal Layering

Shadows in this system are not "black"; they are tinted glows.

*   **The Layering Principle:** Avoid elevation shadows on flat cards. Rely on the shift from `surface_container_lowest` to `surface_container_low`.
*   **Ambient Shadows:** For floating glass elements, use a shadow with a blur radius of 40px and a 6% opacity, using the `primary` color as the shadow tint. This mimics light passing through a colored lens.
*   **The "Ghost Border" Fallback:** If a divider is mandatory for accessibility (e.g., in a high-density data table), use a "Ghost Border": `outline_variant` (#3c4a42) at 15% opacity.

---

## 5. Components & Interaction

### Buttons: The Radiant Action
*   **Primary:** A gradient from `primary_container` to `primary`. No border. White text (`on_primary_container`).
*   **Secondary:** A "Ghost Glass" style—semi-transparent fill with a `outline_variant` ghost border.
*   **Rounding:** Use `xl` (1.5rem) for a friendly, approachable pill shape.

### Input Fields: Soft Recess
*   **Style:** Instead of a stroke, use a `surface_container_lowest` fill. 
*   **Focus State:** Transition the background to `surface_container_highest` and add a subtle `primary` inner-glow (box-shadow: inset).

### Cards & Data Visualization
*   **Rule:** Forbid divider lines. 
*   **Implementation:** Use vertical padding (32px - 48px) to separate "Stories of Impact" from "Financial Metrics." 
*   **Visuals:** Graphs should use the `primary`, `secondary`, and `tertiary` tokens. Lines should be glowing (using a CSS drop-shadow filter) to stand out against the dark navy.

### Signature Component: The Impact Orb
A large, 400px radial gradient orb that sits in the background of the dashboard, moving subtly (CSS animation) behind the glass layers. It uses `primary` at 15% opacity to guide the user's eye toward the most important KPI.

---

## 6. Do’s and Don'ts

### Do:
*   **Do** use asymmetrical margins to create an "Editorial Layout" feel.
*   **Do** lean heavily into `backdrop-blur` for all navigation and overlay elements.
*   **Do** ensure text on `primary` accents uses the `on_primary` color (#003825) to maintain AA+ contrast.
*   **Do** allow the background `surface` to breathe; negative space is a luxury.

### Don’t:
*   **Don’t** use pure black (#000000) or pure white (#FFFFFF). 
*   **Don’t** use 1px solid white or grey borders.
*   **Don’t** use "Drop Shadows" that are grey or harsh.
*   **Don’t** crowd the interface. If a screen feels full, increase the container depth (nesting) rather than adding lines.

---

## 7. Spacing & Rounding Scale

*   **Radius:** Primary cards use `lg` (1rem); interactive elements like buttons use `xl` (1.5rem) to feel "soft" to the touch.
*   **Spacing:** Use a 8px-based grid, but prioritize "The Breath"—48px to 64px gaps between major sections to emphasize the premium nature of the Foundation's brand.