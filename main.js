var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')
var upload = require('express-fileupload');
app.use(upload());


app.get('/', function(req, res) {
    const tracks = fs.readdirSync(path.join(__dirname, 'tracks')).map(file => {
        if(file.indexOf('.mp3') === -1) {
            return
        }
        return `
    <div class="container track">
        <div class="truncate file-text">
            <h5 class="truncate header col s12 light">${file.replace(/-/g ,` `).split(`.mp3`).join(``)}</h5>
        </div>
        <div class="player" id="musics">
            <audio controls preload="metadata">
                <source src="/track/${file}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        </div>
        
    </div>`

    })
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" href="/materialize.min.css" />
                <link rel="stylesheet" href="/index.css" />
                <title>Music Player</title>
                
            </head>
            <body style="text-align:center;">
                <h3 class="header center teal-text text-lighten-2 title">Music Player</h3>
                <h4 class="header col s12 light subtitle">Put MP3 files on the tracks directory to see them here</h4>
                ${tracks.join('')}
                <div class="container">
                    <form id="musicInclude" form class="musicUpload" action="" method="post" enctype="multipart/form-data">
                        <div class="file-field input-field">
                            <div class="btn">
                                <span>File</span>
                                <input id="uploadmusic" type="file" name="upfile" accept=".mp3" required>
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text">
                            </div>
                            </div>
                        <input class="waves-effect waves-light btn" type="submit" />
                    </form>
                </div>
                <script src="/index.js"></script>
            </body>
        </html>
    `)
})

app.get('/track/:track', function(req, res) {
    res.sendFile(path.join(__dirname, 'tracks', req.params.track))
})

app.post('',function(req,res){
    console.log(req.files);
    if(req.files.upfile){
      var file = req.files.upfile,
        name = file.name,
        type = file.mimetype;
      var uploadmusic = __dirname + '/tracks/' + name;
      file.mv(uploadmusic,function(err){
          console.log("Música Carregada:",name);
          res.redirect('back');
      });
    }
  })
  

app.use(express.static(__dirname + '/public'));

app.listen(9090)