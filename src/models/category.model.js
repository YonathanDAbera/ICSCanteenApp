const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CATEGORIES = [
  "injera",
  "wat",
  "tibs",
  "shiro",
  "kitfo",
  "tere siga",
  "gored-gored",
  "salads",
  "vegetables",
  "desserts",
  "drinks",
  "alcoholic drinks",
  "snacks",
  "fast food",
  "street food",
  "regional specialties",
  "other",
];

const categorySchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, require: true, trim: true, lowercase: true },
    quantity: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
categorySchema.statics.decrementCategoryProducts = function (categoryName) {
  this.findOneAndUpdate(
    { name: categoryName },
    { $inc: { quantity: -1 } },
    { new: true }
  );
};
categorySchema.statics.incrementCategoryProducts = function (categoryName) {
  this.findOneAndUpdate(
    { name: categoryName },
    { $inc: { quantity: 1 } },
    { new: true }
  );
};
const Category = mongoose.model("Category", categorySchema);

module.exports = { Category, CATEGORIES };
