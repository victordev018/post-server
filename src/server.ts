import express from "express";
import router from "./routes/postRouter";

// instancing server and setup properties
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(router);

// up server
app.listen(PORT, () => {
    console.log(`Server is running in: http://localhost:${PORT}`);
});