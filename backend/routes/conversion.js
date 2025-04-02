const express = require("express");
const { Conversion } = require("../db");
const app = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { XMLBuilder } = require("fast-xml-parser");
const fs = require("fs");
const authUser = require("./middleware");
const upload = multer({ dest: "uploads/" });

app.post("/convert", authUser, upload.single("pdfFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        // console.log("hit hua");

        const pdfBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(pdfBuffer);

        const jsonData = {
            pdf: {
                meta: {
                    title: req.file.originalname,
                    size: req.file.size,
                },
                content: data.text.split("\n").map((line, index) => ({
                    line: { id: index + 1, text: line.trim() },
                })),
            },
        };

        const builder = new XMLBuilder();
        const extractedData = builder.build(jsonData);
        const convertedSize = Buffer.byteLength(extractedData, "utf8");

        const newConversion = await Conversion.create({
            userId: req.user.userId,
            fileName: req.file.originalname,
            originalSize: req.file.size,
            convertedSize,
            xmlContent: extractedData,
        });

        await fs.promises.unlink(req.file.path)

        res.status(200).json({ conversionId: newConversion._id, newConversion });
    } catch (error) {
        console.error(error);
        if (req.file && req.file.path) {
            try {
                await fs.promises.unlink(req.file.path);
            } catch (err) {
                console.error("Failed to delete file:", err);
            }
        }

        res.status(500).json({ error: error.message });
    }
});

app.get("/conversions", authUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        const conversions = await Conversion.find({ userId }).sort({ createdAt: -1 }).lean();
        if (conversions.length === 0) return res.status(404).json({ message: "No conversions found" });
        res.status(200).json({ conversions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/conversion/:id", authUser, async (req, res) => {
    try {
        const { id } = req.params;
        const conversion = await Conversion.findById(id).lean();
        if (!conversion) return res.status(404).json({ message: "Conversion not found" });
        
        if (conversion.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Access denied" });
        }
        res.status(200).json({ conversion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
