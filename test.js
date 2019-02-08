// variable setup

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var merge = require('merge-stream');
var gutil = require('gulp-util');
var cleanbuild = require('del');

// TO DO: nunjucks to html single page compilation | gulp single-page --page <file.ext>
function test () {

    // grab the arguments
    var args = process.argv.indexOf("--page"); // stores the position of --page in the array

    console.log(args);
    console.log(process.argv)


    // gets .nunjucks file(s) in the directory
    // return gulp.src('src/templates/pages/[^_]*.+(nunjucks|html)')
    // //renders files using the templates located in this directory
    // .pipe(nunjucksRender({
    //     path: [
    //         'src/templates/layouts', // the main template
    //         'src/templates/partials', // partials
    //         'src/templates/pages'] // pages that will be based on the main template & partials
    // })).on('error', gutil.log) // checks and logs errors
    // //outputs the files into the src home folder
    // .pipe(gulp.dest('src'))
    // .pipe(browserSync.reload({stream: true}));
};
test();
