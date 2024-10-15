import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const getTemplate = [
  upload.single('avatar'),
  async (req, res) => {
    try {
      const frameType = req.body.frame;
      const buffer = req.file.buffer;

      const framePath = path.join(__dirname, '../public', `${frameType}.png`);

      const frameBuffer = await fs.promises.readFile(framePath);

      const processedImage = await sharp(buffer)
        .resize(200, 300)
        .composite([{ input: frameBuffer, blend: 'over' }])
        .png()
        .toBuffer();

      res.set('Content-Type', 'image/png');
      res.send(processedImage);

    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing image');
    }
  }
];
