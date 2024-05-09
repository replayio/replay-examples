/// <reference types="cypress" />
import { defineConfig } from "cypress";
import { plugin as replayPlugin } from '@replayio/cypress'
import 'dotenv/config'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    fixturesFolder: false,
    supportFile: 'cypress/support.ts',
    setupNodeEvents(on, config) {
      replayPlugin(on, config, {
        upload: true,
        apiKey: process.env.EXAMPLES_01_REPLAY_KEY,
      });
      return config;
    },
   },
});
