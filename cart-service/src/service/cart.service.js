const Cart = require("../model/cart.model");
const { v4: uuidv4 } = require("uuid");
const { sendRequest, listenForRequests } = require("../config/messenger");
const transformer = require("../utils/transformer");
const formatter = require("../utils/formatter");

/**
getCart is a function that retrieves all items in cart from the database.
@returns {Array} products - An array of all the products in the database.
*/

const getCart = async (data) => {
  const cart = await Cart.findOne({ customer_id: data.user._id });
  if (!cart) {
    return [];
  }

  // send request to product service to get product information
  const productIds = cart.items.map((item) => item.productId);
  const request = JSON.stringify({
    type: "getProducts",
    data: {
      productIds,
    },
  });

  const correlationId = uuidv4();

  await sendRequest("product-service", request, correlationId);

  // listen for response from product service based on correlationId
  const products = await listenForRequests();

  // Append products to match cart items using productId
  const items = cart.items.map((item) => {
    const product = products.products.find(
      (product) => product._id == item.productId
    );

    return {
      quantity: item.quantity,
      name: product.name,
      id: product._id,
    };
  });

  // Overide cart items with new items
  cart.items = items;
  return cart;
};

const addProduct = async (data) => {
  const { productId, quantity } = data.body;

  const cart = await Cart.findOneAndUpdate(
    { customerId: data.user._id },
    { $push: { items: { productId, quantity } } },
    { new: true }
  );

  if (!cart) {
    const newCart = new Cart({
      customerId: data.user._id,
      items: [
        {
          productId,
          quantity,
        },
      ],
    });

    return await newCart.save();
  }

  return cart;
};

module.exports = {
  getCart,
  addProduct,
};
