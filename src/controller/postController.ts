import {Request, Response} from "express";
import findAllPosts from "../service/postService";

async function getAllPosts(req: Request, res: Response) {
    const response = await findAllPosts()
    res.status(200).json(response);
}

export default {getAllPosts};