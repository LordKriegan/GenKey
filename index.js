#!/usr/bin/env node --no-warnings
import { spawn } from 'child_process';
import pkg from './package.json' assert { "type": "json" }

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

let copyClipBoardCalled = false;
const copyToClipboard = (apiKey) => {
    if (copyClipBoardCalled) return;
    spawn('clip').stdin.end(apiKey)
    copyClipBoardCalled = true
}

let showVersionCalled = false;
const showVersion = () => {
    if (showVersionCalled) return;
    console.log(`GenKey v${pkg.version}`);
    console.log("Author: Qamar Abbas Stationwala");
    exitEarly = true;
    showVersionCalled = true;
}

let showHelpCalled = false;
const showHelp = () => {
    if (showHelpCalled) return;
    console.log("     Usage: <genkey OR keygen> [flags]\n")
    console.log("     Options:")
    console.log("          -c, --copy".padEnd(30) + "copy key to clipboard")
    console.log("          -v, --version".padEnd(30) + "shows version information")
    console.log("          -h, --help".padEnd(30) + "show all available options\n\n")
    exitEarly = true;
    showHelpCalled = true;
}

const args = process.argv.slice(2)
const newApiKey = generateUUID()
let exitEarly = false;

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
        case "-h":
        case "--help":
            showHelp();
            break;
        default:
            console.log(arg + ' is not a recognized command; skipping.')
    }
})

if (exitEarly) {
    process.exit(0) //only want to show version information, so exiting program early
}

console.log("------------------------------------------")
console.log("|  " + newApiKey + "  |")
console.log("------------------------------------------")
