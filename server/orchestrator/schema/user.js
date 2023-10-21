const axios = require("axios");
const baseUrl = "http://user-service:4001";
const Redis = require("ioredis");
const redis = new Redis({
  port: 18049, // Redis port
  host: process.env.Username_Redis_Labs, // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.Password_Redis_Labs,
});

const typeDefs = `#graphql

  type Users {
    _id: String
    username: String
    email: String
    phoneNumber: String
    address: String
    role: String
  }
  type User {
    _id: String
    username: String
    email: String
    phoneNumber: String
    address: String
    role: String
  }

  type Message{
    msg:String
  }

  input UserInput{
    username: String
    email: String
    phoneNumber: String
    address: String
    password: String
  }

  type Query {
    getUsers: [Users]
    getUser(_id:String!):User
  }

  type Mutation{
    addUser( user: UserInput): Message
    deleteUser(_id:String):Message
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        let users = await redis.get("users");
        if (!users) {
          const { data } = await axios({
            url: baseUrl + "/users",
            methode: "GET",
          });
          users = data;
          await redis.set("users", JSON.stringify(users));
        } else {
          users = JSON.parse(users);
        }
        return users;
      } catch (err) {
        throw err;
      }
    },
    getUser: async (parent, args) => {
      try {
        const { _id } = args;
        const { data } = await axios({
          url: baseUrl + "/users/" + _id,
          methode: "GET",
        });
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      const { username, email, phoneNumber, address, password } = args.user;

      try {
        const { data } = await axios({
          url: baseUrl + "/users",
          method: "POST",
          data: { username, email, phoneNumber, address, password },
        });
        await redis.del("users");
        return { msg: "Success add user" };
      } catch (err) {
        throw err.response.data.message;
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { _id } = args;
        const { data } = await axios({
          url: baseUrl + "/users/" + _id,
          method: "DELETE",
        });
        await redis.del("users");
        return { msg: `Success delete user` };
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
