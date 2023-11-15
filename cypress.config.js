const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1600,
  viewportWidth: 2200,
  video: true,

 e2e: {
    baseUrl: 'https://angular.realworld.how',
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
