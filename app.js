/*
sadbot: a Discord game bot about depression
Copyright (C) 2018 Eli Frigo

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/


const Discord = require("discord.js");
const fs = require("fs");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const Firestore = require("@google-cloud/firestore");

const serviceAccount = require('./keys/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sadbois-01.firebaseio.com'
});

const db = admin.firestore();

const firestore = new Firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

const token = JSON.parse(fs.readFileSync('tokenconfig.json')).token;
console.log(token);

const client = new Discord.Client();
client.login(token);

let prefix = "--"
let errormsg = "oopsie poopsie there wuz and error pweez contact <@470935011722395651>"

// const config = {
//   apiKey: "AIzaSyBTJNnGuQsM_HIvi_SS3_-YwEU4NNW-iXU",
//   authDomain: "sadbois-01.firebaseapp.com",
//   databaseURL: "https://sadbois-01.firebaseio.com",
//   storageBucket: "sadbois-01.appspot.com"
// };
// firebase.initializeApp(config);

client.on("message", msg => {
  commands.forEach((cmd) => {
    if (msg.content.startsWith(prefix)) {
      if (msg.content.substring(prefix.length, msg.content.length) === cmd.name && !msg.content.includes(" ")) {
        msg.reply(""+cmd.run(msg));
      }
      if (msg.content.substring(prefix.length, msg.content.indexOf(" ")) === cmd.name && msg.content.includes(" ")) {
        msg.reply(""+cmd.run(msg.content.split(" "), msg));
      }
    }
  });
});

const commands = [
  {
    name: "register",
    run: (msg) => {
      db.collection("users").doc(""+msg.author.id).set({id: msg.author.id, name: msg.author.username, sadness: 100});
      return "u created an account buddy, gj";
    }
  },
  {
    name: "ping",
    run: () => {
      return "pong boi " + Math.round(client.ping*1000000) + " nanoseconds aka " + Math.round(client.ping) + "ms";
    }
  },
  {
    name: "pong",
    run: () => {
      return "ping boi " + Math.round(client.ping*1000000) + " nanoseconds aka " + Math.round(client.ping) + "ms";
    }
  },
  {
    name: "help",
    run: () => {
      return "here r da commands:\n" +
      "register: registers an account\n" +
      "ping: pongs\n" +
      "pong: pings";
    }
  }
];
