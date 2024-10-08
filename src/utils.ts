import * as crypto from 'crypto';

export const cryptoHash = (root: string) => crypto.createHash('sha1').update(root).digest('hex').slice(0, 12)