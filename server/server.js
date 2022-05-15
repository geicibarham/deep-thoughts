const express = require('express');

// import apollo server
const { ApolloServer } = require('apollo-server-express');

// import typedefs and resolvers
const {typeDefs, resolvers} = require('./schemas')
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create new instance of apollo server with graphql schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate apollo server with express application as middleware
  server.applyMiddleware({ app });
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go test our gql api
    console.log(`Use graphQl at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

// call async function to start the server
startApolloServer(typeDefs,resolvers);