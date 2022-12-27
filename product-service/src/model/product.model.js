const mongoose = require("mongoose");
const toObject = require("./plugin/toObject");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  textPrice: { type: String, required: true },
  description: { type: String, required: true },
  // image: { type: String, required: true },
  categories: { type: [String], required: true },
  quantity: { type: Number, required: true },
  variations: [
    {
      name: { type: String, required: true },
      options: [
        {
          value: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  ],
});

// Pre save method to slugify the product name
productSchema.pre("validate", async function (next) {
  // Slugify the name without using package
  this.slug = this.name.toLowerCase().split(" ").join("-");

  // Generate text price for low price to high price with this format: $10 - $20
  const prices = this.variations.map((variation) => {
    return variation.options.map((option) => option.price);
  });

  const minPrice = Math.min(...prices.flat());
  const maxPrice = Math.max(...prices.flat());

  this.textPrice = `$${minPrice} - $${maxPrice}`;
  next();
});

productSchema.plugin(toObject);

module.exports = mongoose.model("Product", productSchema);
