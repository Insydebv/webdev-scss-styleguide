var gulp = require('gulp');
var sassLint = require('gulp-sass-lint');

gulp.task('test', function () {
	return gulp.src('*.scss')
		.pipe(sassLint({
			configFile: ".sass-lint.yml"
		}))
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
		;
});