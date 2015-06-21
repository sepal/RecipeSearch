var nconf = require('nconf');
var yaml = require('js-yaml');

// Load the config file path from the arguments or the environment variables.
nconf.argv({
  'config-file': {
    alias: 'cf',
    describe: 'The location of the config file.',
    default: './config.yml'
  }
}).env();

var configFile = nconf.get('config-file');

// Default config.
var defaultConfig = {
  port: 1337,
  log: {
    file: './server.log',
    level: 'info'
  }
};

// Try to load the config from a yaml file.
nconf.file({
  file: configFile,
  format: {
    parse: yaml.safeLoad,
    stringify: yaml.safeDump
  }
});

// Set the default config
nconf.defaults(defaultConfig);

// Export the config.
exports.port = nconf.get('port');
exports.log = nconf.get('log');
