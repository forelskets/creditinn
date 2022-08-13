const express = require("express");
const router = express.Router();

const adminController = require("../controller/adminController");

router.post(
  "/login",
  adminController.loginValidations,
  adminController.AdminLogin
);
router.post("/update", adminController.AdminUpdate);
router.patch("/udateSubAdmin/:id", adminController.UpdateSubAdmin);
router.patch("/deleteSubAdmin/:id", adminController.DeleteSubAdmin);
router.get("/settingList", adminController.AdminSettingList);
router.get("/", adminController.getAdmins);
router.post("/addAdmin", adminController.AddAdmin);
router.post("/settingUpdate", adminController.AdminSettingUpdate);
router.post("/forgotPassword", adminController.forgotPassword);
router.post("/otpVerification", adminController.OtpVerification);
router.patch("/updateCredentials", adminController.updateCredential);

module.exports = router;
