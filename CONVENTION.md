# PROJECT CONVENTION

This document details the file structure and conventions of this website's
codebase.

## FOLDERS

- `favicon` contains the `favicon.ico` file that serves as the image displayed
  on the browser tab.
- `images` contains all images referenced in the codebase at its root.
- `pages` contains the raw HTML used to build each page:

  - `layout.html` details the HTML header and navbar used in each page.
    Placeholder values are denoted by {{double brackets}}.
  - `index.html` is used to generate `index.html` at the project's root.
  - The remaining files generate their own pages who's titles reflect their
    filenames (with '-' subbed with ' ' and with proper capitalization).

  Pages can be found at the root of the project after being built.
- `scripts` contains all javascript files.
- `styles` contains all CSS files.

## BUILD.SH

`build.sh` is a BASH script that builds webpages by concating each HTML file in
`pages` (excluding `layout.html`) into a file in the project root using the
same header, navbar, and footer found in `layout.html`.

`index.html` is a special case that has a custom page title specified inside
`build.sh`.

## HTML

The HTML header is written once and found in `layout.html`; each page has its
own file in the `pages` directory.

## CSS

General CSS should be put into `core.css`, while anything with any specificity
should get its own file.

Don't using hanging classes or ids unless generalization is intended.

## JAVASCRIPT

All javascript files should be imported into `core.js`, not included in the
HTML header as an additional `<script/>`.

`core.js` should include general scripts for controlling buttons or visual
functionality, while other uses should get their own file.
