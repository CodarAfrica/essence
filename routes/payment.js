const express = require('express');
const router = express.Router()
const {verify} = require('../middleware/checkUser');
const { payment, callback } = require('../controllers/paymentController');

router.post("/payment", verify, payment)
router.get("/callback", verify, callback)


module.exports = router