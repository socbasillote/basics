import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import router from "./routes/quotes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDb Connected"))
    .catch(err => console.log(err));

app.use("/api/quotes", router )

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})