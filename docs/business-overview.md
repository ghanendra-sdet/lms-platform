# LMS Platform — Business Overview

> **Start here if you're new to ed-tech QA, in HR, or from a non-QA technical role.** This
> document explains what a Learning Management System does and why progress/completion integrity
> is the central testing concern, before you look at any test case or code.

## 1. What problem does it solve?

A Learning Management System (LMS) lets learners browse a course catalog, enroll, consume course
content (video, reading material, SCORM packages), take assessments, and earn a certificate on
successful completion — while giving instructors and admins the tools to author courses and track
learner progress at scale.

## 2. Core Modules

- **Course Catalog & Enrollment** — browsing, searching, and enrolling in courses
- **Content Delivery** — video lessons, reading materials, and SCORM/xAPI-packaged content
- **Assessments & Quizzes** — auto-graded and manually-graded knowledge checks
- **Progress Tracking & Grading** — per-learner completion percentage and assessment scores
- **Certification** — issued once completion criteria (content consumption + passing score) are met
- **Discussion / Forums** — course-scoped learner-instructor and learner-learner discussion
- **Instructor/Admin Course Authoring** — building and publishing course content and assessments

## 3. Core Flow

1. **Enrollment** — learner browses the catalog and enrolls in a course
2. **Content Consumption** — learner works through video/reading/SCORM content
3. **Assessment** — learner takes quizzes/assignments tied to the course
4. **Progress Tracking** — the platform records completion percentage and scores as the learner progresses
5. **Completion & Certification** — once completion criteria are met, a certificate is issued

## 4. Why Progress & Completion Integrity Is the Central Testing Theme

A certificate is a credential — it represents a claim that the learner actually engaged with and
passed the material. That claim is only as trustworthy as the platform's progress-tracking logic,
which creates two closely related risk categories:

- **False completion** — content marked "complete" without the learner actually consuming it (a
  video seeked/skipped to the end, rather than watched, still registering 100% progress)
- **Grading inaccuracy** — an auto-graded quiz miscalculating a score, incorrectly denying or
  granting the passing threshold needed for certification

Both failure modes are invisible in a UI walkthrough that only checks "does the progress bar
move" — they require testing what's actually happening in the underlying tracking data, not just
what the UI displays.

## 5. Stakeholders / Involved Parties

| Stakeholder | Role in this module |
|---|---|
| **Learner / Student** | Enrolls, consumes content, takes assessments, earns certificates |
| **Instructor** | Authors course content and assessments, monitors learner progress, grades manual assignments |
| **Course Admin** | Manages course catalog structure, publishing workflow, and enrollment rules |
| **Platform Admin** | Manages platform-wide configuration, user roles, and system health |
| **Compliance/L&D Team** | Relies on accurate completion records for mandatory-training reporting |

## 6. Dependencies

### Internal Platform Dependencies

- **Progress Tracking Service** — the authoritative record of a learner's content-consumption and
  assessment state; the single most load-bearing internal dependency, since Certification reads
  directly from it
- **Content Delivery / Streaming Service** — serves video and SCORM content and reports
  consumption events (play, pause, seek, complete) back to Progress Tracking
- **Assessment/Grading Engine** — scores quizzes and assignments against defined mastery thresholds
- **Certification Service** — issues certificates once completion criteria are satisfied

### External Dependencies

- **SCORM/xAPI Content Packages** — third-party or externally-authored content packages whose
  tracking-event format the platform must correctly interpret
- **Learning Record Store (LRS)** — if xAPI is used, an external or embedded store of learning
  activity statements

## 7. Glossary

| Term | Meaning |
|---|---|
| **SCORM** | A standard packaging/tracking format for e-learning content |
| **xAPI (Tin Can API)** | A more flexible learning-activity tracking standard succeeding SCORM |
| **LRS (Learning Record Store)** | A system storing xAPI learning-activity statements |
| **Completion Criteria** | The defined rule(s) determining when a course counts as complete (e.g. 100% content viewed + passing quiz score) |
| **Mastery Score** | The minimum score required to pass an assessment |
| **Enrollment** | The process of a learner joining a course |

## 8. Cross-Module Dependencies

- **Progress Tracking Service** — read by both Certification and any Compliance/L&D reporting;
  a defect here has the widest blast radius in the platform (see
  [`sample-defect-report.md`](../sample-defect-report.md) Defect #1)
- **Assessment/Grading Engine** — a scoring defect can silently block or incorrectly grant
  certification, independent of any content-consumption issue
