const {MongoClient}= require('mongodb')

function usage() {
  console.log('Usage:');
  console.log('node', __filename, '<option>');
  console.log('Where option is one of:');
  console.log(' callbacks Use the callbacks paradigm');
  console.log(' promises Use the Promises paradigm');
  console.log(' generator Use the Generator paradigm');
  console.log(' async Use the async module');
  }
  if (process.argv.length < 3) {
  console.log("Incorrect number of arguments");
  usage();
  } else {
  if (process.argv[2] === 'callbacks') {
  testWithCallbacks();
  } else if (process.argv[2] === 'promises') {
  testWithPromises();
} else if (process.argv[2] === 'generator') {
  testWithGenerator();
  } else if (process.argv[2] === 'async') {
  testWithAsync();
  } else {
  console.log("Invalid option:", process.argv[2]);
  usage();
  }
  }

  function testWithCallbacks(){
    MongoClient.connect('mongodb://localhost/records',function(err,db){
      db.collection('employess').insertOne({id:1,name:'A.callBack'},function(err,result){
        console.log("The result of insert is: "+result.insertedId);
        db.collection('employess').find({id:1}).toArray(function(err,finalResult){
          console.log('The insertion is: '+ finalResult);
          db.close();
        })
      })
    })
  }

  function testWithPromises(){
    MongoClient.connect('mongodb://localhost/records').then((db)=>{
      return db.collection('employess').insertOne({id:1,name:'b.promises'})
    }).then((res)=>{
      console.log('the result is: ',res.insertedId);
      return db.collection('employess').find({id:1}).toArray()
    }).then((finalResult)=>{
      console.log('the final result is: ',finalResult)
      db.close()
    }).catch((err)=>{
      console.log('Error', err);
    })
  }

  function testWithGenerator(){
    const co= require('co');
    co(function*(){
      const db=yield MongoClient.connect('mongodb://localhost/records');
      const res=yield db.collection('employess').insertOne({id:1,name:'c.generators'});
      console.log('the inserted is: ',res.insertedId);
      const finalResult=yield db.collection('employess').find({id:1}).toArray()
      console.log(finalResult);
      db.close();
    }).catch(err=>{
      console.log(err);
    })
  }

  function testWithAsync(){
    const async =require('async');
    let db;
    async.waterfall([
      next=>{
        MongoClient.connect('mongodb://localhost/records',next)
      },
      (connection,next)=>{
        db=connection;
        db.collection('employess').insertOne({id:1,name:'d.async'},next)
      },
      (insertResult,next)=>{
        console.log('inserted result:',insertResult.insertedId)
        db.collection('employess').find({id:1}).toArray(next)
      },
      (docs,next)=>{
        console.log('Result of find:', docs);
        db.close();
        next(null, 'All done');
        
      }
    ], (err, result) => {
      if (err)
      console.log('ERROR', err);
      else
      console.log(result);
      })
  }
    