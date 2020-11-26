const express = require("express");
const multer = require("multer");
const Meta = require("../models/meta");

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


router.post("", multer({ storage: storage }).array("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    console.log(req.files);
    console.log(req.body);
    const meta = new Meta({
        title: req.body.title,
        description: req.body.description,
        imageFaviconPath: url + "/images/" + req.files[0].filename,
        imageIconPath :url +"/images/" + req.files[1].filename,
        welcomeTitle :req.body.welcomeText,
        welcomeDescription : req.body.welcomeDescription
    })
    meta.save().then((createdMeta) => {
        res.status(201).json({
            message: 'meta added succesfully',
            meta: {
                ...createdMeta,
                id: createdMeta._id
            }
        });
    });

});


// router.get("/", (req, res, next) => {
//     var mysort ={rollno:1};
//     Meta.find().sort(mysort).then(documents => {
//         res.status(200).json({
//             message: 'Students fetched suceesfully',
//             students: documents
//         });
//     })
// });

router.get("/", (req, res, next) => {
    Meta.findOne().then(meta => {
        if (meta) {
            res.status(200).json(meta);
        }
        else {
            res.status(404).json({ message: 'Post not found' });
        }
    })
});


router.get("/:id", (req, res, next) => {
    Meta.findById(req.params.id).then(meta => {
        if (meta) {
            res.status(200).json(meta);
        }
        else {
            res.status(404).json({ message: 'meta not found' });
        }
    })
})



router.put("/:id", multer({ storage: storage }).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath: url + "/images/" + req.file.filename
    }
    const meta = new Meta({
        _id:req.body.id,
        title:req.body.tile,
        description: req.body.description,
        imagePath: imagePath
    });
    console.log(meta);
    Meta.updateOne({ _id: req.body.id }, meta).then(result => {
        console.log(result);
        res.status(200).json({ message: "Update Succesfull" });
    });
})


router.delete("/:id", (req, res, next) => {
    Meta.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
            message: 'post deleted succesfully'
        });
    });
});
module.exports = router;