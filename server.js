const express = require('express');
const fs = require('fs');
const util = require('util');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        /*
      origin: "https://www.1word1action.com",
      methods: ["GET", "POST"],
      allowedHeaders: ["1word1action-header"],
      credentials: true
      */
      origin: "http://192.168.114.12:8081",
      methods: ["GET", "POST"],
      allowedHeaders: ["1word1action-header"],
      credentials: true

    }});

// const io = require('socket.io')(server);

const socketSrc = require('./tasks/socket');

const session = require('express-session')({
    secret: 'num word puzzle game',
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //   maxAge: 1000 * 60 * 10
    // },
});
const sharedsession = require('express-socket.io-session');

let log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
let log_stdout = process.stdout;

console.log = function(d) { //
  const now = new Date();
  log_file.write( now.toLocaleTimeString()+ ' ' + util.format(d) + '\n');
  log_stdout.write( now.toLocaleTimeString()+ ' ' + util.format(d) + '\n');
};

const port = process.env.PORT || 8081;
// const baseUrl = '0.0.0.0';

// const baseUrl = '1word1action.com';
// const baseUrl = '37.148.213.22';
const baseUrl = '192.168.114.12';
// const baseUrl = 'quizpuzzle.chileracing.net'

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/quiz_app/www'));

app.use(session); 
io.use(sharedsession(session, {autoSave: true}));

// app.get('/', (req, res) => {
//     req.session.game_exists = false;
//     res.sendFile(__dirname + '/quiz_app/www/index.html');
// });

//Set Template Engine
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use((req,res,next) =>{
    if(req.method == 'POST')
    {
        next();
        return;
    }
    if(req.url.startsWith('/reward'))
    {
        console.log('reward pass');
        next();
        return;
    }
    let parts = req.url.split('/');
    let password = parts[1];
    if(!password.startsWith('Nihanece'))
    {
        res.status(404);
        res.type('txt').send('Not found');
        return;
    }
    let numberPassword = password.replace('Nihanece', '');
    let date = new Date();
    console.log(((date.getMonth()+1)*5 + date.getDate()));
    if( Number.parseInt(numberPassword) != ((date.getMonth()+1)*5 + date.getDate()))
    {
        res.status(404);
        res.type('txt').send('Not found');
        return;
    }
    next();
});

//Set Route
require('./routes/web.js')(app);

let number, halfCnt = 0;
let connections = [];

socketSrc.useSocket(io).then(() => {
    server.listen(port, baseUrl, () => {
        console.log(`Listening on ${server.address().port}`);
    });
    number = setInterval(() => {
        halfCnt++;
        if ( halfCnt >= 60 ) {
            socketSrc.onHeartSupply(io);
            log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
            halfCnt = 0;
        }
        socketSrc.onTimeInteval(io);
    }, 30 * 1000);// 

    process.on('SIGTERM', shutDown);
    process.on('SIGINT', shutDown);


    server.on('connection', connection => {
        connections.push(connection);
        connection.on('close', () => connections = connections.filter(curr => curr !== connection));
    });

});

function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
    clearInterval(number);
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}