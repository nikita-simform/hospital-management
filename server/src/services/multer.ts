import { Request } from 'express'
import multer from 'multer';
import path from 'path';

type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    filename: (req:Request, file:Express.Multer.File, cb:FileNameCallback) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
  })
  
  export const uploads = multer({ storage: storage });

