# LOCAL
STATIC_ROOT=/static

# PROD
# STATIC_ROOT=https\://erikrodhe.s3.amazonaws.com/static
APP_NAME=addit
# makefile to automatize simple operations
all: clean build

dev:
	npm install

clean:
	rm $(APP_NAME)/$(APP_NAME).js # dist/addit.min.js
	rm -r dist/css $(APP_NAME)/images

build:
	browserify js/main.js -o $(APP_NAME)/$(APP_NAME).js 
	# No ES6 backtic support for variables in strings
	# uglifyjs dist/addit.js -o dist/addit.min.js
	cp -r css $(APP_NAME)/
	cp -r images $(APP_NAME)/
	cp addit.html $(APP_NAME)/
	sed -i -e "s:static_path = '.':static_path = '$(STATIC_ROOT)/$(APP_NAME)':g" $(APP_NAME)/$(APP_NAME).js
	rm $(APP_NAME)/addit.js-e


server:
	python -m SimpleHTTPServer
