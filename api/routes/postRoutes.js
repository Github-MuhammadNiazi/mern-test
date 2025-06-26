const express = require('express');
const { deletePostController } = require('./controllers/postController');
const { authorize } = require('./helper/authHelper');
const { ROLES } = require('../constants')

const router = express.Router();

router.delete('/:id', authorize([ROLES.admin]), deletePostController);

module.exports = router;
