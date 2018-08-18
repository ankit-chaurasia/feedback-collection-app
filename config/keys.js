if (process.env.NODE_ENV === 'production') {
  // We are in production, return prod set of keys
  module.exports = require('./prod');
} else {
  // We are in development, retunr dev set of keys
  module.exports = require('./dev');
}
