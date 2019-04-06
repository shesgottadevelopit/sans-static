// load modules
var fs = require('fs');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var merge = require('merge-stream');
var log = require('fancy-log'); // suppose to replace gulp-util
var gutil = require('gulp-util');
var cleanbuild = require('del');
var markdown = require('nunjucks-markdown');
var markdownIt = require('markdown-it');
var matter = require('gray-matter');
var gulpGrayMatter = require('gulp-gray-matter');
var gulpFm = require('gulp-front-matter');
var gulpDebug = require('gulp-debug');
var gulpData = require('gulp-data');
var gulpInject = require('gulp-inject-string');
var gulpFm = require('gulp-front-matter');

//var ftp = require('vinyl-ftp');


//register global site data
var siteData = require('./src/data/site.json');

/* directories
 */
var src = "src/";
var build = 'build/';
var dist = 'dist/';


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


// register markdown parser via plugin
var nunjucksMarkdownRender = function (env) {
    var mdRender = new markdownIt({html: true, linkify: true,
      typographer: true})
    var renderer = mdRender.render.bind(mdRender);
    markdown.register(env,renderer);
}

// helpful function to log data (debugging)
function logData(file) {
    var contents = matter(file.contents)
    // console.log(file);
    console.log(file.data);
    console.log(contents);
    console.log(Object.getOwnPropertyNames(file));
    // console.log(file.orig)
}


// page compilation | .md --> nunjucks --> html
gulp.task('posts', function() {

        var myPosts = [];

    // gets .md files, excludes files that start with an underscore ... globbing
    return gulp.src('src/templates/posts/[^_]*.+(md)')

    //extract frontmatter and save to array
    .pipe(gulpData(function(file) {

        var mdFile = matter(file);
        var singlePost = {
            title: mdFile.data.title,
            description: mdFile.data.tags,
            keywords: mdFile.data.albums
            // "content": content.content
        }

        myPosts.push(singlePost); // var singleFile = file.data;

        }))
        .pipe(gulpFm({remove: true}))

    // add extends for templating: {% extends "post.nunjucks" %}
    .pipe(gulpInject.wrap('{% extends "post.nunjucks" %}{% block content %}', '{% endblock %}'))
    .pipe(gulpData(logData))

    //renders files using the templates located in this directory.
    .pipe(nunjucksRender({
        manageEnv: nunjucksMarkdownRender,
        envOptions: {
            autoescape: false,
            noCache: true
        },
        path: [
            'src/templates/layouts', // the main template
            'src/templates/partials', // partials
            'src/template/posts'] // posts
    }))
    .on('error', gutil.log) // checks and logs errors

    //outputs the files into the src home folder
    .pipe(gulp.dest('build/articles'))

    //creates the json data file
    .on('end', function(){
        if (!fs.existsSync('build/data')){
            fs.mkdirSync('build/data')
        }
        // log(file)
        // console.log(myPosts)
        let postObj = Object.assign({}, myPosts);
        let postJson = JSON.stringify(postObj, null, 4)
        // let myListJson = JSON.stringify(myList, null, 4)
        fs.writeFileSync('build/data/post-archive.json', postJson)
    })
    .pipe(browserSync.reload({stream: true}));

});

// pages | nunjucks compilation to html
gulp.task('nunjucks', function() {

    var myList = [];
    var newObj = {};

    const str = fs.readFileSync('src/templates/pages/index.nunjucks', 'utf8');
    console.log(matter(str));

    // gets .html & .nunjucks files in the directory, excludes files that start with an underscore ... globbing
    return gulp.src('src/templates/pages/[^_]*.+(nunjucks|html)')
    .pipe(gulpDebug({title: 'unicorn:'}))

    //extract frontmatter
    .pipe(gulpGrayMatter({
        //remove: false
    }))

    // use my site's data stored in a json file
    .pipe(gulpData(function() {
        return siteData; // or use return require('./src/data/site.json')
    }))
    //renders files using the templates located in this directory. storing the template directories in an array allows the usage of just files names w/extends & includes
    .pipe(nunjucksRender({
        // data: {
        //     test: 'data/site.json' // and inside of the template use {{ site.author }}
        // },
        manageEnv: nunjucksMarkdownRender,
        envOptions: {
            autoescape: false
        },
        path: [
            'src/templates/layouts', // the main template
            'src/templates/partials', // partials
            'src/templates/pages'], // pages that will be based on the main template & partials
    }))
    .on('error', gutil.log) // checks and logs errors
    //outputs the files into the src home folder
    .pipe(gulp.dest('build'))
    .pipe(gulpData(function(file) {
            var content = matter(file.contents);
            //console.log(file)
            // console.log(file.data);
            console.log(file.path);
            console.log(Object.getOwnPropertyNames(file));
            console.log(file.base)
            //console.log(file.contents)
            //console.log(content)
            var singleFile = {
                title: file.data.title,
                description: file.data.description,
                keywords: file.data.keywords
                // "content": content.content
            }
            // var singleFile = file.data;

            myList.push(singleFile);

        }))
    .pipe(gulpDebug({title: 'unicorn:', minimal: false}))
    .on('end', function(){
        // log(gulpGrayMatter({}));
        // log(file)

        if (!fs.existsSync('build/data')){
            fs.mkdirSync('build/data')
        }

        console.log(myList)
        let myListObj = Object.assign(newObj, myList);
        let myListJson = JSON.stringify(myListObj, null, 4)
        // let myListJson = JSON.stringify(myList, null, 4)
        fs.writeFileSync('build/data/page-archive.json', myListJson)
    })
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


// css task; sass is autocompiled thanks to atom.io package
gulp.task('css', function(){
    return gulp.src('src/css/**/*')
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

// javascript task
gulp.task('js', function(){
    return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}));
});

// watch tasks allow for automation
gulp.task('watch', function(){

    gulp.watch('src/templates/**/*.nunjucks', ['nunjucks']);
    gulp.watch('src/templates/**/*.md', ['posts']);
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);

});

// default
gulp.task('default', ['nunjucks','posts','css','js','watch','browser-sync']);


/*** deployment tasks
*/

// TO DO: fix my deploy tasks
// TO DO: spin up browserSync when files are copied over to `dist`

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
