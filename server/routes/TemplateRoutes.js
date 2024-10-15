import express from 'express';
import { getTemplate } from '../controllers/templateController.js';

const router = express.Router();

router.post('/', getTemplate);

export default router;
