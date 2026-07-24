Feature: Content consumption drives lesson completion, not scrubber position
  # All data below is DUMMY/SAMPLE data for portfolio demonstration only —
  # no real course content or learner accounts.
  # See ../docs/architecture-and-flow.md for the full completion-integrity rationale.

  Background:
    Given a dummy learner "demo.learner@example.com" is enrolled in course "DEMO-COURSE-101"
    And the course has a video lesson "Lesson 1" with required playback checkpoints

  Scenario: Watching a lesson fully marks it complete
    When the learner plays "Lesson 1" from start to end without seeking
    Then "Lesson 1" should be marked "COMPLETE"
    And the course progress percentage should increase accordingly

  Scenario: Seeking directly to the end does not mark the lesson complete
    When the learner seeks "Lesson 1" directly to its final timestamp without playing through
    Then "Lesson 1" should remain "IN PROGRESS"
    And the required playback checkpoints should be reported as unmet

  Scenario: Reported progress percentage reflects actual watched duration, not furthest seek point
    When the learner watches exactly 50 percent of "Lesson 1" and then seeks ahead without watching
    Then the reported progress percentage for "Lesson 1" should be 50 percent
