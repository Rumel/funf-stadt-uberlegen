var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET current game */
router.get('/', function(req, res, next) {
	axios.get(`https://draft.premierleague.com/api/bootstrap-static`)
		.then(payload => {
			res.json(payload.data);
		});
});

module.exports = router;
