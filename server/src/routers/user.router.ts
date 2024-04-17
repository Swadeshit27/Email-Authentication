import express from 'express';
import { Login, Register, VerifyEmail, sendVerificationLink, updateInterest, uploadProfile } from '../controllers/user.controller';
import { upload } from '../middleware/upload';
import authentication from '../middleware/auth.middleware';

const router = express.Router();
router.route('/').get((req, res) => res.json("inside the user"));
router.route('/login').post(Login);
router.route('/upload-profile').post(authentication, upload.single('photo'), uploadProfile);
router.route('/register').post(Register);
router.route('/interest').patch(authentication, updateInterest);
router.route('/send-verification').post(authentication, sendVerificationLink);
router.route('/verify-email').patch(VerifyEmail);


export default router; 