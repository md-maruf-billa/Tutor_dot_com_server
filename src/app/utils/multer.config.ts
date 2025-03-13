import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from './cloudinary'
import multer from 'multer'

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: (req, file) => 'mahid-books/' + file.originalname
  }
})

const upload = multer({ storage: storage })

export default upload
