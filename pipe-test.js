const AWS = require('aws-sdk')
const path = require('path')
const fs = require('fs')
const zlib = require('zlib')
const { promisify } = require('util')
const { pipeline } = require('stream')
const pipe = promisify(pipeline)

AWS.config.update({
  region: 'sa-east-1',
})

async function test() {
  try {
    console.log('Uploading')
    const filePath =
      '/Users/gustavo.fonseca/Projetos/outlook-backuper/v2/outlook/fonseca.pst'
    const source = fs.createReadStream(filePath)
    const gzip = zlib.createGzip()

    await pipe(source, gzip)

    // console.log({ gzipStream })

    console.log('Done')

    /* const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: 'fonseca-outlook-backup',
      Key: path.basename(filePath),
      Body: gzipStream,
    },
    partSize: 500 * 1024 * 1024, // 500MB
    queueSize: 2,
  })

  await upload.promise()

  console.log('Upload done') */
  } catch (e) {
    console.log(e)
  }
}

test()
