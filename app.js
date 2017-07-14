var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var mongoose=require('mongoose');
var _=require('underscore');
var Movie=require('./models/movie');
var port=process.env.PORT||3000;
var app=express();

mongoose.Promise = global.Promise;  
mongoose.connect('mongodb:localhost/imooc-node-movie',{useMongoClient:true})


app.set('views','./views/pages');
app.set('view engine','pug');
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/static',express.static('bower_components'))
app.listen(port);

console.log('imooc started on port '+port);

//index page
app.get('/',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index',{
			title:'imooc 首页',
		    movies: movies
		})
	})
})
//detail page
app.get('/movie/:id',function(req,res){
	var id=req.params.id;
	Movie.findById(id,function(err,movie){
		res.render('index',{
			title:'imooc '+movie.title,
		    movies: movies
		})
	});
	res.render('detail',{
		title:'imooc 详情页',
	    movie: {
	      doctor: '何塞趴地利亚',
	      country: '美国',
	      title: '灌篮高手',
	      year: 2014,
	      poster: '/static/bootstrap/dist/fonts/zbrz.jpg',
	      language: '英语',
	      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
	      summary: '这是一部科幻片'
	    }
	})
})
//admin page
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'imooc 后台录入页',
	    movie: {
	      title: '',
	      doctor: '',
	      country: '',
	      year: '',
	      poster: '',
	      flash: '',
	      summary: '',
	      language: ''
	    }
	})
})
//admin update movie
app.get('/admin/update/:id',function(req,res){
	var id=req.params.id;

	if(id){
		movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'imooc 后台更新页面',
				movie:movie
			})
		})
	}
})

//admin post movie
app.post('/admin/movie/new',function(res,req){
	var id=req.body.movie._id;
	var movieObj=req.body.movie;
	var _movie;

	if(id!=='undefined'){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
			}

			_movie=_.extend(movie,movieObj)
			_movie.save(function(err,movie){
				if(err){
					console.log(err);
				}
				res.redirect('/movie/'+movie._id)

			})
		})
	}
	else{
		_movie=new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash
		})
		_movie.save(function(err,movie){
			if(err){
				console.log(err);
			}
			res.redirect('/movie/'+movie._id)
		})
	}
});

//list page
app.get('/admin/list',function(req,res){

	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title:'imooc 列表页',
		    movies: movies
		})
	})
})
