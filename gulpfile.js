var gulp = require('gulp');
//var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
	return gulp.src('./src/styles/less/**/*.less')
	  .pipe(less({
		paths: [ path.join(__dirname, 'less', 'includes') ]
	  }))
	  .pipe(gulp.dest('./public/css'));
});

gulp.task('start', function() {
    browserSync.init({
        server: {
            baseDir: "./"
		},
		reloadDelay: 700
	});

	gulp.watch("./*.html").on('change', browserSync.reload);
	gulp.watch("./styles/less/**/*.less").on('change', browserSync.reload);
	gulp.watch("./public/js/**/*.js").on('change', browserSync.reload);
});

gulp.task('watch', function(){
	gulp.watch('./src/styles/less/**/*.less', gulp.series(['less'])); 
})