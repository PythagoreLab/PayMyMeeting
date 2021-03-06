path = require('path');

module.exports = {
    mongo: {
    dbUrl: 'https://api.mongolab.com/api/1',            // The base url of the MongoLab DB server
    apiKey: '',         // Our MongoLab API key
    dbPath: 'mongodb://localhost:27017'
  },
  server: {
    listenPort: process.env.PORT || 5000,
    distFolder: path.resolve(__dirname, '../client/dist'),
    staticUrl: ''
  }
};