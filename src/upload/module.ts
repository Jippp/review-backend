import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { UploadService } from './service';
import { UploadController } from './controller';
import { STATICPATH, POSTPATH } from '@/config'
import { cryptoHash, exitFile } from '@/utils'
import { WithFileStatusRequest } from '@/types'

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: `${STATICPATH}/${POSTPATH}`,
      filename(req: WithFileStatusRequest, file, callback) {
        // 这里根据文件名称生成的hash 所以同名文件会直接更新
        const fileHash = cryptoHash(file.originalname);
        if(exitFile(`${STATICPATH}/${POSTPATH}`, `${fileHash}_${file.originalname}`)) {
          req.fileStatus = 'update'
        }else {
          req.fileStatus = 'new'
        }
        callback(null, `${fileHash}_${file.originalname}`)
      }
    })
  })],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
