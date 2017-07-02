const url = "https://wind-bow.glitch.me/twitch-api/streams/";
const userArr = ["ESL_SC2","comster404", "ShoutFactoryTV","OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","dreamhackhs", "brunofin"];
const users_url = "https://wind-bow.glitch.me/twitch-api/users/"
const main = document.querySelector('.main');



document.addEventListener("DOMContentLoaded",function(event){
  userArr.forEach(function(user){
    fetch(url+user)
    .then(handleErrors)
    .then(response => {return response.json(); })
    .then( data => {
      addStream(user, data);
    })
    .then(function(){
    fetch(users_url+user)
    .then(handleErrors)
      .then(response => {  return response.json();  })
      .then( data => {
        if (data.error){
          var u = document.getElementById(user)
          u.classList.remove("offline")
          u.className += " unavailable";
          u.innerHTML = "<p>" + user + " 404'd, account not found</p>"
        }
      });
    })
    .catch(error => alert(error));
  });
});


function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function addStream(user, data){
  var streamer = document.createElement("div");
  streamer.id = user;
  var a = document.createElement("a");
  var linkText = document.createTextNode(user);
  a.setAttribute('href', "https://www.twitch.tv/" + user);
  a.appendChild(linkText);
  if (!data.stream){
    streamer.className += "offline";
    streamer.innerHTML= "<p>" + user + " offline </p>";
  }
  else{
    streamer.className += "online";
    streamer.innerHTML= "<p>" +user + " online <br>Streaming:" + data.stream.game +"</p>";
  }
  streamer.appendChild(a);
  main.appendChild(streamer);
}