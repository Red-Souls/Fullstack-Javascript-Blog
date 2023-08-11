const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        return callback(null, 'uploads');
    },
    filename: function(req, file, callback) {
        return callback(null, file.originalname);
    }
});

const upload = multer({storage: storage});
module.exports = upload;