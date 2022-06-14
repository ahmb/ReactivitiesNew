#!/bin/bash
#https://github.com/weibeld/heroku-buildpack-run/issues/9
echo "$(pwd)"
echo "$(ls)"
cp -R API/wwwroot heroku_output >> buildPackError.log