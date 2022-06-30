function addUser(){
    username = document.getElementById("username").value;
    localStorage.setItem("username",username);
    window.location = "WebchatHome.html"
}