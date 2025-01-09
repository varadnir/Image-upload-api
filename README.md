# Image-upload-api

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
