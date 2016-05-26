import gulp from 'gulp'
import sass from 'gulp-sass'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import browserify from 'browserify'
import streamify from 'gulp-streamify'
import uglify from 'gulp-uglify'

gulp.task('sass', () => gulp.src('./sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./css'))
)

gulp.task('js', () => {
  browserify({
    entries: './src/app.js',
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build', ['js', 'sass'])

gulp.task('default', ['js', 'serve'])
