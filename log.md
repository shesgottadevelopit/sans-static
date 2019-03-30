# Project Log
The purpose of this document is to track my progress and document my process for creating a static site generator.


<!---
<details><summary>template for entries</summary>

### Entry No. 00x
Date: [insert dates]

**Notes:**
- [insert notes]

--------------------------------------

</details>
--->

### Entry No. 006
Date: Friday 03/29/2019

**Notes:**
I'm so glad I was able to wrap up that tasks for rendering Markdown and Nunjucks at once. I will definitely circle back to better understand `.bind` and why what I was doing wasn't working.

#### Frontmatter
Next thing I'll focus on is figuring out how to set up a global config file and using front-matter... and figuring out why I'm even doing that. It just keeps coming up in my research.
- Figure out the correct way to format front matter based on whatever data format I decide on
- Update my test post markdown file using that correct format
- Write the function for doing whatever I need to do to insert frontmatter from that page into my HTML markup

#### Markdown post compilation - automated
The other thing I want to do is think of an easy way to compile posts. While I'll have pages that will mostly using the `.nunjucks` extension. Something like:
- Create a post in `templates/posts`, this will always have a `.md` extension.
- Create a layout for posts in `templates/layouts` and maybe name it something like `post.nunjucks`
- Create a function that compiles a list of all the posts and then loops over that list so that it would generate a page for each post, based on the `post.nunjucks` layout.
- The only thing is I'll probably need to create a page for this type of page under `templates/pages`, and name it `article.nunjucks`. Not sure yet on that or if using `post.nunjucks` will be enough

