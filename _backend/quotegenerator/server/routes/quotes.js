import express from "express";
import Quote from "../models/Quote.js";


const router = express.Router();

router.get("/random", async (req, res) => {
    try {
        const count = await Quote.countDocuments();
        
        const random = Math.floor(Math.random() * count);

        const quote = await Quote.findOne().skip(random);

        res.json(quote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add quote
router.post("/", async (req, res) => {
    try {
        const quote = await Quote.create(req.body);
        res.status(201).json(quote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


export default router;