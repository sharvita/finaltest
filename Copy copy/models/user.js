

const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  passport = require("passport"),
  passportLocalMongoose = require("passport-local-mongoose");

 userSchema = new Schema(
  {
    first: {
      type: String,
      trim: true
    },
    last: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    userName: {
      type: String,
      //required: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    location: {
      type: String,
      trim: true
    },
    securityQuestion1Answer: {
      type: String,
      trim: true,
      //required: true
    },
    securityQuestion2Answer: {
      type: String,
      trim: true,
      //required: true
    },
    securityQuestion3Answer: {
      type: String,
      trim: true,
     // required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    biography: {
      type: String,
      trim: true
    },
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }],
    follower: [{ type: mongoose.Schema.Types.ObjectId, ref: "Follow" }],
    unfollow: [{ type: mongoose.Schema.Types.ObjectId, ref: "unfollow" }]
  },
  {
    timestamps: true
  }
);

userSchema.methods.getInfo = function () {
  return `name ${this.first} last ${this.last} userName ${this.userName} email ${this.email} date ${this.date} biography ${this.biography}`;
};

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

userSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

userSchema.methods.findLocalUser = function () {
  return this.model("User")
    .find({
      userName: this.userName
    })
    .exec();
}

module.exports = mongoose.model("User", userSchema);