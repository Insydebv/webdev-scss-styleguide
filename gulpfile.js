var gulp = require('gulp');
var sassLint = require('gulp-sass-lint');

gulp.task('test', function () {
	return gulp.src('*.scss')
		.pipe(sassLint())
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
		;
});