import { Router } from "express";
import postController from "../controller/postController";

const router = Router()

router.get("/posts", postController.getAllPosts);
router.post("/posts", postController.createNewPoster);

export default router;
