# Deployment Documentation

Infrastructure, environment setup, and production deployment guides.

---

## Core Documents

- **[Cloudflare Pages Setup](cloudflare-pages.md)** — Deployment to production, caching strategy, environment variables
- **[Environment Setup](environment-setup.md)** — API keys, secrets management, .env configuration

---

## Quick Reference

### Current Deployment
- **Platform:** Cloudflare Pages
- **Domain:** kushal.seemakurthi.com (portfolio subdomain on main seemakurthi.com)
- **Build command:** `npm run build`
- **Output directory:** `dist/`
- **Node version:** 20

### Environment Variables

**Required (keep in .env.local, never commit):**
```
GROQ_API_KEY=gsk_xxxxx
PINECONE_API_KEY=xxxxx  (when implementing RAG)
VITE_API_URL=https://kushal.seemakurthi.com  (production)
```

**Optional (can be hardcoded):**
```
VITE_GA_ID=G-xxxxx  (Google Analytics)
SENTRY_DSN=https://xxxxx  (Error tracking)
```

---

## Deployment Flow

1. **Local development:** Feature branch, `npm run dev` to test
2. **Build:** `npm run build` produces `dist/`
3. **Pre-deploy checks:**
   - `npm run lint` passes
   - Lighthouse ≥85 mobile / ≥90 desktop
   - Manual smoke test on production features
   - No secrets in code
4. **Push to main:** Triggers Cloudflare Pages auto-deploy
5. **Verify production:** Check live site, test critical paths
6. **Monitor:** Sentry errors, analytics, Core Web Vitals

---

## Environment Secrets

### Groq API Key
- Get from: https://console.groq.com/keys
- **Important:** Keys auto-revoke if exposed in git history
- **Storage:** `~/.groq_key` file (local machine only)
- **Usage:** `export GROQ_API_KEY=$(cat ~/.groq_key)`

### Pinecone API Key (when needed)
- Get from: https://app.pinecone.io/
- Store in Cloudflare Pages secrets dashboard (never in .env file)
- Backend only — frontend calls through API endpoint

### Cloudflare Secrets
1. Log in to Cloudflare dashboard
2. Go to project → Settings → Environment Variables
3. Add secrets for production (`GROQ_API_KEY`, etc.)
4. Redeploy to apply

---

## Monitoring & Post-Deploy

**Lighthouse CI:**
- Run before each deployment
- Target: ≥85 mobile / ≥90 desktop
- Monitor trend over time

**Sentry (Error Tracking):**
- Set up at deployment phase
- Track production JS errors
- Alert on new error signatures

**Google Analytics:**
- Track user engagement
- Monitor bounce rate, scroll depth
- Identify which AI features drive engagement

**Uptime & Performance:**
- Cloudflare analytics dashboard (built-in)
- Monitor response times per region
- Check cache hit ratios

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Build fails on deploy | Check `npm run build` locally first; verify all dependencies in package.json |
| Secrets not available | Add to Cloudflare dashboard, redeploy (takes ~2min) |
| Old version still live | Clear browser cache or hard refresh (Cmd+Shift+R) |
| API calls fail in production | Verify `VITE_API_URL` env var is set correctly |
| Lighthouse score dropped | Check DevTools Performance tab; likely JS bundle bloat or new asset |

---

## For AI Agents

**Deploying a new feature?**
1. Merge to main branch
2. Verify Cloudflare build succeeds (check dashboard)
3. Test production URL on real device
4. Monitor Sentry for new errors in first 30 minutes

**Adding API keys for new features?**
1. Generate key from service (Groq, Pinecone, etc.)
2. Add to .env.local locally (test locally first)
3. Add to Cloudflare Pages secrets dashboard
4. Redeploy
5. Verify production call succeeds

**Troubleshooting production issues?**
1. Check Cloudflare Pages build logs (failed build shows here)
2. Check Sentry error dashboard (runtime errors)
3. Check browser DevTools Network tab (API/asset failures)
4. Compare local `npm run dev` behavior to production
5. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+Del)
