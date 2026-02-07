import express from "express";
import isAuthenticated from "../middleware/isAuthencate.js";
import { singleUpload } from "../middleware/multer.js";
import {
  getComanyById,
  getCompany,
  registerCompany,
  updateCompany,
} from "../controller/company.controller.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, singleUpload, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getComanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);

export default router;
