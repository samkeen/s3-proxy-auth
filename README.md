# Authentication Proxy For S3 Buckets

Amazon offers a very easy to implement [static website hosting option](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)
for S3 buckets. Since it is a completely static option though, all files are exposed to the public Internet (no authentication option)

This is a node server that simple proxies requests made to it.  It make a matching authenticated API requests to the S3 bucket and serves back the contents of the static file requested.

## Install

### Quick install (if you already have npm and such)

     $ git clone https://github.com/samkeen/s3-proxy-auth.git && cd s3-proxy-auth
     $ npm install
     $ cp ./config/aws.config.dist.json ./config/aws.config.json

Add your AWS Key and secret to `./config/aws.config.json`

### Install from scratch (Ubuntu)

    $ sudo apt-get update
    $ sudo apt-get install git npm
    $ git clone https://github.com/samkeen/s3-proxy-auth.git && cd s3-proxy-auth
    $ npm install
    $ cp ./config/aws.config.dist.json ./config/aws.config.json
    $ vi config/aws.config.json
    

## Run

     ./bin/www

Then any request to localhost:3000 will be proxied to your AWS S3 bucket and return that content.  This is all done
with streaming, no files are stored locally on this proxy server.

                          { s3 bucket }/{ object path }
     http://localhost:3000/my-s3-bucket/job1/index.html

## TODO

- Add ability to parse credentials out of ~/.aws/config
- Better logging
- Better `.on('error'` handler
