
# synthspiration
webgui for all your hardware synthesizer patches

# requirements
  * database with audio samples created via https://github.com/othmar52/synth-patch-grabber 

# note
All audio samples of the small demo database which is included in this repository are symlinks to the same file  
created via `IFS=$'\n'; for m in $( find public/output -name *.mp3 ) ;do rm "$m"; ln -s ../../../../demo-dummy.mp3 "$m";  done`  
That means the demo will most likely not work on windows. But with real data there shouldn't be any problem on windows as its only html/javascript/css under the `file://` protocol


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
