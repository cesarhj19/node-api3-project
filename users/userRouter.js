const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
	// do your magic!
	res.status(201).json(req.newUser);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
	// do your magic!
	res.status(201).json(req.newPost);
});

router.get('/', (req, res) => {
	// do your magic!
	userDb
		.get()
		.then(users => {
			res.status(200).json({ users });
		})
		.catch(err => {
			res.status(500).json({
				error: 'There was an error while retrieving the users from the database'
			});
		});
});

router.get('/:id', validateUserId, (req, res) => {
	// do your magic!
	res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
	// do your magic!
	const { id } = req.user;
	userDb
		.getUserPosts(id)
		.then(userPosts => {
			res.status(200).json(userPosts);
		})
		.catch(err => {
			res.status(500).json({
				error: `There was an error while retrieving the user's posts from the database`
			});
		});
});

router.delete('/:id', validateUserId, (req, res) => {
	// do your magic!
	const { id } = req.user;
	const userRemoved = req.user;
	userDb
		.remove(id)
		.then(deletedUser => {
			res.status(204).json(userRemoved);
		})
		.catch(err => {
			res.status(500).json({
				error: `There was an error while removing user from the database`
			});
		});
});

router.put('/:id', validateUserId, (req, res) => {
	// do your magic!
	const { id } = req.user;
	const newUserInfo = req.body;
	userDb
		.update(id, newUserInfo)
		.then(updatedUser => {
			res.status(200).json({ newUserInfo });
		})
		.catch(err => {
			res.status(500).json({
				error: `There was an error while updating user from the database`
			});
		});
});

//custom middleware

function validateUserId(req, res, next) {
	// do your magic!
	const { id } = req.params;
	userDb
		.getById(id)
		.then(user => {
			if (user) {
				req.user = user;
				next();
			} else {
				res.status(404).json({ message: 'invalid user id' });
			}
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'There was an error while saving the post to the database' });
		});
}

function validateUser(req, res, next) {
	// do your magic!
	const newUser = req.body;
	if (typeof newUser === 'undefined') {
		res.status(400).json({ message: 'missing user data' });
	} else if (typeof newUser.name === 'undefined') {
		res.status(400).json({ message: 'missing required name field' });
	} else {
		req.newUser = newUser;
		userDb
			.insert(req.newUser)
			.then(addedUser => {
				next();
			})
			.catch(err => {
				res
					.status(500)
					.json({ error: 'There was an error while saving the user to the database' });
			});
	}
}

function validatePost(req, res, next) {
	// do your magic!
	const newPost = req.body;
	if (typeof newPost === 'undefined') {
		res.status(400).json({ message: 'missing post data' });
	} else if (typeof newPost.text === 'undefined') {
		res.status(400).json({ message: 'missing required text field' });
	} else {
		req.newPost = { ...newPost, user_id: req.user.id };
		postDb
			.insert(req.newPost)
			.then(addedPost => {
				next();
			})
			.catch(err => {
				res
					.status(500)
					.json({ error: 'There was an error while saving the post to the database' });
			});
	}
}

module.exports = router;
