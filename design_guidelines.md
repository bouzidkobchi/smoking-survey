# Design Guidelines: Express HTML Server Demo Page

## Design Approach
**System-Based Approach**: Minimal, modern design focusing on clarity and functionality. Drawing inspiration from developer tools and documentation sites for clean, readable presentation.

## Core Design Elements

### Color Palette
**Dark Mode** (primary):
- Background: 222 10% 10%
- Surface: 222 10% 15%
- Text Primary: 210 10% 95%
- Text Secondary: 210 8% 65%
- Accent: 142 76% 36% (green for success/active state)
- Border: 222 10% 25%

**Light Mode**:
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Text Primary: 222 10% 15%
- Text Secondary: 222 8% 40%
- Accent: 142 70% 45%
- Border: 220 10% 90%

### Typography
- **Primary Font**: 'Inter' via Google Fonts
- **Monospace**: 'JetBrains Mono' for code snippets
- **Headings**: font-bold, tracking-tight
- **Body**: font-normal, leading-relaxed

### Layout System
- Container: max-w-4xl mx-auto
- Spacing units: Use p-4, p-8, p-16, gap-4, gap-8
- Vertical rhythm: py-16 for sections, py-8 for subsections

### Component Library

**Hero Section**:
- Centered layout with clean typography
- Server status indicator (green dot + "Server Running")
- Main heading with gradient text effect (accent color)
- Subtitle explaining the demo
- No background image - clean, minimal

**Info Cards**:
- Rounded borders (rounded-lg)
- Subtle shadows (shadow-sm)
- Icon + heading + description layout
- 3-column grid on desktop (grid-cols-3), stack on mobile

**Code Display**:
- Dark background with syntax highlighting colors
- Monospace font
- Copy button in top-right corner
- Rounded corners

**Footer**:
- Centered minimal footer
- Build timestamp
- Express + Node version info
- Social/GitHub links

### Images
**No hero image** - This is a minimal demo page focusing on clean typography and layout. Use icon elements (checkmarks, server icons) as decorative SVG elements instead.

### Animations
- Subtle fade-in on page load (0.3s)
- Pulse effect on server status indicator
- Smooth hover transitions (150ms) on interactive elements

### Page Structure
1. **Header**: Logo/title + server status badge
2. **Hero**: Main heading + description (h-96)
3. **Features**: 3-column grid showing Express capabilities
4. **Code Snippet**: Example server code display
5. **Footer**: Minimal footer with metadata