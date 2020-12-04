const express = require("express");
const multer = require("multer");
const Member = require("../models/member");

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
    Member.find().then(member => {
        res.status(200).json({
            message: 'Members fetched suceesfully',
            member: member
        });
    })
});

router.get("/:id", (req, res, next) => {
    Member.findById(req.params.id).then(member => {
        if (member) {
            res.status(200).json(member);
        }
        else {
            res.status(404).json({ message: 'member not found' });
        }
    })
})

router.delete("/:id", (req, res, next) => {
    console.log("deleting member");
    Member.deleteOne({ _id: req.params.id }).then(result => {
        console.log("deleting member");
        res.status(200).json({
            message: 'Member deleted succesfully'
        });
    });
});


router.put("/:id", multer({ storage: storage }).single("image"), (req, res, next) => {
    let imagePath = req.body.MemberImage;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath: url + "/images/" + req.file.filename
    }
    console.log(imagePath);
    const cat = new Member({
        _id: req.body.id,
        MemberName: req.body.MemberName,
        MemberRole: req.body.MemberRole,
        MemberImage: imagePath,
        MemberDistrict :req.body.MemberDistrict
    });
    Member.updateOne({ _id: req.params.id }, cat).then(result => {
        res.status(200).json({ message: "Update Succesfull" });
    });
})

router.post("", multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const member = new Member({
        MemberName: req.body.name,
        MemberRole: req.body.role,
        MemberImage: url + "/images/" + req.file.filename,
        MemberDistrict :req.body.district
    })
    member.save().then((createdMember) => {
        res.status(201).json({
            message: 'member added succesfully',
            member: {
                ...createdMember,
                id: createdMember._id
            }
        });
    });

});
module.exports = router;