const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 4000;

//! Warning: Do not use in production
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const uri = "mongodb+srv://admin-cc:p$BKUM*jiSExLw9cc@cluster0.3esf4.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  });

async function run() {
  try {
    await client.connect();
    const servicesCollection = client.db("cleanCo").collection("service");

    /*
      get /get-service => all data
      post /add-service => create new data
      put /update-service => modify a data on collection
      delete /delete-service => delete a data from collection
    */
    // get service
    app.get("/get-service", async (req, res) => {
      const services = await servicesCollection.find({}).toArray();
      console.log(services);
      res.send(services);
    });
    // post service
    app.post("/add-service", async (req, res) => {
      const data = req.body;
      const result = await servicesCollection.insertOne(data);
      res.send(result);
    });
    // put service
    app.put("/update-service/:id", async (req, res) => {
      const { id } = req.params;
      const data = req.body;

      const filter = { _id: ObjectId(id) };
      const updateDoc = { $set: data };
      const option = { upsert: true };

      const result = await servicesCollection.updateOne(
        filter,
        updateDoc,
        option
      );

      res.send(result);
    });
    // delete service
    app.delete("/delete-service/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: ObjectId(id) };
      const result = await servicesCollection.deleteOne(query);

      res.send(result);
    });

    //* With try catch block

    // app.post("/add-service", async (req, res) => {
    //   try {
    //     const data = req.body;
    //     const result = await servicesCollection.insertOne(data);
    //     res.send({ status: true, result: result });
    //   } catch (error) {
    //     res.send({ status: false, error });
    //   }
    // });
  } finally {
  }
}
run().catch(console.dir);

// Body

app.get("/dummy-route/user2", async (req, res) => {
  const data = req.body;

  res.json(data);
});

// Query

app.get("/dummy-route/user", async (req, res) => {
  const { name, age } = req.query;
  console.log(name);
  console.log(age);
  res.json(name);
});

// Param

app.get("/dummy-route/user/:id", async (req, res) => {
  const { id } = req.params;

  res.json(id);
});

app.get("/", async (req, res) => {
  res.json("Hello");
});

app.listen(port, () => {
  console.log(`Ami Dowracchi port ${port}`);
});
