#!/bin/bash

# checkout to main
git checkout main

#prettify
npm run prettify

# build
npm run build:applender:dev

# Deploy to firebase

cd build
rm -rf .firebaserc

cat <<EOT1>> .firebaserc
{
  "projects": {
    "default": "citiwise-5bd97"
  }
}
EOT1

echo "created .firebaserc"

rm -rf firebase.json
cat <<EOT2>> firebase.json
{
  "hosting": {
    "public": "./",
    "site": "lender-citiwise",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
EOT2

echo "created firebase.json"

echo "deploying to firebase..."

../node_modules/.bin/firebase deploy
echo "Finished!"
