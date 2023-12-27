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



  app.delete("/deleteUser/:email",  async(req, res)=>{
    const GetUser = req.params.email;
    const check = {email:GetUser};
    const Result = await DataCollection.deleteOne(check);
    res.send(Result);
    console.log("the Deleted user Is" , GetUser)
  })



  // app.put("/user-update/:email", async(req, res)=>{
  //     const email = req.params.email;
  //     console.log("update request from", email)
  //     const UserMatch = {email:email};
  //     const newFill = {upsert:true};
  //     const UpdateData ={
  //       $set:{
  //         name:req.body.name,
  //         email:req.body.email,
  //         address:req.body.address,
  //         age:req.body.age,
  //         hobby:req.body.hobby
  //       },
  //     }
  //     const Result = await DataCollection.updateOne(UserMatch, UpdateData, newFill);
  //     console.log(Result)
  //    res.send(Result)
  // })


  app.put("/user-update/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const userMatch = { email: email };
    const updateData = {
      $set: {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        age: req.body.age,
        hobby: req.body.hobby
      },
    };

    const result = await DataCollection.updateOne(userMatch, updateData);
    res.send(result);
    console.log(result)
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});








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