**About Frontmatter**
Found a few resources, a lot related to Jekyll (which I've never used) but I'm sure is useful in getting me to understand what is is and where it fits in.
- [SimplePrimate on YAML](http://simpleprimate.com/blog/front-matter)
- [Ethan Marcotte on YAML/Jekyll tricks](https://ethanmarcotte.com/wrote/stupid-jekyll-tricks/)
- [Jekyll on YAML](https://jekyllrb.com/docs/front-matter/)
- [Cuttlebelle on what is frontmatter](https://github.com/cuttlebelle/website/blob/master/content/documentation/what-is-frontmatter.md)
- [Cuttlebelle examples](https://cuttlebelle.github.io/website/)

Frontmatter is the data at the front/top of your document. It is typically enclosed between two lines with 3 dashes. Example:

```yaml
---
title: My page title
---
```

There are other formats for frontmatter including JavaScript, JSON.

```yaml
---json
{
  "title": "My page title"
}
---
## My first header

# or

---js
{
  title: "My page title",
  currentDate: function() {
    // You can have a JavaScript function here!
    return (new Date()).toLocaleString();
  }
}
---
```

This is an example of how frontmatter is processed:
```markdown
---
name: Derek Worthen
age: 127
contact:
  email: email@domain.com
  address: some location
pets:
  - cat
  - dog
  - bat
match: !!js/regexp /pattern/gim
run: !!js/function function() { }
---
Some Other content
```

Turns into:

```yaml
{
    name: 'Derek Worthen',
    age: 127,
    contact: { email: 'email@domain.com', address: 'some location' },
    pets: [ 'cat', 'dog', 'bat' ],
    match: /pattern/gim,
    run: [Function],
    __content: '\nSome Other Content'
}
```

So far I have a good understanding of the basics.
- Using a package/plugin like `gulp-gray-matter` or `yaml-front-matter` you can extract frontmatter from files, especially Markdown files.
- What I don't understand now is how you get that information back into the nunjucks/HTML page during the rendering process
- And how else or what else you're using it with

Luckily the `grey-matter` repo has some [tests](https://github.com/jonschlinkert/gray-matter) I'm going to have to try at some point.

StackOverflow has some answers!
- `gulp-nunjucks-render` and `gulp-grey-matter` both store/access data in the data property of each file that is piped through. [Source](https://stackoverflow.com/questions/36457216/how-do-i-access-the-data-object-created-by-the-gulp-gray-matter-plugin-when-com)


Good news is that I've got this working. Probably the easiest package installation ever! Now I need to figure out how to use the frontmatter to define layout. But that is not super important at this stage. **Update:** Figured out how to do that with variables, yay!

### Entry No. 005
Date: Thursday 03/28/2019

**Second Update:**
Soooo I figured it out and this is why I need to spend more time reading documentation (although sometimes it is not clear that that would've helped). I mean, none of my errors had anything to do with what I figured out.

So I went back to the drawing board and decided to see if I troubleshoot from the code that was working but not doing what I wanted. It was outputting actual HTML tags and not formatted text. I then realized that maybe I could figure out a way to change autoescaping, since it seemed like Nunjucks was escaping special characters and TADA.. that was it. I actually tried that previously but I wasn't adding the option to the `nunjucksRender` function correctly. Two days later, we've got the markdown and nunjucks working as I imagined.

Although I've got this working, I haven't figured out the why although I know it has something to do with `.bind` and `this`, thanks to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind).

I'm going to commit these changes. Wow what an eventful night.

**Update:**
I'm going to take a break. Just a little disappointed. Option 2 w/`gulp-nunjucks-render` is the closest I get to a working version of this. Otherwise, I think I'll have to not use these gulp nunjucks plugins.

**Notes:**
This should actually be entry no. 006 but I got really busy/exhausted trying to figure out how to get this markdown nunjucks thing to play well together. Decided to document all the fixes I've tried here for reference because right now I'm trying a lot.

A few things are happening: I'm getting an unknown block error or it doesn't compile the markdown to HTML at all, it renders as HTML tags.

1) [Unknown block tag error with gulp-nunjucks-render and nunjucks-markdown](https://github.com/zephraph/nunjucks-markdown/issues/25)
    - Tried this fix with `gulp-nunjucks-render` and `gulp-nunjucks-api`. The former renders `[object Object]` but no content from the markdown block, and no error. The latter returns an error like "Template render error: (/mnt/c/sgdi/www/myProjects/pink-lemonade/sans-base/src/templates/pages/index.nunjucks) [Line 8, Column 2]\n  unknown block tag: markdown\n"
    - I also try it with all of the versions of markdown I have installed: `markdown-it`, `gulp-markdownit`, and `gulp-markdown-it`
    - `markdown-it` gives an error of: "Error: Wrong `markdown-it` preset"

```js
var nunjucksRender = require('gulp-nunjucks-render');
// var nunjucksRender = require('gulp-nunjucks-api')
var markdown = require('nunjucks-markdown');
var markdownIt = require('markdown-it');
var gulpMarkdownIt = require('gulp-markdownit');
var gulpMdIt = require('gulp-markdown-it');

nunjucksMarkdownRender = function (env) {
    // const md = markdownIt().render.bind(markdownIt());
    // var md = new markdownIt();
    markdown.register(env, gulpMdIt);

}

// nunjucks compilation to html
gulp.task('nunjucks', function() {

    // gets .html & .nunjucks files in the directory, excludes files that start with an underscore ... globbing
    return gulp.src('src/templates/pages/[^_]*.+(nunjucks|html)')
    //renders files using the templates located in this directory. storing the template directories in an array allows the usage of just files names w/extends & includes
    .pipe(nunjucksRender({
        manageEnv: nunjucksMarkdownRender,
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

```
2) [Micro static site generator with in-markdown templating using Gulp & Nunjucks ](https://gist.github.com/seaneking/aef8db386a8415148517cebad505d877)
    - Tried this with `gulp-nunjucks-render` and it spits out the HTML tags onto the page. I get the block error again with `gulp-nunjucks-api`

```js
nunjucksMarkdownRender = function (env) {
    var md = markdownIt.render.bind(markdownIt);
    markdown.register(env, md);
// referenced my markdownIt variable
}
```

3)[Investigate problems with gulp-nunjucks-render](https://github.com/zephraph/nunjucks-markdown/issues/7)
    - Tried with `gulp-nunjucks-api` and `gulp-nunjucks-render` and got another unknown block error.

```js
gulp.task('nunjucks', function() {

    var env = nunjucksRender.nunjucks.configure('src/templates')
    markdown.register(env)

})
```
4) [Custom Gulp Markdown Setup] (https://gist.github.com/kerryhatcher/1382950af52f3082ecdc668bba5aa11b)
    - `gulp-nunjucks-render` & `gulp-nunjucks-api` spit out an unknown block error without compiling.

```js
var env = new nunjucksRender.nunjucks.Environment(new nunjucksRender.nunjucks.FileSystemLoader('src/templates/'));
markdown.register(env,markdownIt)
```

### Entry No. 004
Date: Tuesday 03/26/2019

**Notes:**
I'm back bishes! Again, hahaha. I actually took a trip and got sick and now I'm trying to pick up the pieces of my life for the last 3-4 weeks, but yes I'm still kicking.

I decided to sort through my bookmarks which led me to sorting through all the bookmarks I have related to creating a static site generator. I did that over the weekend while recovering from this mystery bug going around and I'm ready to get back into things. I think I may actually have to use my "online network" to work through my questions and any things keeping me stuck in this place of no progress.

I'm going to take a step back. Instead of focusing on how I'm going to pass in filenames for single page processing, I'm going to figure out how to process markdown. My current nunjucks setup only renders Nunjucks to HTML and I want it to render Nunjucks and Markdown to HTML. After I figure that out, I'll need to figure out how to incorporate frontmatter into the mix. This decision is PROGRESS. Decided on this after listening to a podcast that said one of the biggest mistakes people make with debugging is not isolating the problems. I flipped that and decided to isolate functionality to help me along with the project. Bite size progress.

I've seen the following markdown parsers mentioned but apparently there are more.
- Marked
- Markdown-It

Each parser has different features, apparently code blocks are not native to Markdown and a newer feature. Anyway, which parser I use for this project will now likely depend on what features it has built-in to help me. Some parsers have syntax for metadata and that would be awesome, a 2-for-1.

Anyway, I'm going to install the following packages and configure them, see what happens.


### Entry No. 003
Date: Thursday 02/07/2019

**Notes:**
I'm back bishes! So picking up where I left off when figuring out how to pass arguments from the command line into my gulp tasks. When I could not sleep last night I found some resources to help me strategize on how to make this happen. [Autumn Lansing](https://autumnlansing.com/articles/static-site-generators) had the same thought I did about compiling single pages instead of the entire site.

So far I've created a `test.js` file to _test_ my assumptions and code. I'm running it with `node test.js`.

Also some pseudocode here:

```javascript
// TO DO: nunjucks to html single page compilation | gulp page --page <file.ext>
gulp.task('page', function() {

    // grab the arguments & stores the position of --page in the array
    var argsIndex = process.argv.indexOf("--page");
    var args = process.argv.slice(3);
    console.log(args);
    console.log(argsIndex)
    console.log(process.argv);


    // count the number of arguments and if they're greater than 1, start looping through

    // check if the file exists in the directory

    // if it does exist, store the file/path in a variable

    // plug that variable into the task below


    // gets .nunjucks file(s) in the directory
    return gulp.src('src/templates/pages/[^_]*.+(nunjucks|html)')
    //renders files using the templates located in this directory
    .pipe(nunjucksRender({
        path: [
            'src/templates/layouts', // the main template
            'src/templates/partials', // partials
            'src/templates/pages'] // pages that will be based on the main template & partials
    })).on('error', gutil.log) // checks and logs errors
    //outputs the files into the src home folder
    .pipe(gulp.dest('src'))
    .pipe(browserSync.reload({stream: true}));
});

```


### Entry No. 002
Date: Wednesday 02/06/2019

**Notes:**
So I'm not sure if there is an actual use case for this but 2 "To Dos" I added to my gulp file are:

```javascript
// TO DO: nunjucks to html single page compilation

// TO DO: nunjucks and markdown to html compilation
```
In order to compile a single page, I will need to pass in an argument. So now I'm searching how to pass arguments into gulp tasks. I know I've done this before back when I took my General Assembly JavaScript course but I'm so rusty. It was during the Data Types lesson, week 3. Luckily I have notes, but they're not enough so I'm back to Google. I'm now thinking I should definitely do a real refresher course, so I can get my bearings.

In the course I had a file named `argv.js` and it included this code: `console.log(process.argv)`. If I type in `node argv.js` it will [return an array](https://stackoverflow.com/questions/22213980/could-someone-explain-what-process-argv-means-in-node-js-please) that includes the path to node and the path to my javascript file. If i type in `node argv.js love` the array will also include an array item `love`, in position 2 (because computers start counting from 0 and not 1). It's all coming back to me! I remember covering the topic of [Extracting command line arguments from Node.js using destructuring](https://humanwhocodes.com/blog/2018/10/extracting-command-line-arguments-nodejs/) with our instructor trying to explain the whole `...args` thing, which I didn't completely get it the time.

See below:
```bash
$ node argv.js love
[ '/home/badgirlkudo/.nvm/versions/node/v8.12.0/bin/node',
  '/mnt/c/sgdi/edu/GA-jsDC-5/js-dc-5/02-data-types/assignment/argv.js',
  'love' ]
```

Anyway, it is possible to pass arguments to gulp tasks. Exactly how should I do that?

Before I get into my task of figuring out how to pass arguments, I decided to actually test my current gulp nunjucks workflow. I needed to do this because my directory structure has slightly changed.

```
src
├── 404.html
├── index.html
└── templates
    ├── layouts
    │   └── main.nunjucks
    ├── pages
    │   ├── 404.nunjucks
    │   ├── _img.nunjucks
    │   ├── _test.nunjucks
    │   └── index.nunjucks
    ├── partials
    │   ├── footer.nunjucks
    │   └── header.nunjucks
    └── posts
        └── riri-sample.md
```

In testing, I discovered some errors (e.g. `Error: template not found`). I had a similar problem before but couldn't remember what. I did my Google due diligence (thank you Stackoverflow) and learned that it may be a good idea to store all my template directory paths in an [array](https://stackoverflow.com/questions/39766802/array-of-multiple-path-is-not-working-in-nunjucks-for-templates-and-partials?rq=1) for the compile config. In the past, I only use a single directory `src/templates/layout` and that is not the source of all my files, so nunjucks would be confused when it started looking for a file like `header.nunjucks`.

Now my testing for that part is done. Deciding if this is a good place to pause for the night... knowing I may not be able to pick this back up until next week :disappointed: .

I already copied over the `gulp nunjucks` function to a new one for my single page compilation task, so I can pick up later on that.


### Entry No. 001
Date: Wednesday 01/30/2019

**Notes:**
- So I've been doing a lot of reading up on how to spin up a custom static site generator. I've already got sometime simple up & running but would like to incorporate Markdown and a thing called Frontmatter. So I decided to read up on what [Frontmatter](https://www.scribendi.com/advice/front_matter.en.html) is and apparently it is the most basic information and originates from publishing. On the web it refers to metadata.
- Frontmatter is written in [YAML](https://learn.getgrav.org/advanced/yaml) which is a format for storing data. I wonder if [JSON](https://rhnh.net/2011/01/31/yaml-tutorial/) is also used for frontmatter. Found this [YAML Cookbook](https://yaml.org/YAML_for_ruby.html) site which may be useful at some point.
- I've been reading up on tutorials for creating your own SSG and found some great resources:
    - Build a static site in 40 lines w/NodeJS (https://www.webdevdrops.com/build-static-site-generator-nodejs-8969ebe34b22/). This example uses JSON!
    - [Building a SSG in Python](https://www.timo-zimmermann.de/2014/5/how-to-write-a-static-site-generator/)
    - [SSG as a Blog](https://www.bastibl.net/blogging-with-gulp/).This tutorial seems like a good starting point. Apparently I can set up a task for compiling posts separately from individual core pages of a site.
    - [Armadillo](https://snugug.com/musings/armadillo/) is another example and I'll study the code for pointers once I get started.
    - A [Github Gist](https://gist.github.com/seaneking/489a8928b61da46a55f7e2971d46d3d6) with a gulpfile.js worth exploring. And [another one](https://gist.github.com/aljopro/b104e52471abce17557ba10aa074a59a).
    - A[ gulp starter kit](https://github.com/skcript/skcript-gulp-starter/blob/master/README.md)
    - StackOverflow always has [gems on gems](https://stackoverflow.com/questions/35725543/a-gulp-workflow-with-markdown-and-nunjucks).


What I need this static site generator to do is (this pseudo code is inspired by [TheCodeBarbarian](http://thecodebarbarian.com/2015/02/06/static_site_generators)):
- [ ] Read Nunjucks files
- [ ] Read Markdown files
- [ ] Compile the Markdown files (with the Frontmatter) and insert them into the Nunjucks files
- [ ] Compile the Nunjucks files into HTML
- [ ] Clean up URLs

Packages to explore
- [gulp-nunjucks-md](https://www.npmjs.com/package/gulp-nunjucks-md)
-
