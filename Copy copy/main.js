"use strict";

const followController = require("./controllers/followController");
const tweet = require("./models/tweet");

const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  router = express.Router(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  usersController = require("./controllers/usersController.js"),
  tweetsController = require("./controllers/tweetsController.js"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  passport = require("passport"),
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  expressValidator = require("express-validator"),
  connectFlash = require("connect-flash"),
  User = require("./models/user");

//Database
mongoose.connect(
  "mongodb://localhost:27017/chitter_chatter",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.set("useCreateIndex", true);

//EJS
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

//Method Override
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

router.use(layouts);
router.use(express.static("public"));
router.use(expressValidator());

//Express body parser
router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(express.json());

// Express session
router.use(cookieParser("secretChitterChatter123"));
router.use(
  expressSession({
    secret: "secretChitterChatter123",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
router.use(connectFlash());

// Passport middleware
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

// User Routes
router.get("/", homeController.index);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get("/users/logout", usersController.logout, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

//Tweets Routes
router.get("/tweets", tweetsController.index, tweetsController.indexView);
router.get("/tweets/new", tweetsController.new);
router.post("/tweets/create", tweetsController.create, tweetsController.redirectView);
router.get("/tweets/:id/edit", tweetsController.edit);
router.put("/tweets/:id/update", tweetsController.update, tweetsController.redirectView);
router.get("/tweets/:id", tweetsController.show, tweetsController.showView);
router.delete("/tweets/:id/delete", tweetsController.delete, tweetsController.redirectView);
router.get("/tweets/:hashtag/findHashtags", tweetsController.findHashtags, tweetsController.redirectView);
router.post("/tweets/:hashtag/findHashtags", tweetsController.findHashtags, tweetsController.redirectView);


router.get("/follow", followController.index, followController.indexView);
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);

});

console.log("main testing");