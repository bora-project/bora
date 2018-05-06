var messageParams = {};

function getToday() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd < 10) {
		dd = '0' + dd
	} 

	if(mm < 10) {
		mm = '0' + mm
	} 

	today = dd + '/' + mm + '/' + yyyy;

	return today;
};

function getTime() {
	var now = new Date();
	var hh = now.getHours();
	var mm = now.getMinutes();

	now = hh + ':' + mm;

	return now;
};

messageParams.parse = function(inputMsg) {
	var msg = inputMsg.split(" ");
	var commandIndex = 0;
	if (msg[0].toLowerCase() == "bora" || msg[0].toLowerCase() == "@bora")
		commandIndex = 1;

	var params = {
					"action": msg[commandIndex],
					"date": getToday(),
					"time": getTime(),
					"txt": ""
				};

	var timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3])(?:(?:h|:)([0-5][0-9])?)?$/;
	var dateRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-9]|3[0-1])(?:\/|\-|\.)([0-9]|0[0-9]|1[0-2])(?:(?:\/|\-|\.)(\d\d(?:\d\d)?)?)?$/;

	for (var i = msg.length - 1; i > commandIndex; i--) {
		// se o parametro bater a regex de hora
		if (timeRegex.test(msg[i])) {
			var timeArray = timeRegex.exec(msg[i]);

			if (timeArray[2] === undefined) {
				params["time"] = String(timeArray[1]) + ":00";
			}
			else {
				params["time"] = String(timeArray[1]) + ":" + String(timeArray[2]);
			}
		}
		// se o parametro bater a regex de data
		else if (dateRegex.test(msg[i])) {
			var dt = dateRegex.exec(msg[i]);
			var day = dt[1];
			var month = dt[2];
			var year = dt[3];

			if (year === undefined)
				year = getToday().substring(6);
			if (year.length == 2)
				year = "20" + year;

			if (day.length == 1)
				day = "0" + day;

			if (month.length == 1)
				month = "0" + month;

			params["date"] = day + '/' + month + '/' + year;
		}
		// se nao der match em data nem horario
		else {
			if (msg[i].toLowerCase() != "bora" && msg[i].toLowerCase() != "@bora"){
				if (params["txt"] != ""){
					params["txt"] = msg[i] + " " + params["txt"];
				}
				else {
					params["txt"] = msg[i];
				}
			}
		}
	}

	return params;
};

module.exports = messageParams;
