const express = require('express');
const router = express.Router()
const {verify, checkUser} = require('../middleware/checkUser')
const  {getHome, getBlog, getShop, getSingleProduct, getSingleBlog, getCheckout, getContact, getLoginSignup, getPostProduct, postPictures, favorite, cart, addcart, getCart, deleteCart} = require("../controllers/homeController");
// const { getHashes } = require('crypto');

router.get("/",checkUser, getHome)
router.get("/post-product", verify, getPostProduct)
router.post("/post-product", verify, postPictures)
router.get("/shop", checkUser, getShop)
router.get("/blog",checkUser, getBlog)
router.get("/login", getLoginSignup)
router.get("/register", getLoginSignup)
router.get("/product-details/:id",checkUser, getSingleProduct)
router.get("/checkout", verify, getCheckout)
router.get("/blog/details",checkUser, getSingleBlog)
router.get("/contact",checkUser, getContact)
router.get("/favorite/:id", checkUser, favorite)
router.get("/cart", verify, getCart)
router.get("/delete-cart/:id", verify, deleteCart)
router.get("/cart/:id", verify, addcart)

module.exports = router