import Folder from "./folder";

const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('day7/input');
    
    const file = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    const position = new Array();
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    for await (const line of file) {
        const command = line.split(' ');
        if (command[0] === '$') {
          if (command[1] === 'cd') {
            if (command[2] === '..') {
              position.pop();
            } else if (position.length !== 0) {
              const folder = position.pop();
              position.push(folder, folder.getSubfolderByName(command[2]));
            } else  {
              position.push(new Folder(command[2]));
            }
          }
        } else if (command[0] === 'dir') {
          const folder = position.pop();
          folder.folders.push(new Folder(command[1]));
          position.push(folder);
        } else {
          const folder = position.pop();
          folder.files.push({
            size: parseInt(command[0]),
            name: command[1]
          });
          position.push(folder);
        }
    }
    const root = position.shift();
    let total = getSize(root);
    console.log(findBestDeleteCandidate(root, -(70000000 - root.size() - 30000000))?.size());
    

}
function prettyPrint(folder: Folder, space = 0): void {
  console.log((space > 0 ? ' '.repeat(space) : '') + '=> ' + folder.name + ' (' + folder.size() + ')');
  folder.files.forEach(file => {
    console.log(' '.repeat(space + 2) + '- ' + file.name + '('+ file.size +')');
  });
  folder.folders.forEach(folder => {
    prettyPrint(folder, space + 2);
  });
}
function getSize(folder: Folder, maxSize = 100000): number {
  let size = 0;
  let folderSize = folder.size();
  if (folderSize <= maxSize) {
    size += folderSize;
  }
  folder.folders.forEach(element => {
    size += getSize(element);
  });
  return size;
}

function findBestDeleteCandidate(folder: Folder, required: number): Folder|undefined {
  let choice: Folder|undefined;
  if (folder.size() >= required) {
    choice = folder;
  }
  folder.folders.forEach(element => {
    const candidate = findBestDeleteCandidate(element, required);
    if (typeof candidate !== 'undefined') {
      if (
        typeof choice === 'undefined' ||
        candidate.size() < choice.size()
        ) {
        choice = candidate;
      }
    }
  });
  return choice;
}
processLineByLine();
