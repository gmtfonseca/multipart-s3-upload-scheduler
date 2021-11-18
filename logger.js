const fs = require('fs').promises
const path = require('path')

const LoggerLevels = Object.freeze({
  INFO: 'INFO',
  ERROR: 'ERROR',
})

class Logger {
  constructor({ dir }) {
    this.dir = dir
  }

  async info(data) {
    await this.append(data, LoggerLevels.INFO)
  }

  async error(data) {
    await this.append(data, LoggerLevels.ERROR)
  }

  async append(data, level = LoggerLevels.INFO) {
    const now = new Date()
    const fileName = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}.txt`

    const filePath = path.join(this.dir, fileName)
    const line = `${
      LoggerLevels[level]
    } - ${now.toLocaleTimeString()} - ${data}\n`
    await fs.appendFile(filePath, line)
  }
}

module.exports = new Logger({ dir: path.join(__dirname, 'logs') })
