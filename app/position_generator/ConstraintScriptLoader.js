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
        this.result = {
            playerKingConstraint: [],
            computerKingConstraint: [],
            otherPiecesCount: [],
            otherPieceMutualConstraint: {},
        };
        const lines = inputScriptString.split(/\r?\n/);
        lines.forEach(line => {
            const headerType = this._getHeaderType(line);
            const pieceTypeSpecification = this._getPieceTypeSpecification(line);

            const isAnHeaderLine = [
                'playerKingConstraint', 
                'computerKingConstraint',
                'otherPiecesCount',
                'otherPieceMutualConstraint',
            ].includes(headerType);
            const isAPieceTypeSpecification = 
            pieceTypeSpecification !== undefined && [
                'P', 'N', 'B', 'R', 'Q', 'K'
            ].includes(pieceTypeSpecification.type);

            if (isAnHeaderLine) {
                this.currentScriptType = headerType;
            }
            else if (isAPieceTypeSpecification) {
                this.pieceTypeSpecification = pieceTypeSpecification;
                this.result[this.currentScriptType][this._buildSpecificationKey(this.pieceTypeSpecification)] = [];
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
                else if (['otherPieceMutualConstraint'].includes(headerType)) {
                    const allScripts = Object.entries(value).reduce(
                        (tempAccumData, tempCurrData) => {
                            const pieceType = tempCurrData[0];
                            const pieceScriptLines = tempCurrData[1];

                            const joinedScript = pieceScriptLines.join('\n');
                            tempAccumData[pieceType] = joinedScript.length > 0 ? joinedScript : undefined;
                            return tempAccumData;
                        }
                    , {});
                    accumData[headerType] = allScripts;
                }
                else {
                    const joinedScript = value.join('\n');
                    accumData[headerType] = joinedScript.length > 0 ? joinedScript : undefined;
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
                case 'Other piece mutual constraint': return 'otherPieceMutualConstraint';
                default: return null;
            }
        }
        return null;
    }

    _getPieceTypeSpecification(line) {
        if (! line.startsWith('#')) return undefined;
        const parts = line.split(" ");

        if (parts.length < 3) return undefined;

        try {
            const type = parts[1];
            const ownerSide = parts[2];
            return {type, ownerSide};
        }
        catch {
            return undefined;
        }
    }

    _addLineToCurrentScript(line) {
        const emptyLine = line.length === 0;
        if (emptyLine) return;
        if (this.currentScriptType === 'otherPiecesCount') {
            const lineParts = line.split(" ");
            const ownerSide = lineParts[0];
            const pieceType = lineParts[1];
            const pieceCount = parseInt(lineParts[2]);
            
            this.result[this.currentScriptType].push({pieceType, pieceCount, ownerSide});
        }
        else if (['otherPieceMutualConstraint'].includes(this.currentScriptType)) {
            this.result[this.currentScriptType][this._buildSpecificationKey(this.pieceTypeSpecification)].push(line);
        }
        else this.result[this.currentScriptType].push(line);
    }

    _buildSpecificationKey(typeSpecification) {
        return `${typeSpecification.type}${typeSpecification.ownerSide}`;
    }
}