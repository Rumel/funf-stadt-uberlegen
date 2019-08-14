var express = require('express');
var router = express.Router();
var axios = require('axios');


/* GET leagues listing. */
router.get('/:id', function(req, res, next) {
	axios.get(`https://draft.premierleague.com/api/league/${req.params.id}/details`)
		.then(payload => {
			res.json(payload.data);
		});
});

module.exports = router;
