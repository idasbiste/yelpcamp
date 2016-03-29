// ===========
//   REQUIRE
// ===========

var express = require("express"),
    expressSession = require("express-session"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    app = express();
    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/index");

// =====================
//   APP CONFIGURATION
// =====================

mongoose.connect("mongodb://localhost/yelpCamp");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// ==========================
//   PASSPORT CONFIGURATION
// ==========================

app.use(expressSession({
    secret: "Buni is the best dog in the world and my wife is the prettiest!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The YelpCamp Server is started.");
});