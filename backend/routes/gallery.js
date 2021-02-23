const express = require("express");
const multer = require("multer");
const Gallery = require("../models/gallery");

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const invalid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("invalid mime type");
        if (invalid) {
            error = null;
        }
        cb(null, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});



router.get("/", (req, res, next) => {
    Gallery.find().then(gallery => {
        res.status(200).json({
            message: 'Gallerys fetched suceesfully',
            Gallery: gallery
        });
    })
});

router.get("/:id", (req, res, next) => {
    Gallery.findById(req.params.id).then(gallery => {
        if (gallery) {
            res.status(200).json(gallery);
        }
        else {
            res.status(404).json({ message: 'gallery not found' });
        }
    })
})

router.delete("/:id", (req, res, next) => {
    console.log("deleting gallery");
    Gallery.deleteOne({ _id: req.params.id }).then(result => {
        console.log("deleting gallery");
        res.status(200).json({
            message: 'Gallery deleted succesfully'
        });
    });
});


router.put("/:id", multer({ storage: storage }).single("image"), (req, res, next) => {
    let imagePath = req.body.GalleryImage;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath: url + "/images/" + req.file.filename
    }
    console.log(imagePath);
    const cat = new Gallery({
        _id: req.body.id,
        GalleryTitle: req.body.GalleryTitle,
        GalleryImage: imagePath,
        GalleryDescription :req.body.GalleryDescription
    });
    Gallery.updateOne({ _id: req.params.id }, cat).then(result => {
        res.status(200).json({ message: "Update Succesfull" });
    });
})

router.post("", multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const gallery = new Gallery({
        GalleryTitle: req.body.title,
        GalleryImage: url + "/images/" + req.file.filename,
        GalleryDescription :req.body.description
    })
    gallery.save().then((createdGallery) => {
        res.status(201).json({
            message: 'gallery added succesfully',
            gallery: {
                ...createdGallery,
                id: createdGallery._id
            }
        });
    });

});
module.exports = router;