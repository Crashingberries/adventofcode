const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('day/input');
    
    const file = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    for await (const line of file) {
        
    }
    
}

processLineByLine();
