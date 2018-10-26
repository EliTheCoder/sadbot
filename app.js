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
const eliapi = require("./eliapi.js");

const admin = require("firebase-admin");
const serviceAccount = require('./keys/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const functions = require("firebase-functions");
const Firestore = require("@google-cloud/firestore");

const db = admin.firestore();
const dbSettings = {
  timestampsInSnapshots: true
};
db.settings(dbSettings);

const token = JSON.parse(fs.readFileSync('tokenconfig.json')).token;
eliapi.logMessage(4, `bot running with token: ${token}`);

const client = new Discord.Client();
client.login(token);

let prefix = "//"
let errormsg = "oopsie poopsie there wuz and error pweez contact <@470935011722395651>"

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(text) {
  if (text.trim() === 'quit') {
    done();
  }
  try {
    eliapi.logMessage(3, eval(text.trim()));
  } catch (err) {
    eliapi.logMessage(2, err.toString());
  }
});

function done() {
  console.log('Quiting..');
  process.exit();
}

client.on("message", msg => {
  eliapi.logMessage(4, `${msg.guild.name}: #${msg.channel.name}: <${msg.author.username}> ${msg.content}`)
  commands.forEach((cmd) => {
    if (msg.content.startsWith(prefix) && msg.author.id !== "503611493804277780") {
      if (msg.content.substring(prefix.length, msg.content.length) === cmd.name || msg.content.substring(prefix.length, msg.content.indexOf(" ")) === cmd.name) {
        cmd.run(msg, msg.content.split(" "));
      }
    }
  });
});

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

setInterval(() => {null}, 600000);

const commands = [{
    name: "register",
    run: (msg) => {
      db.collection("users").doc("" + msg.author.id).set({
        id: msg.author.id,
        name: msg.author.username,
        sadness: 100
      });
      msg.reply("u created an account buddy, gj");
    }
  },
  {
    name: "ping",
    run: (msg) => {
      msg.reply("pong boi " + Math.round(client.ping * 1000000) + " nanoseconds aka " + Math.round(client.ping) + "ms");
    }
  },
  {
    name: "pong",
    run: (msg) => {
      msg.reply("ping boi " + Math.round(client.ping * 1000000) + " nanoseconds aka " + Math.round(client.ping) + "ms");
    }
  },
  {
    name: "help",
    run: (msg) => {
      msg.reply("here r da commands:\n" +
        "register: registers an account\n" +
        "ping: pongs\n" +
        "pong: pings\n" +
        "error: shows the error message\n" +
        "sadness: shows ur sadness value");
    }
  },
  {
    name: "error",
    run: (msg) => {
      msg.reply("error message:\n" + errormsg);
    }
  },
  {
    name: "sadness",
    run: (msg) => {
      let userDoc = db.collection('users').doc(msg.author.id);
      let getDoc = userDoc.get()
        .then(doc => {
          if (!doc.exists) {
            msg.reply("do --register to register an account");
          } else {
            msg.reply("u have " + doc.data().sadness + "% sadness");
          }
        })
        .catch(err => {
          msg.reply(errormsg);
          console.log(err);
        });
    }
  },
  {
    name: "eval",
    run: (msg, args) => {
      if (msg.author.id === "470935011722395651") {
        args.splice(0, 1);
        let rtrn = "" + eval("" + args.join(" "));
        msg.reply(rtrn);
      }
    }
  },
  {
    name: "cry",
    run: (msg, args) => {
      let selection1 = choices[eliapi.random(0, choices.length-1)]
      let selection2 = choices[eliapi.random(0, choices.length-1)]
      let selection3 = choices[eliapi.random(0, choices.length-1)]
      msg.reply("why are you crying?\n a) " + selection1.desc + "\n b) " + selection2.desc + "\n c) " + selection3.desc + "");
    }
  },
  {
    name: "horny",
    run: (msg) => {
      msg.reply('"Yes daddy!" Caillou exclaimed as he unzipped daddies pants to reveal his bulging cock. He pulled a piece of 10 grit sandpaper oit of his pocket and began to rub small, precise circles around the tip of his throbbing cock. "Oh yeah, you use that sandpaper you fucking slut," Daddy whispered in Caillou\'s ear as he began to grind the sandpaper up and down his thick, hard cock. Up and down, up and down he ground. The foreskin eventually yielded to the rough paper, blood coating the shaft. Daddy moaned in pleasure, convulsing in both pain and ecstasy. Caillou, sensing the climax, quickly shoved the entirety of daddy\'s member down his slim throat, choking while trying not to laugh as his matted, uncut pubic hair tickled his face. Then, in an instant daddy came. Buckets of hot, greasy baby cream rushed through Caillou\'s throat and down into his belly. "Oh Daddy, I don\'t think I can hold all of it," Caillou said as his belly began to expand. Daddy, in the throes' + 'of orgas' + 'm, didn\'t care, and continued forcibly ejaculating down Caillou\'s throat. Caillou grew and grew, and then in an instant, his gut exploded in a mixture of blood, cum, and viscera. Daddy, still cumming, began to jerk off over Caillou\'s corpse, hot cum, splattering the gore. Then, as his flow began to subside, Daddy began to hungrily eat the pieces of Caillou\'s assorted guts and muscle. "OH YEAH," the Kool-Aid Man exclaimed as he burst through the wall and began to viciously rape Daddy in the ass, quickly cumming a mixture of water, Kool-Aid, and precum.')
    }
  }
];

let choices = [
  {desc: "u have no money for lunch", value: 30},
  {desc: "ur dad's drunk", value: 30},
  {desc: "ur parents are fighting", value: 40},
  {desc: "u fail to text your crush", value: 50},
  {desc: "u fail a test", value: 30},
  {desc: "ur friends leave you during an outing with them", value: 50},
  {desc: "ur grades suck", value: 40},
  {desc: "ur crush starts dating a random person", value: 40},
  {desc: "ur crush starts dating ur mortal enemy", value: 50}
];
