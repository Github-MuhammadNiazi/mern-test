const express = require('express');
const { deletePostController } = require('./controllers/postController');
const { feedController } = require('./controllers/feedController');
const { authorize } = require('./helper/authHelper');
const { ROLES } = require('../constants')

const router = express.Router();

router.get('/feed', feedController);
router.delete('/:id', authorize([ROLES.admin]), deletePostController);

module.exports = router;
