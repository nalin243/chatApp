// const socket = io.connect('http://localhost:3000',{reconnect:true});

const socket = io('/chat/:name');
const time = new Date();

const username = (window.location.pathname).split(':')[1];
socket.emit("username",username);

socket.on("room-disconnect-message",(data)=>{
  document.querySelector("#messageContainer").innerHTML += `
                <div class="justify-content-center media media-chat">
                  <div class="media-body">
                  <p><strong><em>${data}</em></strong></p>
                  </div>
                </div>`;
});

socket.on("message",(data)=>{
  document.querySelector("#myMessage").innerText = data;
  console.log(data);
});

socket.on("server-message",(data)=>{
  document.querySelector("#messageContainer").innerHTML += `
                <div class="justify-content-center media media-chat">
                  <div class="media-body">
                  <p><strong><em>${data}</em></strong></p>
                  </div>
                </div>`;


});

socket.on("client-message-from-server",(data)=>{
 
   document.querySelector("#messageContainer").innerHTML += `  
                  <div class="media media-chat">
                  <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">
                  <div class="media-body">
                  <p>${data[0]}</p>
                  <p class="meta"><time>${time.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute:'2-digit' })}</time></p>
                  </div>
                </div>`;
});

//socket emit stuff
document.querySelector(".publisher-input").addEventListener("keydown",(event)=>{
  if(event.key == "Enter"){
    const message = document.querySelector(".publisher-input").value;
    console.log(document.querySelector(".publisher-input").value);
    document.querySelector("#messageContainer").innerHTML += `  <div class="media media-chat media-chat-reverse">
                    <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">
                    <div class="media-body">
                    <p>${message}</p>
                    <p class="meta"><time>${time.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute:'2-digit'})}</time></p>
                    </div>
                  </div>`;
    document.querySelector(".publisher-input").value = "";
    
    socket.emit("client-message",message);
  }
});

console.log(socket.disconnect);

