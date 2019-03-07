var express = require('express');
var app = express();
var child = require('child_process')
var proxy = require('http-proxy-middleware');
app.use('/api/*', proxy({target: 'http://192.168.3.114:3000/', changeOrigin: true}));
app.use(express.static('./dist'));

app.get('/gitpull', function (req, res) {
    child.exec('git pull', function () {
        console.log('pull')
        res.redirect('/')
    })
})

app.use(function (req, res) {
    res.writeHead(404, {"Content-type": "text/html;charset=UTF-8"});
    res.end('页面不见啦')
});

app.listen(20001);