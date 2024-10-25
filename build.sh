#!/bin/bash

# ctw // 2024-09-30
# builds HTML webpages from a preset layout and a collection of individual
# pages

set -eu

PAGE_DIR='./pages'
HOME_TITLE='PROTO - Block Coding'  # for `index.html`

[ ! -d "$PAGE_DIR" ]             && echo 'pages directory not found' && exit 1
[ ! -f "$PAGE_DIR/layout.html" ] && echo 'layout could not be found' && exit 2
[ ! -f "$PAGE_DIR/index.html" ]  && echo 'index could not be found'  && exit 3

WARNING () {    # prints a warning to stdout intended to be a HTML header
    cat << EOF
<!-- --------------------------------------------------------------------------
                           !! AUTO-GENERATED PAGE !!
                             !! NOT SOURCE CODE !!

Generated from a preset layout on $(date -Iseconds).
For source files, look under \`$PAGE_DIR\` directory.
Build with \`build.sh\`.
--------------------------------------------------------------------------- -->
EOF
}

LAYOUT="$(IFS=''; cat "$PAGE_DIR/layout.html")"

for PAGE in $(find "$PAGE_DIR" -name '*.html' -print0 \
                  | xargs -0 'realpath' \
                  | grep -v "$PAGE_DIR/layout.html")
do
    if [[ "$PAGE" =~ .*'index.html'$ ]]  # `index.html` is a special case
    then
        FILE_NAME='index.html'
        TITLE="$HOME_TITLE"
    else
        FILE_NAME="$(basename "$PAGE")"
        TITLE=( $(echo "$FILE_NAME" | sed 's/.html//' | tr '\-' ' ') )
        TITLE="${TITLE[@]^}"
    fi

    PAGE_CONTENT="$(IFS=''; cat "$PAGE")"
    GEN_CONTENT="${LAYOUT/'{{body}}'/"$PAGE_CONTENT"}"
    GEN_CONTENT="${GEN_CONTENT/'{{title}}'/"$TITLE"}"

    WARNING > "$FILE_NAME"
    echo "$GEN_CONTENT" >> "$FILE_NAME"
done

exit 0
