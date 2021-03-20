const path = require('path');

const express = require('express');

const blogController = require('../controllers/blog');

const router = express.Router();

router.get('/', blogController.getIndex);

router.get('/photos', blogController.getPhotos);

router.get('/photos/:photoId', blogController.getPhoto);

router.get('/aboutme', blogController.getAboutMe);

module.exports = router;
