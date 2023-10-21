const { default: axios } = require("axios");
const Redis = require("ioredis");
// const redis = new Redis();
const redis = new Redis({
  port: 18049, // Redis port
  host: "redis-18049.c1.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.Password_Redis_Labs,
});
class ItemController {
  static async getItems(req, res) {
    try {
      let items = await redis.get("items");
      console.log(items);
      if (!items) {
        const { data } = await axios({
          url: "http://localhost:4002/items",
          method: "GET",
        });
        items = data;
        await redis.set("items", JSON.stringify(items));
      } else {
        items = JSON.parse(items);
      }
      res.status(200).json(items);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async detailItem(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: "http://localhost:4002/items/" + id,
        method: "GET",
      });
      const { data: user } = await axios({
        url: "http://localhost:4001/users/" + data.MongoId,
        method: "GET",
      });
      data.User = user;
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }
  static async createItem(req, res) {
    try {
      const { data } = await axios({
        url: "http://localhost:4002/items",
        method: "POST",
        data: req.body,
      });
      await redis.del("items");

      res.status(201).json(data);
    } catch (err) {
      if (err.response) {
        res.status(err.response.status).json(err.response.data);
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  static async updateItem(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: "http://localhost:4002/items/" + id,
        method: "PUT",
        data: req.body,
      });
      await redis.del("items");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      if (err.response) {
        res.status(err.response.status).json(err.response.data);
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  static async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: "http://localhost:4002/items/" + id,
        method: "DELETE",
      });
      await redis.del("items");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      if (err.response) {
        res.status(err.response.status).json(err.response.data);
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}
module.exports = ItemController;
