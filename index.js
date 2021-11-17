const env = require('./env')

const compression = require('./compression')
const s3 = require('./s3')
const logger = require('./logger')

const {
  FILES_PATH,
  S3_BUCKET_NAME,
  COMPRESSION_ENABLED,
  PART_SIZE_MB,
  QUEUE_SIZE,
} = env.loadVars()

async function main() {
  try {
    let filesPath = FILES_PATH

    console.log('Preparing to upload files: ' + filesPath)

    if (COMPRESSION_ENABLED) {
      console.log('Compressing')
      filesPath = await compression.compressFiles(FILES_PATH)
      console.log('Compression done.')
    }

    console.log('Uploading.')

    await s3.uploadFiles({
      filesPath,
      bucketName: S3_BUCKET_NAME,
      filesPart: PART_SIZE_MB,
      queueSize: QUEUE_SIZE,
    })

    console.log('Upload done.')
    logger.info(
      `Upload realizado com sucesso para os arquivos: [${filesPath.join(', ')}]`
    )
  } catch (e) {
    console.log(e)
    logger.error(`Não foi possível sincronizar arquivo: ${e.message}`)
  }
}

main()
