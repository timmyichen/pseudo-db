const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const config = require('./config/config');

const app = express();

MongoClient.connect(config.keys.mongoURI, (err, client) => {
  if (err) console.log('failed to connect to db: ', err)
  
  app.locals.db = client.db('pseudo-db');
    
  app.use(cors());
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static('public'));
  
  app.use('/api', require('./api/index'));
  
  app.get('/', (req, res) => {
      res.sendFile(__dirname + '/public/index.html');
  });
  
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
      console.log(`Server started on port ${port}`);
  });
})
