const express = require('express');
const { getUser, RegisterUser } = require('../controllers/user');

const router = express.Router();

router
  .route('/')
  .get(getUser)
  .post(RegisterUser);

module.exports = router;
