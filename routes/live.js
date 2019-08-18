var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET current game */
router.get('/:week', function(req, res, next) {
	axios.get(`https://draft.premierleague.com/api/event/${req.params.week}/live`)
		.then(payload => {
			res.json(payload.data);
		});
});

module.exports = router;
