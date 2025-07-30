import multer, { diskStorage } from "multer";

// Multer storage configuration
const Storage = diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `file-${Date.now()}-${file.originalname}`);
  },
});

// Multer middleware
export const uploads = multer({ storage: Storage }).single("file");
