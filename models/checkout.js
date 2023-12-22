const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CheckOut", checkoutSchema);
