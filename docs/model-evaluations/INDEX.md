# Model Evaluations Index

Comprehensive evaluation of LLM models tested for portfolio AI features.

---

## Models Evaluated

### groq/compound (Groq Free Tier)
- **Status:** In Progress (1/5 tests)
- **Best for:** Structured analysis, polished output, production deployment
- **Cost:** Free (30 RPM, 70K TPM)
- **Evaluation file:** [GROQ_COMPOUND_EVAL.md](GROQ_COMPOUND_EVAL.md)
- **Tests:**
  - [x] BUSINESS (Strategic reasoning) — B+ score
  - [ ] MATH (Quantitative reasoning)
  - [ ] POLITICAL (Nuanced stakeholder analysis)
  - [ ] EMOTIONAL (EQ & feedback delivery)
  - [ ] PROBLEM-SOLVING (Root-cause diagnosis)

### openai/gpt-oss-120b (Reference Model)
- **Status:** Complete (5/5 tests)
- **Best for:** Exploratory reasoning, depth, complex analysis
- **Cost:** ~$0.50/1M tokens (not free)
- **Evaluation file:** [OPENAI_GPT_OSS_120B_EVAL.md](OPENAI_GPT_OSS_120B_EVAL.md)
- **Tests:**
  - [x] MATH — Correct calculations, proper SBI framework (613 reasoning tokens)
  - [x] POLITICAL — Nuanced stakeholder analysis, 8 hidden assumptions surfaced (3072 tokens)
  - [x] EMOTIONAL — 7-step feedback framework, realistic dialogue (high EQ)
  - [x] PROBLEM-SOLVING — Root-cause diagnosis, 5 solution families, phased rollout (3072 tokens, hit limit)
  - [x] BUSINESS — Decision matrix, TAM slices, strategic recommendations (3072 tokens, hit limit)

---

## Quick Comparison

| Dimension | groq/compound | openai/gpt-oss-120b |
|-----------|---------------|-------------------|
| MATH | Pending | ⭐⭐⭐⭐ (Correct, efficient) |
| POLITICAL | Pending | ⭐⭐⭐⭐⭐ (Nuanced, sophisticated) |
| EMOTIONAL | Pending | ⭐⭐⭐⭐⭐ (High EQ, practical) |
| PROBLEM-SOLVING | Pending | ⭐⭐⭐⭐ (Rigorous, token-limited) |
| BUSINESS | ⭐⭐⭐⭐ (B+, polished) | ⭐⭐⭐⭐ (Comprehensive, token-limited) |
| **Production fit** | ✅ Free tier | ⚠️ Paid, needs token increase |

---

## Model Selection Recommendation

**For Resume Analyzer:** groq/compound (free, structured output)  
**For Multi-Agent Chat:** groq/compound (if reasoning tests pass) or hybrid (groq for primary, openai/gpt-oss-120b for deep reasoning with higher token budget)  
**For Exploratory features:** openai/gpt-oss-120b with increased max_tokens (4096+)

---

## Testing Methodology

Each model tested across 5 reasoning dimensions:
1. **MATH** — Quantitative logic, calculations, optimization
2. **POLITICAL** — Stakeholder analysis, nuance, unspoken assumptions
3. **EMOTIONAL** — Empathy, social intelligence, conflict de-escalation
4. **PROBLEM-SOLVING** — Decomposition, root causes, solution design
5. **BUSINESS** — Strategic thinking, trade-offs, decision matrices

**Evaluation criteria:**
- Correctness (does it solve the problem?)
- Depth (does it explore multiple angles?)
- Clarity (is it well-structured and actionable?)
- Efficiency (token usage, latency, cost)
- Production readiness (polish, defensibility)

---

## Raw Test Data

Full curl commands, response JSONs, and token breakdowns stored in:
- `groq-compound/` — Groq API responses
- `openai-gpt-oss-120b/` — OpenAI API responses

---

## Next Steps

1. Complete groq/compound 4 remaining tests (MATH, POLITICAL, EMOTIONAL, PROBLEM-SOLVING)
2. Document results in GROQ_COMPOUND_EVAL.md
3. Compare all 5 dimensions side-by-side
4. Finalize model selection for Resume Analyzer implementation
5. Archive test data with evaluation docs
