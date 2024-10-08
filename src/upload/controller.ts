import { Controller, Post, UseInterceptors, UploadedFiles, ParseFilePipeBuilder, HttpStatus, Body } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { UploadService } from './service';
import { cryptoHash } from '@/utils'
import { STATICPATH, POSTPATH } from '@/config'

// const ACCEPTFILEEXTREG = new RegExp('png|jpg|jpeg|heic')

@Controller('/')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  /** 上传文件 */
  uploadFiles(@UploadedFiles(
    new ParseFilePipeBuilder()
      .addMaxSizeValidator({
        // 最大尺寸 20m
        maxSize: 20 * 1024 * 1024
      })
      .build({
        fileIsRequired: true,
      })
  ) files: Array<Express.Multer.File>) {
    const paths = files.reduce((prev, file) => {
      prev[file.originalname] = cryptoHash(file.originalname)
      return prev
    }, {} as Record<string, string>)
    return { 
      code: HttpStatus.OK,
      msg: '上传成功',
      files: paths
    }
  }

  @Post('getPosts')
  /** 获取文件 */
  async getPosts(@Body() body: { filePath?: string }) {
    if(body.filePath) {
      // 根据filePath来查询文件 TODO
      // const filePaths = body.filePath.split(',')
      return { 
        code: HttpStatus.OK,
      }
    }else {
      // 全部文件
      const postPaths = await this.uploadService.readDirectory(`${STATICPATH}/${POSTPATH}`)
      return { 
        code: HttpStatus.OK,
        data: {
          postPaths
        }
      }
    }
  }
}
