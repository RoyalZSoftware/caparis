#!/bin/bash

cd ..

cd ./core && npm run watch & && cd ..
cd ./appwrite && npm run watch & && cd ..

