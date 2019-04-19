## Requirements
- [x] Read a global site config file that include site title, description
- [x] Read Nunjucks files
- [x] Read Markdown files
- [x] Compile the Nunjucks files and generate HTML pages
- [x] Compile the Markdown files (with the Frontmatter) and insert them into the Nunjucks files
- [x] Read data from JSON ~~or YAML~~ files.
- [x] Create a script that generates JSON files with a list of posts or pages or anything I'd need to iterate over using Nunjucks systems. The source of this information would come from nunjucks files or the directories they're stored in.
- [ ] Clean up URLs


## To-Do: What is there to do?

**Documention**
- [x] Write my plan for developing this static site generator: I'm regularly updating this in the log where most of my logic and pseudocode originates.

**Dependencies**
Check the `package.json` file for a complete list. This is just my planning list
- `fs` | using this to write files to the system
- `fs-extra` | don't think I'll use this but considered it. It adds new functions to Node’s native file-system module (fs) and add promise support for the existing ones.


**Tooling**
- [x] Decide on tooling for markdown rendering: picked the `nunjucks-markdown` package on npm along with the `markdown-it` parser, since the former allows you to pick your own markdown parser.
- [x] Revisit tooling for nunjucks rendering: sticking w/ `gulp-nunjucks-render` although I did try to give `gulp-nunjucks-api` a try it wasn't playing well with `nunjucks-markdown`
- [x] Decide on tooling for frontmatter data: using `gulp-gray-matter`

**Template Rendering**
- [x] Learn about frontmatter and how/why to incorporate it
- [x] Write pseudocode for rendering Markdown to HTML
- [x] Write pseudocode for rendering Nunjucks to HTML
- [x] Update existing code for rendering Nunjucks to HTML
- [x] Write script for markdown compile task
- [x] Rewrite script for nunjucks compile task
- [x] Update deploy/script so that browserSync opens up from dev for initial testing and dist for final testing

**Layout/Design/Content/other**
- [ ] Create additional nunjucks templates & test
- [ ] Update CSS with new "starter" styles
- [x] Include vendor styles & scripts in js/css folders
- [x] update .edigorconfig (tab spaces or nah)
- [x] Create test page content with frontmatter
- [x] Use Nunjucks/JSON to render an archive page/homepage (sorting articles by date)
- [x] Use Nunjucks/JSON to render a post/article page
- [ ] Update all pages to include reusable code when all gulp tasks are completed
- [ ] Refactor as needed


**Site config**
- [x] decide on best format: js, json, yaml  | using JSON
- [ ] create a master site config file
    - url paths should be root relative
