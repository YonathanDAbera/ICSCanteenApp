const router = require("express").Router();

const {
  checkDuplicatedCategory,
  checkCategoryExist,
} = require("../middleware/verifyCategory");
const { verifyToken, isAdminOrIsModerator} = require("../middleware/authJwt");
const {
  getAllCategories,
  deleteCategory,
  editCategoryName,
  createCategory,
} = require("../controllers/categoryControllers");

router.get("/", getAllCategories);
router.post(
  "/",
  [verifyToken, isAdminOrIsModerator, checkDuplicatedCategory],
  createCategory
);
router.put(
  "/:id",
  [verifyToken, isAdminOrIsModerator, checkCategoryExist],
  editCategoryName
);
router.delete(
  "/:id",
  [verifyToken, isAdminOrIsModerator, checkCategoryExist],
  deleteCategory
);

module.exports = router;
