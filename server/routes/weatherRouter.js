const express = require('express');

const weatherController = require('../controller/weatherController');

const router = express.Router();

router.post('/', weatherController.getData, (req, res) => {
  return res.status(200).json(res.locals.weather);
});

module.exports = router;
