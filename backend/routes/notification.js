const express = require("express");
const multer = require("multer");
const Notification = require("../models/notification");

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf':'pdf'
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
    Notification.find().then(notification => {
        res.status(200).json({
            message: 'Notification fetched suceesfully',
            notification: notification
        });
    })
});

router.get("/:id", (req, res, next) => {
    Notification.findById(req.params.id).then(notification => {
        if (notification) {
            res.status(200).json(notification);
        }
        else {
            res.status(404).json({ message: 'notification not found' });
        }
    })
})


router.post("", multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const notification = new Notification({
        title: req.body.title,
        description: req.body.description,
        file: url + "/images/" + req.file.filename,
        date :req.body.date
    })
    notification.save().then((notificationMeta) => {
        res.status(201).json({
            message: 'notification added succesfully',
            notification: {
                ...notificationMeta,
                id: notificationMeta._id
            }
        });
    });

});

module.exports = router;