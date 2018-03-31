const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/upload/:secret', (req, res) => {
  const { data } = req.body;
  const { secret } = req.params;
  const { db } = req.app.locals;
  
  db.collection('data').update({ secret }, { $set: {data} }, { upsert: true }, (err, response) => {
    if (err) {
      console.log('error in upload', err);
      return res.status(500).send({ error: err });
    }
    res.send({ success: true });
  });
});

router.get('/download/:secret', (req, res) => {
  const { secret } = req.query;
  const { db } = req.app.locals;
  
  db.collection('data').findOne({ secret })
    .then(response => {
      res.json(response.data);
    }, err => {
      console.log('error in download', err);
      return res.status(500).send({ error: err });
    });
})

module.exports = router;