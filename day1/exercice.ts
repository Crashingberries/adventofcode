const readline = require('readline');
const fs = require('fs');

interface Elf {
    position: number;
    calories: number;
}

async function processLineByLine() {
    const fileStream = fs.createReadStream('input');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    const allElves = [];
    let position = 1;
    let calories = 0;
    for await (const line of rl) {
        if (line.length == 0) {
            allElves.push({
                position,
                calories
            });
            calories = 0;
            position++;
        } else {
            calories += parseInt(line);
        }        
    }
    allElves.sort((a: Elf,b: Elf) => {
        if (a.calories > b.calories) {
            return -1;
        } 
        if (a.calories === b.calories) {
            return 0;
        }
        return 1;
    });
    const top3 = allElves.slice(0, 3);
    let total = 0;
    top3.forEach(elf => {
        total+= elf.calories;
    });
    console.log(total);
    
  }
  processLineByLine();