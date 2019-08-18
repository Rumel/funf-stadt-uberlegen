var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET current game */
router.get('/', function(req, res, next) {
  console.log("Hello");
	axios.get(`https://draft.premierleague.com/api/game`)
		.then(payload => {
			res.json(payload.data);
		});
});

module.exports = router;
