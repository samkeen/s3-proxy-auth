# Passthrough Proxy for S3 buckets

## Install

     cp ./config/aws.config.dist.json ./config/aws.config.json

Add your AWS Key and secret to `./config/aws.config.json`

     npm install

## Run

     ./bin/www

Then any request to localhost:3000 will be proxied to your AWS S3 bucket and return that content.

                          { s3 bucket }/{ object path }
     http://localhost:3000/my-s3-bucket/job1/index.html

## TODO

- Add ability to parse credentials out of ~/.aws/config
- Better logging
- Better `.on('error'` handler