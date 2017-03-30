# SimonGame

Game about memorize sequence of colors like the famous "Simon".

You can try in /build/index.html

To develop and try in a server first download dependencies:

```
npm install 
```
Then you can launch the server with:

```
gulp dev
```

It will open a game in the browser in http://localhost:3000/

The gulp configuration uses "browsersync", every change in the code produces a reload of the page automatically.
The style is written sin SASS (scss), every change in the style builds the normal css automatically. And the gulp task uses "autoprefixer" to add vendor prefixes if it's needed.

To build the final version with css and js minimized:

```
gulp build
```

