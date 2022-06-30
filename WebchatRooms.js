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
//FIREBASE LINKS

room_name = localStorage.getItem("roomname");
user_name = localStorage.getItem("username");

function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("RoomName");
    window.location = "index.html";
}

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        likes:0
    });
    document.getElementById("msg").value = "";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;

    console.log(firebase_message_id);
    console.log(message_data);
    name = message_data['name'];
    message = message_data['message'];
    like = message_data['like'];
    name_with_tag = "<h4>"+name+"<img class='user_tick' src='tick.png'><h4/>";
    message_with_tag = "<h4 class='message_h4'>"+message+"</h4>";
    like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatelike(this.id)'>";
    span_with_tag = "<span class'glyphicon glyphicon-thumbs-up>Like:"+like+"</span></button><hr>";
    row = name_with_tag + message_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;

} });  }); }
getData();
function updatelike(message_id){
    console.log("click detected on like button - "+message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updatedlikes = Number(likes) + 1;
    console.log(updatedlikes);

    firebase.database().ref(room_name).child(message_id).update({
        like : updatedlikes
    });
}
function title(){
    document.getElementById("title").innerHTML = "WebChat Room: #" + room_name;
}
title();