# LMS Platform — Architecture & Flow

> See [`business-overview.md`](./business-overview.md) for why progress/completion integrity is
> this product's central risk, and [`README.md`](./README.md) for the full documentation map.

## Content Consumption & Progress Tracking Flow

```
Learner opens a course lesson (video / reading / SCORM package)
      │
      ▼
Content Delivery Service streams the content and emits consumption events
   (play, pause, seek, progress-checkpoint, complete)
      │
      ▼
Progress Tracking Service evaluates events against the lesson's Completion Criteria
      │
      ├──▶ Genuine full consumption (watched/read through, checkpoints hit in order)
      │          │
      │          ▼
      │    Lesson marked COMPLETE
      │
      └──▶ Seek/skip past required checkpoints without consuming them
                 │
                 ▼
           Lesson must NOT be marked complete — checkpoints must be hit, not just reached
```

**Key testing principle:** "reached the end of the video" and "watched the video" are not the
same event. A seek/skip to the final timestamp must not satisfy completion criteria that are
meant to represent genuine engagement — see
[`../sample-defect-report.md`](../sample-defect-report.md) Defect #1.

## Assessment & Certification Flow

```
Learner takes a quiz/assignment
      │
      ├──▶ Auto-graded (quiz) ──▶ Assessment/Grading Engine scores against the Mastery Score
      │
      └──▶ Manually-graded (assignment) ──▶ Instructor reviews and enters a score
      │
      ▼
Score recorded against the course's Completion Criteria
      │
      ▼
Progress Tracking Service checks: has the learner met BOTH content-consumption AND
score requirements?
      │
      ├──▶ Yes ──▶ Certification Service issues a certificate
      │
      └──▶ No ──▶ Course remains IN PROGRESS, learner sees exactly what's outstanding
```

**Key testing principle:** a certificate must never be issued on partial satisfaction of
completion criteria — content-consumption completion and passing-score completion are two
independent gates, and both must be independently verified as met, not inferred from one another.

## System Interaction Map

```
   ┌──────────┐        ┌────────────────────────┐        ┌─────────────────────┐
   │ Learner   │◀──────▶│ Content Delivery Service │──────▶│ Progress Tracking    │
   └──────────┘        └────────────────────────┘        │ Service              │
                                                            └──────────┬───────────┘
   ┌──────────┐        ┌────────────────────────┐                    │
   │ Instructor│◀──────▶│ Assessment/Grading Engine│───────────────────┤
   └──────────┘        └────────────────────────┘                    ▼
                                                            ┌─────────────────────┐
                                                            │ Certification Service│
                                                            └─────────────────────┘
```

## Why SCORM/xAPI Package Variability Is a Cross-Content Consistency Risk

Not every course's content package (SCORM vs. xAPI, and across different authoring tools) emits
tracking events in exactly the same shape. This is conceptually the same risk category as BBPS's
biller-integration variability or YOBO's FIP variability (see the
[BBPS repository](https://github.com/ghanendra-sdet/bbps-bill-payment-platform)): a
progress-tracking defect that only manifests for courses built with a specific authoring tool,
invisible if testing only ever uses one "reference" course's content package.
