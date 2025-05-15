const { defineConfig } = require('cypress');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const createCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await createCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor', createEsbuildPlugin(config)
      );
      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
    // We'll tell Cypress to look for .feature files
    specPattern: '**/*.feature',
    // You might want to adjust this if your step definitions are elsewhere.
    // This is a common pattern, but not strictly required for the preprocessor.
    supportFile: 'cypress/support/e2e.js',
  },
});
