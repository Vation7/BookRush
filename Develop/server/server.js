const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');  // MongoDB connection
const routes = require('./routes');
const { typeDefs, resolvers } = require('./schemas');  // GraphQL schema and resolvers
const authMiddleware = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../client/dist'); // Correct relative path
  app.use(express.static(distPath));

  // Catch-all route to serve the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html')); // Serve index.html from dist
  });
}

// Apollo Server setup
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();
  server.applyMiddleware({ app });

  // If you still have any REST routes, leave this line
  app.use(routes);

  // Start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on port ${PORT}`);
      console.log(`GraphQL path: http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();