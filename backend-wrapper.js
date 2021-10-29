require('dotenv').config()
require = require('esm')(module /*, options*/)
module.exports = require('./src/backend/backend.js')