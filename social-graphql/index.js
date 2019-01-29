import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';

const app = express();

const PORT = process.env.PORT || 3500;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});

server.applyMiddleware({ app });

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}/graphql`));
