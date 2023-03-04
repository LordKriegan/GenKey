#!/usr/bin/env node
import clipboard from 'clipboardy';

//function copied from https://codepen.io/corenominal/pen/rxOmMJ original author is Philip Newborough
const generateUUID = () => {
	var d = new Date().getTime();
	
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) 	{
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});

    return uuid;
}

const copyToClipboard = (apiKey) => {
    clipboard.writeSync(apiKey)
}

const showVersion = () => {
    console.log("GenKey v1.1.2");
    console.log("Author: Qamar Abbas Stationwala");
    process.exit(0) //only want to show version information, so exiting program early
}

const args = process.argv.slice(2)
const newApiKey = generateUUID()

args.forEach(arg => {
    switch (arg) {
        case "-c":
        case "--copy":
            copyToClipboard(newApiKey)
            break;
        case "-v":
        case "--version":
            showVersion();
            break;
        default:
            console.log(arg + ' is not a recognized command; skipping.')
    }
})



console.log("------------------------------------------")
console.log("|  " + newApiKey + "  |")
console.log("------------------------------------------")
