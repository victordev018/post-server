import connect from "../database/dbConnection";
import Post from "../model/postRequestDTO";
require('dotenv').config();     // configure dotenv to application load environment variables

// get connection with mongodb in cloud
const STRING_CONNECTION = String(process.env.STRING_CONNECTION);
const connection = connect(STRING_CONNECTION);
const DATABASE_NAME = String(process.env.DATABASE_NAME);

// get all posts from database
export async function findAllPosts() {
    const db = (await connection).db(DATABASE_NAME);
    const collection = db.collection("posts");
    const listPost = await collection.find().toArray();

    return listPost;
}

export async function saveNewPost(post: Post) {
    const db = (await connection).db(DATABASE_NAME);
    const collection = db.collection("posts");
    const postCreated = await collection.insertOne(post);
    return postCreated;
}