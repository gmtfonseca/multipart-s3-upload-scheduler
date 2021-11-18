require('dotenv').config()

module.exports = { loadVars }

function loadVars() {
  const vars = {}

  const buildError = (varName) => {
    return new Error(`Variável de ambiente inválida: ${varName}`)
  }

  if (
    !process.env.FILES_PATH ||
    !String(process.env.FILES_PATH).split('').length
  ) {
    throw buildError('FILES_PATH')
  } else {
    vars.FILES_PATH = String(process.env.FILES_PATH).split(',')
  }

  if (
    !process.env.PART_SIZE_MB ||
    Number.isNaN(Number(process.env.PART_SIZE_MB))
  ) {
    throw buildError('PART_SIZE_MB')
  } else {
    vars.PART_SIZE = Number(process.env.PART_SIZE_MB)
  }

  if (!process.env.QUEUE_SIZE || Number.isNaN(Number(process.env.QUEUE_SIZE))) {
    throw buildError('QUEUE_SIZE')
  } else {
    vars.QUEUE_SIZE = Number(process.env.QUEUE_SIZE)
  }

  if (!process.env.S3_BUCKET_NAME) {
    throw buildError('S3_BUCKET_NAME')
  } else {
    vars.S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
  }

  if (!process.env.AWS_ACCESS_KEY_ID) {
    throw buildError('AWS_ACCESS_KEY_ID')
  } else {
    vars.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
  }

  if (!process.env.AWS_SECRET_ACCESS_KEY) {
    throw buildError('AWS_SECRET_ACCESS_KEY')
  } else {
    vars.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
  }

  console.log({ vars })

  return vars
}
