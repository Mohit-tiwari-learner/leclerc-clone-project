

# Services Section 20x Enhancement Plan
## 3D Glassmorphism Cards with Water Effects

---

### Overview

Transform the current flat card grid into an immersive, interactive 3D glassmorphism experience with water ripple effects, mouse-tracked lighting, and fluid animations. No new dependencies needed -- everything built with Framer Motion + CSS.

---

### Architecture

```text
LifeAsDriverSection (full rebuild)
├── Animated section header (existing, refined)
├── GlassCard x4 (new component)
│   ├── 3D mouse-tracking tilt (perspective transform)
│   ├── Glassmorphism layer (backdrop-blur + gradient borders)
│   ├── Water ripple SVG filter (feTurbulence + feDisplacementMap)
│   ├── Dynamic light reflection (radial gradient follows cursor)
│   ├── Floating icon with glow
│   ├── Animated number/stat counter
│   └── Hover: card lifts, glow intensifies, content reveals
└── Background ambient orbs (blurred gradient circles)
```

---

### What Changes

**File: `src/components/LifeAsDriverSection.tsx`** (full rewrite)

1. **3D Mouse-Tracking Tilt Cards**
   - Each card tracks mouse position relative to its bounds using `onMouseMove`
   - Applies `rotateX` / `rotateY` transforms via Framer Motion `useSpring` for smooth, dampened 3D tilt
   - `perspective: 1200px` on parent container for realistic depth

2. **Glassmorphism Styling**
   - Card background: `rgba(255,255,255,0.05)` with `backdrop-blur-xl`
   - Animated gradient border using CSS `background: linear-gradient(...)` on a pseudo-layer with `border-radius` mask
   - Subtle inner glow via `box-shadow: inset 0 0 30px rgba(255,255,255,0.05)`

3. **Water Ripple Effect (SVG Filter)**
   - An inline `<svg>` with `<feTurbulence>` and `<feDisplacementMap>` applied to the card's background image
   - The turbulence `baseFrequency` animates on hover (via `useEffect` + `requestAnimationFrame`) to create a living water surface
   - Subtle and performant -- only activates on hover

4. **Dynamic Light Reflection**
   - A radial gradient overlay div inside each card
   - Its position is bound to mouse coordinates (`useMotionValue`) creating a "flashlight" effect that follows the cursor across the glass surface

5. **Floating Service Icons**
   - Each card gets an icon (Ruler, Hammer, Palette, Leaf from lucide-react)
   - Icon floats with a subtle `y` oscillation using `animate={{ y: [0, -8, 0] }}` infinite loop
   - Glows on hover with `drop-shadow` transition

6. **Staggered Scroll Entry**
   - Cards enter with 3D flip (`rotateY: -90 → 0`) + blur dissolve + upward slide
   - Staggered by `0.15s` per card
   - Section heading gets a refined split-text animation

7. **Background Ambient Layer**
   - 2-3 large blurred gradient orbs (`bg-primary/10`, `bg-blue-500/5`) positioned absolutely behind the cards
   - Slow floating animation via Framer Motion infinite keyframes
   - Creates depth and atmosphere for the glass cards to "sit in"

8. **Section Background**
   - Dark background (`bg-foreground` or `bg-neutral-950`) so the glass effect pops
   - All text colors inverted for contrast

9. **Hover Interactions**
   - Card scale: `1 → 1.05`
   - Z-elevation: `translateZ(30px)`
   - Border glow intensifies
   - Description text slides up from hidden
   - A bottom accent line wipes in from left

10. **Stats Counter Per Card**
    - Each service card includes a stat (e.g., "120+ Projects", "38 Awards")
    - Uses the existing `AnimatedCounter` component from `ScrollAnimations.tsx`

---

### Technical Notes

- **No new dependencies** -- all effects use Framer Motion, CSS backdrop-filter, and inline SVG filters
- **Performance** -- water ripple SVG filter only active on hovered card; `will-change: transform` on cards; spring physics prevent jank
- **Mobile** -- 3D tilt disabled on touch devices (detected via `window.matchMedia('(hover: hover)')`); cards stack vertically with simpler fade-in animations
- Cards render as a `2x2` grid on desktop, `1-column` on mobile

