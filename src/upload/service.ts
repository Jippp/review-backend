import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { STATICPATH, POSTPATH } from '@/config'
import { exitFile } from '@/utils';

@Injectable()
export class UploadService {
  // 异步读取文件夹内容
  async readDirectory(directoryPath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          // 直接返回文件名称
          resolve(files);
        }
      });
    });
  }

  /** 删除 */
  async deletePost(fileHash: string) {
    if(fileHash) {
      const filePath = `${STATICPATH}/${POSTPATH}/${fileHash}.md`
      if(exitFile(`${STATICPATH}/${POSTPATH}`, `${fileHash}.md`)) {
        await fs.unlink(filePath)
        return 'success'
      }else {
        return 'not found'
      }
    }else {
      return 'param error'
    }
  }
}
