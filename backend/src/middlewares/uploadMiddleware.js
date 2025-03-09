import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

// Check file type
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const filetypes = /jpeg|jpg|png|webp/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Initialize upload
const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB max file size
  fileFilter
});

// Export middleware
export const uploadSingle = upload.single('image');
export const uploadMultiple = upload.array('images', 5);
export const uploadProductImages = upload.array('productImages', 10);
export const uploadProfileImage = upload.single('profileImage'); 