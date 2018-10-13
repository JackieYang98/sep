#!/bin/sh
config() {
  git config --global user.email "jackie.j.yang@student.uts.edu.au"
  git config --global user.name "Jackie via Travis"
}
commit() {
    git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

pushing() {
  git remote add origin2 https://${GH_TOKEN}@JackieYang98/sep.git
  git push --quiet --set-upstream origin2
}
config
commit
pushing