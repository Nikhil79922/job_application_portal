import express from 'express';
import { registerUser,LoginUser, forgotPassword } from '../controllers/auth.js';
import uploadFile from '../library/multer/multer.js';
const router =express.Router();

router.post("/register",uploadFile,registerUser)
router.post("/login",LoginUser)
router.post("/forgotPassword",forgotPassword)


export default router;