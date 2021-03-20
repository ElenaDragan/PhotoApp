const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'photos.json'
);

const getPhotosFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Photo {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getPhotosFromFile(photos => {
      if (this.id) {
        const existingPhotoIndex = photos.findIndex(
          prod => prod.id === this.id
        );
        const updatedPhotos = [...photos];
        updatedPhotos[existingPhotoIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedPhotos), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        photos.push(this);
        fs.writeFile(p, JSON.stringify(photos), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getPhotosFromFile(photos => {
      const photo = photos.find(prod => prod.id === id);
      const updatedPhotos = photos.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedPhotos), err => {
      });
    });
  }

  static fetchAll(cb) {
    getPhotosFromFile(cb);
  }

  static findById(id, cb) {
    getPhotosFromFile(photos => {
      const photo = photos.find(p => p.id === id);
      cb(photo);
    });
  }
};
