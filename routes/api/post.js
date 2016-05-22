var express = require('express');
var router = express.Router();

/* GET index */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Post = mongoose.model('Post');

// Get all posts
router.get('/api/posts', function(req, res, next) {
    Post.find(function(err, posts) {
        if (err) {
            return next(err); }

        res.json(posts);
    });
});
// Create new post
router.post('/api/posts', function(req, res, next) {
    var post = new Post(req.body);

    post.save(function(err, post) {
        if (err) {
            return next(err); }

        res.json(post);
    });
});

router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function(err, post) {
        if (err) {
            return next(err); }
        if (!post) {
            return next(new Error("post not found")); }

        req.post = post;
        return next();
    });
});
// Get single post
router.get('/api/posts/:post', function(req, res) {
    req.post.populate(function (err, post) {
		res.json(post);
	});
});
// Delete post
router.delete('/api/posts/:post', function(req, res) {
    
    Post.remove({
        _id: req.params.post
    }, function(err, post) {
        if (err) {
            return next(err); }

        // get and return all the posts after you delete one
        Post.find(function(err, posts) {
            if (err) {
                return next(err); }

            res.json(posts);
        });
    });
});

router.put('/api/posts/:post', function(req, res, next) {
    var post = new Post(req.body);

    post.save(function(err, post) {
        if (err) {
            return next(err); }

        res.json(post);
    });
});
module.exports = router;
