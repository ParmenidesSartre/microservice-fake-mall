const mongoose = require("mongoose");
const toObject = require("./plugin/toObject");


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug : {
        type: String,
        required: true,
        unique: true,
    }
});


// Pre save method to slugify the category name
categorySchema.pre("validate", async function (next) {
    // Slugify the name without using package
    this.slug = this.name.toLowerCase().split(" ").join("-");
    next();
})

categorySchema.plugin(toObject);

module.exports = mongoose.model("Category", categorySchema);
