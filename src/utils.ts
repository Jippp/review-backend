import * as crypto from 'crypto';
import * as fs from 'fs-extra'

export const cryptoHash = (root: string) => crypto.createHash('sha1').update(root).digest('hex').slice(0, 12)

/**
 * 判断是否存在文件
 * @param dirPath 文件夹位置
 * @param fileName 文件名称
 * @returns 
 */
export const exitFile = (dirPath: string, fileName: string) => {
  return fs.existsSync(`${dirPath}/${fileName}`)
}
