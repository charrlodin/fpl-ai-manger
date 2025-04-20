# FPL AI Manager Theme Guide

## Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| FPL Purple | `#37003c` | Primary brand color, used for sidebar, card headers, text |
| FPL Green | `#00ff87` | Accent color, used for buttons, highlights |
| White | `#ffffff` | Background, text on dark surfaces |
| Light Gray | `#f9fafb` | Page backgrounds, subtle distinctions |

## Typography

- **Font Family**: Michroma (Google Fonts)
- **Usage**: All text throughout the application
- **Accessed via**: `font-family: var(--font-sans);`

## Component Styling

### FPL Card
- Purple gradient header (`from-fpl-purple to-fpl-purple/90`)
- White card body
- No padding in container
- Drop shadow and border

### FPL Button
- Green background with purple text (primary)
- Purple background with white text (secondary)
- Purple outline with purple text (outline)

### Tabs
- Purple active state
- Understated inactive state

## CSS Variables

```css
--background: 0 0% 100%;
--foreground: 270 100% 12%;
--card: 0 0% 100%;
--card-foreground: 270 100% 12%;
--popover: 0 0% 100%;
--popover-foreground: 270 100% 12%;
--primary: 270 100% 12%; /* FPL Purple #37003c */
--primary-foreground: 0 0% 100%;
--secondary: 0 0% 100%;
--secondary-foreground: 270 100% 12%;
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;
--accent: 0 255% 0%; /* FPL Green #00ff87 */
--accent-foreground: 0 0% 100%;
```

## Tailwind Configuration

Tailwind is configured with custom colors:
- `fpl-purple`: #37003c
- `fpl-green`: #00ff87

These can be used directly in Tailwind classes:
- `bg-fpl-purple`
- `text-fpl-green`
- `border-fpl-purple`

## Custom Components

The app has custom FPL-styled components that should be used for consistent styling:

### 1. FPL Button Component
```jsx
<FplButton>Button Text</FplButton>
<FplButton variant="secondary">Button Text</FplButton>
<FplButton variant="outline">Button Text</FplButton>
```

### 2. FPL Card Component
```jsx
<FplCard>
  <FplCardHeader>
    <FplCardTitle>Card Title</FplCardTitle>
    <FplCardDescription>Card description</FplCardDescription>
  </FplCardHeader>
  <FplCardContent>
    Card content here
  </FplCardContent>
</FplCard>
```

## Responsive Design Guidelines

- Mobile-first approach
- Breakpoints follow Tailwind defaults:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px
