const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const Image = require('../models/Image');

const router = express.Router();

// Multer setup
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed!'), false);
  },
});

// POST /upload - Upload and compress image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const compressedPath = `uploads/compressed-${req.file.filename}`;

    // Compress the image
    await sharp(req.file.path)
      .toFile(compressedPath);

    // Get file stats
    const { size } = fs.statSync(compressedPath);

    // Save metadata to MongoDB
    const image = new Image({
      fileName: req.file.filename,
      size,
      uploadTimestamp: new Date(),
    });

    await image.save();

    res.status(200).json({ message: 'Image uploaded and compressed!', image });
  } catch (err) {
    res.status(500).json({ message: 'Error processing image', error: err.message });
  }
});

// GET /metadata - Retrieve and filter metadata
router.get('/metadata', async (req, res) => {
  try {
    const { fileName, startDate, endDate } = req.query;

    const filter = {};
    if (fileName) filter.fileName = fileName;
    if (startDate || endDate) {
      filter.uploadTimestamp = {};
      if (startDate) filter.uploadTimestamp.$gte = new Date(startDate);
      if (endDate) filter.uploadTimestamp.$lte = new Date(endDate);
    }

    const images = await Image.find(filter);
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving metadata', error: err.message });
  }
});

module.exports = router;
