import gulp from 'gulp'
import sass from 'gulp-sass'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import browserify from 'browserify'
import browserSync from 'browser-sync'
import streamify from 'gulp-streamify'
import uglify from 'gulp-uglify'

gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  })

  gulp.watch('sass/*.scss', ['sass'])
  gulp.watch('src/**/*.js', ['js'])
  gulp.watch('/*.html').on('change', browserSync.reload)
})

gulp.task('sass', () => gulp.src('./sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream())
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
    .pipe(browserSync.stream())
})

gulp.task('build', ['js', 'sass'])

gulp.task('default', ['js', 'serve'])
