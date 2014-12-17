var
	express = require('express')
	, stylus = require('stylus')
	, app = express()
	, livereload = require('express-livereload')
;

livereload(app, {watchDir: __dirname+'/src'});
app.set('views', './src' );
app.set('view engine', 'jade');
app.use(stylus.middleware({ src: './src'} ));

app.use(function(req, res, next)
{
	var rewrite = {
		components: 'bower_components'
		, js: 'src/js'
		, css: 'src/css'
	};
	Object.keys(rewrite).forEach(function(url)
	{
		var r = new RegExp('^\\/'+url+'\\/');
		if(r.test(req.url))
		{
			req.url = req.url.replace(r,'/'+rewrite[url]+'/');
		}
	});

	next();
});
app.use(express.static(__dirname));

app.get('/partials/*', function(req, res)
{
	var name = req.originalUrl.replace(/\.html/,'');
	res.render('.'+name);
});
app.get('*', function(req, res)
{
	res.render('index')
});


app.listen(8001);