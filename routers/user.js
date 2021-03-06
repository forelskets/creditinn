const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const auth = require("../middleware/Authentication");
const userController = require("../controller/userController");

router.get("/referral-count/:id", userController.getReferralCountById);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getAllRefrals", userController.getAllRefrals);
router.get("/getAllProducts", userController.getAllProducts);
router.put("/statusUpdate/:id", userController.UpdateProductStatus);
router.put("/update-profile/:id", userController.updateProfileById);
router.post("/shareRefralDataStore/:id", userController.ShareRefralDataStor);
router.post("/productDataSave/:id", userController.ProductStor);
router.put("/update/:id", userController.UpdateStatus);
router.post('/getuser/:Email', userController.retrieveUser);



const storage = multer.diskStorage({
  destination: "client/public/uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
router.post(
  "/propfileImgUpdate",
  auth,
  upload.fields([{ name: "profileImag" }]),
  userController.PropfileImgUpdate
);

//  Profile update from App
router.post(
  "/propfileImgUpdate/Mobile/:id",
  
  upload.fields([{ name: "profileImag" }]),
  userController.PropfileImgUpdateMobile
);

// forgetPassword

router.post("/otpEmail", userController.getgenerateOtp);

module.exports = router;
