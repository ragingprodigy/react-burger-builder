const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@burger": "src",
  })(config);

  return config;
};
