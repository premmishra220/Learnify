import { Router } from "express";
import { forgotPassword, getProfile, login, logout, register, resetPassword,changePassword ,updateProfile} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log(name, email, message);

    return res.json({
      success: true,
      message: "Message received"
    });
  } catch (error) {
    res.status(500).json({ message: "Error sending message" });
  }
});



























router.post('/register',upload.single("avatar"), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn, getProfile);
router.post('/reset',forgotPassword);
router.post('/reset/:resetId',resetPassword);
router.put('/changepassword',isLoggedIn,changePassword);
router.put('/update',isLoggedIn ,upload.single("avatar") ,updateProfile);


export default router;
