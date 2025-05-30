const express = require('express')
const dotenv=require('dotenv')
dotenv.config()
const bodyparser= require('body-parser')

const {MongoClient, Collection}= require('mongodb');
const url ='mongodb://localhost:27017';
const client= new MongoClient(url)
const dbName= 'Safestack'
 client.connect()



const app = express()
const port = 3000
app.use(bodyparser.json())

app.get('/', async(req, res) => {
    const db = client.db(dbName)
    const collection= db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)

})
//to save
app.post('/', async(req, res) => {
    const password= req.body
    const db = client.db(dbName)
    const collection= db.collection('passwords');
    const findResult = await collection.insertOne(password);
  res.send({success:true,result:findResult})

})
//to delete
app.delete('/', async(req, res) => {
    const password= req.body
    const db = client.db(dbName)
    const collection= db.collection('documents');
    const findResult = await collection.deleteOne(password);
  res.send({success:true,result:findResult})

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// ✅ FIXED ROUTE (was: app.get("*", ...))
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});



