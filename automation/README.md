# LMS Platform — Automation Framework

> Automated scenarios trace directly to [`../regression-checklist.md`](../regression-checklist.md)
> sections 2–3 (progress tracking + assessment/certification). See
> [`../docs/README.md`](../docs/README.md) for the full documentation map.

Automation for the enrollment-to-certification journey, built with **Playwright + TypeScript**,
using **Cucumber (BDD)** for scenario definition.

## Why Playwright + Cucumber (BDD)

- BDD-style feature files make the completion-integrity scenarios (e.g. "seeking to the end
  should NOT mark a lesson complete" — see
  [`../docs/architecture-and-flow.md`](../docs/architecture-and-flow.md)) readable as plain
  business rules, which matters here since these rules are exactly what a non-QA stakeholder
  (an L&D/Compliance reviewer) needs to verify independently
- Playwright's video-player interaction APIs make it practical to simulate both genuine playback
  and seek-only interaction as distinct, repeatable test scenarios

## Suggested Project Structure

```
automation/
├── README.md
├── playwright.config.ts
├── features/
│   └── sample-progress-tracking.feature
├── step-definitions/
│   └── sample-progress-tracking.steps.ts
├── pages/
│   ├── CourseCatalogPage.ts
│   ├── LessonPlayerPage.ts
│   └── ProgressDashboardPage.ts
└── fixtures/
    └── dummy-course-data.ts
```

> This repo currently includes one representative sample at the root of this folder
> (`sample-progress-tracking.feature` + `sample-progress-tracking.steps.ts`) rather than the full
> framework structure shown above, to keep the portfolio focused.

## Test Data Policy

All automation uses **dummy data only**: dummy courses, dummy learner accounts, and dummy
video/SCORM content — never real course material or real learner records.

## Priority Automated Scenarios

1. Enrollment happy path
2. Video-watched-fully marks lesson complete; seek-to-end does not
3. Auto-graded quiz scoring accuracy
4. Certification issued only when both content and assessment gates are met
5. Cross-content-package consistency checks
