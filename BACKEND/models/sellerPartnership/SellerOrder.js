const mongoose = require("mongoose");

const sellerOrderSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      ref: "seller",
    },
    //quantity,  product, price per item
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: Number,
        pricePerItem: Number,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "processing", "readyToDelivery" , "onDelivery" , "completed"],
      default: "pending",
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    returnProducts: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: Number,
      }
    ],
  },
  { timestamps: true }
);

const SellerOrder = mongoose.model("sellerOrder", sellerOrderSchema);
module.exports = SellerOrder;
