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
  
 
var upload = multer({ 
    storage: storage
})
module.exports = { upload };