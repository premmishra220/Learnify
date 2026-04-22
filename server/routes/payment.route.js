import Router from 'express'
import { buySubscription, cancelSubscription, generateBill, getAllPayments, getRazorpayApiKey, verifySubsription } from '../controllers/payment.controller.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';

const router = Router();

// get razorpay api key
router.route('/razorpay-key').get(isLoggedIn, getRazorpayApiKey);

// buy subscription
router.route('/subscribe').post(isLoggedIn, buySubscription);

// verify subscription
router.route('/verify').post(isLoggedIn, verifySubsription);

// generate bill
router.route('/generateBill').post(isLoggedIn,generateBill);

// cancel subscription
router.route('/unsubscribe').post(isLoggedIn, cancelSubscription);

// get all paymentsbnm 
router.route('/').get(isLoggedIn, authorizedRoles("ADMIN"), getAllPayments);

export default router;
