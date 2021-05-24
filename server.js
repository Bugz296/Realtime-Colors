/**
 * Require Modules
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname));
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

const server = app.listen(8000, function(){
    console.log("Listening to Port 8000");
});
const io = require('socket.io')(server);

/* Socket Event Listener */
let bgColor = 'white';
io.on('connection', function(socket){
    /* Whenever a client establishes a connection, server emits updated count */
    socket.emit('updated_color', {color: bgColor});

    socket.on('update_color', function(req){
        bgColor = req.color;
        io.emit('updated_color', {color: req.color});
    });
});
/**
 * Routes
 */
app.get('/', function(req, res){
    res.render('index', {user_data: "Hey"});
});