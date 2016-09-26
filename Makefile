# makefile to automatize simple operations
all: clean build

dev:
	npm install

clean:
	rm dist/addit.js dist/addit.min.js
	rm -r dist/css dist/images

build:
	browserify js/main.js -o dist/addit.js 
	uglifyjs dist/addit.js -o dist/addit.min.js
	cp -r css dist/
	cp -r images dist/
	cp addit.html dist/

server:
	python -m SimpleHTTPServer
