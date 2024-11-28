import {Request, Response} from "express";
import postService from "../service/postService";
import fs  from "fs";
import Post from "../model/postRequestDTO";
import generateDescriptionWithGemini from "../service/geminiService";

async function getAllPosts(req: Request, res: Response) {
    const response = await postService.findAllPosts()
    res.status(200).json(response);
}

async function createNewPoster(req: Request, res: Response) {
    const {description, imageUrl, alt} = req.body;
    const post: Post = new Post(description, imageUrl, alt);
    const response = await postService.saveNewPost(post);
    res.status(201).json(response);
}

async function uploadImage(req: Request, res: Response) {
    const {description, imageUrl, alt} = req.body;
    const post: Post = new Post(description, imageUrl, alt);
    const postCreatedResponse = await postService.saveNewPost(post);
    const oldPath = String(req.file?.path);
    const newPath = `uploads/${postCreatedResponse.insertedId}.png`;
    fs.renameSync(oldPath, newPath);
    res.status(201).json(postCreatedResponse);
}

async function updatePost(req: Request, res: Response) {
    const id = req.params.id;
    const imageUrl = `http://localhost:3000/${id}.png`;
    const alt = req.body.alt;

    // generate description with gemini AI
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const description = await generateDescriptionWithGemini(imageBuffer);

    const post: Post = new Post(description, imageUrl, alt);
    const response = await postService.updatePost(id, post);
    res.status(200).json(response);
}

export default {getAllPosts, createNewPoster, uploadImage, updatePost};