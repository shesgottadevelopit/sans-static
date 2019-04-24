// load modules
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var nunjucksRender = require('gulp-nunjucks-render');
var merge = require('merge-stream');
var log = require('fancy-log'); // suppose to replace gulp-util
var gutil = require('gulp-util');
var del = require('del');
var markdown = require('nunjucks-markdown');
var markdownIt = require('markdown-it');
var matter = require('gray-matter');
var gulpGrayMatter = require('gulp-gray-matter');
var gulpFm = require('gulp-front-matter');
var gulpDebug = require('gulp-debug');
var gulpData = require('gulp-data');
var gulpInject = require('gulp-inject-string');


//declare site data
var siteData = require('./src/data/site.json');
// var postsArchive, pagesArchive;
var siteArchive = {};

// directories
var src = "src/";
var build = 'build/';
var dist = 'dist/';


/*** LOCAL development tasks
*/

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

// array sorting function
function sortPosts(a,b) {
    // return new Date(a.date).getTime() - new Date(b.date).getTime() // old to new
    return new Date(a.date).getTime() - new Date(b.date).getTime() // new to old
}

// filename concatenator function
var fileName = function (file) {
    var name = path.parse(file.path).name;
    return name
}

// launch development server
var bs = browserSync.create()
gulp.task('browser-sync', function() {

    bs.init({

        // browser: 'chrome',
        notify: false,

        //vhost setup
        open: 'external', //opens to my specified url
        host: 'pinklemonade.sgdi',
        proxy: 'pinklemonade.sgdi',
        serveStatic: [{
            // route: '/build',
            dir: './build' //src --> build
        }],
        startPath: '/index.html'

        //localhost setup
        // server: {
        //     baseDir: 'src'
        // }
    });

});

// get& store post data
gulp.task('fm-data-original', function (){

    var postList = [];
    var postListObj = {}; postListObj.posts = {}

    // gets .md files, excludes files that start with an underscore ... globbing
    return gulp.src('src/templates/posts/[^_]*.+(md)')

    //extract frontmatter and save to array
    .pipe(gulpData(function(file) {

        var post = matter(file);
        var singlePost = {
            title: post.data.title,
            description: post.data.tags,
            keywords: post.data.albums,
            date: post.data.date
        }
        postList.push(singlePost);
    }))
    //creates the json data file
    .on('end', function(){
        if (!fs.existsSync('build/data')){
            fs.mkdirSync('build/data')
        }

        postList.sort(sortPosts)

        // object with nested object
        postListObj.posts = Object.assign({}, postList);
        let postListJson = JSON.stringify(postListObj, null, 4)
        fs.writeFileSync('build/data/post-archive.json', postListJson)
        postsArchive = postListObj;
    });
});

// get& store post data
gulp.task('fm-data', function (){

    var postList = [];
    var postListObj = {}; postListObj.posts = {}

    // gets .md files, excludes files that start with an underscore ... globbing
    var postStream = gulp.src('src/templates/posts/[^_]*.+(md)')

    //extract frontmatter and save to array
    .pipe(gulpData(function(file) {

        var post = matter(file);
        var singlePost = {
            title: post.data.title,
            description: post.data.tags,
            keywords: post.data.albums,
            date: post.data.date,
            url: `/articles/${fileName(file)}.html`
        }
        postList.push(singlePost);
        // console.log(Object.getOwnPropertyNames(post))
    }))
    //creates the json data file
    .on('end', function(){
        // if (!fs.existsSync('build/data')){
        //     fs.mkdirSync('build/data')
        // }

        postList.sort(sortPosts)

        // object with nested object
        postListObj.posts = Object.assign({}, postList);
        // let postListJson = JSON.stringify(postListObj, null, 4)
        // fs.writeFileSync('build/data/post-archive.json', postListJson)
        // postsArchive = postListObj;
        siteArchive.posts = postListObj.posts;
    });

    var pageList = [];
    var pageListObj = {}; pageListObj.pages = {};

    var pageStream = gulp.src('src/templates/pages/[^_]*.+(nunjucks|html)')
    .pipe(gulpData(function(file) {
        var page = matter(file)
        // var content = matter(file.contents);
        // console.log(Object.getOwnPropertyNames(file));
        var singlePage = {
            title: page.data.title,
            description: page.data.description,
            keywords: page.data.keywords,
            nav: page.data.nav,
            url: `/${fileName(file)}.html`
        }

        pageList.push(singlePage);

        }))
    .on('end', function(){
        // if (!fs.existsSync('build/data')){
        //     fs.mkdirSync('build/data')}

        pageList.sort(function(a,b) {
            return a.nav - b.nav // ascending
        })

        // object with nested array
        pageListObj.pages = pageList
        // let pageListJson = JSON.stringify(pageListObj, null, 4);
        // fs.writeFileSync('build/data/page-archive.json', pageListJson)
        // pagesArchive = pageListObj
        siteArchive.pages = pageListObj.pages;
        // console.log(siteArchive)

        // object with nested object
        // let pageListObj.posts = Object.assign({}, pageList);
        // let myListJson = JSON.stringify(pageListObj, null, 4);

    })

    var allStreams = gulp.src(['src/templates/pages/[^_]*.+(nunjucks|html)', 'src/templates/posts/[^_]*.+(md)' ])
    .on('data', function () {
        //console.log(siteArchive)
        if (!fs.existsSync('build/data')){
            fs.mkdirSync('build/data')}

        // object with nested array
        let siteArchiveJson = JSON.stringify(siteArchive, null, 4);
        fs.writeFileSync('build/data/site-archive.json', siteArchiveJson)
    })

        return merge(postStream, pageStream, allStreams)
});

