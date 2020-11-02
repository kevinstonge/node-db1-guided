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
    // return db('posts').where({ id }).first()
    return db('posts').where({ id })
  },
  create(post) {
    return db('posts').insert(post)
  },
  update(id, post) {
    return db('posts').where({ id }).update(post)
  },
  delete(id) {
    return db('posts').where({ id }).del()
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
  Posts.getById(req.params.id)
    .then(data => {
      // if empty dataset, do something different
      if (!data.length) {
        res.json({ message: 'no post with said id' })
      } else {
        res.json(data[0])
      }
    })
    .catch(error => {
      res.json({ message: error.message })
    })
});

router.post('/', (req, res) => {
  Posts.create(req.body)
    .then(([id]) => {
      return Posts.getById(id).first()
    })
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      res.json({ message: error.message })
    })
});

router.put('/:id', async (req, res) => {
  try {
    await Posts.update(req.params.id, req.body)
    const updatedPost = await Posts.getById(req.params.id).first()
    res.json(updatedPost)
  } catch (error) {
    res.json({ message: error.message })
  }
});

router.put('/:id', async (req, res) => {
  Posts.update(req.params.id, req.body)
    .then(rowsAffected)
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedRowsNumber = await Posts.delete(req.params.id)
    if (!deletedRowsNumber) {
      res.json({ message: 'no post with given id' })
    } else {
      res.json({ message: 'post deleted successfully' })
    }
  } catch (error) {
    res.json({ message: error.message })
  }
});

module.exports = router;
