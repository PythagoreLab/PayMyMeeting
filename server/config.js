path = require('path');

module.exports = {
    mongo: {
    dbUrl: 'https://api.mongolab.com/api/1',            // The base url of the MongoLab DB server
    apiKey: 'gubV4zs5yN-ItUUQDpgUx0pUA98K3MYH',         // Our MongoLab API key
    //dbPath: 'mongodb://root:4DaysKillerDemo@ds029979.mongolab.com:29979/paymymeeting'
    dbPath: 'mongodb://localhost:27017'
  },
  server: {
    listenPort: 3000,
    distFolder: path.resolve(__dirname, '../client/dist'),
    staticUrl: ''
  }
};