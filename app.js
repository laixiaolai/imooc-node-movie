var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var port=process.env.PORT||3000;
var app=express();

app.set('views','./views/pages');
app.set('view engine','pug');
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/static',express.static('bower_components'))
app.listen(port);

console.log('imooc started on port '+port);

//index page
app.get('/',function(req,res){
	res.render('index',{
		title:'imooc 首页',
	    movies: [{
	      title: '灌篮高手',
	      _id: 1,
	      poster: '/static/bootstrap/dist/fonts/zbrz.jpg'
	    },{
	      title: '灌篮高手',
	      _id: 2,
	      poster: '/static/bootstrap/dist/fonts/zbrz.jpg'
	    },{
	      title: '灌篮高手',
	      _id: 3,
	      poster: '/static/bootstrap/dist/fonts/zbrz.jpg'
	    },{
	      title: '灌篮高手',
	      _id: 4,
	      poster: '/static/bootstrap/dist/fonts/zbrz.jpg'
	    },{
	      title: '灌篮高手',
	      _id: 5,
	      poster: '/static/bootstrap/dist/fonts/zbrz.jpg'
	    },{
	      title: '灌篮高手',
	      _id: 6,
	      poster: '/static/bootstrap/dist/fonts/zbrz.jpg'
	    }]
	})
})
//detail page
app.get('/movie/:id',function(req,res){
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
//list page
app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'imooc 列表页',
	    movies: [{
	      title: '灌篮高手',
	      _id: 1,
	      doctor: '井上雄彦',
	      country: '美国',
	      year: 2014,
	      language: '英语',
	      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf'
	    }]
	})
})
