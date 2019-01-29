import _ from 'lodash';
import { gql } from 'apollo-server-express';
import userModel from './models';

export const typeDefs = gql`
  type User {
    id: ID,
    name: String,
    age: Int,
    email: String,
    friends: [User]
  }
  type Query {
    helloWorld: String
    helloWorldWithParameter(name:String!): String
    users: [User]
    findUser(id:ID!):User
  }
  input CreateUserInput {
    id: Int
    name: String
    age: Int
    email: String
    friends: [Int]
  }
  type Mutation {
    createUser(input: CreateUserInput!): User
    deleteUser(id:ID): User
    updateUser(input:CreateUserInput):User
  }
`;

export const resolvers = {
  Query: {
    helloWorld() {
      return 'Merhaba Dünya';
    },
    helloWorldWithParameter(source, args) {
      return `Merhaba ${args.name}`;
    },
    users() {
      return userModel.list();
    },
    findUser(source, args) {
      return userModel.find(args.id);
    },
  },
  User: {
    friends(source, args) {
      if (!source.friends || !source.friends.length) {
        return;
      }

      return _.map(source.friends, ({ id }) => userModel.find(id));
    },
  },
  Mutation: {
    createUser(source, args) {
      return userModel.create(args.input);
    },
    deleteUser(source, args) {
      return userModel.delete(args.id);
    },
    updateUser(source, args) {
      return userModel.update(args.input);
    },
  },
};
