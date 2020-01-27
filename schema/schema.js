const { gql } = require('apollo-server-express');
const Joi = require('joi');

// Mongoose Model imports
const Post = require('../models/Post');

const postsArr = [
  { id: 1, user: { username: 'John Doe', avatar: 'http://avatarpic.com' }, text: 'Testing the first a post that someone decided to make because they felt like it', comments: [{ id: 23475432, text: 'Testing a comment' }, { id: 5734745734, text: 'Testing a another comment' }] },
  { id: 2, user: { username: 'John Doe', avatar: 'http://avatarpic.com' }, text: 'Testing the second a post that someone decided to make because they felt like it, Testing the second a post that someone decided to make because they felt like it', comments: [{ id: 23475432, text: 'Testing a comment' }, { id: 5734745734, text: 'Testing a another comment' }] },
  { id: 3, user: { username: 'John Doe', avatar: 'http://avatarpic.com' }, text: 'Testing the third a post that someone decided to make because they felt like it', comments: [{ id: 23475432, text: 'Testing a comment' }, { id: 5734745734, text: 'Testing a another comment' }] },
  { id: 4, user: { username: 'John Doe', avatar: 'http://avatarpic.com' }, text: 'Testing the fourth a post that someone decided to make because they felt like it', comments: [{ id: 23475432, text: 'Testing a comment' }, { id: 5734745734, text: 'Testing a another comment' }] },
  // { id: "5", text: 'Testing the fifth a post that someone decided to make because they felt like it' },
  // { id: "6", text: 'Testing the sixth a post that someone decided to make because they felt like it' },
  // { id: "7", text: 'Testing the seventh a post that someone decided to make because they felt like it' },
  // { id: "8", text: 'Testing the eighth a post that someone decided to make because they felt like it' },
  // { id: "9", text: 'Testing the ninth a post that someone decided to make because they felt like it' },
  // { id: "10", text: 'Testing the tenth a post that someone decided to make because they felt like it' },
]

postArr = [
  { id: 1, user: { avatar: 'http://avatarpic.com' }, text: 'Testing the first a post that someone decided to make because they felt like it' },
]

// The GraphQL schema
const typeDefs = gql`
  # Comment

  type Post {
    id: ID
    user: User
    text: String
    commentsCount: Int
    comments: [Comment]
  }
 	       
  type Comment {
    id: ID
    text: String
  }

  type User {
    userId: String
    username: String
    avatar: String
    # posts: Post
    inbox: Inbox
  }

  type Inbox {
    # id: ID
    posts: [SavedPost]
  }

  type SavedPost {
    post: Post
    comments: Comment
    lastCount: Int
    currentCount: Int
  }

  type Query {
    getPosts: [Post]
    getPost(id: ID): Post
    getInbox: [Post]
  }

  type Mutation {
    # createPost(text: String, user: ID): Post
    createPost(text: String): String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    getPosts: async () => {
      // const docCount = await Post.find().estimatedDocumentCount();
      // const counted = Math.floor(docCount)

      // const cdate = new Date();
      // date.setHours(0);
      // date.setMinutes(0);
      // date.setSeconds(0);
      // date.setMilliseconds(0);
      // const fcdate = cdate.toISOString();

      // const pdate = new Date();
      // pdate.setDate(pdate.getDate() - 30)
      // pdate.setHours(0);
      // pdate.setMinutes(0);
      // pdate.setSeconds(0);
      // pdate.setMilliseconds(0);
      // const fpdate = pdate.toISOString();

      // const postsResult = await Post
      //   .find({ createdAt: { '$gte': fpdate, '$lte': fcdate } })
      //   .limit(10)
      //   .exec((err, posts) => {
      //     if (err) return err;
      //     return posts
      //   });

      // return postsResult;
      return postsArr;
    },
    getPost: async (parent, args, context) => {
      const id = parseInt(args.id) + 1;
      const gotArr = postsArr.filter(post => post.id == id);
      return gotArr[0];

      // const postResult = await Post
      //   .findById({ _id: args.id })
      //   .exec((err, post) => {
      //     if (!err) return post;
      //   });

      // return postResult;
    }
  },
  Mutation: {
    createPost: async (parent, args, context) => {
      const schema = Joi.object().keys({
        text: Joi.string().alphanum().min(3).max(30).required()
      });

      const result = Joi.validate({ text: args.text }, schema);

      // Create Current Date
      // const cdate = new Date();
      // date.setHours(0);
      // date.setMinutes(0);
      // date.setSeconds(0);
      // date.setMilliseconds(0);
      // const fcdate = cdate.toISOString();

      // const newPost = new Post({
      //   text: result.value.text,
      //   user: context.authScope,
      //   createdAt: fcdate
      // });

      // console.log(result);
      // console.log(context.authScope);
      // newPost.save();
      if (result.error) return 'Sorry, there was an error!';
      return "Post Created!";
    }
  }
};

module.exports = { typeDefs, resolvers };