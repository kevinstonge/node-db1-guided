const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

const validatePost = (req, res, next) => {
    db('posts').where({ id: req.params.id })
        .then(r => {
            if (r.length === 1) {
                res.post = r[0];
                next();
            } else {
                res.status(404).json({message: "error: post not found"})
            }
        })
        .catch(e=>res.status(500).json({message: "error retrieving post information"}))
}

router.use('/:id', validatePost);

router.get('/', (req, res) => {
    db('posts')
        .then(r => res.status(200).json({ posts: r }))
        .catch(e => res.status(500).json({ message: "error retrieving posts" }))
});

router.get('/:id', (req, res) => {
    res.status(200).json({post: res.post})
});

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents || title.length < 1 || contents.length < 1) {
        res.status(401).json({ message: "error: post must include title and contents" })
    } else {
        db('posts').insert(req.body)
            .then(r => res.status(201).json({ message: "successfully created post", data: r }))
            .catch(e=>res.status(500).json({message: "error creating post"}))
    }
});

router.put('/:id', (req, res) => {
    const { title, contents } = req.body;
    if (!title && !contents) {
        res.status(401).json({message: "error: nothing to update"})
    } else {
        db('posts').update(req.body)
            .then(r => res.status(200).json({ message: "post updated", data: r }))
            .catch(e=>res.status(500).json({message: "error updating post"}))
    }
});

router.delete('/:id', (req, res) => {
    db('posts').where({ id: req.params.id }).del()
        .then(r => res.status(200).json({ message: "successfully deleted post" }))
        .catch(e=>res.json({message: "error deleting post"}))
});

module.exports = router;