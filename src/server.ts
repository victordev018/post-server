import express, {Request, Response } from "express";
import {posts} from "./repository/data";
import connect from "./database/dbConnection";
require('dotenv').config();     // configure dotenv to application load environment variables

// get connection with mongodb in cloud
const STRING_CONNECTION = String(process.env.STRING_CONNECTION);
const connection = connect(STRING_CONNECTION);

// instancing server and setup properties
const app = express();
const port = 3000;
app.use(express.json());

// up server
app.listen(port, () => {
    console.log(`Server is running in: http://localhost:${port}`);
});

// endpoints
app.get("/posts", async (req: Request, res:Response) => {
    const postsResponse = await getALlPosts();
    res.status(200).json(postsResponse);
})

app.get("/posts/:id", (req: Request, res:Response) => {
    const id : number = Number.parseInt(req.params.id);
    const response = getPostById(id);
    res.status(200).json(response);
})

// get all posts from local repository
function getPostById(id:number) {
    const index = posts.findIndex((post) => {
        return post.id === id;
    });

    return posts[index];
}

// get all posts from database
async function getALlPosts() {
    const db = (await connection).db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
}