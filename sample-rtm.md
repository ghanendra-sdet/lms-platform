# Sample Requirement Traceability Matrix — LMS Platform

> Worked example using dummy data. An RTM is referenced throughout this portfolio as a core QA
> artifact — this is what that artifact actually looks like, not just a claim that it exists.
> See [`docs/README.md`](./docs/README.md) for the full documentation map.

## What an RTM Is Actually For

A regression checklist (see [`regression-checklist.md`](./regression-checklist.md)) answers
"what do we test." An RTM answers a different, equally important question: **"does every
business requirement have test coverage, and is that coverage actually sufficient?"** The two
documents look similar but serve different purposes — a checklist is organized by test area; an
RTM is organized by *requirement*, which is what makes it the tool that actually catches a
requirement with **no** test coverage at all, not just a weakly-tested one.

## The Matrix

| Req ID | Requirement (from a sample sprint story) | Linked Test Case(s) | Automation Status | Coverage Status |
|---|---|---|---|---|
| REQ-501 | A learner can enroll in a course and sees it at 0% progress | TC-001 | Automated | ✅ Covered |
| REQ-502 | A video watched fully, start to end, marks the lesson complete | TC-003 | Automated | ✅ Covered |
| REQ-503 | Seeking directly to a video's end does NOT mark the lesson complete | TC-004 | Automated | ✅ Covered — this is the requirement `BUG-LMS-4015` violated |
| REQ-504 | Reported progress percentage matches actual consumption, not the furthest-seeked point | TC-005 | Manual | ✅ Covered |
| REQ-505 | SCORM and xAPI packages for equivalent content register completion consistently | TC-006, TC-007 | Manual | ✅ Covered |
| REQ-506 | An auto-graded quiz score is calculated correctly against the full question count | TC-008 | Automated | ⚠️ Partial — covers a known-correct answer set, but not a score near the Mastery Score threshold, which is exactly where `BUG-LMS-4032`'s denominator bug actually flips a pass/fail outcome |
| REQ-507 | A certificate is issued only when both the content and score gates are independently satisfied | TC-010, TC-011 | Manual | ✅ Covered |
| REQ-508 | A manually-graded assignment routes to the instructor queue, never auto-scored | TC-012 | Manual | ✅ Covered |
| REQ-509 | Completion states are distinguishable without relying on color alone | TC-017 | Manual | ✅ Covered |
| REQ-510 | Checkpoint ingestion and content streaming hold their correctness and latency targets when many learners act concurrently (e.g., a compliance-deadline spike) | — | — | ❌ **Gap — identified when performance testing was added to this suite; see `docs/tech-and-skills.md` section 5** |

## What the Gaps Actually Caught

This is the part a checklist alone wouldn't surface, because a checklist only tells you about the
tests that already exist:

- **REQ-506**'s "Partial" rating came directly out of reading
  [`architecture-and-flow.md`](./docs/architecture-and-flow.md) section 5 closely: `BUG-LMS-4032`'s
  denominator bug (correct ÷ answered instead of correct ÷ total) only *changes the pass/fail
  outcome* for a learner whose true score sits below the Mastery Score while their inflated score
  sits above it — e.g., 6/10 (60%, a true fail) reported as 6/7 answered (86%, a false pass) for a
  70% Mastery Score. `TC-008`'s existing "known-correct answer set" doesn't construct that
  specific near-threshold case, so the regression suite could pass indefinitely while still
  carrying this exact defect class for any quiz configuration close to its own passing bar.
  Raised as a new story (illustrative ID `LMS-2117`): add a test case with a skipped question
  specifically positioned to flip the pass/fail outcome between the two denominator choices.
- **REQ-510** is a gap this RTM only caught because performance testing was added to this
  suite's scope at all — every existing checkpoint/tracking test case in this repo runs as a
  single learner, one session at a time. None of them say anything about whether checkpoint
  ingestion (the mechanism section 3 of `architecture-and-flow.md` depends on entirely) keeps up
  when many learners' event streams arrive concurrently, which is this product's actual realistic
  peak-load scenario around a compliance deadline.

**The general pattern:** an RTM's value isn't the rows that say "Covered" — those just confirm
existing test design. Its value is specifically the rows that say "Gap" or "Partial," because
those are the requirements a test-case-first workflow (write tests, forget to check them against
the original requirement list) would never have surfaced on its own.
