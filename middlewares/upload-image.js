const multer = require('multer');
const {v4: uuid} = require('uuid');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploaded-data/images')
    },
    filename: function (req, file, cb) {
    //  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uuid() + '-' + file.originalname)
    }
  })
  const upload = multer({storage});

const getUploadedImage = upload.single('image');

module.exports = getUploadedImage;