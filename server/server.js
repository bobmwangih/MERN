const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('static'));
const MongoClient = require('mongodb').MongoClient;
const Issue= require('../issue.js')

app.use(bodyParser.json());
let db;

app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status)
    newIssue.status = 'New';
  const err = Issue.validateIssue(newIssue)
  if (err) {
    res.status(422).json({ message: `Invalid requrest: ${err}` });
    return;
  }
  db.collection('issues').insertOne(newIssue).then(result=>{
    db.collection('issues').find({_id:result.insertedId}).limit(1).next()}).then(newIssue=>{
      res.json(newIssue)
    }).catch(error=>{
      console.log(error)
      res.status(500).json({message:`internal server error: ${error}`})
      
    })
});

app.get('/api/issues',(req,res)=>{
  db.collection('issues').find().toArray().then(issues=>{
    const metadata={issuesNiNgapi:issues.length}
    res.json({meta:metadata,records:issues})
  }).catch(error=>{
    console.log(error);
    res.status(500).json({message:`internal server error: ${error}`})
    
  })
})

MongoClient.connect('mongodb://localhost/issuetracker').then(connection=>{
  db = connection.db();
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(err=>{console.log(err.message);
})
 