const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json())
app.use(cors());


const { MongoClient, ServerApiVersion } = require('mongodb');






const uri = "mongodb+srv://FrontendAndBackend:FrontendAndBackend@cluster1.lqd6sol.mongodb.net/?retryWrites=true&w=majority";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const DataCollection = client.db("ReactExpress").collection("Data");




  app.get("/", (req, res)=>{
    console.log(req.body)
    res.send("Server is working..!")
  });

  app.post("/user", async (req, res)=>{
    const data = req.body;
    await DataCollection.insertOne(data)
    console.log(data);
    
  })

  app.get("/find-users", async(req, res)=>{
    const users = await DataCollection.find().toArray();
    res.send(users)  
  })



  app.delete("/deleteUser",  async(req, res)=>{
    const GetUser = req.params;
    const check = {email:GetUser};
    const Result = await DataCollection.deleteOne(check);
    res.send(Result);
  })






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



  

app.listen(5000, (req, res)=>{
    console.log("server is Running...")
})