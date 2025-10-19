import express from "express";
import { registerUser , loginUser} from "../controllers/authController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Register route with PDF upload
router.post("/register", upload.single("landCard"), registerUser);

// Login route
router.post("/login", loginUser);

export default router;
