const mongoose = require("mongoose");
const toObject = require("./plugin/toObject");

const cartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

cartSchema.plugin(toObject);

module.exports = mongoose.model("Cart", cartSchema);
