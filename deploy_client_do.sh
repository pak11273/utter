#! /bin/bash

yarn postinstall

git add .
git cm -m 'deploying client'
git push

