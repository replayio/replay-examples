import { defineConfig } from '@playwright/test';
import {
  createReplayReporterConfig,
  devices as replayDevices,
} from "@replayio/playwright";

export default defineConfig({
  testDir: './playwright',
  reporter: [
    createReplayReporterConfig({
      upload: true,
      apiKey: process.env.EXAMPLES_01_REPLAY_KEY,
    }),
    ['line']
  ],
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'off',
  },
  projects: [
    {
      name: 'replay-chromium',
      use: { ...(replayDevices['Replay Chromium']) },
    },
  ],
});
