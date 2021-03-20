const Photo = require('../models/photo');

exports.getAddPhoto = (req, res, next) => {
  res.render('admin/edit-photo', {
    pageTitle: 'Add Photo',
    path: '/admin/add-photo',
    editing: false
  });
};

exports.postAddPhoto = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const photo = new Photo(null, title, imageUrl, description, price);
  photo.save();
  res.redirect('/');
};

exports.getEditPhoto = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.photoId;
  Photo.findById(prodId, photo => {
    if (!photo) {
      return res.redirect('/');
    }
    res.render('admin/edit-photo', {
      pageTitle: 'Edit Photo',
      path: '/admin/edit-photo',
      editing: editMode,
      photo: photo
    });
  });
};

exports.postEditPhoto = (req, res, next) => {
  const photoId = req.body.photoId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedPhoto = new Photo(
    photoId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedPhoto.save();
  res.redirect('/admin/photos');
};

exports.getPhotos = (req, res, next) => {
  Photo.fetchAll(photos => {
    res.render('admin/photos', {
      photos: photos,
      pageTitle: 'Admin Photos',
      path: '/admin/photos'
    });
  });
};

exports.postDeletePhoto = (req, res, next) => {
  const photoId = req.body.photoId;
  Photo.deleteById(photoId);
  res.redirect('/admin/photos');
};
