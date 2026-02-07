import express from "express";
import isAuthenticated from "../middleware/isAuthencate.js";
import {
  applicants,
  applyJob,
  getAppliedJobs,
  updateStatus,
} from "../controller/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, applicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
