/* eslint-disable no-console */
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
const port = process.env.PORT || 8080;

process.on('SIGINT', () => {
  console.log('Server shutting down...');
  process.exit(1);
});
server.applyMiddleware({ app });
app.listen({ port }, () => console.log(`Server running at http://localhost:${port}${server.graphqlPath}`));
