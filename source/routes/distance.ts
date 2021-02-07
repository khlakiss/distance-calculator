import express from 'express';
import controller from '../controllers/distance';

const router = express.Router();
const multer = require('multer');
const upload = multer();

router.post('/getNearByPartners', upload.single('file'), controller.getNearByPartners);

export = router;
