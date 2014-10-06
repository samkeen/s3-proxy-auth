var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

/* GET home page. */
router.get(/^\/([^\/]*)\/(.+)/, function (req, res) {

  var bucketName = req.params[0];
  var objectName = req.params[1];

  AWS.config.loadFromPath('./config/aws.config.json');
  var s3 = new AWS.S3();
  var request = s3.getObject({Bucket: bucketName, Key: objectName});

  s3.getObject({Bucket: bucketName, Key: objectName}).createReadStream().pipe(res);

  request.createReadStream()
    .on('readable', function () {
      console.log("stream from AWS is readable, sending to response");
      this.pipe(res);
    }).on('end', function (data) {
      console.log("stream from AWS ended");
      res.end();
    }).on('error', function (error) {
      res.end('There was an Error: ' + (error.toString()));
    });

});

module.exports = router;
