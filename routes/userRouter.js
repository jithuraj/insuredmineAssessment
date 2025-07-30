import express from "express";
import UserController from "../controllers/userControllers.js";
import MessageController from "../controllers/messageControllers.js";
import { uploads } from "../middleware/multer.js";
const router = express.Router();

// Controller
const userController = new UserController();
const messageController = new MessageController();

// Routes
router.post("/api/upload", uploads, userController.uploadData);
router.get("/api/users/", userController.getUser);
router.get("/api/policyinfo/", userController.getPolicyInfo);
router.get("/api/all-policies/", userController.getAllPoliciesInfo);

router.post("/api/message/add-message", messageController.addMessage);

export default router;
