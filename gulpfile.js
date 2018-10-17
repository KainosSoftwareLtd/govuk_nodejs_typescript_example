var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('assets', function () {
  return gulp.src('node_modules/govuk_frontend_toolkit/javascripts/**/*')
    .pipe(gulp.dest('govuk_modules/govuk_frontend_toolkit/javascripts', { overwrite: true }))
    .pipe(gulp.src('node_modules/govuk_frontend_toolkit/images/**/*', {passthrough: true}))
    .pipe(gulp.dest('govuk_modules/govuk_frontend_toolkit/images', { overwrite: true }))
    .pipe(gulp.src('node_modules/govuk_template_jinja/assets/**/*', {passthrough: true}))
    .pipe(gulp.dest('govuk_modules/govuk_template/', { overwrite: true }))
})

gulp.task('templates', function () {
  return gulp.src('node_modules/govuk_template_jinja/views/layouts/govuk_template.html')
    .pipe(gulp.dest('views/', { overwrite: true }))
})

gulp.task('sass', function () {
  return gulp.src('assets/sass/**/*.scss')
    .pipe(sass({
      style: 'expanded',
      sourcemap: true,
      includePaths: [
        'node_modules/govuk-elements-sass/public/sass',
        'node_modules/govuk_frontend_toolkit/stylesheets',
        'govuk_modules/govuk_template/assets/stylesheets',
        'govuk_modules/govuk_frontend_toolkit/stylesheets',
        'govuk_modules/govuk-elements-sass/'
      ],
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('public/stylesheets'))
})

gulp.task('generate-assets', gulp.series('assets', 'templates', 'sass'))

gulp.task('default', gulp.series('generate-assets'))
