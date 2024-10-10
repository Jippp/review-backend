import { Controller, Post, UseInterceptors, UploadedFiles, ParseFilePipeBuilder, HttpStatus, Body, Req } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { UploadService } from './service';
import { cryptoHash } from '@/utils'
import { STATICPATH, POSTPATH } from '@/config'
import { WithFileStatusRequest } from '@/types'

// const ACCEPTFILEEXTREG = new RegExp('png|jpg|jpeg|heic')

@Controller('/')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  /** 新建文件 同名文件会直接更新 */
  uploadFiles(@UploadedFiles(
    new ParseFilePipeBuilder()
      .addMaxSizeValidator({
        // 最大 20m
        maxSize: 20 * 1024 * 1024
      })
      .build({
        fileIsRequired: true,
      })
  ) files: Array<Express.Multer.File>, @Req() req: WithFileStatusRequest) {
    const paths = files.reduce((prev, file) => {
      prev[file.originalname] = cryptoHash(file.originalname)
      return prev
    }, {} as Record<string, string>)
    return {
      files: paths,
      status: req.fileStatus
    }
  }

  @Post('getPosts')
  /** 获取文件 */
  async getPosts(@Body() body: { fileHash?: string }) {
    if(body.fileHash) {
      // 根据filePath来查询文件 TODO
      const hashs = body.fileHash.split(',')
      return ''
    }else {
      // 全部文件
      const postPaths = await this.uploadService.readDirectory(`${STATICPATH}/${POSTPATH}`)
      return { 
        postPaths: postPaths.map(item => item.replace(/.md/g, ''))
      }
    }
  }

  @Post('deletePost')
  async deletePost(@Body() body: { fileHash: string }) {
    const deleteStatus = await this.uploadService.deletePost(body.fileHash)
    if(deleteStatus === 'success') {
      return deleteStatus
    }else {
      let errorStatus: HttpStatus
      if(deleteStatus === 'param error') {
        errorStatus = HttpStatus.BAD_REQUEST
      }else if(deleteStatus === 'not found') {
        errorStatus = HttpStatus.NOT_FOUND
      }
      return {
        errorStatus: errorStatus,
        message: deleteStatus
      }
    }
  }
}
