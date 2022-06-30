const firebaseConfig = {
    apiKey: "AIzaSyDAG-Mq72qFU68ozPKEZdvmv_Fe3M4eThM",
    authDomain: "webchat-database.firebaseapp.com",
    databaseURL: "https://webchat-database-default-rtdb.firebaseio.com",
    projectId: "webchat-database",
    storageBucket: "webchat-database.appspot.com",
    messagingSenderId: "321090356994",
    appId: "1:321090356994:web:7d76e26b92c2465fcc641b"
  };
  
  firebase.initializeApp(firebaseConfig);
//Firebase database links

username = localStorage.getItem("username");
document.getElementById("welcome_tag").innerHTML = "Welcome " + username;
function addRoom(){
    roomname = document.getElementById("roomname").value;
    localStorage.setItem("roomname",roomname);
    firebase.database().ref("/").child(roomname).update({
        purpose:"creating room"
    });
    document.getElementById("roomname").value = "";
    window.location = "WebChatRooms.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
    Room_names = childKey;
   //Start code
   console.log("Room Names =" + Room_names)
   row = "<div id='"+Room_names+"' onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
   document.getElementById("output").innerHTML += row; 
   //End code
   });});}
getData();

function redirectToRoomName(name){
    localStorage.setItem("roomname",name);
    window.location = "WebChatRooms.html";
}

function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("RoomName");
    window.location = "index.html";
}