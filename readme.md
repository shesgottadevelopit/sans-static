# Pink Lemonade/Sans Static Site Generator

## Summary
An HTML and CSS boilerplate project. This is also a learning exercise in creating a static site generator, allowing for markdown usage and frontmatter use in pages.

## Demystifying SSGs
What is a static site generator? "The basic concept of a static site generator (aka static site engine) is simple: take dynamic content and data and generate static HTML/JavaScript/CSS files that can be deployed to the server" from the command line. [Source](https://www.oreilly.com/ideas/static-site-generators)

There are a lot of static site generators out there that I could've learned but I was already using Nunjucks as a templating engine and decided to see how I could build on that.

### What is frontmatter?
Frontmatter is the data at the front/top of your document. It is typically enclosed between two lines with 3 dashes. It can be extracted from the document and into a file-based data format for usage (e.g. JSON or YAML).

---
I'm tracking my process and progress in [`log.md`](log.md) and included a working requirements list w/to-dos in `reqs.md` if you're interested in wading through my stream of thoughts.

#### How to use
Don't run any of these commands without actually having files in the `templates` directory or you'll probably get an error.

**Development tasks**
- `gulp` will spin up the server and render your nunjucks files from the `build` directory. You'll be able to actively develop with this instance. CSS and markup changes will be reflected instantly.
- `gulp posts`: renders posts written in markdown into a nunjucks template that is then rendered to html
- `gulp nunjucks`: renders nunjucks pages to html
- `gulp build`: just compiles nunjucks, posts, and copies js and css files into the `build` directory
- `gulp clean:build`: will delete all the files in the `build` directory but keep the directory. This directory is gitignored


**Tasks to prep/test for production**
- `gulp clean:prod`: will delete the `dist` directory and its files.
- `gulp copy`: copies files from the `build` directory into `dist`.
- `gulp preview`: copies files from the `build` directory into `dist` and gives you a browser-sync instance to preview
- `gulp package`: just copies files from the `build` directory into `dist`


**Misc**
- `gulp clean`: deletes the `dist` directory and its files and deletes the files in `build`

-These tasks are used just for copying files at the moment:
    - `gulp js`
    - `gulp css`

#### Recommended directory Structure
```
├── build (required!)
├── node_modules
└── src
    ├── css
    ├── data
    ├── img
    ├── js
    ├── scss
    └── templates
        ├── layouts
        ├── pages
        ├── partial
        └── posts

```
