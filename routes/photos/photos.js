var Photo = require('../../models/Photo');
var path = require('path');
var fs = require('fs');
var multiparty = require('connect-multiparty');
var join = path.join;

exports.form = function(req, res) {
	res.render('photos/upload', {
		title : 'Photo upload'
	});
};

exports.submit = function(dir) {
	return function(req, res, next) {
		console.log(req.files);
		console.log(req.body);
		var img = req.files.photo.image;
		var name = req.body.photo.name || img.name;
		var path = join(dir, img.name);

		fs.rename(img.path, path, function(err) {
			if(err) return next(err);

			Photo.create({
				name : name,
				path : img.path //img.name
			}, function(err) {
				if (err) return next(err);
				res.redirect('/');
			});
		});
	};
};

exports.fileSubmit = function(dir) {
	return function(req, res, next) {
		//var form = new 
	};
};

exports.list = function(req, res, next) {
	// 查询数据库(图片)
	Photo.find({}, function(err, photos) {
		if(err) return next(err);
		res.render('photos/show', {
			title : 'Photos',
			photos : photos
		});
	});
};

exports.download = function(req, res, next) {
	Photo.find({}, function(err, photos) {
		if(err) return next(err);
		common.logger.info('download');
		res.render('photos/pic-download', {
			title : 'Photos & Download',
			photos : photos
		})
	});
};

exports.picDownload = function(dir) {
	return function(req, res, next) {
		var id = req.params.id;
		global.common.logger.info('pic--donwload');
		Photo.findById(id, function(err, photo) {
			if(err) return next(err);
			var path = join(dir, '/' + photo.name + '.png');
			common.logger.info(path);
			//res.sendFile(path);
			//res.download(path);
			res.download(path, 'xx.png');
		});
	};
};