const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createNewsEvent,allowedFileTypes,maxFileSize } = require('../controllers/news-event');
const storageConfig = require('../middleware/multer-storage');


const upload = multer(storageConfig('news-event', maxFileSize,allowedFileTypes));
 
// Define route for registration form submission
router.post('/news-event/create', upload.single('picture'), createNewsEvent);


module.exports = router;
