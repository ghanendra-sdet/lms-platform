# LMS Platform — Regression Checklist & Test Cases

> Sample regression suite structure with dummy data. Format: ID | Scenario | Steps | Expected Result.
> See [`docs/business-overview.md`](./docs/business-overview.md) for why progress/completion
> integrity (section 4) is treated as a first-class scenario here, and
> [`docs/README.md`](./docs/README.md) for the full documentation map.

## 1. Enrollment

| ID | Scenario | Steps | Expected Result |
|---|---|---|---|
| TC-001 | Learner enrolls in a course | 1. Browse the dummy Course Catalog 2. Enroll in a course | Course appears in the learner's dashboard with 0% progress |
| TC-002 | Duplicate enrollment prevented | 1. Attempt to enroll in the same course twice | Second attempt rejected/no-ops with a clear message |

## 2. Content Consumption & Progress Tracking (Highest Priority)

> Derived from [`docs/architecture-and-flow.md`](./docs/architecture-and-flow.md) — genuine
> engagement, not just "reached the end," must drive completion.

| ID | Scenario | Steps | Expected Result |
|---|---|---|---|
| TC-003 | Video watched fully marks lesson complete | 1. Play a dummy video lesson from start to end without seeking | Lesson marked `COMPLETE` |
| TC-004 | Seeking to the end does NOT mark the lesson complete | 1. Open a dummy video lesson 2. Seek directly to the final timestamp without watching | Lesson remains `IN PROGRESS`, required checkpoints not satisfied |
| TC-005 | Progress percentage matches actual consumption | 1. Watch exactly 50% of a dummy video 2. Check the reported progress percentage | Reported percentage matches the actual watched duration, not the furthest-seeked point |
| TC-006 | SCORM package completion event correctly interpreted | 1. Complete a dummy SCORM-packaged lesson per its own completion signal | Progress Tracking Service correctly marks the lesson complete |
| TC-007 | Cross-content-package consistency | 1. Complete an identical dummy lesson delivered via two different authoring-tool packages | Both register completion consistently — no package-specific tracking gap |

## 3. Assessment & Certification

| ID | Scenario | Steps | Expected Result |
|---|---|---|---|
| TC-008 | Auto-graded quiz scores correctly | 1. Submit a dummy quiz with a known-correct answer set | Reported score matches the expected calculation exactly |
| TC-009 | Quiz score below Mastery Score blocks certification | 1. Submit a dummy quiz scoring below the passing threshold | Course remains incomplete; certificate NOT issued |
| TC-010 | Content complete + passing score issues a certificate | 1. Complete all content 2. Pass the required assessment | Certificate issued; course shows `Certified` |
| TC-011 | Content complete WITHOUT passing score does not certify | 1. Complete all content 2. Fail (or skip) the assessment | Course shows `Assessment Pending`, not `Completed` or `Certified` |
| TC-012 | Manually-graded assignment routes to instructor | 1. Submit a dummy assignment | Assignment appears in the Instructor's grading queue, not auto-scored |

## 4. Discussion / Forums

| ID | Scenario | Steps | Expected Result |
|---|---|---|---|
| TC-013 | Learner can post in a course-scoped forum | 1. Post a dummy message in a course's discussion forum | Message visible to other learners/instructor in that course only |

## 5. UI Consistency

> Derived from [`docs/ui-consistency.md`](./docs/ui-consistency.md) — cross-screen consistency,
> not single-screen correctness.

| ID | Scenario | Steps | Expected Result |
|---|---|---|---|
| TC-014 | Completion status labeling consistency | 1. Compare "In Progress"/"Assessment Pending"/"Completed"/"Certified" labels across Catalog, Dashboard, and Certification views | Identical labels and colors everywhere |
| TC-015 | Progress percentage consistency | 1. Compare a course's progress percentage across the Catalog card, Course Dashboard, and Progress Dashboard | Identical percentage everywhere, updated immediately |
| TC-016 | Assessment score consistency | 1. Compare a quiz score shown immediately after submission against the Progress Dashboard | Identical score in both places |
| TC-017 | Completion states distinguishable without color | 1. View all 5 completion states with color/grayscale rendering simulated | Each remains distinguishable via icon/text label alone |

## 6. Full Regression Checklist

- [ ] Enrollment (single, duplicate prevention)
- [ ] Content Consumption & Progress Tracking (video, SCORM, cross-package consistency)
- [ ] Assessment & Grading (auto-graded, manually-graded)
- [ ] Certification (both gates required, neither gate alone sufficient)
- [ ] Discussion / Forums (course-scoped visibility)
- [ ] UI Consistency (status labeling, progress percentage, terminology, accessibility)

## 7. Priority Automation Candidates

1. Enrollment happy path
2. Video-watched-fully marks lesson complete; seek-to-end does not
3. Auto-graded quiz scoring accuracy
4. Certification issued only when both content and assessment gates are met
5. Cross-content-package consistency checks

See [`automation/`](./automation) for the Playwright + Cucumber (BDD) implementation.
