
export const getTemplate = upload.single('avatar', async (req, res) => {
    try {
      const frameType = req.body.frame; 
      const buffer = req.file.buffer;
  
      const framePath = path.join(__dirname, 'public', `${frameType}.png`);
      
      // Read the frame file asynchronously
      const frameBuffer = await fs.promises.readFile(framePath);
  
      // Process the image with Sharp
      const processedImage = await sharp(buffer)
        .resize(200, 200)
        .composite([{ input: frameBuffer, blend: 'over' }])
        .png()
        .toBuffer();
  
      // Set the content type and send the image
      res.set('Content-Type', 'image/png'); 
      res.send(processedImage);
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing image');
    }
  });