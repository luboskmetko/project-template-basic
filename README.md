Usage
=====

Project is created with use of [Sass](http://sass-lang.com/) (with [Compass](http://compass-style.org) library) and prepared to be developed & build with [Grunt](http://gruntjs.com). It utilizes [RequireJS](http://requirejs.org) and [Bower](http://bower.io).

Unless you intend to make changes to the files, all you probably care for is in the `build` dir of this archive - it contains minimized CSS and JS files. Unminimized versions can be found in `public` dir.

Building
--------

To be able to utilize above tools & libraries, [Ruby](http://www.ruby-lang.org) & [node.js](http://nodejs.org) must be installed in system. After that dependecies must be installed. **Warning! This will overwrite `build` dir!**

1. If there is na grunt installed in the system, do so via:

        npm install -g grunt-cli

2. If there is no bower installed in the system, do so via:

        npm install -g bower

3. If there is no [bundler](http://bundler.io) installed in the system, do so via:

        gem install bundler

4. Install ruby gems (while in root project folder):

        bundle install

5. Install node packages (while in root project folder):

        npm install

6. Install bower dependencies (while in root project folder):

        bower install

7. Build project (while in root project folder):

        grunt build

Development
-----------

During development, to re-compile SCSS file and chack JavaScript in real time just run (after first six points from above are done):

    grunt

this will start a task that will watch for changes in files and recompile them as needed.
