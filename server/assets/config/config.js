// Check Environment
var env = process.env.NODE_ENV || "development";
// Fetch Environment Config
var config = require('./config.json');
var envConfig = config[env];
// Add Environment Config value to process env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);