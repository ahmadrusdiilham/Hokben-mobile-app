require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schema/user");
const {
  typeDefs: itemTypeDefs,
  resolvers: itemResolvers,
} = require("./schema/item");
const server = new ApolloServer({
  typeDefs: [userTypeDefs, itemTypeDefs],
  resolvers: [userResolvers, itemResolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
// const { url } = await startStandaloneServer(server, {
//   listen: { port: process.env.PORT || 4000 },
// });
