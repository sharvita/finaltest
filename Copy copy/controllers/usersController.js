"use strict";

const User = require("../models/user"),
  passport = require("passport"),
  getUserParams = body => {
    return {
      
        first: body.first,
        last: body.last,
      email: body.email,
      userName: body.userName,
      password: body.password,
      location: body.location,
      securityquestion1: body.securityquestion1,
      securityquestion2: body.securityquestion2,
      securityquestion2: body.securityquestion2,
      securityQuestion1Answer: body.securityQuestion1Answer,
      securityQuestion2Answer: body.securityQuestion2Answer,
      securityQuestion3Answer: body.securityQuestion3Answer,
      date: body.date,
      biography: body.biography,
      tweets: body.tweets
    };
  };

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  },

  new: (req, res) => {
    res.render("users/new");
  },

  create: (req, res, next) => {
    if (req.skip) return next();
    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (e, user) => {
      if (user) {
        req.flash("success", `${user.fullName}'s account created successfully!`);
        res.locals.redirect = "/login";
        next();
      } else {
        req.flash("error", `Failed to create user account because: ${e.message}.`);
        res.locals.redirect = "/users/new";
        next();
      }
    });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("users/show");
  },

  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render("users/edit", {
          user: user
        });
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    if(re.skip){
      return next();
    }
    let userId = req.params.id;
    let updatedUser = new User({
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      userName: req.body.userName,
      password: req.body.password,
      location: req.body.location,
      securityquestion1: req.body.securityquestion1,
      securityquestion2: req.body.securityquestion2,
      securityquestion2: req.body.securityquestion2,
      securityQuestion1Answer: req.body.securityQuestion1Answer,
      securityQuestion2Answer: req.body.securityQuestion2Answer,
      securityQuestion3Answer: req.body.securityQuestion3Answer,
      date: req.body.date,
      biography: req.body.biography,
      tweets: req.body.tweets
    });

    User.findByIdAndUpdate(userId, {
      $set: 
      {
        'name.first': req.body.first,
        'name.last': req.body.last,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        location: req.body.location,
        securityquestion1: req.body.securityquestion1,
        securityquestion2: req.body.securityquestion2,
        securityquestion2: req.body.securityquestion2,
        securityQuestion1Answer: req.body.securityQuestion1Answer,
        securityQuestion2Answer: req.body.securityQuestion2Answer,
        securityQuestion3Answer: req.body.securityQuestion3Answer,
        date: req.body.date,
        biography: req.body.biography,
        tweets: req.body.tweets
      }
    })
      .then(user => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },
  updateTweet: (req, res, next) => {
    if(req.skip)
    { 
        return next();
    }
    let userId = req.params.id;
    let updatedUser = new User({
        tweets: req.body.tweets
    });
    User.findByIdAndUpdate(userId,
        {
            $set:
            {
                tweets: req.body.tweets
            }
        }
    )
    .then(user => {
      res.locals.redirect = `/users/${userId}`;
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log(`Error updating user by ID: ${error.message}`);
      next(error);
    });
},

  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  },

  login: (req, res) => {
    res.render("users/login");
  },
  validate: (req, res, next) => {
    req
      .sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true
      })
      .trim();
    req.check("first", "First name can't be empty").notEmpty();
    req.check("last", "Last name can't be empty").notEmpty();
    req.check("email", "Email is invalid").isEmail();
    req.check("userName", "User Name is invalid").notEmpty().equals(req.body.userName);
    req.check("password", "Password cannot be empty").notEmpty();
    req.check("securityQuestion1Answer", "Security Question 1 Answer cannot be empty").notEmpty();
    req.check("securityQuestion2Answer", "Security Question 2 Answer cannot be empty").notEmpty();
    req.check("securityQuestion3Answer", "Security Question 3 Answer cannot be empty").notEmpty();
    req.check("date", "Date of Birth cannot be empty").notEmpty();
    req.getValidationResult().then(error => {
      if (!error.isEmpty()) {
        let messages = error.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
        next();
      } else {
        next();
      }
    });
  },
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!"
  }),
  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/";
    next();
  }
};

// exports.getAllUsers = (req, res) => {
//   user.find({})
//       .exec()
//       .then(users => {
//           res.render("users", {
//               users: users
//           })
//       })
//       .catch(error => {
//           console.log(error.message);
//           return [];
//       })
//       .then(() => {
//           console.log("promise complete");
//       });
// };

