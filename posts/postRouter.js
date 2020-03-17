const express = require('express');
const db = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
	// do your magic!
	db.get()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			res.status(500).json({ error: 'The posts information could not be retrieved.' });
		});
});

router.get('/:id', (req, res) => {
	// do your magic!
});

router.delete('/:id', (req, res) => {
	// do your magic!
});

router.put('/:id', (req, res) => {
	// do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
	// do your magic!
}

module.exports = router;
