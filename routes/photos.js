var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	//res.send('response photos path');
	res.render('photos', {
		nodeLogoTitle : 'Node.js Logo',
		nodeLogo : 'http://nodejs.org/static/images/logos/nodejs-green.png',
		nodeManTitle : 'Ryan Speaking',
		nodeman : 'http://nodejs.org/static/images/logos/nodejs-new-pantone-white.png',
		photos : [{
			name : 'pic1',
			path : 'http://pic6.huitu.com/res/20130116/84481_20130116142820494200_1.jpg'
		}, {
			name : 'pic2',
			path : 'http://img03.tooopen.com/images/20131102/sy_45238929299.jpg'
		}]
	});
});

module.exports = router;