const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5300;
console.log("User name", process.env.DB_USER);
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());

//mongodb connectio ::
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@capstoneapproldan.k60lamc.mongodb.net/`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
//   try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("CAPSTONEAPPROLDAN");
    const userCollection = database.collection("users");
    const cartCollection = database.collection("cart");
    const classesCollection = database.collection("classes");
    
    const orderCollection = database.collection("orders");
    const appliedCollection = database.collection("applied");
    const paymentCollection = database.collection("payments");

    //classes routes
    app.post('/new-class',async (req, res) => {
        const newClass = req.body;
        // newClass.availableSeats = parseInt(newClass.availableSeats);
        const result = await classesCollection.insertOne(newClass);
        res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally  {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World , we all are here!')
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})


// Password: 343BL78VkIkVa2C user name: roldanop
//Your current IP address (207.244.89.166) 
// mongodb+srv://roldanop:D343BL78VkIkVa2C@capstoneapproldan.k60lamc.mongodb.net/

