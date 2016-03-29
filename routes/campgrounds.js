var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

// INDEX ROUTE
router.get("/", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: campgrounds
            });
        }
    });
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.create(
        {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            author: {
                id: req.user._id,
                username: req.user.username
            }
        },
        function (err, campground) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/campgrounds");
            }
        }
    );
});

// NEW ROUTE - show form to create new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// SHOW ROUTE - shows more info about one campground
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log(campground);
            res.render("campgrounds/show", {
                campground: campground
            });
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    console.log(req.campground);
    res.render("campgrounds/edit", {
        campground: req.campground
    });
});

// UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, campground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;