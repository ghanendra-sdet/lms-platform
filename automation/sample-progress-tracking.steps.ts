/**
 * Sample Cucumber step definitions (Playwright + TypeScript) for
 * sample-progress-tracking.feature. All data below is DUMMY/SAMPLE data
 * for portfolio demonstration only — no real course content or learner
 * accounts.
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';

let page: Page;
let currentLessonId: string;

Given('a dummy learner {string} is enrolled in course {string}', async (email: string, courseId: string) => {
  await page.goto(`/courses/${courseId}?enrollAs=${encodeURIComponent(email)}`);
});

Given('the course has a video lesson {string} with required playback checkpoints', async (lessonName: string) => {
  currentLessonId = lessonName;
  await page.goto(`/lessons/${encodeURIComponent(lessonName)}`);
});

When('the learner plays {string} from start to end without seeking', async (lessonName: string) => {
  await page.getByTestId('play-button').click();
  await page.waitForSelector('[data-testid="playback-complete"]', { timeout: 30000 });
});

When('the learner seeks {string} directly to its final timestamp without playing through', async (lessonName: string) => {
  await page.getByTestId('video-scrubber').evaluate((el: HTMLInputElement) => {
    el.value = el.max;
    el.dispatchEvent(new Event('change'));
  });
});

When('the learner watches exactly {int} percent of {string} and then seeks ahead without watching', async (percent: number, lessonName: string) => {
  await page.getByTestId('play-button').click();
  await page.waitForFunction(
    (targetPercent) => {
      const player = document.querySelector('[data-testid="video-player"]') as HTMLVideoElement;
      return player && player.currentTime / player.duration >= targetPercent / 100;
    },
    percent,
  );
  await page.getByTestId('video-scrubber').evaluate((el: HTMLInputElement) => {
    el.value = el.max;
    el.dispatchEvent(new Event('change'));
  });
});

Then('{string} should be marked {string}', async (lessonName: string, expectedStatus: string) => {
  const statusText = await page.getByTestId('lesson-status').innerText();
  expect(statusText).toContain(expectedStatus);
});

Then('{string} should remain {string}', async (lessonName: string, expectedStatus: string) => {
  const statusText = await page.getByTestId('lesson-status').innerText();
  expect(statusText).toContain(expectedStatus);
});

Then('the course progress percentage should increase accordingly', async () => {
  const progressText = await page.getByTestId('course-progress-percentage').innerText();
  expect(parseInt(progressText, 10)).toBeGreaterThan(0);
});

Then('the required playback checkpoints should be reported as unmet', async () => {
  const checkpointsText = await page.getByTestId('checkpoints-status').innerText();
  expect(checkpointsText).toContain('unmet');
});

Then('the reported progress percentage for {string} should be {int} percent', async (lessonName: string, expectedPercent: number) => {
  const progressText = await page.getByTestId('lesson-progress-percentage').innerText();
  expect(parseInt(progressText, 10)).toBe(expectedPercent);
});
