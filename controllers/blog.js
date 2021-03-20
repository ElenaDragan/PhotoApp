const Photo = require('../models/photo');

exports.getPhotos = (req, res, next) => {
  Photo.fetchAll(photos => {
    res.render('blog/photo-list', {
      photos: photos,
      pageTitle: 'All Photos',
      path: '/photos'
    });
  });
};

exports.getPhoto = (req, res, next) => {
  const prodId = req.params.photoId;
  Photo.findById(prodId, photo => {
    res.render('blog/photo-detail', {
      photo: photo,
      pageTitle: photo.title,
      path: '/photos'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Photo.fetchAll(photos => {
    res.render('blog/index', {
      photos: photos,
      pageTitle: 'Blog',
      path: '/'
    });
  });
};
