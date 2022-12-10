interface CustomFile {
    name: string
    size: number
}

class Folder {
    name: string
    files: Array<CustomFile>
    folders: Array<this>
    constructor(name: string, files = new Array(), folders = new Array()) {
        this.name = name;
        this.files = files;
        this.folders = folders;

    }

    size(): number {
        let size = 0;
        this.files.forEach(file => {
            size += file.size;
        });
        this.folders.forEach(folder => {
            size += folder.size();
        })
        return size;
    }
    
    getSubfolderByName(name: string): Folder {
        let subfolder = new Folder('unknown');
        this.folders.forEach(folder => {
            if (folder.name === name) {
                subfolder = folder;
                return;
            }
        });
        return subfolder;
    }
}

export default Folder;