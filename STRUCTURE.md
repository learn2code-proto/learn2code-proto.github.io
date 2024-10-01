# FILE STRUCTURE

This document details the file structure and conventions of this website's
codebase.

## FOLDERS

- `favicon` contains the `favicon.ico` file that serves as the image displayed
  on the browser tab.
- `images` contains all images referenced in the codebase at its root.
- `pages` contains the raw HTML used to build each page:

  - `layout.html` details the HTML header and navbar used in each page.
    Placeholder values are denoted by {{double brackets}}.
  - `core.html` is used to generate `index.html` at the project's root.
  - The remaining files generate their own pages who's titles reflect their
    filenames (with '-' subbed with ' ' and with proper capitalization).

  Pages can be found at the root of the project after being built.
- `scripts` contains all JavaScript files.
- `styles` contains all CSS files.

## BUILD.SH

`build.sh` is a BASH script that builds webpages by concating each HTML file in
`pages` (excluding `layout.html`) into a file in the project root using the
same header, navbar, and footer found in `layout.html`.

`core.html` is a special case that become `index.html`.
