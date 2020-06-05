rm -f dist/*
babel src/main.js -o dist/temp.js
uglifyjs dist/temp.js -m -c -o