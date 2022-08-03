
const users = new Map();

exports.start_chat_room = function(chatRoomNsp){
	chatRoomNsp.on("connection",(socket)=>{

		const id = socket.id;//just store this id and use it for disconnect message later

		socket.join("public-chat-room")

		socket.on("disconnect",()=>{
			console.log(`User ${users.get(id)} disconnected`);
			socket.to("public-chat-room").emit("room-disconnect-message",`User ${users.get(id)} disconnected`);
		});

		socket.on("username",(username)=>{

			users.set(socket.id,username);
			console.log(users);
	
			socket.to("public-chat-room").emit("server-message",`User ${users.get(socket.id)} just joined!`);
		});

		socket.on("client-message",(data)=>{
			socket.to("public-chat-room").emit("client-message-from-server",[data,users]);
		});
	});
};