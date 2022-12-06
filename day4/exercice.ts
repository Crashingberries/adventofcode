const fs = require('fs');
const readline = require('readline');

interface Section {
    lower: number,
    higher: number
}

async function processLineByLine() {
    const fileStream = fs.createReadStream('day4/input');
    
    const file = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    let overlap = 0;
    for await (const line of file) {
        const sections = line.split(',');
        const firstSection = SectionFactory(sections[0]);
        const secondSection = SectionFactory(sections[1]);
        if (
            secondSection.lower <= firstSection.higher &&
            secondSection.higher >= firstSection.lower
        ) {
            overlap++;
        }
    }
    console.log("Nombre de overlap: " + overlap);
    
}


function SectionFactory(sections: string): Section {
    const sectionLimits = sections.split('-');
    return {
        lower: parseInt(sectionLimits[0]),
        higher: parseInt(sectionLimits[1])
    };
}
processLineByLine();
