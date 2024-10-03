#!/bin/bash

# ctw // 2024-09-30
# builds HTML webpages

PAGE_DIR='./pages'
HOME_TITLE='Block Coding Demo'

set -eu

[ ! -d "$PAGE_DIR" ]             && echo 'pages directory not found' && exit 1
[ ! -f "$PAGE_DIR/layout.html" ] && echo 'layout could not be found' && exit 2
[ ! -f "$PAGE_DIR/core.html" ]   && echo 'core could not be found'   && exit 3

LAYOUT="$(IFS=''; cat "$PAGE_DIR/layout.html")"

for PAGE in $(find "$PAGE_DIR" -name '*.html' -print0 \
                  | xargs -0 'realpath' \
                  | grep -v "$PAGE_DIR/layout.html")
do
    if [[ "$PAGE" =~ .*'core.html'$ ]]
    then
        FILE_NAME='index.html'
        TITLE="$HOME_TITLE"
    else
        FILE_NAME="$(basename "$PAGE")"
        TITLE=( $(echo "$FILE_NAME" | sed 's/.html//' | tr '\-' ' ') )
        TITLE="${TITLE[@]^}"
    fi

    echo '<!-- !! GENERATED PAGE !! NOT SOURCE CODE !! -->' > "$FILE_NAME"

    CONTENT="${LAYOUT/'{{body}}'/"$(IFS=''; cat "$PAGE")"}"
    CONTENT="${CONTENT/'{{title}}'/"$TITLE"}"

    echo "$CONTENT" >> "$FILE_NAME"
done

exit 0
