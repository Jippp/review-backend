import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

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
}
