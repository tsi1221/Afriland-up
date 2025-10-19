import express from 'express';
import { registerLand } from '../controllers/landController.js';
import multer from 'multer';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// POST /api/lands
router.post('/', upload.array('documents'), registerLand);

export default router;
