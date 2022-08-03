
const PORT = 3000;
const HOSTNAME = "localhost";

const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const bodyparser = require('body-parser');

const indexRouter = require('./routes/indexRouter');

const app = express();
const io = socketio();

const chatRoomNsp = io.of('/chat/:name');//creating our socket namespace

const chatRoom = require('./chatRoom');//we load the chatRoom module and then
chatRoom.start_chat_room(chatRoomNsp);    //pass our io to the module's constructor function

app.set('view engine','pug');
app.set('views','./views');//setting up our view engine

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));// for parsing req.body in post requests

app.use('/',indexRouter);

app.get('/chat/:name',(req,res)=>{
	console.log(req.params);
	res.render('layout',{title:"Chat App"});
});

const serverInstance = app.listen(PORT,HOSTNAME,(req,res)=>{
	console.log(`{*}Server is running on ${HOSTNAME} at ${PORT}`);
});

io.attach(serverInstance);//attaching our io object to the server instance