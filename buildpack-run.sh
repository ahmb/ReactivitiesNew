#!/bin/bash
#https://github.com/weibeld/heroku-buildpack-run/issues/9
cp -R /app/API/wwwroot /app/heroku_output >> buildPackError.log