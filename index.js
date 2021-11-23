require('dotenv').config()
const fs = require('fs')

const env = require('./env')
const compressAndUploadToS3 = require('./compressAndUploadToS3')
const logger = require('./logger')
const progress = require('./progress')

const { DAY_OF_WEEK, FILES_PATH, S3_BUCKET_NAME, PART_SIZE_MB, QUEUE_SIZE } =
  env.loadVars()

async function syncFiles() {
  for (const filePath of FILES_PATH) {
    if (!fs.existsSync(filePath)) {
      logger.error(`Arquivo "${filePath}" não existe.`)
      return
    }

    if (progress.hasSyncedToday(filePath)) {
      logger.info(`Arquivo "${filePath}" já foi sincronizado hoje.`)
      continue
    }

    try {
      logger.info(`Sincronizando arquivo "${filePath}"...`)

      await compressAndUploadToS3({
        filePath,
        bucketName: S3_BUCKET_NAME,
        filesPart: PART_SIZE_MB,
        queueSize: QUEUE_SIZE,
      })

      progress.save(filePath)

      logger.info(`Arquivo "${filePath}" sincronizado com sucesso.`)
    } catch (e) {
      logger.error(
        `Não foi possível sincronizar o arquivo "${filePath}": ${e.message}`
      )
    }
  }
}

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const today = new Date()

if (daysOfWeek[today.getDay()] === DAY_OF_WEEK) {
  console.log(
    'FAZENDO BACKUP DO(S) ARQUIVO(S) DO OUTLOOK, NAO FECHE ESTA JANELA.'
  )
  syncFiles()
}
