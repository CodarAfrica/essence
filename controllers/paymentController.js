const axios = require("axios");
const userModel = require("../models/userModel");
const cartModel = require("../models/cartModel");
const checkoutModel = require("../models/checkout");

const payment = async (req, res) => {
  try {
    const { country, address, postCode, town, province, phoneNumber } =
      req.body;
    const email = req.user.email;
    const user = await userModel.findOne({ email: email });
    const carts = await cartModel
      .find({ userId: user._id })
      .populate("productId");
    let totalAmount = 0;

    carts.forEach((item) => {
      totalAmount += Number(item.productId.price);
    });

    const headers = {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      "Content-Type": "application/json",
    };

    const transactionData = {
      userId: user._id,
      email: user.email,
      amount: totalAmount * 100, 
      currency: "NGN",
      country: country,
      address: address,
      phoneNumber: phoneNumber,
      postCode: postCode,
      province: province,
      town: town,
      callback_url: "http://localhost:4100/callback",
    };

    const createTransaction = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      transactionData,
      { headers }
    );

    const {
      data: { authorization_url },
    } = createTransaction.data;

    res.redirect(authorization_url);
  } catch (err) {
    console.log(err);
    res.render("checkout", {
      user,
      carts,
      totalAmount,
      error: "Error occurred while checking out",
    });
  }
};

async function verifyPayment(trxref) {
  try {
    const paystackVerify = `https://api.paystack.co/transaction/verify/${trxref}`;

    const response = await axios.get(paystackVerify, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      },
    });


    if (
      response.data &&
      response.data.status &&
      response.data.data.status === "success"
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

const callback = async (req, res) => {
  const email = req.user.email;
  const user = await userModel.findOne({ email: email });
  const carts = await cartModel
    .find({ userId: user._id })
    .populate("productId");
  let totalAmount = 0;
  await carts.map((item) => {
    // console.log(item.productId.price)
    totalAmount += Number(item.productId.price);
  });
  try {
    const { reference, status, trxref } = req.query;
    const verify = await verifyPayment(trxref);
    // console.log(verify);

    if (verify) {
      await checkoutModel.create({
        userId: user._id,
        products: carts.map((cart) => cart.productId),
      });

      await cartModel.deleteMany({ userId: user._id});
      res.render("checkout", {
        user,
        carts,
        totalAmount,
        success: "Products checked out successfully",
      });
    } else {
      res.render("checkout", {
        user,
        carts,
        totalAmount,
        error: "Checkout failed",
      });
    }
  } catch (err) {
    console.log(err);
    res.render("checkout", {
      user,
      carts,
      totalAmount,
      error: "Checkout failed",
    });
  }
};

module.exports = { payment, callback };
