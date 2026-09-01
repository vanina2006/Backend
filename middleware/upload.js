const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function(req, file, cb) {
        const extension = path.extname(file.originalname);

        const filename =
            Date.now() + "-" + Math.round(Math.random() * 1e9) + extension;

        cb(null, filename);
    },
});

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter: function(req, file, cb) {
        const typesAutorises = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        if (typesAutorises.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Format d'image non autorisé."));
        }
    },
});

module.exports = upload;