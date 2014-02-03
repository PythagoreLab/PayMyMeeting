path = require('path');

module.exports = {
  server: {
    listenPort: 3000,
    distFolder: path.resolve(__dirname, '../client/dist'),
    staticUrl: '',
  }
};