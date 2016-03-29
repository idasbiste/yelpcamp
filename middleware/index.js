var flash = require("connect-flash"),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

var middleware = {
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("/login");
    },
    checkCampgroundOwnership: function (req, res, next) {
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, function (err, campground) {
                if (err) {
                    req.flash("error", "Campground not found.");
                    res.redirect("/campgrounds");
                } else {
                    if (campground.author.id.equals(req.user._id)) {
                        req.campground = campground;
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that.");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that.");
            res.redirect("back");
        }
    },
    checkCommentOwnership: function (req, res, next) {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.commentId, function (err, comment) {
                if (err) {
                    res.redirect("/campgrounds");
                } else {
                    if (comment.author.id.equals(req.user._id)) {
                        req.comment = comment;
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that.");
                        res.redirect("back");
                    }
                }
            });
        } else {
            res.redirect("back");
        }
    }
}

module.exports = middleware;