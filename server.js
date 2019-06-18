const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('static'));
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
let db;



// app.post('/api/issues', (req, res) => {
//   const newIssue = req.body;
//   newIssue.id = issues.length + 1;
//   newIssue.created = new Date(); 
//   if (!newIssue.status)
//   newIssue.status = 'New';
// issues.push(newIssue);
// res.json(newIssue);
// });
// const issues = [
//   {
//     id: 1, status: 'Open', owner: 'Ravan',
//     created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
//     title: 'Error in console when clicking Add',
//   },
//   {
//     id: 2, status: 'Assigned', owner: 'Eddie',
//     created: new Date('2016-08-16'), effort: 14, 
// completionDate: new Date('2016-08-30'),
//     title: 'Missing bottom border on panel',
//   },
// ];

const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};
const issueFieldType = {
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required',
};
function validateIssue(issue) {
  for (const field in issueFieldType) {
    const type = issueFieldType[field];
    if (!type) {
      delete issue[field];
    } else if (type === 'required' && !issue[field]) {
      return `${field} is required.`;
    }
  }
  if (!validIssueStatus[issue.status])
    return `${issue.status} is not a valid status.`;
  return null;
}
app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status)
    newIssue.status = 'New';
  const err = validateIssue(newIssue)
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
 