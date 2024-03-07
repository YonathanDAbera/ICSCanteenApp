const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserRoleById,
  updateProfileById,
} = require("../controllers/usersControllers");
const { verifyToken, isAdminOrIsModerator } = require("../middleware/authJwt");
const {
  checkDuplicatedEmail,
  checkRolesExisted,
} = require("../middleware/verifySignUp");
const {
  checkIsValidUser,
  checkIsValidUpdate,
} = require("../middleware/userValidator");

router.get("/", [verifyToken], getAllUsers);
router.get("/:id", [verifyToken], getUserById);

router.put("/me", [verifyToken, checkIsValidUpdate], updateProfileById);
router.put(
  "/role/:id",
  [verifyToken, isAdminOrIsModerator, checkRolesExisted],
  updateUserRoleById
);
router.post(
  "/",
  [
    verifyToken,
    isAdminOrIsModerator,
    checkDuplicatedEmail,
    checkRolesExisted,
    checkIsValidUser,
  ],
  createUser
);

module.exports = router;
