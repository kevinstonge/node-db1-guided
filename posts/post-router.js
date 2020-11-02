const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

// db helper start
const Posts = {
  getAll() {
    // return db.select().from('posts')
    // return db.select('*').from('posts')
    // return db.select('id', 'title', 'contents').from('posts')
    return db('posts') // short hand to do the same as above
  },
  getById(id) {
    return db('posts').where({ id })
  },
  create(post) {

  },
  update(id, post) {

  },
  delete(id) {

  }
}
// db helpers end

router.get('/', (req, res) => {
  Posts.getAll()
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      // res.json({ message: 'oops, something went wrong' }) // production
      res.json({ error: error.message }) // development
    })
});

router.get('/:id', (req, res) => {

});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;
