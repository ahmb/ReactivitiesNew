#!/bin/bash
#https://github.com/weibeld/heroku-buildpack-run/issues/9
echo "ECHO inside temp"
echo "$(pwd)"
echo "$(ls)"
cp -r API/wwwrootchat heroku_output/
cd /app/heroku_output
echo "ECHO LS in HEROKU OUTPUT"
echo "$(ls)"