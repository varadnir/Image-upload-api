# Image-upload-api

Video Explanation : https://drive.google.com/drive/folders/1WNNd0YXlbSa2y3cExXgAAOw-Kvq_OG6c?usp=drive_link  

Image Upload API with Compression
This project is a RESTful API built with Node.js and Express that allows users to upload image files, compress them, and store them. It uses Multer for file handling and Sharp for image compression. The project also integrates MongoDB to store image metadata (optional), and the connection configurations are managed using a .env file.

Features:  
  Allows users to upload image files.  
  Compresses images to reduce their file size.  
  Supports image resizing and format conversion.  
  Stores metadata (filename, size, timestamp) in a MongoDB database.  
  Provides an endpoint to upload and retrieve image metadata.

Prerequisites :  
Node.js v16 or later  
MongoDB


API Endpoints
1. POST /api/upload  
Upload an image and compress it.

Request  
Content-Type: multipart/form-data  
Body: Key: image (The image file to upload)  

2. GET /api/metadata
