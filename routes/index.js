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
  var piped = false;

  request.createReadStream()
  /**
   * 'readable' can fire more than once but we only want to pipe the
   * response once so use a simple semaphore
   */
    .on('readable', function () {
      if (!piped) {
        piped = true;
        console.log("stream from AWS is readable, sending to response");
        this.pipe(res);
      }
    }).on('end', function () {
      console.log("stream from AWS ended");
      res.end();
    }).on('error', function (error) {
      res.end('There was an Error: ' + (error.toString()));
    });

});

module.exports = router;
