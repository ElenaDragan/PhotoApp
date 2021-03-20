const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-photo => GET
router.get('/add-photo', adminController.getAddPhoto);

// /admin/photos => GET
router.get('/photos', adminController.getPhotos);

// /admin/add-photo => POST
router.post('/add-photo', adminController.postAddPhoto);

router.get('/edit-photo/:photoId', adminController.getEditPhoto);

router.post('/edit-photo', adminController.postEditPhoto);

router.post('/delete-photo', adminController.postDeletePhoto);

module.exports = router;
