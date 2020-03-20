const express = require('express');
const postDb = require('./postDb');
const { validatePost, validatePostId } = require('../middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    postDb.get()
      .then((posts) => res.status(200).json({ posts }));
  } catch (err) {
    res.status(500).json({
      error: 'The posts information could not be retrieved.',
      message: err.message,
    });
  }
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, async (req, res) => {
  try {
    postDb.remove(req.post.id)
      .then(() => res.status(204).json({ message: 'Post has been removed' }));
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while removing the post from the database',
      message: err.message,
    });
  }
});

router.put('/:id', validatePost, validatePostId, async (req, res) => {
  try {
    postDb.update(req.post.id, req.post)
      .then(() => res.status(200).json(req.post));
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while updating post from the database',
      message: err.message,
    });
  }
});


module.exports = router;
