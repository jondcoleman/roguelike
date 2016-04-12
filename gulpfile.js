var gulp = require('gulp')
var livereload = require('gulp-livereload')
var browserSync = require('browser-sync')

// gulp.task('reload', function(){
//   livereload.reload();
// })

// gulp.task('watch', function(){
//   livereload.listen();
//   gulp.watch('./js/*.*', ['reload'])
// })

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: './'
    }
  })
})


gulp.task('default', ['browserSync'])
