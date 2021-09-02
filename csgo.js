const steam_user = require("steam-user");
const global = require("globaloffensive");
const readline = require("readline-sync");
const { argv } = require("process");
const chalk = require("chalk")
var client = new steam_user();
var csgo = new global(client);
let login = argv[2];
let password = argv[3];
client.logOn({
	"accountName": login,
	"password": password
});


client.on('loggedOn', function() {
	console.log("Logged into Steam");
	client.setPersona(steam_user.EPersonaState.Invisible);
	client.gamesPlayed(730);
});

client.on('error', function(a) {
	console.log(a);
});

client.on("steamGuard", function (domain, callback) {
        const code = readline.question( 'Enter Steam Guard ' + ((domain === null) ? 'from 2FA: ' : 'from mail (' + domain + '): '));
        callback(code);
    })
    csgo.on('debug', console.log);
    csgo.on("connectedToGC", function() {
        if ( csgo.haveGCSession ) {
            csgo.requestPlayersProfile(client.steamID.getSteamID64(), function(data) {
              console.log(chalk.green(JSON.stringify(data, null, 3)));
              process.exit();
            })
         }
    })



