const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongodb");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static collection() {
    return getDb().collection("Users");
  }

  static async findAll() {
    const users = await this.collection()
      .find({}, { projection: { password: 0 } })
      .toArray();
    return users;
  }

  static async findByPk(id) {
    const user = await this.collection().findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );
    if (!user) {
      return null;
    }
    return user;
  }

  static async create(username, email, password, phoneNumber, address) {
    const dataUser = {
      username,
      email,
      password: hashPassword(password),
      phoneNumber,
      address,
      role: "admin",
    };
    const newUser = await this.collection().insertOne(dataUser);
    return newUser;
  }

  static async destroy(id) {
    const userDeleted = await this.collection().deleteOne({
      _id: new ObjectId(id),
    });
    return userDeleted;
  }
}
module.exports = User;
