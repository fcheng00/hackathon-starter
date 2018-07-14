const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const fs = require('fs');
const path = require('path');

// For dev purposes only
AWS.config.update({ accessKeyId: 'AKIAJX3LXHDUQIVLQ76Q', secretAccessKey: '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' });
const bucketname = 'careernester';
/*
module.exports.save = (name, data, callback) => {
  let params = {
    Bucket: 'careernester',
    Key: `resume/${name}`,
    Body: new Buffer(data, 'base64'),
    ContentEncoding: 'base64',
    ContentType: 'image/png'
  };
  s3.putObject(params, (err, data) => {
    callback(err, `//s3-us-west-2.amazonaws.com/pizza-luvrs-ryan-lewis/${params.Key}`);
  });
};
*/
module.exports.save = (name, callback) => {
  const fileStream = fs.createReadStream(name);
  fileStream.on('error', (err) => {
    console.error('File Error', err);
  });
  const params = {
    Bucket: `${bucketname}`,
    Key: `resume/${path.basename(name)}`,
    Body: fileStream
  };
  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
    }
    if (data) {
      console.log('Upload Success', data.Location);
    }
    // callback(err, `//s3-us-west-2.amazonaws.com/${bucketname}/${params.Key}`);
  });
};
