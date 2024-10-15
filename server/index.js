import express from 'express';
import fs from 'fs'
import path from 'path';
import TemplaRouter from './routes/TemplateRoutes'

const app = express();
const PORT = 5000;

app.use(express.json())

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use('/upload',TemplaRouter)


app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
