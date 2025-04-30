var express = require('express');
var router = express.Router();

var uploadController = require('../controllers/upload');
var upload = require('../middleware/upload');

router.post("/", upload.single("file"), uploadController.uploadFiles);

module.exports = router; 