const { default: axios } = require("axios");
const Redis = require("ioredis");
// const redis = new Redis();
const redis = new Redis({
  port: 18049, // Redis port
  host: "redis-18049.c1.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.Password_Redis_Labs,
});
class UserController {
  static async getUser(req, res) {
    try {
      let users = await redis.get("users");
      // console.log(cacheUser);
      if (!users) {
        const { data } = await axios({
          url: "http://localhost:4001/users",
          method: "GET",
        });
        users = data;
        await redis.set("users", JSON.stringify(users));
      } else {
        users = JSON.parse(users);
      }
      // console.log(data);
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
    }
  }
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: "http://localhost:4001/users/" + id,
        method: "GET",
      });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }
  static async createUser(req, res) {
    try {
      const { data } = await axios({
        url: "http://localhost:4001/users",
        method: "POST",
        data: req.body,
      });
      await redis.del("users");
      res.status(201).json(data);
    } catch (err) {
      console.log(err.response.data);
      if (err.response) {
        res.status(err.response.status).json(err.response.data);
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: "http://localhost:4001/users/" + id,
        method: "DELETE",
      });
      await redis.del("users");
      if (!data) {
        throw { name: "not_found" };
      }
      res.status(200).json(data);
    } catch (err) {
      if (err.response) {
        res.status(err.response.status).json(err.response.data);
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}
module.exports = UserController;
