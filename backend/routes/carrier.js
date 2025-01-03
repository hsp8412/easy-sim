import {
  getMe,
  register,
  login,
  logout,
  getMyProfile,
  updateMyEmail,
  updateMyPassword,
  updateCarrierEmailById,
  updateCarrierPasswordById,
  deleteCarrierById,
  updateMyLogo,
  getAllCarriers,
  getCarrierById,
  updateCarrierLogoById,
} from "../controllers/carriersController.js";
import {carrier_auth} from "../middleware/carrier_auth.js";
import {admin_auth} from "../middleware/admin_auth.js";
import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({dest: "uploads/"});

// User-specific routes
router.get("/me", carrier_auth, getMe);
router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.post("/update-my-email", carrier_auth, updateMyEmail);
router.post("/update-my-password", carrier_auth, updateMyPassword);
router.post(
  "/update-my-logo",
  carrier_auth,
  upload.single("image"),
  updateMyLogo
);
router.get("/my-profile", carrier_auth, getMyProfile);

// Admin-specific routes
router.post("/create-carrier", admin_auth, upload.single("logo"), register);
router.post("/update-carrier-email", admin_auth, updateCarrierEmailById);
router.post("/update-carrier-password", admin_auth, updateCarrierPasswordById);
router.delete("/delete-carrier", admin_auth, deleteCarrierById);
router.get("/all", admin_auth, getAllCarriers);
router.post(
  "/update-carrier-logo",
  admin_auth,
  upload.single("logo"),
  updateCarrierLogoById
);
router.get("/get-carrier/:id", admin_auth, getCarrierById);

export default router;
