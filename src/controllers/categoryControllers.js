const { Category } = require("../models/category.model");
const Products = require("../models/product.model");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    return res.status(200).json({ successful: true, data: categories });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      successful: false,
      message: "Something went wrong, could not get all categories",
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const crypto = require("crypto");
    const newCategoryId = crypto.randomBytes(16).toString("hex")
    const newCategory = new Category({ _id: newCategoryId, name: req.body.category });
    await newCategory.save();

    return res.status(201).json({
      successful: true,
      category: newCategory,
      message: `Category ${newCategory.name} created successfully`,
    });
  } catch (err) {
    console.error(err); // Log the entire error object for debugging

    if (err.name === 'ValidationError') {
      return res.status(400).json({
        successful: false,
        message: `Validation error: ${err.message}`,
      });
    } else {
      return res.status(500).json({
        successful: false,
        message: "Internal server error",
      });
    }
  }
};
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.id);
    await Products.deleteMany({ category: req.categoryName });

    return res.status(204).json({
      successful: true,
      message: `Category  successfully deleted`,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      successful: false,
      message: "Something went wrong, could delate category",
    });
  }
};

const editCategoryName = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.id, {
      $set: { name: req.body.categoryNewName },
    });

    await Products.updateMany(
      { category: req.categoryName },
      { category: req.body.categoryNewName }
    );

    return res.status(200).json({
      successful: false,
      category: { ...category, name: req.body.categoryNewName },
      message: `Category successfully renamed`,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      successful: false,
      message: "Something went wrong, could not delate category",
    });
  }
};

module.exports = {
  getAllCategories,
  deleteCategory,
  editCategoryName,
  createCategory,
};
