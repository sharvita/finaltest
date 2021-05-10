"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

var followSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        trim: true
      }
      
    },
    last: {
        type: String,
        trim: true
      },
    userName: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    follow: [{type: mongoose.Schema.Types.ObjectId, ref: "follow"}],
    unfollow: [{type: mongoose.Schema.Types.ObjectId, ref: "unfollow"}]
  },
  {
    timestamps: true
  }
);

followSchema.methods.getInfo = function () {
  return `name ${this.name} last ${this.last} userName ${this.userName} `;
};

followSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

followSchema.methods.findLocalUser = function () {
  return this.model("User")
      .find({
        userName: this.userName
      })
      .exec();
}

module.exports = mongoose.model("follow", followSchema);