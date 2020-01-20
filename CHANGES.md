## Updated GraphQL schema
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

  extend type Forum {
    "The forum's administrator"
    admin: User
    "Allows forum's administrator to set it as private and hide it from the list of available forums"
    isPrivate: Boolean
    "A list of users waiting to be accepted and joined to a forum"
    pendingRequests: [User!]!
  }

  extends type Mutation {
    "Sets a forum as private"  
    setForumAsPrivate(userId: ID!, forumId: ID!): Forum!
    "Allows users to request to join private forums"
    requestToJoin(userId: ID!, forumId: ID!): Forum!
    "Accepts or refuses user's request to join a private forum"
    confirmRequestToJoin(adminId: ID!, userId: ID!, forumId: ID!, requestStatus: RequestToJoin): Forum!
  }

  enum RequestToJoin {
      ACCEPTED: 'Accepted'
      REFUSED: 'Refused'
  }
```
