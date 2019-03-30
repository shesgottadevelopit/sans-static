# Pink Lemonade/Sans Static Site Generator

## Summary
An HTML and CSS boilerplate project. This is also a learning exercise in creating a static site generator, allowing for markdown usage and front matter use in pages.

## Demystifying SSGs
What is a static site generator? "The basic concept of a static site generator (aka static site engine) is simple: take dynamic content and data and generate static HTML/JavaScript/CSS files that can be deployed to the server."[Source](https://www.oreilly.com/ideas/static-site-generators)

## Demystifying frontmatter & file-based data formats
Frontmatter is the data at the front/top of your document. It is typically enclosed between two lines with 3 dashes. It can be extracted from the document and into a file-based data format for usage. "File-based data formats are useful for structuring any sort of arbitrary data independent of its display. This allows the designer or developer to both reuse the data in multiple places or change the way it is displayed without duplicating or modifying the original data." Examples include JSON, YAML, TOML.


## Requirements
- [ ] Read a global site config file that include site title, description
- [x] Read Nunjucks files
- [x] Read Markdown files and markup
- [x] Compile the Nunjucks files and generate HTML pages
- [x] Compile the Markdown files (with the Frontmatter) and insert them into the Nunjucks files
- [ ] Read data from JSON or YAML files.
- [ ] Create a script that create JSON or YAML files with a list of posts or pages or anything I'd need to iterate over and the source of this information would come from actual files. Supports file-based data formats.
- [ ] Clean up URLs


## To-Do
What is there to do?

**Documention**
- [ ] Write our plan for developing this static site generator: I'm regularly updating this in the log where most of my logic and pseudocode originates.

**Dependencies**
Check the `package.json` file for a complete list. This is just my planning list
- fs
- fs-extra ?? Reason: Adds new functions to Node’s native file-system module (fs) and add promise support for the existing ones.


**Tooling**
- [x] Decide on tooling for markdown rendering: picked the `nunjucks-markdown` package on npm along with the `markdown-it` parser, since the former allows you to pick your own markdown parser.
- [x] Revisit tooling for nunjucks rendering: sticking w/ `gulp-nunjucks-render` although I did try to give `gulp-nunjucks-api` a try it wasn't playing well with `nunjucks-markdown`
- [x] Decide on tooling for frontmatter data: using `gulp-gray-matter`
- [ ] Determine what other tooling is needed

**Template Rendering**
- [x] Learn about front matter and how/why to incorporate it
- [x] Write pseudocode for rendering Markdown to HTML
- [x] Write pseudocode for rendering Nunjucks to HTML
- [x] Revisit existing code for rendering Nunjucks to HTML
- [x] Write script for markdown compile task
- [x] Rewrite script for nunjucks compile task

**Layout/Design/other**
- [ ] Add HTML markup to main template
- [ ] Create additional nunjucks templates & test
- [ ] Add CSS stylesheet
- [x] Include vendor styles & scripts in js/css folders
- [x] Review other boilerplate templates for pertinent implementations
- [x] update .edigorconfig (tab spaces or nah)


**Content**
- [ ] Create test page content with front matter

#### Directions


#### Directory Structure
```
[insert directory tree using tree command ]

```