// post compilation | .md --> nunjucks --> html
gulp.task('posts', ['fm-data'], function() {

    // gets .md files, excludes files that start with an underscore ... globbing
    return gulp.src('src/templates/posts/[^_]*.+(md)')

    //extract frontmatter
    .pipe(gulpFm({remove: true}))

    // add extends for templating: {% extends "post.nunjucks" %}
    .pipe(gulpInject.wrap('{% extends "post.nunjucks" %}{% block content %}', '{% endblock %}'))

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
    .pipe(bs.reload({stream: true}));

});

// pages | nunjucks compilation to html
gulp.task('nunjucks', ['posts'], function() {

    // const str = fs.readFileSync('src/templates/pages/index.nunjucks', 'utf8');
    // console.log(matter(str));

    // gets .html & .nunjucks files in the directory, excludes files that start with an underscore ... globbing
    return gulp.src('src/templates/pages/[^_]*.+(nunjucks|html)')
    // .pipe(gulpDebug({title: 'njk to html rendering:', minimal: false}))

    //extract frontmatter
    .pipe(gulpGrayMatter({
        //remove: false
    }))

    // use my site's data stored in a json file
    .pipe(gulpData(function() {
        return siteData; // or use return require('./src/data/site.json')
    }))

    // use extracted frontmatter data for templating archive pages
    .pipe(gulpData(function() { return siteArchive;}))

    //renders files using the templates located in this directory. storing the template directories in an array allows the usage of just files names w/extends & includes
    .pipe(nunjucksRender({
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
    .pipe(bs.reload({stream: true}));
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
    .pipe(bs.stream());
});

// javascript task
gulp.task('js', function(){
    return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(bs.reload({stream: true}));
});

// watch tasks allow for automation
gulp.task('watch', function(){

    gulp.watch('src/templates/**/*.nunjucks', ['nunjucks']);
    gulp.watch('src/templates/**/*.md', ['posts']);
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);

});

// clean build directory
gulp.task('clean:build', function () {
    console.log('deleting the build directory... lets have a fresh start')
    return del([
        // here we use a globbing pattern to match everything inside the export folder
    	'build/**/*'
    	// 'build'
    ]);
});

// clean build directory
gulp.task('clean', function () {
    console.log('deleting the build and dist directories... lets have a fresh start')
    return del([
        // here we use a globbing pattern to match everything inside the export folder
    	'build/**/*',
        'dist/**/*',
    	'dist'
    ]);
});

// default
gulp.task('default', ['clean:build'], function() { // clean build directory and then start up all of the other tasks
    gulp.start(['nunjucks','posts','css','js','watch','browser-sync'])
});


gulp.task('build', ['nunjucks', 'posts', 'css', 'js'])



/*** DEPLOYMENT tasks
*/


// production server test
var bsProd = browserSync.create()
gulp.task('browser-sync-prod', function() {

    bsProd.init({

            browser: 'chrome',
            notify: false,

            //vhost setup
            open: 'external', //opens to my specified url
            host: 'pinklemonade.sgdi',
            proxy: 'pinklemonade.sgdi',
            serveStatic: [{
                dir: './dist' //src --> build --> dist
            }],
            startPath: '/index.html'

            //localhost setup
            // server: {
            //     baseDir: 'src'
            // }
    });

});

// clean directory with production ready files before
gulp.task('clean:prod', function () {
    console.log('deleting the production-ready directory... lets have a fresh start')
    return del([
        // here we use a globbing pattern to match everything inside the export folder
    	'dist/**/*',
    	'dist'
    ]);
});

// copy production-ready directories & files to live site
gulp.task('copy', ['clean:prod'], function(){

    //javascript, css, and image files
    var assets = gulp.src([
        'build/**/**',
        '!build/css/styles.css.map',
        '!build/{data,data/**}'], {
        //you must establish a base for directories, it will copy everything after dev, according to the specified source
        base: 'build'
    }).pipe(gulp.dest('dist'));

    // //html files to root directory
    // var mainHTML = gulp.src('src/*.html')
    // .pipe(gulp.dest('dist'));

    return merge(assets); //merge-stream plugin allows us to merge this into one task

});

// preview files using browser-sync
gulp.task('preview', ['build'], function() {
    gulp.start(['clean:prod', 'copy', 'browser-sync-prod'])
});

// package final files
gulp.task('package', ['build'], function() {
    gulp.start(['clean:prod', 'copy'])
});
