import express, {Request, Response } from "express";
import {posts} from "./repository/data";

const app = express();

const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running in: http://localhost:${port}`);
});

app.get("/posts", (req: Request, res:Response) => {
    res.status(200).json(posts);
})

function getPostById(id:number) {
    const index = posts.findIndex((post) => {
        return post.id === id;
    });

    return posts[index];
}

app.get("/posts/:id", (req: Request, res:Response) => {
    const id : number = Number.parseInt(req.params.id);
    const response = getPostById(id);
    res.status(200).json(response);
})