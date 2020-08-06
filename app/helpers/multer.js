const multer = require('multer');
const path  = require('path')
// configure multer
var storage = multer.diskStorage({
    destination: function (req, file, callback) { 
        callback(null, 'public/images');
    },
    filename: function (req, file, callback) { 
        callback(null, (file.originalname));
    }
})
  
// Image Filter
const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.flash('error', 'File harus file image');
        return cb(null, false);
    }
    cb(null, true);
};

var upload = multer({ 
    storage: storage,
    fileFilter: imageFilter
});
 
module.exports = { upload };