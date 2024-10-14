const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT =  5000;


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post('/upload', upload.single('avatar'), async (req, res) => {
  try {
    const frameType = req.body.frame; 
    const buffer = req.file.buffer;

    
    const framePath = path.join(__dirname, 'public', `${frameType}.png`);
    const frameBuffer = fs.readFileSync(framePath);

    
    const processedImage = await sharp(buffer)
      .resize(200, 200)
      .composite([{ input: frameBuffer, blend: 'over' }])
      .png()
      .toBuffer();

    
    res.set('Content-Type', 'image/png'); 
    res.send(processedImage);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing image');
  }
});

// Serve static files like images
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
