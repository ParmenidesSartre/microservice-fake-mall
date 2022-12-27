const Product = require("../model/product.model");
const Category = require("../model/category.model");
const transformer = require("../utils/transformer");
const formatter = require("../utils/formatter");

/**

getProduct is a function that retrieves all products from the database.
@returns {Array} products - An array of all the products in the database.
*/
const getProducts = async (data) => {
  // generate search query if search query is provided
  const search = data.query.search || "";
  const products = await Product.find({
    $and: [
      {
        $or: [
          { description: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
          { categories: { $regex: search, $options: "i" } },
        ],
      },
      {
        $or: [
          { description: { $exists: true, $ne: "" } },
          { name: { $exists: true, $ne: "" } },
          { categories: { $exists: true, $ne: "" } },
        ],
      },
    ],
  });
  return formatter(transformer(products));
};

/**
getProduct is a function that get a product in the database.
@returns {Object} products - An object of product in the database.
*/
const getProduct = async (data) => {
  const product = await Product.findOne({ slug: data.params.slug });
  return formatter(product.toObject());
};

/**
createProduct is a function that create a product in the database.
@returns {Object} products - An object of product inserted into the database.
*/
const createProduct = async (data) => {
  const product = await Product.create(data.body);
  return formatter(product.toObject());
};

/**
updateProduct is a function that update a product in the database.
@returns {Object} products - An object of product updated in the database.
*/
const updateProduct = async (data) => {
  const product = await Product.findOneAndUpdate(
    { slug: data.params.slug },
    data.body,
    { new: true }
  );
  return formatter(product.toObject());
};

/**
deleteProduct is a function that delete a product in the database.
@returns {Object} products - An object of product deleted from the database.
*/
const deleteProduct = async (data) => {
  const product = await Product.findOneAndDelete({ slug: data.params.slug });
  return formatter(product.toObject());
};

/**
getCategories is a function that all categories in the database.
@returns {Array} products - An array of categories added in the database.
*/
const getCategories = async () => {
  const categories = await Category.find();
  return formatter(transformer(categories));
};

/**
addCategory is a function that add new category in the database.
@returns {Object} products - An object of new category added in the database.
*/
const createCategory = async (data) => {
  const category = await Category.create(data.body);
  return formatter(category.toObject());
};

/**
getCategory is a function that get a category in the database.
@returns {Object} products - An object of category.
*/
const getCategory = async (data) => {
  const category = await Category.findOne({ slug: data.params.slug });
  return formatter(category.toObject());
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  getCategory,
};
