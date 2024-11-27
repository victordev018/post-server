import {Request, Response} from "express";
import {findAllPosts, saveNewPost} from "../service/postService";
import {PostRequest} from "../model/post";

async function getAllPosts(req: Request, res: Response) {
    const response = await findAllPosts()
    res.status(200).json(response);
}

async function createNewPoster(req: Request, res: Response) {
    const post: PostRequest = req.body;
    await saveNewPost(post);
    res.status(201).send();
}

export default {getAllPosts, createNewPoster};