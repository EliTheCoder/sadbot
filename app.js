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
const admin = require('firebase-admin');

const serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sadbois-01.firebaseio.com'
});

const db = admin.firestore();

const defaultData = {
  sadness: 100
}

const token = JSON.parse(fs.readFileSync('tokenconfig.json')).token;
console.log(token);

const client = new Discord.Client();
client.login(token);

let prefix = "--"
let errormsg = "oopsie poopsie there wuz and error pweez contact <@470935011722395651>"

const config = {
  apiKey: "AIzaSyBTJNnGuQsM_HIvi_SS3_-YwEU4NNW-iXU",
  authDomain: "sadbois-01.firebaseapp.com",
  databaseURL: "https://sadbois-01.firebaseio.com",
  storageBucket: "sadbois-01.appspot.com"
};
firebase.initializeApp(config);

client.on("message", msg => {
  commands.forEach((cmd) => {
    if (msg.content.startsWith(prefix)) {
      if (msg.content.substring(prefix.length, msg.content.length) === cmd.name && !msg.content.includes(" ")) {
        msg.reply(""+cmd.run());
      }
      if (msg.content.substring(prefix.length, msg.content.indexOf(" ")) === cmd.name && msg.content.includes(" ")) {
        msg.reply(""+cmd.run(msg.content.split(" ")));
      }
    }
  });
});

const commands = [
  {
    name: "register",
    run: (args) => {
      let rtrn = "gj, u created an account";
      firebase.auth().createUserWithEmailAndPassword(args[1], args[2]).catch((err) => {console.log(err); return err.message})
      return rtrn;
    }
  },
  {
    name: "ping",
    run: () => {
      return "pong boi " + client.ping + "ms";
    }
  },
  {
    name: "pong",
    run: () => {
      return "ping boi " + client.ping + "ms";
    }
  },
  {
    name: "help",
    run: () => {
      return "here r da commands:\nregister registers an account\nping pings\npong pongs";
    }
  }
];
