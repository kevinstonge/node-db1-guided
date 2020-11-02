const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

// db helper start
const Posts = {
  getAll() {
    return db.select('id', 'title', 'contents')
  },
  getById(id) {

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
