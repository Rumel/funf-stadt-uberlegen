var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET weeks transactions */
router.get('/:week', function(req, res, next) {
	axios.get(`https://draft.premierleague.com/api/draft/league/${req.params.week}/transactions`)
		.then(payload => {
			res.json(payload.data);
		});
});

module.exports = router;

