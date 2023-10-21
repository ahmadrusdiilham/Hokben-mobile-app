const User = require("../models/user");

class ControllerUser {
  static async getUser(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "not_found" };
      }
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      if (err.name === "not_found") {
        res.status(404).json({ message: "User Not Found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async createUser(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      if (!username) {
        throw { name: "username_required" };
      }
      if (!email) {
        throw { name: "email_required" };
      }
      if (!password) {
        throw { name: "password_required" };
      }
      const user = await User.create(
        username,
        email,
        password,
        phoneNumber,
        address
      );
      res.status(201).json(user);
    } catch (err) {
      if (err.name === "username_required") {
        res.status(400).json({ message: "Username is required" });
      } else if (err.name === "email_required") {
        res.status(400).json({ message: "Email is required" });
      } else if (err.name === "password_required") {
        res.status(400).json({ message: "Password is required" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  static async deleteUser(req, res) {
    try {
      console.log(req.params);
      const { id } = req.params;
      const findUser = await User.findByPk(id);
      if (!findUser) {
        throw { name: "not_found" };
      }
      const userDeleted = await User.destroy(id);
      res.status(200).json(userDeleted);
    } catch (err) {
      console.log(err);
      if (err.name === "not_found") {
        res.status(404).json({ message: "User Not Found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}

module.exports = ControllerUser;
