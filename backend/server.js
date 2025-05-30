const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require("path");

dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = 'Safestack';
client.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());

// get all passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// insert password
app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
});

// delete password
app.delete('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
});

// serve frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// start server
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server is running on http://0.0.0.0:${port}`);
});
