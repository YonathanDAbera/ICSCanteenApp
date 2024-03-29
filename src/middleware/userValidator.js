const checkIsValidUser = (req, res, next) => {
  const { lastName, email, name, password } = req.body;

  if (!email || !lastName || !name || !password)
    res.status(400).json({
      successful: false,
      message: `Missing inputs, name: ${name} lastName: ${lastName} email:${email} password:${password}`,
    });

  let reg =
    /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

  let isValidEmail = reg.test(email);

  if (!isValidEmail)
    return res
      .status(400)
      .json({ successful: false, message: `Email is not valid` });

  if (!lastName || !name)
    return res
      .status(400)
      .json({ successful: false, message: `Full name is required` });

  if (typeof lastName !== "string" || typeof name !== "string")
    return res
      .status(400)
      .json({ successful: false, message: ` Name is not valid` });

  req.userName = `${name} ${lastName}`;

  if (password.length < 5)
    return res
      .status(400)
      .json({ successful: false, message: `Password min length is 5` });

  next();
};
const checkIsValidUpdate = (req, res, next) => {
  const { lastName, name, newPassword} = req.body;
  const number = parseInt(req.body.number),
    ID = parseInt(req.body.ID);

  if (newPassword) {
    if (newPassword.length < 5)
      return res
        .status(400)
        .json({ successful: false, message: `Password min length is 5` });
  }

  if (number) {
    if (number.length < 10)
      return res
        .status(400)
        .json({ successful: false, message: `Number min length is 10` });

    if (typeof number !== "number")
      return res
        .status(400)
        .json({ successful: false, message: `Number not valid` });
  }

  if (!lastName || !name)
    return res
      .status(400)
      .json({ successful: false, message: `Full name is required` });
  req.userName = `${name} ${lastName}`;

  if (typeof lastName !== "string" || typeof name !== "string")
    return res
      .status(400)
      .json({ successful: false, message: ` Name is not valid` });

  if (!ID)
    return res
      .status(400)
      .json({ successful: false, message: `ID is required` });

  if (typeof ID !== "number" || ID.length > 4)
    return res
      .status(400)
      .json({ successful: false, message: `ID is not valid` });

  req.useridentification = `${ID}`;
  req.userName = `${name} ${lastName}`;
  next();
};
module.exports = { checkIsValidUser, checkIsValidUpdate };
