const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');
const { validateUserId, validateUser, validatePost } = require('../middleware');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  try {
    userDb.insert(req.user)
      .then(() => res.status(201).json(req.user));
  } catch (err) {
    res.status(500)
      .json({
        error: 'There was an error while saving the user to the database',
        message: err.message,
      });
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  try {
    const newPost = { user_id: req.user.id, text: req.post.text };
    postDb.insert(newPost)
      .then(() => res.status(201).json(req.post));
  } catch (err) {
    res.status(500)
      .json({
        error: 'There was an error while saving the post to the database',
        message: err.message,
      });
  }
});

router.get('/', async (req, res) => {
  try {
    userDb.get()
      .then((users) => res.status(200).json({ users }));
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while retrieving the users from the database',
      message: err.message,
    });
  }
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    userDb.getUserPosts(req.user.id)
      .then((userPosts) => {
        if (userPosts.length !== 0) res.status(200).json(userPosts);
        else res.status(404).json({ message: 'There are no posts from this user id' });
      });
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while retrieving the user\'s posts from the database',
      message: err.message,
    });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    userDb.remove(req.user.id)
      .then(() => res.status(204).json({ message: 'User has been removed' }));
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while removing the user from the database',
      message: err.message,
    });
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  try {
    userDb.update(req.user.id, req.user)
      .then(() => res.status(200).json(req.user));
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while updating user from the database',
      message: err.message,
    });
  }
});


module.exports = router;
