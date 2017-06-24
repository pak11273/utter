import express from 'express';
import userRoutes from './user/userRoutes.js';
const router = express.Router();


router.use('/users', userRoutes);
// router.use('/profiles', userRoutes);

module.exports = router; 
