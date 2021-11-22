const fs = require('fs')
const path = require('path')

class Progress {
  constructor({ dir }) {
    this._path = path.join(dir, 'progress.db')
  }

  save(filePath) {
    let syncedFilesStr = filePath
    if (fs.existsSync(this._path)) {
      const content = fs.readFileSync(this._path).toString('utf8')
      const syncedFiles = content.split('#')[1]
      syncedFilesStr = [...syncedFiles.split(','), filePath].join(',')
    }

    const today = new Date().toLocaleDateString('pt-BR')
    const content = `${today}#${syncedFilesStr}`
    fs.writeFileSync(this._path, content)
  }

  hasSyncedToday(filePath) {
    if (!fs.existsSync(this._path)) {
      return false
    }

    const content = fs.readFileSync(this._path).toString('utf8')
    const [lastExecution, syncedFilesStr] = content.split('#')
    const syncedFiles = syncedFilesStr.split(',')
    const today = new Date().toLocaleDateString('pt-BR')
    return lastExecution === today && syncedFiles.includes(filePath)
  }
}

module.exports = new Progress({ dir: __dirname })
