const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const AWS = require('aws-sdk')

AWS.config.update({
  region: 'sa-east-1',
})

async function compressAndUploadToS3({
  filePath,
  bucketName,
  partSizeMb,
  queueSize,
}) {
  const readFileStream = fs.createReadStream(filePath)
  const gzip = zlib.createGzip()
  const gzipStream = readFileStream.pipe(gzip)

  const managedUpload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: bucketName,
      Key: path.basename(filePath) + '.gz',
      Body: gzipStream,
    },
    partSize: partSizeMb * 1024 * 1024,
    queueSize,
  })

  await managedUpload.promise()
}

module.exports = compressAndUploadToS3
