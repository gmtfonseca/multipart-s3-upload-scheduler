const fs = require('fs')
const path = require('path')

const AWS = require('aws-sdk')

AWS.config.update({
  region: 'sa-east-1',
})

async function uploadFiles({ filesPath, bucketName, partSizeMb, queueSize }) {
  for (const filePath of filesPath) {
    const fileStream = fs.createReadStream(filePath)
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucketName,
        Key: path.basename(filePath),
        Body: fileStream,
      },
      partSize: partSizeMb * 1024 * 1024, // 500MB
      queueSize,
    })

    await upload.promise()
  }
}

module.exports = {
  uploadFiles,
}
