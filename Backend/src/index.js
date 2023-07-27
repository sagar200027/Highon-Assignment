import { ApolloServer } from "@apollo/server";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

const { DB_URI, DB_NAME, PORT } = process.env;

const client = new MongoClient(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect();
const db = client.db(DB_NAME);

console.log("db", db);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/createpost", async (req, res) => {
  try {
    console.log("req", req.body);
    // const { title, content } = req.body;
    // const newPost = {};
    // const result = await db.collection("posts").insertOne(newPost);
    // const post1 = await db.collection("posts").findOne({ id: id });
    res.json('post req working')
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err });
  }
});

app.get("/", async (req, res) => {
  try {
    res.json("hello world");
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err });
  }
});

app.get("/postlist", async (req, res) => {
  try {
    // const { title, content } = req.body;
    // const newPost = {};
    // const result = await db.collection("posts").insertOne(newPost);
    // const post1 = await db.collection("posts");
    res.json("hey!");
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err });
  }
});
