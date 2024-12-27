import express from 'express';
import { adminLogin, createProduct, deleteproduct, getAllOrders, getAllProducts, sellerdone, updateProduct } from '../controllers/admin.controler.js';

const router = express.Router();

router.post('/adminlogin', adminLogin)
router.post('/createproduct', createProduct)
router.post('/updateproduct', updateProduct)
router.post('/deleteproduct', deleteproduct)
router.get('/allproducts', getAllProducts)
router.get('/allorders', getAllOrders)
router.post('/sellerdone', sellerdone)




export default router;