const Gulp = require('gulp');
const Babel = require('gulp-babel');
const Obfuscator = require('gulp-javascript-obfuscator');
const Uglify = require('gulp-uglify');

Gulp.task('password', () => {
    return Gulp.src('./src/configs/index.js')
        .pipe(Obfuscator({
            compact: true,
            stringArrayEncoding: ['base64']
        }))
        .pipe(Uglify())
        .pipe(Gulp.dest('minify/configs'))
});


Gulp.task('js', () => {
    return Gulp.src(['./src/main.js', './src/preload.js'])
         .pipe(Babel({
             presets: ['@babel/preset-env'],
             plugins:['@babel/plugin-transform-async-to-generator', '@babel/plugin-transform-runtime']
         }))
         .pipe(Uglify({
             compress: {
                 arguments: true
             }
         }))
         .pipe(Gulp.dest('minify/'))
});

Gulp.task('minify', Gulp.series('password','js'));
