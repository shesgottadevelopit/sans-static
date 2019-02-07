# Project Log
The purpose of this document is to track my progress and document my process for creating a static site generator.


<!---
<details><summary>template for entries</summary>

### Entry #00x
Date: [insert dates]

**Notes:**
- [insert notes]

--------------------------------------

</details>
--->

### Entry #002
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


### Entry #001
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
