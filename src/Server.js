/*
 * JS for MongoDB web server
 * NO LONGER ACTIVE
 */

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jrud25:<password>@cs3744project2.rggem8f.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});