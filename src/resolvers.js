const _ = require('lodash');
const moment = require('moment');
const dam = require('./dataAccessManager');

const resolvers = {
  Query: {
    getUsers: () => dam.getAllUsers(),
    getUser: (__, { userId }) => dam.readUser(userId),
    getAvailableForums: (__, { userId }) => {
      const forums = dam.getAllForums();

      return _.filter(forums, (forum) => !_.some(forum.members, { id: userId }));
    },
    getJoinedForums: (__, { userId }) => {
      const user = dam.readUser(userId);

      if (user) {
        return _.map(user.joinedForums, (joinedForum) => {
          const { id } = joinedForum;

          return dam.readForum(id);
        });
      }
      return null;
    },
    getForumMembers: (__, { forumId }) => {
      const forum = dam.readForum(forumId);

      if (forum) {
        return _.map(forum.members, (member) => {
          const { id } = member;

          return dam.readUser(id);
        });
      }
      return null;
    },
    getMessages: (__, { forumId }) => {
      const forum = dam.readForum(forumId);

      if (forum) {
        return _.map(forum.messages, (message) => {
          const { id } = message;

          return dam.readMessage(id);
        }).sort((a, b) => a.timestamp < b.timestamp);
      }
      return null;
    },
  },
  Mutation: {
    createUser: (__, args) => {
      const { name, pictureUrl } = args;
      const userData = {
        name,
        pictureUrl,
        joinedForums: [],
      };

      return dam.createUser(userData);
    },
    createForum: (__, { userId }) => {
      const user = dam.readUser(userId);

      if (user) {
        const forumData = {
          messages: [],
          members: [{ id: userId }],
        };
        const forum = dam.createForum(forumData);

        if (forum) {
          user.joinedForums = [...user.joinedForums, { id: forum.id }];
          if (dam.updateUser(user)) {
            return forum;
          }
          dam.deleteForum(forum.id);
        }
      }
      return null;
    },
    joinForum: (__, { userId, forumId }) => {
      const user = dam.readUser(userId);
      const forum = dam.readForum(forumId);

      if (user && forum && !_.some(user.joinedForums, { id: forum.id })) {
        const oldJoinedForums = user.joinedForums.slice();

        user.joinedForums = [...user.joinedForums, { id: forum.id }];

        const newUser = dam.updateUser(user);

        if (newUser) {
          forum.members = [...forum.members, { id: user.id }];

          const newForum = dam.updateForum(forum);

          if (newForum) {
            return {
              user: newUser,
              forum: newForum,
            };
          }
          user.joinedForums = oldJoinedForums;
          dam.updateUser(user);
        }
      }
      return null;
    },
    postMessage: (__, { userId, forumId, text }) => {
      const forum = dam.readForum(forumId);

      if (forum && _.some(forum.members, { id: userId })) {
        const messageData = {
          timestamp: moment().unix(),
          creator: { id: userId },
          text,
        };

        const message = dam.createMessage(messageData);

        forum.messages = [...forum.messages, { id: message.id }];

        return dam.updateForum(forum);
      }
      return null;
    },
  },
  User: {
    id: (root) => root.id,
    name: (root) => root.name,
    pictureUrl: (root) => root.pictureUrl,
    joinedForums: (root) => {
      const { joinedForums } = root;

      return _.map(joinedForums, (joinedForum) => {
        const { id } = joinedForum;

        return dam.readForum(id);
      });
    },
  },
  Forum: {
    id: (root) => root.id,
    messages: (root) => {
      const { messages } = root;

      return _.map(messages, (message) => {
        const { id } = message;

        return dam.readMessage(id);
      }).sort((a, b) => a.timestamp < b.timestamp);
    },
    members: (root) => {
      const { members } = root;

      return _.map(members, (member) => {
        const { id } = member;

        return dam.readUser(id);
      });
    },
  },
  Message: {
    id: (root) => root.id,
    timestamp: (root) => root.timestamp,
    creator: (root) => {
      const { creator } = root;
      const { id } = creator;

      return dam.readUser(id);
    },
    text: (root) => root.text,
  },
};

module.exports = resolvers;
