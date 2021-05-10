"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user");

mongoose.connect(
  "mongodb://localhost:27017/chitter_chatter",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection;

var contacts = [
  {

    first: "Jason",
    last: "White",
    email: "jasonwhite@gmail.com",
    username: "jwhite",
    password: "jasonPass",
    location: "Denver",
    date: 3 / 15 / 1995,
    biography: "I am a teacher"
  },
  {

    first: "Jen",
    last: "Sterling",
    email: "jensterling@gmail.com",
    username: "jsterling",
    password: "password123",
    location: "Texas",
    date: 1 / 1 / 1975,
    biography: "I am a art student"
  },
  {
    first: "priya",
    last: "Madhok",
    email: "priyamadhok@gmail.com",
    username: "pmadhok",
    password: "password@12345",
    location: "India",
    date: 12 / 9 / 1980,
    biography: "I am a engineer"
  }
];

User.deleteMany()
  .exec()
  .then(() => {
    console.log("User data is empty!");
  });

var commands = [];

contacts.forEach(c => {
  commands.push(
    User.create({
      first: c.first,
      last: c.last,
      email: c.email,
      password: c.password,
      location: c.location,
      date: c.date,
      biography: c.biography
    })
  );
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });
