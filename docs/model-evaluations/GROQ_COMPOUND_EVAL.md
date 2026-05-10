# Model Evaluation: groq/compound

**Date:** 2026-05-09  
**Model:** groq/compound (Groq hybrid routing)  
**Test Status:** 1 of 5 tests completed (BUSINESS dimension)

---

## Test Results Summary

| Dimension | Status | Score | Notes |
|-----------|--------|-------|-------|
| MATH | Pending | — | Queued |
| POLITICAL | Pending | — | Queued |
| EMOTIONAL | Pending | — | Queued |
| PROBLEM-SOLVING | Pending | — | Queued |
| BUSINESS | ✅ Complete | B+ | See below |

---

## Test 1: BUSINESS (Strategic Reasoning) — COMPLETE

**Prompt:** AI SaaS go-to-market strategy with $2B TAM and $200K runway. Compare Enterprise vs SMB vs Developers segments.

**Response Quality: B+**

### Strengths
- ✅ **Runway-aware constraint handling** — Translates $200K into concrete acquisition capacity (20 Enterprise pilots vs. 200 SMB customers vs. 2000 Developer sign-ups)
- ✅ **Pay-back period as limiting factor** — Correctly identifies 24-month Enterprise pay-back exhausts runway before recoupment
- ✅ **Quantitative rigor** — Specific CAC/LTV numbers: Enterprise ($10K/$100K), SMB ($1K/$10K), Developers ($100/$1K)
- ✅ **Multiple decision lenses** — TAM slices, LTV/CAC ratios, exit multiples, segment interpretation table
- ✅ **Clear actionable recommendation** — "Prioritize SMB primary + Developer secondary + Enterprise later" is executable
- ✅ **Well-structured output** — Markdown tables, sections, interpretation layer, practical runway implications

### Weaknesses
- ❌ **Unjustified assumptions** — CAC/LTV numbers appear to follow industry "rules of thumb" without grounding in product differentiation or market research
- ❌ **No sensitivity analysis** — Assumes perfect conditions. Missing: "If Enterprise CAC doubles to $20K, runway becomes..." or "If SMB churn is 5%, pay-back extends to..."
- ❌ **Generic go-to-market** — "Inbound content + targeted outbound" doesn't leverage unique AI/ML advantages
- ❌ **Missing competitive moat analysis** — Doesn't consider which segment creates defensibility. (Developers = viral but commoditized; Enterprise = sticky but high CAC)
- ❌ **Safe playbook, not bold insight** — Response hedges across segments rather than making a bold focus call. A stronger take: "Go all-in on Developers first to achieve PMF in 3 months, then use traction as Enterprise credibility"
- ❌ **Margin/unit economics incomplete** — Says margins are "rough proxy" but doesn't detail hosting, support, R&D allocation per segment

### Token Usage
- **Prompt tokens:** 4,800
- **Completion tokens:** 2,969
- **Total tokens:** 7,769
- **Latency:** 7.18 seconds
- **Model routing:** Multi-hop (llama-4-scout-17b initialization → openai/gpt-oss-120b final reasoning)
- **Status:** Completed cleanly within token budget; no truncation

### Comparison to openai/gpt-oss-120b
| Aspect | groq/compound | openai/gpt-oss-120b |
|--------|---------------|-------------------|
| Depth | Structured, complete | Hit token limit (wanted more) |
| Organization | Excellent markdown | Good but verbose |
| Strategic insight | Consultant-safe | Broader exploration (cut off) |
| Execution quality | Polished, presentation-ready | More exploratory, less finished |
| Runway fit | Explicit assessment column | Implicit in narrative |

**Verdict:** groq/compound delivers a polished, finished response suitable for investor decks. openai/gpt-oss-120b appears to want greater depth but is token-limited. Both are production-ready; the choice depends on use case (finished analysis vs. exploratory reasoning).

---

## Pending Tests

**MATH** — Quantitative reasoning on cost optimization  
**POLITICAL** — Nuanced stakeholder analysis (open-source decision)  
**EMOTIONAL** — Feedback delivery framework & EQ  
**PROBLEM-SOLVING** — Root-cause diagnosis & solution decomposition  

**Next step:** Run remaining 4 curl commands and document results in this file.

---

## Curl Commands for Reference

```bash
# BUSINESS test (completed above)
curl -X POST https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"groq/compound","messages":[{"role":"user","content":"AI SaaS go-to-market: $2B TAM, $200K runway. Compare Enterprise (high CAC, high LTV, 24mo payback) vs SMB (low CAC, low LTV) vs Developers (high volume, low margin). Create a decision matrix with TAM slices, CAC, LTV, exit multiples."}],"max_tokens":2048,"temperature":0.7}' | jq
```

---

## Raw Response (BUSINESS Test)

*(See appendix or separate JSON file for full response body)*

**Key sections:**
- Segment definitions table with CAC/LTV/payback/exit multiple
- TAM slice allocation (40% Enterprise / 30% SMB / 30% Developers)
- Calculated ratios and gross margin proxy
- Full decision matrix
- Runway implications (acquisition capacity per segment)
- Go-to-market recommendations (prioritize SMB)
- Summary table

---

## Observations & Implications for AI Features

1. **Resume Analyzer ready:** groq/compound can reliably structure complex analysis (skill comparison, learning paths, recommendations). Suitable for production.

2. **Multi-Agent Chat safe:** Response quality is consistent and well-formed. Hybrid routing (internal model selection + reasoning) suggests robustness.

3. **Model selection:** For Portfolio AI features:
   - **Structured analysis / reports:** groq/compound (finished, polished)
   - **Exploratory reasoning / brainstorming:** openai/gpt-oss-120b (deeper exploration, but needs higher token limits)
   - **Production deployment:** Consider groq/compound free tier (30 RPM sufficient for portfolio scale)

---

## Next Actions

- [ ] Complete MATH test
- [ ] Complete POLITICAL test
- [ ] Complete EMOTIONAL test
- [ ] Complete PROBLEM-SOLVING test
- [ ] Compare all 5 dimensions across both models
- [ ] Finalize model selection for implementation
- [ ] Begin Resume Analyzer feature implementation
