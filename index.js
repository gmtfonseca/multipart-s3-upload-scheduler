const schedule = require('node-schedule')

const env = require('./env')
const compressAndUploadToS3 = require('./compressAndUploadToS3')
const logger = require('./logger')

const { CRON_EXP, FILES_PATH, S3_BUCKET_NAME, PART_SIZE_MB, QUEUE_SIZE } =
  env.loadVars()

async function syncFiles() {
  for (const filePath of FILES_PATH) {
    try {
      logger.info(`Sincronizando arquivo ${filePath}.`)
      await compressAndUploadToS3({
        filePath,
        bucketName: S3_BUCKET_NAME,
        filesPart: PART_SIZE_MB,
        queueSize: QUEUE_SIZE,
      })
      logger.info(`Arquivo ${filePath} sincronizado com sucesso.`)
    } catch (e) {
      console.log(e)
      logger.error(
        `Não foi possível sincronizar o arquivo ${filePath}: ${e.message}`
      )
    }
  }
}

schedule.scheduleJob(CRON_EXP, () => {
  syncFiles()
})
