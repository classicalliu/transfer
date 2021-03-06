import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios'
import * as log4js from 'log4js'
import { ReadStream } from 'tty'

const logger = log4js.getLogger()
logger.level = 'info'

class FileService {
  public static isCached (hash: string): boolean {
    return false
  }

  public static readCachedFile (filename: string) {
    const filePath = path.join(__dirname, '../public/files/', filename)
    // check if file exists
    try {
      fs.accessSync(filePath)
      // read cached file
      const fileStream = fs.createReadStream(filePath)
      return fileStream
    } catch (err) {
      return {
        error: {
          code: -1,
          message: 'File Not Found',
        },
      }
    }
  }

  public static readRemoteFile (hash: string, signature: string) {
    logger.info(
      `Request remote resource with hash: ${hash}, signature: ${signature}`,
    )
    // use hash and sig to request remote resources
    // const resPipe = axios.get(
    //   'http://127.0.0.1:8081/cryptape/projects/nervos-web/CNAME',
    //   {
    //     responseType: 'stream',
    //   },
    // )
    const resPipe = axios({
      method: 'get',
      url: 'http://127.0.0.1:8081/cryptape/projects/nervos-web/CNAME',
      responseType: 'stream',
    })

    return resPipe
  }
}

export default FileService
