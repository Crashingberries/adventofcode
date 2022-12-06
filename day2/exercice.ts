const fs = require('fs');
const readline = require('readline');

interface Sign {
    letter: string,
    point: number,
    beats: string
    beatedBy: string
}

interface Result {
    letter: string,
    point: number
}

async function processLineByLine() {
    const fileStream = fs.createReadStream('day2/input');
    
    const file = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    let score = 0;
    for await (const line of file) {
        let choices = line.split(' ');
        score += findResult(choices[1], findSign(choices[0]));
    }
    console.log('Score Final:' + score);
}

function findSign(letter: string): Sign{
    const rock = {
        letter: 'A',
        point: 1,
        beats: 'C',
        beatedBy: 'B'
    };
    const paper = {
        letter: 'B',
        point: 2,
        beats: 'A',
        beatedBy: 'C'
    };
    const scissors = {
        letter: 'C',
        point: 3,
        beats: 'B',
        beatedBy: 'A'
    };
    if (rock.letter === letter) {
        return rock;
    }
    if (paper.letter === letter) {
        return paper;
    }
    return scissors;
}

function findResult(letter:string, opponentSign: Sign): number {
    const result = {
        lost: {
            letter: 'X',
            point: 0
        },
        draw: {
            letter: 'Y',
            point: 3
        },
        win: {
            letter: 'Z',
            point: 6
        }
    }
    if (letter === result.lost.letter) {
        let sing = findSign(opponentSign.beats);
        return sing.point + result.lost.point;
    }
    if (letter === result.draw.letter) {
        return result.draw.point + opponentSign.point;
    }
    let sign = findSign(opponentSign.beatedBy);
    console.log('opponent:' + opponentSign.letter + '. You: ' + sign.letter);
    
    return result.win.point + sign.point;
}
  
processLineByLine();