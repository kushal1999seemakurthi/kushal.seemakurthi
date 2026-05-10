# Architecture Documentation

High-level design and structural decisions for the portfolio and AI features.

---

## Core Documents

- **[Portfolio Structure](portfolio-structure.md)** — React 19 + motion/react scroll architecture, component hierarchy, section design
- **[Immersive Port Plan](immersive-port-plan.md)** — Elemental 3D portfolio with creature avatar, transitions, and interactive scenes (future phase)
- **[AI Features Roadmap](ai-features.md)** — Resume Analyzer, Chat RAG, Multi-Agent system specifications

---

## Quick Reference

**Current Stack:**
- React 19 + TypeScript
- motion/react (Framer Motion) for scroll-driven animations
- Tailwind v4 for styling
- Vite for build tooling
- Express for API routes (when needed)

**Portfolio Sections:**
1. Air (Introduction)
2. Water (Experience)
3. Earth (Skills)
4. Fire (Projects)
5. Spirit (Education)

**Scroll Architecture:**
- Single global `useScroll()` in App.tsx
- `activeSection` state (0-4) derived from scroll progress via 20% buckets
- Per-section local scroll listeners for parallax

---

## For AI Agents

When implementing new features:
1. Check [Portfolio Structure](portfolio-structure.md) to understand component layout
2. Review [AI Features Roadmap](ai-features.md) for feature specifications
3. Refer to CLAUDE.md for build/dev commands

If modifying scroll behavior:
- Review WEB_DEVELOPMENT_SKILL.md in docs/development/
- Ensure single source of truth for scroll state
- Test on real devices (phone + desktop)
