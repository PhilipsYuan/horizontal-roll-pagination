#!/usr/bin/env bash
rm -f dist/*
babel src/main.js -o dist/temp.js
uglifyjs dist/temp.js -m -c -o dist/horizontalRollPagination.min.js
mv dist/temp.js dist/horizontalRollPagination.js