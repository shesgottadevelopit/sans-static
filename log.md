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
