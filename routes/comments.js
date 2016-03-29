// ===================
//   COMMENTS ROUTES 
// ===================
var express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

// NEW ROUTE - show form to add new comment
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }
    });
});

// CREATE ROUTE - creates new comment for a campground
router.post("/", middleware.isLoggedIn, function (req, res) {
    var id = req.params.id;
    Campground.findById(id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong...");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment.");
                    res.redirect("/campgrounds/" + id);
                }
            });
        }
    });
});

// EDIT ROUTE
router.get("/:commentId/edit", middleware.checkCommentOwnership, function (req, res) {
    res.render("comments/edit", {
        campgroundId: req.params.id,
        comment: req.comment
    });
});

// UPDATE ROUTE
router.put("/:commentId", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function (err, comment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:commentId", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.commentId, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;