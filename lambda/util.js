const AWS = require('aws-sdk');

const s3SigV4Client = new AWS.S3({
    signatureVersion: 'v4',
    region: process.env.S3_PERSISTENCE_REGION
});

module.exports.getS3PreSignedUrl = function getS3PreSignedUrl(s3ObjectKey) {

    const bucketName = process.env.S3_PERSISTENCE_BUCKET;
    const s3PreSignedUrl = s3SigV4Client.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: s3ObjectKey,
        Expires: 60*1 // the Expires is capped for 1 minute
    });
    console.log(`Util.s3PreSignedUrl: ${s3ObjectKey} URL ${s3PreSignedUrl}`);
    return s3PreSignedUrl;

}

const https = require('https');
module.exports.https = {
    get(url, options) {
        return new Promise((resolve, reject) => {
            https.get(url, options || {}, res => {
        
                var responseString = '';
        
                res.on('data', (d) => {
                    responseString += d;
                });
        
                res.on('end', function(res) {
                    resolve(responseString)
                });
            }).on('error', e => {
                reject(e)
            })
        })
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            https.request(url, { method: 'POST' }, res => {
        
                var responseString = '';
        
                res.on('data', (d) => {
                    responseString += d;
                });
        
                res.on('end', function(res) {
                    resolve(responseString)
                });
            }).on('error', e => {
                reject(e)
            })
        })
    }
}