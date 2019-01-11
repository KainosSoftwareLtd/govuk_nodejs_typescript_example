var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('assets', function () {
  return gulp.src('node_modules/govuk-frontend/*.js')
    .pipe(gulp.dest('public/govuk-frontend/javascripts', { overwrite: true }))
    .pipe(gulp.src('node_modules/govuk-frontend/assets/fonts/**/*', {passthrough: true}))
    .pipe(gulp.dest('public/govuk-frontend/fonts', { overwrite: true }))
    .pipe(gulp.src('node_modules/govuk-frontend/assets/images/**/*', {passthrough: true}))
    .pipe(gulp.dest('public/govuk-frontend/images', { overwrite: true }))
})

gulp.task('sass', function () {
  return gulp.src('assets/sass/**/*.scss')
    .pipe(sass({
      style: 'expanded',
      sourcemap: true,
      includePaths: ['node_modules/govuk-frontend'],
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('public/stylesheets'))
})

gulp.task('generate-assets', gulp.series('assets', 'sass'))

gulp.task('default', gulp.series('generate-assets'))
