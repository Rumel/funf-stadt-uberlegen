var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET picks listing. */
router.get('/:id/:week', function(req, res, next) {
	axios.get(`https://draft.premierleague.com/api/entry/${req.params.id}/event/${req.params.week}`)
		.then(payload => {
			if(payload.data) {
				res.json(payload.data);
			} else {
				return null;
			}
		});
});

module.exports = router;
