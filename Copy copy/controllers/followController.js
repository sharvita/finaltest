"use strict";

const Follow = require("../models/follow"),
  getFollowParams = body => {
    return {
      name: body.name,
      last: body.last,
      userName: body.userName,
    };
  };

module.exports = {
  index: (req, res, next) => {
    Follow.find()
      .then(follow => {
        res.locals.follow = follow;
        next();
      })
      .catch(error => {
        console.log(`Error fetching follows: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("follow/index");
  },

//   new: (req, res) => {
//     res.render("subscribers/new");
//   },

  create: (req, res, next) => {
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then(subscriber => {
        res.locals.redirect = "/subscribers";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error saving subscriber: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("subscribers/show");
  },

//   edit: (req, res, next) => {
//     let subscriberId = req.params.id;
//     Subscriber.findById(subscriberId)
//       .then(subscriber => {
//         res.render("subscribers/edit", {
//           subscriber: subscriber
//         });
//       })
//       .catch(error => {
//         console.log(`Error fetching subscriber by ID: ${error.message}`);
//         next(error);
//       });
//   },

  update: (req, res, next) => {
    let subscriberId = req.params.id,
      subscriberParams = getSubscriberParams(req.body);

    Subscriber.findByIdAndUpdate(subscriberId, {
      $set: subscriberParams
    })
      .then(subscriber => {
        res.locals.redirect = `/subscribers/${subscriberId}`;
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        next(error);
      });
  },

//   delete: (req, res, next) => {
//     let subscriberId = req.params.id;
//     Subscriber.findByIdAndRemove(subscriberId)
//       .then(() => {
//         res.locals.redirect = "/subscribers";
//         next();
//       })
//       .catch(error => {
//         console.log(`Error deleting subscriber by ID: ${error.message}`);
//         next();
//       });
//   }
};