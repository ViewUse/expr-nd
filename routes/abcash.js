var express = require('express');
var router = express.Router();
var httpMod = require('http');
var crypto = require('crypto');
var requestMod = require('request');
var httpsMod = require('https');
var urlMod = require('url');
var nativeUtil = require('util');
var jquery = require('jquery');

//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
var webHost = 'http://120.24.101.19:88/sellerpad';
var webHostInterface = 'https://120.24.101.19:10001/seller';
var options = {
	hostname : '120.24.101.19',
	port : 10001,
	path: 'seller/loaddata/updateData?time='+new Date().getTime(),
	method: 'POST',
	headers: {
		//'Content-Type' : 'applicaiton/x-www-form-urlencoded;charset=utf-8'
	}
};
var testOptions = {
	host : 'https://120.24.101.19:10001/seller',
	path : '/token/getToken',
	method : 'POST',
	headers : {

	}
}
var tokenOptions = {
	//hostname : '120.24.101.19',
	//port : 10001,
	host : webHostInterface,
	path : '/token/getToken?time=' + new Date().getTime() + '&sellerUserName=' + 'chen&sellerPassword=' + '96e79218965eb72c92a549dd5a330112',
	method : 'POST',
	headers : {
	}
}
var tokenData = {
	sellerId : 'S160830170638302493',
	sign : '',
	timeStamp : 1481938384226,
	token : 'tk161217093254226672328'
}

var reqTokenData = {
	url : webHostInterface + '/token/getToken?time=' + new Date().getTime(),
	method : 'POST',
	formData : {
		sellerUserName : 'chen',
		sellerPassword : '96e79218965eb72c92a549dd5a330112'
	},
	rejectUnauthorized : false,
	requestCert : true,
	headers : {
		'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8'
	}
};
var reqServerData = {
	url : webHostInterface + '/loaddata/updateData?time=' + new Date().getTime(),
	method : 'POST',
	formData : {
		timeStamp : tokenData.timeStamp,
		sign : encodeMd5(tokenData.sellerId + tokenData.token + tokenData.timeStamp + '123456'),
		sellerId : tokenData.sellerId
	}
};

function encodeMd5(str) {
	var md5sum = crypto.createHash('md5');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
};
router.get('/', function(req, res, next) {
	console.log('abcash');
	
	/*var httpTokenUrl = webHostInterface + '/token/getToken?time=' + new Date().getTime();
	httpTokenUrl += '&sellerUserName=zhang&sellerPassword=96e79218965eb72c92a549dd5a330112';
	jquery.ajax({
		url : httpTokenUrl
	}, function(result) {
		console.log(result);
	});*/

	/*var httpTokenUrl = webHostInterface + '/token/getToken?time=' + new Date().getTime();
	var reqData = {
		url : httpTokenUrl,
		method : 'POST',
		formData : {
			sellerUserName : 'zhang',
			sellerPassword : '96e79218965eb72c92a549dd5a330112'
		}
	};
	requestMod(reqData, function(err, resp, body) {
		console.log(err);
		if(!err && resp.statusCode === 200) {
			console.log(body);
		}
	});*/
	res.render('abdata', {title: 'ab'});
	//httpTokenRequest(req, res);
	//httpsDataRequest(req, res);
	//httpsTokenRequest(req, res);
	//res.send('');
});

function httpsDataRequest(req, res) {
	var reqDataUrl = webHostInterface + '/loaddata/updateData?time=' + new Date().getTime();
	reqDataUrl += '&timeStamp=' + tokenData.timeStamp + '&sign=' + encodeMd5(tokenData.sellerId + tokenData.token + tokenData.timeStamp + '123456') + '&sellerId=' + tokenData.sellerId;
	var req_data_url = urlMod.parse(reqDataUrl);
	req_data_url.method = 'POST';
	req_data_url.rejectUnauthorized = false;
	req_data_url.requestCert = true;

	var postData = "";
	var post_req = httpsMod.request(req_data_url, function(response) {
		response.on('data', function(buf) {
			postData += buf.toString();
		})
		response.on('end', function() {
			console.log(postData);
			//res.send(postData);
		});
	});
	res.send('');
	//post_req.write(postData);
	post_req.end();
}
function httpDataRequest(req, res) {
	requestMod(reqTokenData, function(err, res, body) {
		console.log(arguments);
		if(!err && res.statusCode === 200) {
			//console.log(body);
			res.send(body);
		}
	});
	//console.log(encodeMd5(tokenData.sellerId + token + timeStamp + '123456'));
	//tokenOptions.path += '&sign=' + encodeMd5(tokenData.sellerId + token + timeStamp + '123456');
	/*httpMod.request(tokenOptions, function(res) {
		res.on('data', function (data) {
			console.log(data);
		});
	});*/
}

function httpTokenRequest(req, res) {
	var httpTokenUrl = webHostInterface + '/token/getToken?time=' + new Date().getTime();
	httpTokenUrl += '&sellerUserName=chen&sellerPassword=96e79218965eb72c92a549dd5a330112';
	var post_option = urlMod.parse(httpTokenUrl);
	post_option.method = 'POST';
	post_option.rejectUnauthorized = false;
	post_option.requestCert = true;
	//console.log(post_option);
	requestMod(reqTokenData, function(err, res, body) {
		if(!err && res.statusCode === 200) {
			//console.log(res.reponseText);
			console.log(body);
		}
		//console.log(arguments);
	});
	res.send('');
}

function httpsTokenRequest(req, res) {
	var httpsTokenUrl = webHostInterface + '/token/getToken?time=' + new Date().getTime();
	httpsTokenUrl += '&sellerUserName=chen&sellerPassword=96e79218965eb72c92a549dd5a330112';
	var post_option = urlMod.parse(httpsTokenUrl);
	post_option.method = 'POST';
	post_option.rejectUnauthorized = false;
	post_option.requestCert = true;
	var postData = "";

	console.log(post_option);
	var post_req = httpsMod.request(post_option, function(response) {
		response.on('data', function(buf) {
			postData += buf;
		});
		response.on('end', function() {
			console.log(postData);
			//res.send(postData);
		});
	});
	post_req.write(postData);
	post_req.end();
	res.send(postData);
}
module.exports = router;