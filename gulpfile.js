var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'), // concatenate files
	uglify       = require('gulp-uglifyjs'), // JS minimize
	cssnano      = require('gulp-cssnano'), // CSS minimize
	rename       = require('gulp-rename'), // rename files
	del          = require('del'), // delite folders and files
	imagemin     = require('gulp-imagemin'), // image processing
	pngquant     = require('imagemin-pngquant'), // png processing
	cache        = require('gulp-cache'), // caching library
	sourcemaps   = require('gulp-sourcemaps'), // sourcemap files generator
	autoprefixer = require('gulp-autoprefixer'),// autoprefix for css
	glob	 	 = require('gulp-sass-glob'), // global import *.* into style.sass
    rigger 		 = require('gulp-rigger');

var sassSourcePath = 'app/sass/style.sass',
	sassSourceMedia = 'app/sass/media.sass',
	cssDestPath    	   = 'public/dist/css/'

gulp.task('sass', () => {
	setTimeout(function(){
		return gulp
	    .src(sassSourcePath)
	    .pipe(sourcemaps.init())
	    .pipe(glob())
	    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	    .pipe(sourcemaps.write({includeContent: false}))
	    .pipe(sourcemaps.init({loadMaps: true}))
	    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	    .pipe(sourcemaps.write('.'))
	    .pipe(gulp.dest(cssDestPath))
	    .pipe(browserSync.reload({stream: true}));
	}, 1000)
});

gulp.task('media', () => {
	setTimeout(function(){
		return gulp
	    .src(sassSourceMedia)
	    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	    .pipe(gulp.dest(cssDestPath))
	    .pipe(browserSync.reload({stream: true}));
	}, 1000)
});

gulp.task('browser-sync', function() {
	browserSync({ 
		server: { // server parameters
			baseDir: 'public' // main directory - app
		},
		tunnel: true,
	    host: 'localhost',
	    port: 9000,
	    logPrefix: "silent-running"
	});
});

gulp.task('import', function () {
    return gulp
        .src('app/sass/style.sass')
        .pipe(glob())
        .pipe(sass())
        .pipe(gulp.dest('public/dist/css'));
});


gulp.task('html:build', function () {
    gulp.src('./public/include-html/index.html') //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest('./public/')) //Выплюнем их в папку build
});


gulp.task('css-libs', function() {
	return gulp.src('public/dist/css/style.css') // file for minimalization
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'})) // add suffix .min
		.pipe(gulp.dest('public/dist/css')); // destination app/css
});

gulp.task('watch', ['browser-sync', 'html:build', 'css-libs'], function() {
	gulp.watch('app/sass/**/*', ['sass', 'media']); // watching *.sass files
	gulp.watch('public/demo/*',  ['html:build'], browserSync.reload); // watching *.html file
});

gulp.task('clean', function() {
	return del.sync('dist'); // delete dist before generation project files
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') // all images
		.pipe(cache(imagemin({ // caching
		// .pipe(imagemin({ //
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/)
		.pipe(gulp.dest('public/dist/img')); // upload to production
});


gulp.task('build', ['clean', 'img', 'html:build', 'sass', 'media', 'css-libs'], function() {

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);