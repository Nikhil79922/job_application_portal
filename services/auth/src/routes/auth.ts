import express from 'express';
import { registerUser,loginUser, forgotPassword, resetPassword, refreshToken, logout } from '../controllers/auth.js';
import uploadFile from '../library/multer/multer.js';
const router =express.Router();

router.post("/register",uploadFile,registerUser)
router.post("/login",loginUser)
router.post("/forgotPassword",forgotPassword)
router.post("/resetPassword/:token",resetPassword)  //params 
router.post("/refreshToken",refreshToken)
router.post("/logOut",logout)


export default router;