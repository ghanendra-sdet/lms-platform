# LMS Platform — Automation Framework

> Automated scenarios trace directly to [`../regression-checklist.md`](../regression-checklist.md)
> sections 2–3 (progress tracking + assessment/certification). See
> [`../docs/README.md`](../docs/README.md) for the full documentation map,
> [`../docs/architecture-and-flow.md`](../docs/architecture-and-flow.md) for the sequence diagrams
> each scenario below is built to validate, and
> [`../docs/tech-and-skills.md`](../docs/tech-and-skills.md) section 5 for the full performance
> testing approach for this domain.

Automation for the enrollment-to-certification journey, built with **Playwright + TypeScript** and
**Cucumber (BDD)** for scenario definition.

## Why Playwright + Cucumber (BDD)

- Feature files written in plain language make the completion-integrity rules — "seeking to the
  end should NOT mark a lesson complete," for example (see
  [`../docs/architecture-and-flow.md`](../docs/architecture-and-flow.md)) — readable as business
  rules a non-QA stakeholder, an L&D or Compliance reviewer, can verify independently
- Playwright's video-player interaction APIs make genuine playback and seek-only interaction
  practical to simulate as distinct, repeatable scenarios

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
├── fixtures/
│   └── dummy-course-data.ts
└── k6/
    └── concurrent-streaming-load.js   ← concurrent content-streaming & checkpoint-ingestion load
```

> This repo currently includes one representative sample, sitting at the root of this folder
> (`sample-progress-tracking.feature` + `sample-progress-tracking.steps.ts`), rather than the full
> structure shown above — kept this way to stay focused as a portfolio piece.

## Test Data Policy

All automation uses dummy data only: dummy courses, dummy learner accounts, and dummy
video/SCORM content. Never real course material or real learner records.

## Priority Automated Scenarios

1. Enrollment happy path
2. Watching a video fully marks the lesson complete; seeking to the end does not
3. Auto-graded quiz scoring accuracy
4. Certification issued only when both the content and assessment gates are met
5. Cross-content-package consistency checks
6. Concurrent content-streaming / checkpoint-ingestion load testing (k6 — see
   [`../docs/tech-and-skills.md`](../docs/tech-and-skills.md) section 5)
