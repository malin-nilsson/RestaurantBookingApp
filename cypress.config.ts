const { defineConfig } = require("cypress");
import clearAdmins from "./cypress/plugins/index";

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // on("task", { clearAdmins });
    },
  },
});
