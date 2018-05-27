const rp = require("request-promise");
var request = require('request');
const cheerio = require("cheerio");
const Table = require("cli-table");

var options = {
	url: 'https://forum.freecodecamp.org/directory_items?period=weekly&order=likes_received&_=1527325274242',
	json: true
}
var users = [];
let user = { "userName": "", "name": "", "receivedLikes": 0, "givenLikes": 0 };

rp(options)
	.then((data) => {
		for (let user of data.directory_items) {
			users.push({ "userName": `${user.user.username}`, "name": `${user.user.name}`, "receivedLikes": `${user.likes_received}`, "givenLikes": `${user.likes_given}` })
		}
		formatData();
	})
	.catch(error => {
		console.log('xxxxxxx'+error)
	});

function formatData() {
	const table = new Table({
		head: ['User Name', 'Received Likes', 'Given Likes']
		, colWidths: [30, 10, 10]
	});
	for (let user of users) {
		table.push([(user.name == "") ? user.userName : user.name, user.receivedLikes, user.givenLikes]);
	}
	scrapeData()
	console.log(table.toString());
}

function scrapeData() {
	var user = users[0];
	console.log(user.userName+'111');
	/*for (let user of users) {
		options = {
			url: `https://forum.freecodecamp.org/u/${user.userName}`,
			transform: body => cheerio.load(body)
		}
		rp(options).then(function ($) {
			console.log('user.userName');
            console.log($("div .primary-textual .username span").text())
		})
		//table.push([(user.name == "") ? user.userName : user.name, user.receivedLikes, user.givenLikes]);
	//}*/
	console.log(`https://forum.freecodecamp.org/u/${user.userName}`);
	request(`https://forum.freecodecamp.org/u/${user.userName}`, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    console.log($(".d-header").html());
    }
  
});

}

