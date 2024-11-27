import express, {Request, Response } from "express";

const app = express();

const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running in: http://localhost:${port}`);
});

app.get("/api", (req: Request, res:Response) => {
    res.status(200).json("hello world");
})