const express = require('express');
const {
  createDiscussion,
  getDiscussions,
  addComment
} = require('../controllers/discussionController');
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/')
  .get(getDiscussions)
  .post(createDiscussion);

router.route('/:id/comments')
  .post(addComment);

module.exports = router;