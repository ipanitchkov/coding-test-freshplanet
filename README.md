# The project demonstrates a Node.js backend based on GraphQL, Apollo server and in-memory storage

## GraphQL schema
```
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
```
## Abstraction

The 'database' communication is implemented in two separate components:

* Low level Data Access Layer
* High level Data Access Manager

## Extras

* Debug configuration
* ESLint support
* Fixtures in a separate file with pre-populated data that is loaded when the server starts

### Missing

* Tests
