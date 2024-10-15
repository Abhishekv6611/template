import express from 'express';
import path from 'path';
import TemplateRoutes from './routes/TemplateRoutes.js';
import { fileURLToPath } from 'url';
import cors from 'cors'

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors())

// Routes
app.use('/upload', TemplateRoutes);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
