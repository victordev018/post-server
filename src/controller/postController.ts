import {Request, Response} from "express";
import {findAllPosts, saveNewPost} from "../service/postService";
import {PostRequest} from "../model/post";
import fs  from "fs";

async function getAllPosts(req: Request, res: Response) {
    const response = await findAllPosts()
    res.status(200).json(response);
}

async function createNewPoster(req: Request, res: Response) {
    const post: PostRequest = req.body;
    await saveNewPost(post);
    res.status(201).send();
}

async function uploadImage(req: Request, res: Response) {
    const post: PostRequest = req.body;
    const postCreatedResponse = await saveNewPost(post);
    const oldPath = String(req.file?.path);
    const newPath = `uploads/${postCreatedResponse.insertedId}.png`;
    fs.renameSync(oldPath, newPath);
    res.status(201).send(postCreatedResponse);
}

export default {getAllPosts, createNewPoster, uploadImage};