const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('day3/input');
    
    const file = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    let priorities = 0;
    let groupTotal = 0;
    let groupRudsacks = new Array();
    for await (const line of file) {
        groupRudsacks.push(line);
        groupTotal++;

        if (groupTotal % 3 === 0) {
            const commonItem = groupRudsacks[0].split('').filter((element: string) => {
                return groupRudsacks[1].split('').includes(element) && groupRudsacks[2].split('').includes(element);
            })[0];
            const isCapital = commonItem === commonItem.toUpperCase();
            priorities += commonItem.charCodeAt(0) - (isCapital ? 38: 96);
            groupRudsacks = new Array();
        }        
    }
    console.log("Total des priorités: " + priorities);
    
}

processLineByLine();
