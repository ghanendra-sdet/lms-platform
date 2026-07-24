# Sample Defect Report — LMS Platform

> Template + worked examples using dummy data. Reflects the progress/completion-integrity defect
> theme that is the primary risk area for this module — see
> [`docs/business-overview.md`](./docs/business-overview.md) section 4 for why, and
> [`docs/README.md`](./docs/README.md) for the full documentation map.

---

## Defect #1

| Field | Value |
|---|---|
| **ID** | BUG-LMS-4015 (sample) |
| **Title** | Seeking a video lesson directly to its final timestamp marks it complete without any actual viewing |
| **Severity** | Critical |
| **Module** | LMS → Content Consumption & Progress Tracking |
| **Environment** | UAT (dummy data) |

**Steps to Reproduce**
1. Open a dummy video lesson with a defined completion checkpoint requirement
2. Seek the video player's scrubber directly to the final few seconds without playing through
   the rest
3. Let the video reach its end

**Expected Result**
Per [`docs/architecture-and-flow.md`](./docs/architecture-and-flow.md), completion requires
genuine engagement — required checkpoints must be *hit through playback*, not just reached via a
scrubber seek.

**Actual Result**
The lesson is marked `COMPLETE` — the tracking logic only checks whether the player's current
timestamp ever reached the video's end, regardless of how it got there.

**Impact**
Undermines the platform's core trust guarantee that "Completed" means genuine engagement — a
learner (or their employer's compliance record, for mandatory training) can appear to have
completed content they never actually watched.

**Suggested Fix**
Track playback checkpoints as events that must be emitted during forward playback (not via seek),
and require a minimum set of in-order checkpoints to be satisfied before marking a lesson
complete — a raw "reached end-of-video timestamp" check is not sufficient.

---

## Defect #2

| Field | Value |
|---|---|
| **ID** | BUG-LMS-4032 (sample) |
| **Title** | Auto-graded quiz score calculation is off by one question when a question is skipped |
| **Severity** | Major |
| **Module** | LMS → Assessment & Grading |
| **Environment** | UAT (dummy data) |

**Steps to Reproduce**
1. Take a dummy 10-question quiz with a Mastery Score of 70%
2. Deliberately skip one question (leave it unanswered) and answer the remaining 9 correctly
3. Submit the quiz and check the reported score

**Expected Result**
9 correct out of 10 total questions should score 90%, well above the 70% Mastery Score.

**Actual Result**
The reported score is 100% — the grading engine calculates the percentage against only the
*answered* questions (9/9) rather than the total question count (9/10), inflating the score and
incorrectly granting certification eligibility to a learner who left a question unanswered.

**Impact**
Certificates can be issued based on an inflated score — a direct correctness and credential-trust
issue, since it lets a learner receive credit for material they never actually demonstrated
knowledge of.

**Suggested Fix**
Calculate the score as correct-answers ÷ total-questions-in-the-quiz, treating an unanswered
question as incorrect for scoring purposes, not silently excluding it from the denominator.

---

## Defect Reporting Template (blank)

| Field | Value |
|---|---|
| **ID** | |
| **Title** | |
| **Severity** | Minor / Major / Critical / Blocker |
| **Module** | |
| **Environment** | |

**Steps to Reproduce**
1.
2.
3.

**Expected Result**


**Actual Result**


**Impact**


**Suggested Fix**

