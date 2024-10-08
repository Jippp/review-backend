import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { UploadService } from './service';
import { UploadController } from './controller';
import { STATICPATH, POSTPATH } from '@/config'
import { cryptoHash } from '@/utils'

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: `${STATICPATH}/${POSTPATH}`,
      filename(req, file, callback) {
        const temp = file.originalname.split('.')
        const originExt = temp[temp.length - 1]
        const customFileName = cryptoHash(file.originalname);
        callback(null, `${customFileName}.${originExt}`)
      }
    })
  })],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
