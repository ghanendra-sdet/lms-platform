# LMS Platform — UI Consistency

> Progress percentage, completion status, and assessment scores surface across the Course
> Catalog, the Lesson/Content Player, the Progress Dashboard, and Certification (see
> [`business-overview.md`](./business-overview.md)). This document covers whether it's
> represented **consistently** across all of them.

## Why This Matters More Here Than in Most Modules

Per [`business-overview.md`](./business-overview.md) section 4, this product's central risk is
false completion and grading inaccuracy — both silent failure modes. A learner (or their
employer's L&D team, for mandatory training) relies on the progress percentage and completion
badge as the truth of what's actually been learned. If the Content Player shows 100% while the
Progress Dashboard shows 80%, neither the learner nor Compliance can tell which is correct.

## 1. Completion Status Representation Consistency

| Status | Expected Label | Expected Color (convention) |
|---|---|---|
| Not started | "Not Started" | Neutral/Grey |
| In progress | "In Progress" | Blue/Amber |
| Content complete, assessment pending | "Assessment Pending" | Amber — distinct from a fully completed course |
| Fully complete (content + passing score) | "Completed" | Green |
| Certificate issued | "Certified" | Green, distinct badge from "Completed" |

**Test scenario:** "Assessment Pending" must never be shown identically to "Completed" — a
learner who's watched all the content but hasn't passed the quiz has not finished the course.

## 2. Progress Percentage Consistency

| Element | Convention to Verify |
|---|---|
| Course-level percentage | Must match exactly across Course Catalog card, Course Dashboard, and Progress Dashboard |
| Lesson-level checkmarks | A lesson marked complete in the player must show as complete everywhere else immediately, not after a delayed refresh |

## 3. Terminology Consistency

Per the glossary in [`business-overview.md`](./business-overview.md), watch for drift on:

- "Complete" vs. "Finished" vs. "Done" used interchangeably for the same lesson/course state
- "Mastery Score" vs. "Passing Score" vs. "Minimum Score" as different labels for the same
  threshold
- "Certificate" vs. "Credential" vs. "Badge" — pick one primary term for the earned artifact

## 4. Assessment Score Display Consistency

- The score shown immediately after submitting a quiz must match exactly what's later shown on
  the Progress Dashboard and any transcript/certificate detail view
- Pass/fail messaging must be worded identically regardless of which course or quiz triggered it

## 5. Empty States & Error Messages

- Does the Course Catalog show a deliberate empty state for a learner with zero enrollments,
  distinct from a load error?
- Is the "content failed to load" message worded consistently across video, reading, and SCORM
  content types?

## 6. Cross-Browser & Responsive Consistency

- Does the video/content player and progress indicators render identically across Chrome,
  Firefox, and Safari/WebKit?

## 7. Accessibility Consistency

- Are Not Started/In Progress/Assessment Pending/Completed/Certified states distinguishable by
  more than color alone?

---

## Coverage Mapping

See [`../regression-checklist.md`](../regression-checklist.md) section 5 for the UI consistency
test cases derived from this document.
