const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('day6/input');
    
    const file = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    for await (const line of file) {
        const characters = line.split('');
        const startOfPacket = new Array();
        characters.forEach((element: string, index: number) => {
            startOfPacket.push(element);
            if (startOfPacket.length === 14) {                
                if ((new Set(startOfPacket)).size === startOfPacket.length) {
                    console.log(index+1);
                    return;                    
                }
                startOfPacket.shift();
            }
        });
    }
    
}

processLineByLine();
