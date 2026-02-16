# Premium Restaurant Color Scheme - Golden Essence

## Overview
A sophisticated color palette designed for the "Golden Essence" restaurant, combining dark navy/slate tones with warm gold and amber accents for a luxury dining experience.

---

## Color Palette

### Primary Colors
- **Navbar Background**: `bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95`
  - Creates a refined, dark backdrop with subtle gradient
  
- **Primary Gold Gradient**: `from-amber-300 to-yellow-300` or `from-amber-200 to-yellow-300`
  - Used for logos, main headings, and premium elements
  - Creates an elegant, high-end feel

### Text Colors
- **Primary Text**: `text-amber-50` (off-white/cream)
  - Better than pure white, reduces eye strain
  - Pairs beautifully with dark backgrounds
  
- **Secondary Light Text**: `text-amber-100` (lighter cream)
  - Used for subtext and secondary information
  
- **Accent Text**: `text-amber-300` (gold)
  - Hover states and interactive elements
  - Creates visual hierarchy

### Interactive Elements
- **Hover Color**: `hover:text-amber-300`
  - Smooth transition to gold on hover
  
- **Active Buttons**: 
  - Primary: `bg-gradient-to-r from-amber-600 to-yellow-600`
  - Hover: `hover:from-amber-500 hover:to-yellow-500`
  - Secondary: `bg-gradient-to-r from-slate-700 to-slate-800`

### Background Colors
- **Navbar Border**: `border-amber-500/40` (subtle gold accent)
- **Section Backgrounds**:
  - Interiors: `bg-gradient-to-br from-slate-50 via-amber-50 to-white`
  - Dark Overlay: `bg-black/50` or `bg-gradient-to-b from-slate-900/60 to-black/70`
  - Footer: `bg-gradient-to-b from-slate-900 to-slate-950`

### Card/Container Styling
- **Border**: `border-amber-200/50`
- **Hover**: `hover:shadow-2xl transition duration-300`
- **Shadow**: `hover:shadow-amber-500/50` (gold-tinted shadow)

---

## Color Application by Component

### Navbar
```
Background:     Slate gradient (slate-900/95 → slate-800/95)
Logo:           Gold gradient (amber-300 → yellow-300)
Links:          Cream (amber-50) → Gold (amber-300) on hover
Buttons:        Gradient backgrounds with shadow
Border:         Subtle amber (amber-500/40)
```

### Hero Section (Homepage)
```
Text:           Amber-50 (main), Gradient text overlay
Shadows:        Drop shadows with gold tint
Button:         Gold gradient border with transparent gold background
Overlay:        Black/slate gradient (40-70% opacity)
```

### Cards/Interiors Section
```
Card Border:    Amber-200/50
Text:           Amber-100 on dark overlay
Background:     White with subtle gold undertones
Hover:          Enhanced shadow with gold tint
```

### Buttons & CTAs
- **Primary CTA**: Amber-600 to Yellow-600 gradient
- **Secondary Action**: Slate-700 to Slate-800 with amber border
- **Hover Effects**: Slightly lighter shades with enhanced shadows

### Footer
```
Background:     Slate gradient (slate-900 → slate-950)
Headings:       Gold gradient (amber-300 → yellow-300)
Text:           Amber-50/80 with reduced opacity
Links:          Hover to amber-300
Divider:        Amber-500/30 (subtle gold line)
```

---

## Tailwind Classes Reference

### Frequently Used
- `text-amber-50`, `text-amber-100`, `text-amber-300`
- `bg-gradient-to-r from-amber-600 to-yellow-600`
- `border-amber-500/40`, `border-amber-200/50`
- `hover:text-amber-300`, `hover:from-amber-500`
- `bg-slate-900/95`, `bg-gradient-to-b from-slate-900`
- `drop-shadow-lg`, `shadow-lg`

### Combined Patterns
1. **Premium Button**: 
   ```
   bg-gradient-to-r from-amber-600 to-yellow-600 
   hover:from-amber-500 hover:to-yellow-500 
   text-white shadow-lg hover:shadow-amber-500/50
   ```

2. **Navbar Link**:
   ```
   text-amber-50 hover:text-amber-300 
   transition duration-300
   ```

3. **Gradient Text**:
   ```
   text-transparent bg-clip-text 
   bg-gradient-to-r from-amber-300 to-yellow-300
   ```

---

## Accessibility Notes
- ✅ High contrast between amber-50 text and slate-900 backgrounds
- ✅ Gold accents provide visual hierarchy
- ✅ Smooth transitions (generally 300ms) for interactive elements
- ✅ Reduced opacity overlays prevent text readability issues
- ✅ Hover states clearly indicate interactivity

---

## Brand Identity
**Theme**: Luxury Fine Dining  
**Emotion**: Elegant, Sophisticated, Warm, Premium  
**Color Psychology**:
- **Gold/Amber**: Luxury, prestige, tradition, warmth
- **Slate**: Modern, sophisticated, trustworthy
- **Cream/Off-white**: Luxury, comfort, approachability

This color scheme reinforces the "Golden Essence" brand identity while maintaining professional aesthetics and excellent readability across all devices.
