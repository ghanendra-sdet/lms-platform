# LMS Platform — Documentation Map

> New to this repo? Start here. This page points straight to the doc that answers whatever
> question you actually have.

| Question | Answer |
|---|---|
| What is this, in plain terms? | [`business-overview.md`](./business-overview.md) sections 1–2 |
| Who's involved / stakeholders? | [`business-overview.md`](./business-overview.md) section 5 |
| What does it depend on? | [`business-overview.md`](./business-overview.md) section 6 |
| What are the modules and submodules? | [`business-overview.md`](./business-overview.md) section 2 |
| How does content/progress tracking actually work — with real sequence diagrams? | [`architecture-and-flow.md`](./architecture-and-flow.md) |
| What's the highest-risk testing theme here? | [`business-overview.md`](./business-overview.md) section 4 (progress & completion integrity) |
| How does a false-completion or scoring defect actually happen under the hood? | [`architecture-and-flow.md`](./architecture-and-flow.md) sections 3, 5 |
| What tech was used, and what skills does this repo demonstrate? | [`tech-and-skills.md`](./tech-and-skills.md) |
| What does the UI need to get right, consistently? | [`ui-consistency.md`](./ui-consistency.md) |
| What's actually tested? | [`../regression-checklist.md`](../regression-checklist.md) |
| What's automated? | [`../automation/README.md`](../automation/README.md) |
| What does a realistic defect report look like? | [`../sample-defect-report.md`](../sample-defect-report.md) |
| What does a regression execution report look like? | [`../regression-execution-summary.md`](../regression-execution-summary.md) |
| What does a Requirement Traceability Matrix (RTM) actually look like? | [`../sample-rtm.md`](../sample-rtm.md) |

## Business Flow vs. Tech Flow vs. User Flow

- **Business Flow** — why completion integrity matters commercially. A certificate is a
  credential other systems (an employer's compliance record, a professional body) may rely on, so
  the platform's core promise is that "Completed" means genuine engagement, not a progress bar
  that happened to reach 100%. See [`business-overview.md`](./business-overview.md) sections 1
  and 4.
- **Tech Flow** — how content-consumption events and assessment scores flow into the Progress
  Tracking Service and gate Certification. See [`architecture-and-flow.md`](./architecture-and-flow.md).
- **User Flow** — what a learner actually clicks through: browse the Catalog, enroll, work
  through Lessons, take Assessments, watch Progress update, earn a Certificate once both gates are
  met. See [`regression-checklist.md`](../regression-checklist.md) sections 1–3.

## Reading Order

```
README.md (repo root)
      │
      ▼
docs/business-overview.md      ← what this is, modules/submodules, completion-integrity risk
      │
      ▼
docs/architecture-and-flow.md  ← sequence/flow diagrams: checkpoint tracking, the Defect #1/#2
      │                            mechanisms, assessment/certification flow
      ▼
docs/tech-and-skills.md        ← full tech stack, skill → proof map, CI/CD shape, performance depth
      │
      ▼
docs/ui-consistency.md         ← progress/completion status UI consistency
      │
      ▼
regression-checklist.md → sample-defect-report.md → sample-rtm.md → regression-execution-summary.md → automation/README.md
```
