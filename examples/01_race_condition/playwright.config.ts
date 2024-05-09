import { defineConfig } from '@playwright/test';
import {
  createReplayReporterConfig,
  devices as replayDevices,
} from "@replayio/playwright";
import { config } from 'dotenv'

config({ path: '../../.env' })

export default defineConfig({
  testDir: './playwright',
  reporter: [
    createReplayReporterConfig({
      upload: true,
      apiKey: process.env.REPLAY_API_KEY,
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
