var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Ice's Rest",
        image: "https://images.unsplash.com/photo-1433878665141-d6ceaf394ae2?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=57b08822c7f14cbf1d4ec64b1e69fcac",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et orci et lorem consequat vestibulum. Quisque fermentum nunc ex, a mattis enim accumsan vel. Etiam commodo mollis tellus, luctus venenatis odio eleifend id. Morbi hendrerit mauris quam, scelerisque tincidunt lectus tincidunt non. Etiam urna est, consectetur in nulla in, mattis laoreet felis. Praesent viverra lorem at volutpat maximus. Nunc pulvinar eget felis nec iaculis. Aenean a lectus maximus, scelerisque nibh eget, viverra nibh."
    },
    {
        name: "Ice's Power",
        image: "https://images.unsplash.com/photo-1433215735557-911693026827?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=17449f1f965b593e43f88d32c094dada",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et orci et lorem consequat vestibulum. Quisque fermentum nunc ex, a mattis enim accumsan vel. Etiam commodo mollis tellus, luctus venenatis odio eleifend id. Morbi hendrerit mauris quam, scelerisque tincidunt lectus tincidunt non. Etiam urna est, consectetur in nulla in, mattis laoreet felis. Praesent viverra lorem at volutpat maximus. Nunc pulvinar eget felis nec iaculis. Aenean a lectus maximus, scelerisque nibh eget, viverra nibh."
    },
    {
        name: "Ice's Calm",
        image: "https://images.unsplash.com/photo-1422020297037-97bd356cc312?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=8d870c84cd0f1ed2aa599542ac0b9799",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et orci et lorem consequat vestibulum. Quisque fermentum nunc ex, a mattis enim accumsan vel. Etiam commodo mollis tellus, luctus venenatis odio eleifend id. Morbi hendrerit mauris quam, scelerisque tincidunt lectus tincidunt non. Etiam urna est, consectetur in nulla in, mattis laoreet felis. Praesent viverra lorem at volutpat maximus. Nunc pulvinar eget felis nec iaculis. Aenean a lectus maximus, scelerisque nibh eget, viverra nibh."
    }
];

function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed campgrounds!");
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Campground added.");
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment successfully.");
                                }
                            }
                        );
                    }
                })
            });
        }
    });
}

module.exports = seedDB;
