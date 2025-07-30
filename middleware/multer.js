import multer, { diskStorage } from "multer";

const Storage = diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `file-${Date.now()}-${file.originalname}`);
  },
});

export const uploads = multer({ storage: Storage }).single("file");
