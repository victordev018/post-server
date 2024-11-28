import {Request, Response} from "express";
import {findAllPosts, saveNewPost} from "../service/postService";
import fs  from "fs";
import Post from "../model/postRequestDTO";

async function getAllPosts(req: Request, res: Response) {
    const response = await findAllPosts()
    res.status(200).json(response);
}

async function createNewPoster(req: Request, res: Response) {
    const {description, imageUrl, alt} = req.body;
    const post: Post = new Post(description, imageUrl, alt);
    const response = await saveNewPost(post);
    res.status(201).send(response);
}

async function uploadImage(req: Request, res: Response) {
    const {description, imageUrl, alt} = req.body;
    const post: Post = new Post(description, imageUrl, alt);
    const postCreatedResponse = await saveNewPost(post);
    const oldPath = String(req.file?.path);
    const newPath = `uploads/${postCreatedResponse.insertedId}.png`;
    fs.renameSync(oldPath, newPath);
    res.status(201).send(postCreatedResponse);
}

export default {getAllPosts, createNewPoster, uploadImage};