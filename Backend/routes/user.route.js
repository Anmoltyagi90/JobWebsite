import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controller/user.controller.js";
import isAuthenticated from "../middleware/isAuthencate.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.post("/logout", logout);

router.put("/updateprofile", isAuthenticated, singleUpload, updateProfile);

export default router;
