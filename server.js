var credentials = {
        username: "",
        password: ""
    };

var twitch_ratelimit_interval = 30000;
var twitch_ratelimit_amount   = 20;
var messages = 0;

var tmi = require("tmi.js");

var options = {
    options: {
        debug: false
    },
    connection: {
        reconnect: true
    },
    identity: credentials,
    channels: ["#shigetora"]
};

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var client = new tmi.client(options);

var emotes = ["VoHiYo", "ResidentSleeper", "KKona", "4Head", "Kappa", "FeelsGoodMan", "FeelsBadMan", "FeelsAmazingMan", "PogChamp", ":)", ":D", ":/", "Kreygasm", "LUL", "WutFace", "DansGame", "HeyGuys"];



var i = 0;

client.connect();

client.on("chat", function (channel, userstate, message, self){
console.log(userstate["display-name"] + ": " + message);
        if (self) return;
        if(messages <= (twitch_ratelimit_amount - 5)){
                var output = "";
                if(message.toLowerCase().includes("respektive")){
                        output = userstate.username + " ";
                        var x = getRandomInt(0, emotes.length - 1);
                        output += emotes[x];
                }
                
                if(output){
                    if(i % 2 == 0) output += " ";
                    client.say("shigetora", output);
					i++;
                    messages++;
                }
        }
});

setInterval(function(){
        messages = 0;
}, twitch_ratelimit_interval);
