// variable setup

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
// var nunjucksRender = require('gulp-nunjucks-api')
var merge = require('merge-stream');
var gutil = require('gulp-util');
var cleanbuild = require('del');
var nunjucks = require('nunjucks');
var gulpnunjucks = require('gulp-nunjucks')
var markdown = require('nunjucks-markdown');
var markdownIt = require('markdown-it')({html: true});
var gulpMarkdownIt = require('gulp-markdownit');
var gulpMdIt = require('gulp-markdown-it');

//var ftp = require('vinyl-ftp');



/*** local development tasks
*/

// launch server
gulp.task('browser-sync', function() {

    browserSync.init({

        browser: 'chrome',
        notify: false,

        //vhost setup
        open: 'external', //opens to my specified url
        host: 'pinklemonade.sgdi',
        proxy: 'pinklemonade.sgdi'

        //localhost setup
        // server: {
        //     baseDir: 'src'
        // }
    });

});


// nunjucks compilation to html
gulp.task('nunjucks', function() {

    nunjucksMarkdownRender = function (env) {
        var md = markdownIt.render.bind(markdownIt);
        markdown.register(env, md);
    // referenced my markdownIt variable
    }

    // gets .html & .nunjucks files in the directory, excludes files that start with an underscore ... globbing
    return gulp.src('src/templates/pages/[^_]*.+(nunjucks|html)')
    //renders files using the templates located in this directory. storing the template directories in an array allows the usage of just files names w/extends & includes
    .pipe(nunjucksRender({
        autoescape: true,
        manageEnv: nunjucksMarkdownRender,
        //env: env,
        path: [
            'src/templates/layouts', // the main template
            'src/templates/partials', // partials
            'src/templates/pages'], // pages that will be based on the main template & partials
    }))
    .on('error', gutil.log) // checks and logs errors
    //outputs the files into the src home folder
    .pipe(gulp.dest('src'))
    .pipe(browserSync.reload({stream: true}));
});

// TO DO: nunjucks to html single page compilation | gulp single --page <file.ext>
gulp.task('test', function() {

    // grab the arguments & stores the position of --page in the array
    var args = process.argv.indexOf("--page");
    console.log(args);
    console.log(process.argv);


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
});


// TO DO: nunjucks and markdown to html compilation


// css task; sass is autocompiled thanks to atom.io package
gulp.task('css', function(){
    return gulp.src('src/css/**/*.css')
    .pipe(browserSync.stream());
});

// javascript task
gulp.task('js', function(){
    return gulp.src('src/js/**/*.js')
    .pipe(browserSync.reload({stream: true}));
});

// watch tasks allow for automation
gulp.task('watch', function(){

    gulp.watch('src/templates/**/*.nunjucks', ['nunjucks']);
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);

});

// default
gulp.task('default', ['nunjucks','css','js','watch','browser-sync']);


/*** deployment tasks
*/

// TO DO: fix my deploy tasks

// copy production-ready directories & files to live site
gulp.task('copy', function(){

    //javascript, css, and image files
    var assets = gulp.src([
        'src/css/**/*.css',
        'src/img/**/**',
        'src/js/**/*'], {
        //you must establish a base for directories, it will copy everything after dev, according to the specified source
        base: 'dev'
    }).pipe(gulp.dest('dist'));

    //html files to root directory
    var mainHTML = gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));

    return merge(assets, mainHTML); //merge-stream plugin allows us to merge this into one task

});


/*** deployment tasks part 2
*/
// run gulp dist
gulp.task('dist', ['clean', 'copy']);


// clean directory before copying files for development testing or distribution
gulp.task('clean', function () {
  return cleanbuild([
    // here we use a globbing pattern to match everything inside the export folder
	'dist/**/*',
	'dist'
  ]);
});

// copy production-ready directories & files to live site
gulp.task('copy', function () {

	//javascript, css, and image files
	var finalbuild = gulp.src([
		'src/**/**', // this copies the entire theme folder into the 'export' folder mentioned below
		'!src/scss/',
		'!src/scss/**/**',
		'!src/css/style.css.map'], {
		//you must establish a base for directories, it will copy everything after dev, according to the specified source
		base: 'src'
	}).pipe(gulp.dest('dist'));

	return merge(finalbuild); //merge-stream plugin allows us to merge this into one task

});
