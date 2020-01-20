const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    pictureUrl: String!
    joinedForums: [Forum!]!
  }

  type Forum {
    id: ID!
    messages: [Message!]!
    members: [User!]!
  }

  type Message {
    id: ID!
    timestamp: Int!
    creator: User!
    text: String!
  }

  type Query {
    getUsers: [User!]!
    getUser(userId: ID!): User!
    getAvailableForums(userId: ID!): [Forum!]!
    getJoinedForums(userId: ID!): [Forum!]!
    getForumMembers(forumId: ID!): [User!]!
    getMessages(forumId: ID!, ): [Message!]!
  }

  type Mutation {
    createUser(name: String!, pictureUrl: String!): User!
    createForum(userId: ID!): Forum!
    joinForum(userId: ID!, forumId: ID!): JoinForumMutationResponse!
    postMessage(userId: ID!, forumId: ID!, text: String!): Message!
  }

  type JoinForumMutationResponse {
    user: User
    forum: Forum
  }
`;

module.exports = typeDefs;
