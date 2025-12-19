import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// 1. STORAGE CONFIGURATION
const storage = multer.diskStorage({
  // FIX: Change 'res' to 'file'
  destination(req, file, cb) {
    cb(null, 'uploads/'); 
  },
  // FIX: Change 'res' to 'file'
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
})

// 2. SECURITY CHECK
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

// 3. INITIALIZE MULTER
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
})

// 4. THE ROUTE
router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded!',
    image: `/${req.file.path.replace(/\\/g, "/")}`
  });
});

export default router;