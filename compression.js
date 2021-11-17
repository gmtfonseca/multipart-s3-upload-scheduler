const fs = require('fs')
const zlib = require('zlib')
const { promisify } = require('util')
const { pipeline } = require('stream')
const pipe = promisify(pipeline)

async function compressFiles(filesPath) {
  const compressedFiles = []
  for (const filePath of filesPath) {
    const gzip = zlib.createGzip()
    const source = fs.createReadStream(filePath)
    const destPath = filePath + '.gz'
    const dest = fs.createWriteStream(destPath)
    await pipe(source, gzip, dest)
    compressedFiles.push(destPath)
  }
  return compressedFiles
}

module.exports = { compressFiles }
