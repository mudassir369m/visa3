---
name: Global layout wiring
description: Where global layout components (cursor, scroll, bubbles) live in the app
---

All global layout components mount in `artifacts/new-euro/src/App.tsx`:
- ThemeProvider (outermost)
- LenisProvider (smooth scroll)
- QueryClientProvider, TooltipProvider
- WouterRouter
  - <CustomCursor />
  - <SocialRail />
  - <WhatsAppBubble />
  - <Router /> (all page routes)

**main.tsx is bare** — just `createRoot(...).render(<App />)`. No providers or layout components there.

**Why:** SocialRail/WhatsAppBubble were only in Home.tsx before — moved to App.tsx so they appear on every page. LenisProvider/CustomCursor were duplicated in both main.tsx and App.tsx — removed from main.tsx to prevent double instances.

**How to apply:** Add new global UI (chat widget, cookie banner, etc.) inside the WouterRouter in App.tsx, NOT in individual pages.
