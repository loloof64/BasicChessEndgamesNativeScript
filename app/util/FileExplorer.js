const fileSystemModule = require("tns-core-modules/file-system");
const platformModule = require("tns-core-modules/platform");

import { localize } from "nativescript-localize";

export default class FileExplorer {
    constructor() {
        this.explorerItems = [];
        const currentAppFolder = fileSystemModule.knownFolders.currentApp();
        const rootFolder = currentAppFolder.getFolder('personnal_constraints');
        this.personalScriptsRootFolder = rootFolder
        this.currentFolder = rootFolder;
    }

    async getItems() {
        let explorerItems = [];
        const entities = await this.personalScriptsRootFolder.getEntities();
        entities.forEach(entity => {
            const isAFolder = fileSystemModule.Folder.exists(entity.path);
            const name = entity.name;
            const path = entity.path;
            if (isAFolder) {
                explorerItems.push({
                    name, path,
                    folder: true,
                });
            }
            else if (name.endsWith('.cst')) {
                explorerItems.push({
                    name, path,
                    folder: false,
                })
            }
        });
        return explorerItems.sort((fst, snd) => {
            if (fst.folder !== snd.folder) {
                return fst.folder ? -1 : 1;
            }
            return fst.name.localeCompare(snd.name, this._getLocale(), {sentitivity: "base"});
        });
    }

    addFolder(folderName) {
        const newFolder = this.currentFolder.getFolder(folderName);
        ///////////////////////////////////////
        console.log('newFolder', newFolder);
        ///////////////////////////////////////
        return newFolder;
    }

    /*
    https://stackoverflow.com/a/48758960/662618
    */
    _getLocale() {
        let lang;  
        if (platformModule.isAndroid) {
          lang = java.util.Locale.getDefault().getLanguage();
        }
        if (platformModule.isIOS) {
          lang = NSLocale.preferredLanguages.firstObject;
        } else {
          platformModule.device.language;
        }

        return lang;
    }

    goToSubFolder(folderName) {
        const folderPath = fileSystemModule.path.join(this.currentFolder.path, folderName);
        const folder = fileSystemModule.Folder.fromPath(folderPath);
        const isAnExistingFolder = fileSystemModule.Folder.exists(folder);

        if (isAnExistingFolder) {
            this.currentFolder = folder;
        }
    }

    goUpLevel() {
        if (this.currentFolder === this.personalScriptsRootFolder) return;
        this.currentFolder = this.currentFolder.parent;
    }

    getShortenedPath() {
        const path = this.currentFolder.path;
        return path.replace(this.personalScriptsRootFolder.path, localize('custom_scripts_root'))
    }
}