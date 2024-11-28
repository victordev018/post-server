import { Router } from "express";
import multer from "multer";
import postController from "../controller/postController";

const router = Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({dest: "./uploads", storage})

router.get("/posts", postController.getAllPosts);
router.post("/posts", postController.createNewPoster);
router.post("/upload", upload.single("image"), postController.uploadImage);
router.put("/upload/:id", postController.updatePost)


export default router;
