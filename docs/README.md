# LMS Platform — Documentation Map

> New to this repo? Start here. This page answers the questions a tech-curious QA/SDET would
> actually ask, and points to exactly the doc that answers each one.

| Question | Answer |
|---|---|
| What is this, in plain terms? | [`business-overview.md`](./business-overview.md) sections 1–2 |
| Who's involved / stakeholders? | [`business-overview.md`](./business-overview.md) section 5 |
| What does it depend on? | [`business-overview.md`](./business-overview.md) section 6 |
| How does content/progress tracking actually work — tech flow? | [`architecture-and-flow.md`](./architecture-and-flow.md) |
| What's the highest-risk testing theme? | [`business-overview.md`](./business-overview.md) section 4 (progress & completion integrity) |
| What does the UI need to get right, consistently? | [`ui-consistency.md`](./ui-consistency.md) |
| What's tested? | [`../regression-checklist.md`](../regression-checklist.md) |
| What's automated? | [`../automation/README.md`](../automation/README.md) |
| What does a real-looking defect report look like? | [`../sample-defect-report.md`](../sample-defect-report.md) |
| What does a regression execution report look like? | [`../regression-execution-summary.md`](../regression-execution-summary.md) |

## Business Flow vs. Tech Flow vs. User Flow

- **Business Flow** — why completion integrity matters commercially: a certificate is a
  credential other systems (an employer's compliance record, a professional body) may rely on, so
  the platform's core trust guarantee is that "Completed" means genuine engagement, not just a
  progress bar reaching 100%. See [`business-overview.md`](./business-overview.md) sections 1
  and 4.
- **Tech Flow** — how content-consumption events and assessment scores actually flow into the
  Progress Tracking Service and gate Certification. See
  [`architecture-and-flow.md`](./architecture-and-flow.md).
- **User Flow** — what a learner actually clicks through: browse the Catalog → Enroll → consume
  Lessons → take Assessments → see Progress update → earn a Certificate once both gates are met.
  See [`regression-checklist.md`](../regression-checklist.md) sections 1–3.

## Reading Order

```
README.md (repo root)
      │
      ▼
docs/business-overview.md      ← what this is, completion-integrity risk, stakeholders, dependencies
      │
      ▼
docs/architecture-and-flow.md  ← content-consumption + assessment/certification flow
      │
      ▼
docs/ui-consistency.md         ← progress/completion status UI consistency
      │
      ▼
regression-checklist.md → sample-defect-report.md → regression-execution-summary.md → automation/README.md
```
