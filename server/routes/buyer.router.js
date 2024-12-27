import express from 'express';
import { buyerdone, buyerLogin, buyerLogout, buyerRegister, getMyOrders, processOrder, stripecheck } from '../controllers/buyer.controler.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.post('/buyerregister', buyerRegister)
router.post('/buyerlogin', buyerLogin)
router.get('/buyerlogout', buyerLogout)
router.get('/getmyorders', isAuth, getMyOrders)
router.post('/orderkoro', processOrder)
router.post('/buyerdone', buyerdone)
router.post('/stripecheck', stripecheck)

export default router;