const express = require('express');
const postDb = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
	// do your magic!
	postDb
		.get()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			res.status(500).json({ error: 'The posts information could not be retrieved.' });
		});
});

router.get('/:id', validatePostId, (req, res) => {
	// do your magic!
	res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
	// do your magic!
	const { id } = req.post;
	const postRemoved = req.post;
	postDb
		.remove(id)
		.then(deletedPost => {
			res.status(204).json({ message: 'Post has been removed' });
		})
		.catch(err => {
			res.status(500).json({
				error: `There was an error while removing the post from the database`
			});
		});
});

router.put('/:id', validatePostId, (req, res) => {
	// do your magic!
	const { id } = req.post;
	const newPostInfo = req.body;
	if (typeof newPostInfo.text === 'undefined') {
		res.status(400).json({ message: 'Missing text field' });
	} else {
		req.newPostInfo = { id: req.post.id, ...newPostInfo, user_id: req.post.user_id };
		postDb
			.update(id, newPostInfo)
			.then(updatedPost => {
				res.status(200).json(req.newPostInfo);
			})
			.catch(err => {
				res.status(500).json({
					error: `There was an error while updating post from the database`
				});
			});
	}
});

// custom middleware

function validatePostId(req, res, next) {
	// do your magic!
	const { id } = req.params;
	postDb
		.getById(id)
		.then(post => {
			if (post) {
				req.post = post;
				next();
			} else {
				res.status(404).json({ message: 'invalid post id' });
			}
		})
		.catch(err => {
			res.status(500).json({
				error: 'There was an error while retrieving the post from the database'
			});
		});
}

module.exports = router;
