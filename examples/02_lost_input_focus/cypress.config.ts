/// <reference types="cypress" />
import { defineConfig } from 'cypress';
import { plugin as replayPlugin } from '@replayio/cypress';
import { config } from 'dotenv';

config({ path: '../../.env' });

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3002',
    fixturesFolder: false,
    supportFile: 'cypress/support.ts',
    setupNodeEvents(on, config) {
      replayPlugin(on, config, {
        upload: true,
        apiKey: process.env.REPLAY_API_KEY,
      });
      return config;
    },
  },
});
