const URL = "https://wind-bow.glitch.me/twitch-api/streams/";
const USERARR = ["ESL_SC2","comster404", "ShoutFactoryTV","OgamingSC2", "cretetion", "freecodecamp", "habathcx","dreamhackhs", "brunofin", "GamesDoneQuick"];
const USERS_URL = "https://wind-bow.glitch.me/twitch-api/users/";
const main = document.querySelector('.main');


document.addEventListener("DOMContentLoaded",function(){
  document.querySelector(".filter-all").addEventListener("click",showAll);
  document.querySelector(".filter-online").addEventListener("click",showOnline);
  document.querySelector(".filter-offline").addEventListener("click",showOffline);
  //loops through the list of users
  USERARR.forEach((user)=>{
    getInfo(user);
  });
});

//Main function that accepts a user as input and calls apis
function getInfo(user){
  fetch(URL+user)
  .then(handleErrors)
  .then(response => {return response.json(); })
  .then( data => {
    addStream(user, data);
  })
  .then(function(){
  fetch(USERS_URL+user)
  .then(handleErrors)
    .then(response => {  return response.json();  })
    .then( data => {
      parseUser(data, user);
    });
  })
  .catch(error => alert(error));
}

var showOnline = () =>{
  var offline = document.querySelectorAll('.offline , .unavailable');
  var online = document.querySelectorAll('.online')
  for (var i=0; i<offline.length; i++){
    offline[i].style.display = "none";
  }
  for (var j=0; j<online.length; j++){
    online[j].style.display = "";
  }
}

var showAll = () => {
  var all = document.querySelectorAll('.streamer');
  for (var i=0; i<all.length; i++){
    all[i].style.display = "";
  }
}

var showOffline = () => {
  var offline = document.querySelectorAll('.offline');
  var online = document.querySelectorAll('.online, .unavailable')
  for (var i=0; i<offline.length; i++){
    offline[i].style.display = "";
  }
  for (var j=0; j<online.length; j++){
    online[j].style.display = "none";
  }
}



//parses user data to see if user exists, edit to DOM
function parseUser(data, user){
  var u = document.getElementById(user)
  if (data.error){
    u.classList.remove("offline")
    u.className += " unavailable";
    u.innerHTML = "<p>" + user + "</p><p> Account Not Found</p>"
  }
  else{
    image = document.createElement("img");
    image.setAttribute("src",data.logo);
    u.insertBefore(image,u.childNodes[0]);
  }
}

//handles error in case of no HTTP response
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

//given a user and its data, appends to the DOM
function addStream(user, data){
  var streamer = document.createElement("div");
  streamer.id = user;
  streamer.className = "streamer "
  var a = document.createElement("a");
  var linkText = document.createTextNode(user);
  a.setAttribute('href', "https://www.twitch.tv/" + user);
  a.innerHTML= '<i class="fa fa-twitch" aria-hidden="true"></i> '
  a.appendChild(linkText);
  //check if user is streaming
  if (!data.stream){
    streamer.className += "offline";
    streamer.innerHTML= "<p>User offline </p>";
  }
  else{
    streamer.className += "online";
    streamer.innerHTML= "<p>Streaming: " + data.stream.game +"</p>";
  }
  streamer.insertBefore(a,streamer.childNodes[0]);
  main.appendChild(streamer);
}
