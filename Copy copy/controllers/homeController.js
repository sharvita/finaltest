"use strict";

const { render } = require("ejs");
const mongoose = require("mongoose");
const User = require("../models/user");
const Tweet = require("../models/tweet");

module.exports = {
  index: (req, res) => {
    Tweet.find({hashtag: 'gym'})
    .then((found) => {
      res.render('index', {
        User: User,
        userArray: [{type: mongoose.Schema.Types.ObjectId, ref: User}],
        tweets: found,
      });
    })
    .catch(error => {
      console.log(`Error finding trending tweets by hashtags : ${error.message}`);
      res.render('index', {
        User: User,
        userArray: [{type: mongoose.Schema.Types.ObjectId, ref: User}],
        tweets: null,
      });
    });
  }
};