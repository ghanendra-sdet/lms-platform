# 🎓 LMS Platform

**A Learning Management System (course delivery, assessments & certification) — QA & Automation Portfolio Project**

> This repository documents the QA strategy, test automation, and testing approach applied to a
> sample **Learning Management System (LMS)** that lets learners enroll in courses, consume
> content (video/reading/SCORM), take assessments, and earn certificates.
>
> All content here uses **generic/sample data only**. No client names, company names, or
> confidential/production information are included. Dates and timelines are placeholders —
> update `[Timeline]` before publishing.
>
> 📍 **New here?** [`docs/README.md`](./docs/README.md) is a documentation map answering "what is
> this, how does it work, who's involved, what does it depend on" — with a recommended reading
> order through every doc in this repo.

---

## 📖 Table of Contents

1. [What is an LMS?](#-what-is-an-lms)
2. [My Role](#-my-role)
3. [Tech Stack & Tools Used](#-tech-stack--tools-used)
4. [Types of Testing Performed](#-types-of-testing-performed)
5. [How It Works — Course Completion Flow](#-how-it-works--course-completion-flow)
6. [Key Achievements](#-key-achievements)
7. [Automation Approach](#-automation-approach)
8. [Regression Checklist](#-regression-checklist)
9. [Screenshots & Reports](#-screenshots--reports)
10. [Repository Structure](#-repository-structure)

> Deeper dives not covered inline in this README: [Stakeholders & Dependencies](./docs/business-overview.md),
> [Architecture & Flow](./docs/architecture-and-flow.md), [UI Consistency](./docs/ui-consistency.md)
> — see [`docs/README.md`](./docs/README.md) for the full map.

---

## 💡 What is an LMS?

A **Learning Management System (LMS)** lets learners browse a course catalog, enroll, consume
course content (video, reading material, SCORM/xAPI packages), take assessments, and earn a
certificate on successful completion.

If you're new to ed-tech QA, HR, or any non-technical role: think of it as a school built into
software — the core testing challenge is that **a certificate is a credential**, so the platform
must be able to prove a learner genuinely engaged with the material and passed the required
assessment, not just that a progress bar visually reached 100%.

### Who typically interacts with it?

| Role | What they do |
|---|---|
| **Learner / Student** | Enrolls, consumes content, takes assessments, earns certificates |
| **Instructor** | Authors courses/assessments, monitors progress, grades manual assignments |
| **Course Admin** | Manages catalog structure and publishing/enrollment rules |
| **Platform Admin** | Manages platform-wide configuration and system health |

---

## 👤 My Role

QA Engineer / SDET responsible for the LMS module, owning manual and automated test coverage
across content-consumption tracking, assessment grading, and certification integrity.

- Owned QA strategy for the enrollment → content consumption → assessment → certification journey
- Designed and executed automation covering progress-tracking correctness, including
  seek-vs-genuine-playback scenarios
- Performed **API testing** validating assessment scoring calculations and completion-criteria
  gating logic
- Focused test design on **progress & completion integrity** — the single highest-severity risk
  category for a platform whose output is a credential
- Logged, triaged, and tracked defects through their full lifecycle

**Timeline:** `[Add Duration]`

---

## 🛠 Tech Stack & Tools Used

| Category | Tools |
|---|---|
| **UI Automation** | Playwright, TypeScript |
| **BDD Framework** | Cucumber |
| **API Testing** | Postman |
| **CI/CD** | Jenkins / GitHub Actions |
| **Bug Tracking** | JIRA |
| **Version Control** | Git, GitHub |

---

## 🧪 Types of Testing Performed

- **Functional Testing** — enrollment, content consumption, assessments, certification
- **Regression Testing** — full enrollment-to-certification suite run before every release
- **API Testing** — progress-tracking events, assessment scoring, certification-eligibility checks
- **Negative Testing** — seek-without-watching, unanswered-question scoring, failed-assessment
  certification blocking
- **Cross-Content-Package Consistency Testing** — SCORM/xAPI package variability
- **Cross-Browser Testing**
- **Smoke & Sanity Testing** — post-deployment health checks

---

## 🔄 How It Works — Course Completion Flow

```
Enrollment (learner enrolls in a course from the Catalog)
      │
      ▼
Content Consumption (video / reading / SCORM lessons)
      │
      ├──▶ Genuine playback through required checkpoints ──▶ Lesson COMPLETE
      │
      └──▶ Seek/skip past checkpoints without consuming them ──▶ Lesson remains IN PROGRESS
      │
      ▼
Assessment (auto-graded quiz or manually-graded assignment)
      │
      ▼
Certification Gate — BOTH must be true:
   ┌─────────────────────────┐   ┌──────────────────────────┐
   │ Content fully consumed   │ + │ Passing (Mastery) score   │
   └─────────────────────────┘   └──────────────────────────┘
      │
      ▼
Certificate issued only when both gates are independently satisfied
```

**Key testing principle:** content-consumption completion and passing-score completion are two
independent gates — a certificate must never be issued on partial satisfaction of either one, and
"reached the end of a video" must never be treated as equivalent to "watched the video." See
[`docs/business-overview.md`](./docs/business-overview.md) section 4 for the full rationale.

### Admin Functions

- Course catalog and publishing management
- Instructor grading queue for manual assignments
- Compliance/L&D completion reporting

---

## 🏆 Key Achievements

- Designed a progress-tracking-focused regression suite treating false completion (seek vs.
  genuine playback) as a first-class, highest-priority test scenario — catching a critical defect
  where seeking to a video's end falsely marked it complete (see
  [`sample-defect-report.md`](./sample-defect-report.md) Defect #1)
- Validated assessment scoring accuracy, catching a scoring-denominator defect that inflated
  scores when a question was left unanswered
- Verified cross-content-package consistency, treating SCORM/xAPI authoring-tool variability as
  its own dedicated test dimension
- Logged and tracked defects across completion-integrity and grading-accuracy themes

---

## 🤖 Automation Approach

Automation is built with **Playwright + TypeScript**, using **Cucumber (BDD)** for scenario
definition, covering the enrollment-to-certification journey.

### Priority Automated Scenarios

1. Enrollment happy path
2. Video-watched-fully marks lesson complete; seek-to-end does not
3. Auto-graded quiz scoring accuracy
4. Certification issued only when both content and assessment gates are met
5. Cross-content-package consistency checks

See [`automation/`](./automation) for the framework README and a sample feature file + step
definitions using dummy data.

---

## ✅ Regression Checklist

- [ ] Enrollment (single, duplicate prevention)
- [ ] Content Consumption & Progress Tracking (video, SCORM, cross-package consistency)
- [ ] Assessment & Grading (auto-graded, manually-graded)
- [ ] Certification (both gates required, neither gate alone sufficient)
- [ ] Discussion / Forums (course-scoped visibility)
- [ ] UI Consistency (status labeling, progress percentage, terminology, accessibility)

Full checklist with edge cases available in [`regression-checklist.md`](./regression-checklist.md).

---

## 📸 Screenshots & Reports

Sample test execution reports and defect report templates are available in
[`regression-execution-summary.md`](./regression-execution-summary.md) and
[`sample-defect-report.md`](./sample-defect-report.md).

---

## 📁 Repository Structure

> **New here?** Start with [`docs/README.md`](./docs/README.md) — a documentation map that
> answers "what is this, how does it work, who's involved, what does it depend on" and points to
> exactly the right doc for each question.

```
lms-platform/
├── README.md
├── regression-checklist.md          → Full regression suite + edge cases
├── sample-defect-report.md          → Defect theme taxonomy + worked defect examples
├── regression-execution-summary.md  → Sample regression test execution report
├── docs/
│   ├── README.md                    → 📍 Documentation map — start here
│   ├── business-overview.md         → What this is, stakeholders, dependencies, glossary, completion-integrity risk model
│   ├── architecture-and-flow.md     → Content-consumption + assessment/certification flow diagrams
│   └── ui-consistency.md            → Cross-screen UI/UX consistency (completion status, progress %, a11y)
└── automation/
    ├── README.md                          → Framework setup & structure
    ├── sample-progress-tracking.feature   → Sample Cucumber (BDD) feature file
    └── sample-progress-tracking.steps.ts  → Sample Playwright + TypeScript step definitions
```

> **Note on structure:** `bug-reports/`, `test-cases/`, and `test-reports/` were originally empty
> placeholder folders — flattened away entirely once real content was added, since a folder
> holding exactly one file (or none) adds navigation overhead without organizing anything. `docs/`
> and `automation/` remain folders because each genuinely groups multiple related files.
