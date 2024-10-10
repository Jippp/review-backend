import { Request } from 'express';

export interface WithFileStatusRequest extends Request  {
  /** 上传文件状态 */
  fileStatus: 'new' | 'update'
}