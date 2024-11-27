import connect from "../database/dbConnection";
import Post from "../model/post";
require('dotenv').config();     // configure dotenv to application load environment variables

// get connection with mongodb in cloud
const STRING_CONNECTION = String(process.env.STRING_CONNECTION);
const connection = connect(STRING_CONNECTION);
const DATABASE_NAME = String(process.env.DATABASE_NAME);

// get all posts from database
export default async function findAllPosts() {
    const db = (await connection).db(DATABASE_NAME);
    const collection = db.collection("posts");
    const resultQuery = await collection.find().toArray();
    
    const listPost : Post[] = resultQuery.map((object) => {
        const post: Post = object as unknown as Post;
        return post;
    });

    return listPost;
}