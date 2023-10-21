const axios = require("axios");
const baseUrl = "http://app-service:4002";
const baseUrlUser = "http://user-service:4001";
const Redis = require("ioredis");
const redis = new Redis({
  port: 18049, // Redis port
  host: process.env.Username_Redis_Labs, // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.Password_Redis_Labs,
});

const typeDefs = `#graphql

type Category{
    id:ID
    name:String
    createdAt:String
    updatedAt:String
}
type Ingredient{
    id:ID
    ItemId:Int
    name:String
    createdAt:String
    updatedAt:String

}
  type Items {
    id: ID
    name: String
    description: String
    price: Int
    imgUrl: String
    UserId: Int
    CategoryId: Int
    MongoId: String
    createdAt:String
    updatedAt:String
    Category:Category
    Ingredients:[Ingredient]
  }

type Categories{
  id:ID
  name:String
}

  type User {
    _id: String
    username: String
    email: String
    phoneNumber: String
    address: String
    role: String
  }

  type Item {
    id: ID
    name: String
    description: String
    price: Int
    imgUrl: String
    UserId: Int
    CategoryId: Int
    MongoId: String
    createdAt:String
    updatedAt:String
    Category:Category
    Ingredients:[Ingredient]
    User: User
  }
 
 input ItemInput{
    name: String
    description: String
    price: Int
    imgUrl: String
    UserId: Int
    CategoryId: Int
    MongoId: String
    ingredients:String
 }
 input ItemEdit{
    name: String
    description: String
    price: Int
    imgUrl: String
    CategoryId: Int
 }
  type Message{
    msg:String
  }

  type Query {
    getItems: [Items]
    getItem(id:ID!):Item
    getCategories:[Categories]
  }

  type Mutation{
    addItem( item: ItemInput): Message
    updateItem(id:ID edit: ItemEdit): Message
    deleteItem(id:ID):Message

  }
`;

const resolvers = {
  Query: {
    getItems: async () => {
      try {
        let items = await redis.get("items");
        if (!items) {
          const { data } = await axios({
            url: baseUrl + "/items",
            method: "GET",
          });
          items = data;
          await redis.set("items", JSON.stringify(items));
        } else {
          items = JSON.parse(items);
        }
        return items;
      } catch (err) {
        throw err;
      }
    },
    getItem: async (parent, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          url: baseUrl + "/items/" + id,
          method: "GET",
        });
        const { data: user } = await axios({
          url: baseUrlUser + "/users/" + data.MongoId,
          method: "GET",
        });
        data.User = user;
        return data;
      } catch (err) {
        throw err;
      }
    },
    getCategories: async () => {
      try {
        let categories = await redis.get("categories");
        if (!categories) {
          const { data } = await axios({
            url: baseUrl + "/categories",
            methode: "GET",
          });
          categories = data;
          await redis.set("categories", JSON.stringify(categories));
        } else {
          categories = JSON.parse(categories);
        }
        return categories;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addItem: async (_, args) => {
      const {
        name,
        description,
        price,
        imgUrl,
        UserId,
        CategoryId,
        MongoId,
        ingredients,
      } = args.item;

      try {
        const { data } = await axios({
          url: baseUrl + "/items",
          method: "POST",
          data: {
            name,
            description,
            price,
            imgUrl,
            UserId,
            CategoryId,
            MongoId,
            ingredients,
          },
        });
        await redis.del("items");
        return { msg: "Success Add Item" };
      } catch (err) {
        throw err.response.data;
      }
    },
    updateItem: async (_, args) => {
      try {
        const { id } = args;
        const { name, description, price, imgUrl, CategoryId } = args.edit;
        const { data } = await axios({
          url: baseUrl + "/items/" + id,
          method: "PUT",
          data: { name, description, price, imgUrl, CategoryId },
        });
        await redis.del("items");
        return { msg: data.message };
      } catch (err) {
        throw err.response.data;
      }
    },
    deleteItem: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          url: baseUrl + "/items/" + id,
          method: "DELETE",
        });
        await redis.del("items");
        return { msg: data.message };
      } catch (err) {
        throw err.response.data;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
