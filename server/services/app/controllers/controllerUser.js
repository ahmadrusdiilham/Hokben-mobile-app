const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        role: "admin",
      });
      res
        .status(201)
        .json({ message: `user with email ${email} has been created` });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "email/password_required" };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { name: "invalid_email/password" };
      }
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "invalid_email/password" };
      }
      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ControllerUser;
