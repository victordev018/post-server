import { ObjectId } from "mongodb";
import connect from "../database/dbConnection";
import Post from "../model/postRequestDTO";
require('dotenv').config();     // configure dotenv to application load environment variables

// get connection with mongodb in cloud
const STRING_CONNECTION = String(process.env.STRING_CONNECTION);
const connection = connect(STRING_CONNECTION);
const DATABASE_NAME = String(process.env.DATABASE_NAME);

// get all posts from database
async function findAllPosts() {
    const db = (await connection).db(DATABASE_NAME);
    const collection = db.collection("posts");
    const listPost = await collection.find().toArray();

    return listPost;
}

async function saveNewPost(post: Post) {
    const db = (await connection).db(DATABASE_NAME);
    const collection = db.collection("posts");
    const postCreated = await collection.insertOne(post);
    return postCreated;
}

async function updatePost(id: string, post: Post) {
    const db = (await connection).db(DATABASE_NAME);
    const collection = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id);
    const postCreated = await collection.updateOne({_id: new ObjectId(objectId)}, {$set:post});
    return postCreated;
}

export default {findAllPosts, saveNewPost, updatePost};