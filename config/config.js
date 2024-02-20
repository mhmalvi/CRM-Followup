const os = require("os");

// Function to load configuration based on the host name
function loadConfig() {
  const hostname = os.hostname();
  let config;
  if (hostname === "development-hostname") {
    config = require("./config.development");
  } else if (hostname === "production-hostname") {
    config = require("./config.production");
  } else {
    config = require("./config.default");
  }
  return config;
}

module.exports = loadConfig();
