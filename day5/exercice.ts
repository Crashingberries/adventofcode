const fs = require('fs');
const readline = require('readline');

interface Section {
    lower: number,
    higher: number
}
const dock = {
    '1' : new Array(),
    '2' : new Array(),
    '3' : new Array(),
    '4' : new Array(),
    '5' : new Array(),
    '6' : new Array(),
    '7' : new Array(),
    '8' : new Array(),
    '9' : new Array(),
};
async function processLineByLine() {
    const fileStream = fs.createReadStream('day5/input');
    
    const file = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    let reversed = false;
    for await (const line of file) {
        if (line.charAt(0) !== '') {
            if (line.charAt(0) === 'm') {
                moveContainer(line);
            } else {
                buildDock(line);
            }
        }
    }
    let message = '';
    Object.values(dock).forEach(element => {
        message += element.shift();
    });
    console.log(message);
}

function buildDock(line: string) {
    const containers = line.match(/.{1,4}/g) ?? new Array();
    
    containers.forEach((element, index) => {
        if (element.charAt(0) === '[') {
            const parsedIndex = (index+1).toString();
            dock[parsedIndex as keyof typeof dock].push(element.charAt(1));
        }
    });
}

function moveContainer(line: string) {
    const elements = line.split(' ');
    const removed = dock[elements[3] as keyof typeof dock].splice(0,parseInt(elements[1]));
    removed.reverse().forEach(element => {
        dock[elements[5] as keyof typeof dock].unshift(element);
    });
}
processLineByLine();
