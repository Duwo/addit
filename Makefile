# makefile to automatize simple operations
all: clean build

dev:
	npm install


clean:
	rm dist/starsystem.js dist/starsystem.min.js

build:
	browserify js/main.js -o dist/starsystem.js 
	uglifyjs dist/starsystem.js -o dist/starsystem.min.js 

server:
	python -m SimpleHTTPServer