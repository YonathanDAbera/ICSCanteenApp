const router = require("express").Router();

const {
  checkDuplicatedCategory,
  checkCategoryExist,
} = require("../middleware/verifyCategory");
const { verifyToken, isAdmin, isModerator } = require("../middleware/authJwt");
const {
  getAllCategories,
  deleteCategory,
  editCategoryName,
  createCategory,
} = require("../controllers/categoryControllers");

router.get("/", getAllCategories);
router.post(
  "/",
  [verifyToken, isAdmin, isModerator, checkDuplicatedCategory],
  createCategory
);
router.put(
  "/:id",
  [verifyToken, isAdmin, isModerator, checkCategoryExist],
  editCategoryName
);
router.delete(
  "/:id",
  [verifyToken, isAdmin, isModerator, checkCategoryExist],
  deleteCategory
);

module.exports = router;
