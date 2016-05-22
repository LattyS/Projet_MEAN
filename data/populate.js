var mongoose = require('mongoose');
var faker = require ('faker');
var User = require('../models/user.js');
var Post = require('../models/post.js');



mongoose.connect('mongodb://localhost/blogmean', function(err){
    if (err) { throw err;}
});

var userArray = [];
var postArray = [];

//CreateUser


for(var j = 0; j< 5; j++) {
    var user = new User ({
        username: faker.internet.userName(),
        password: faker.internet.password(),
        profileImageUrl: faker.image.imageUrl(),
        updated: faker.date.recent(),
        saved: faker.date.recent()
    });
    userArray.push(user);

//Envois user Bdd
    user.save(function (err) {
        if (err) { throw err; }

    });
    console.log('User ajout? avec succ?s !');
}

//On pioche dans le tableau un objectId de user aléatoire;

var pickRandomUser = function () {
    var pickUser = userArray[Math.floor(Math.random() * 4)];
    return pickUser;

};

//On génère les Post en prenant aléatoirement les ObjectId dans le tableau qu'on associera à un name : string dans nos views

var randomComment = function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

for(var i = 0; i < 21;i++){
    var post = new Post({
        title : faker.lorem.sentence(),
        imageUrl : faker.image.imageUrl(),
        content : faker.lorem.paragraphs(),
        created : faker.date.recent(),
        user : pickRandomUser()

    });
    for(var l = 0; l <= randomComment(0,5);l++){
        var comment = new Post({
            title : faker.lorem.words(),
            content : faker.lorem.sentence(),
            user: pickRandomUser(),
            created : faker.date.recent()
        });
        comment.save(function (err) {
            if (err) { throw err; }

        });
    postArray.push(post._id);
    //Save Post en bdd
    post.save(function (err) {
        if (err) { throw err; }

    });
    console.log('post add with success');
}}

//fonction de Random



//On crée les commentaires pour cahcuns des 21 articles, puis On décide aléatoirement du nombre de commentaire qui seront crée entre 0 et 5

//on push en bdd les commentaires

comment.save(function (err) {
    if (err) { throw err; }
    console.log('post add with success');
});
