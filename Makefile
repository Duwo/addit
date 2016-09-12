# makefile to automatize simple operations
all: clean build

dev:
	npm install

clean:
	rm dist/potp.js dist/potp.min.js

build:
	browserify js/main.js -o dist/potp.js 
	uglifyjs dist/potp.js -o dist/potp.min.js 

server:
	python -m SimpleHTTPServer
