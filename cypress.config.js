const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1600,
  viewportWidth: 2200,
  video: true,
  env: {
    userEmail: "test28@gmail.com",
    password: "CypressTest28",
    apiUrl: "https://api.realworld.io"
  },
  

 e2e: {
    baseUrl: 'http://localhost:4200/',
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
