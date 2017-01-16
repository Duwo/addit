APP_NAME=addit
STATIC_ROOT=/static
BROWSERIFY=True
# STATIC_ROOT=https\://erikrodhe.s3.amazonaws.com/static

compile:
	browserify js/main.js -o $(APP_NAME)/$(APP_NAME).js 
