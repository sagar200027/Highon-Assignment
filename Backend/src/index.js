import { ApolloServer } from "@apollo/server";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json());

const { DB_URI, DB_NAME, PORT } = process.env;

const client = new MongoClient(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect();
const db = client.db(DB_NAME);

// console.log("db", db);

app.listen(PORT, "192.168.1.7", () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/createpost", async (req, res) => {
  try {
    const newPost = req.body;
    const result = await db.collection("posts").insertOne(newPost);
    const post1 = await db
      .collection("posts")
      .findOne({ _id: result?.insertedId });
    // console.log("req result", result?.insertedId, post1);
    res.json(post1);
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err });
  }
});

app.get("/postlist", async (req, res) => {
  try {
    let result = await db.collection("posts").find({}).toArray();
    console.log("req result", result);
    // const post1 = await db.collection("posts");
    result = result.map((item) => {
      return {
        image: item?.image,
        description: item?.description,
        location: item?.location,
        vibeTag: item?.vibeTag,
      };
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err });
  }
});
