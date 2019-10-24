export default class ConstraintScriptLoader {

    constructor() {
        this.currentScriptType = undefined;
        this.result = {};
    }

    async loadSampleScript(scriptFilePath) {
        this.currentScriptType = undefined;
        this.result = {};

        const fileSystemModule = require("tns-core-modules/file-system");
        const currentAppFolder = fileSystemModule.knownFolders.currentApp();

        const path = fileSystemModule.path.join(currentAppFolder.path, 'sample_constraints', scriptFilePath);
        const file = fileSystemModule.File.fromPath(path);

        try {
            const input = await file.readText();
            return this._processInputScript(input);
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }

    _processInputScript(inputScriptString) {
        this.result = {};
        const lines = inputScriptString.split(/\r?\n/);
        lines.forEach(line => {
            const headerType = this._getHeaderType(line);
            const isAnHeaderLine = [
                'playerKingConstraint', 
                'computerKingConstraint',
                'otherPiecesCount',
            ].includes(headerType);

            if (isAnHeaderLine) {
                this.currentScriptType = headerType;
                this._addEntryForCurrentScriptType();
            }
            else {
                this._addLineToCurrentScript(line);
            }
        });

        return Object.entries(this.result).reduce(
            (accumData, currData) => {
                const headerType = currData[0];
                const value = currData[1];

                if (headerType === 'otherPiecesCount') {
                    accumData[headerType] = value;
                }
                else {
                    accumData[headerType] = value.join('\n');
                }

                return accumData;
            }, {});
    }

    _getHeaderType(line) {
        if (line.startsWith('#')) {
            const header = line.split(" ").splice(1).join(" ");
            switch(header) {
                case 'Player king constraint': return 'playerKingConstraint';
                case 'Computer king constraint': return 'computerKingConstraint';
                case 'Other pieces count': return 'otherPiecesCount';
                default: return null;
            }
        }
        return null;
    }

    _addEntryForCurrentScriptType() {
        this.result[this.currentScriptType] = [];
    }

    _addLineToCurrentScript(line) {
        const emptyLine = line.length === 0;
        if (emptyLine) return;
        if (this.currentScriptType !== 'otherPiecesCount')  this.result[this.currentScriptType].push(line);
        else {
            const lineParts = line.split(" ");
            const ownerSide = lineParts[0];
            const pieceType = lineParts[1];
            const pieceCount = parseInt(lineParts[2]);

            this.result[this.currentScriptType].push({pieceType, pieceCount, ownerSide});
        }
    }
}