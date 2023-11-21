const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS, images)
app.use(express.static('public'));

// Define a route to get the list of images in the directory
app.get('/api/images', (req, res) => {
  // Directory path where your images are stored
  const imageDir = path.join(__dirname, 'public/images');

  // Use the 'fs' module to read the list of files in the directory
  const fs = require('fs');
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Filter out non-image files (adjust as needed)
      const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
      res.json(imageFiles);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

