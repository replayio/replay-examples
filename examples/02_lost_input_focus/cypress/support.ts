import '@replayio/cypress/support';

beforeEach(() => {
  cy.intercept(
    {
      url: '/_next/static/development/_devMiddlewareManifest.json',
    },
    {
      log: false,
    },
  );
});
