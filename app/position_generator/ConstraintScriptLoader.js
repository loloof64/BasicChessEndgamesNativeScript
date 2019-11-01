export default class ConstraintScriptLoader {

    constructor() {
        this.currentScriptType = undefined;
        this.result = {};
    }

    async loadSampleScript(scriptFilePath) {
        return this._loadScript(scriptFilePath, 'sample_constraints');
    }

    async loadCustomScript(scriptFilePath) {
        return this._loadScript(scriptFilePath);
    }

    // If baseFolderString defined, scriptFilePath will be consired a sub path of the baseFolderString.
    async _loadScript(scriptFilePath, baseFolderString) {
        this.currentScriptType = undefined;
        this.result = {};

        const fileSystemModule = require("tns-core-modules/file-system");
        const currentAppFolder = fileSystemModule.knownFolders.currentApp();

        const path = baseFolderString !== undefined ?
            fileSystemModule.path.join(currentAppFolder.path, baseFolderString, scriptFilePath):
            scriptFilePath;
        const file = fileSystemModule.File.fromPath(path);

        try {
            const input = await file.readText();
            return this._processInputScript(input);
        }
        catch (err) {
            console.error('Error while loading script');
            throw err;
        }
    }

    _processInputScript(inputScriptString) {
        this.result = {
            playerKingConstraint: [],
            computerKingConstraint: [],
            otherPiecesCount: [],
            otherPieceGlobalConstraint: {},
            otherPieceMutualConstraint: {},
            otherPieceIndexedConstraint: {},
            drawish: false,
        };
        const lines = inputScriptString.split(/\r?\n/);
        lines.forEach(line => {
            const headerType = this._getHeaderType(line);
            const pieceTypeSpecification = this._getPieceTypeSpecification(line);

            const isAnHeaderLine = [
                'playerKingConstraint', 
                'computerKingConstraint',
                'otherPiecesCount',
                'otherPieceGlobalConstraint',
                'otherPieceMutualConstraint',
                'otherPieceIndexedConstraint',
                'drawish',
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

        const scriptData = Object.entries(this.result).reduce(
            (accumData, currData) => {
                const headerType = currData[0];
                const value = currData[1];

                if (headerType === 'drawish') {
                    accumData[headerType] = value;
                }
                else if (headerType === 'otherPiecesCount') {
                    accumData[headerType] = value;
                }
                else if ([
                    'otherPieceGlobalConstraint',
                    'otherPieceMutualConstraint',
                    'otherPieceIndexedConstraint',
                ].includes(headerType)) {
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

            return scriptData;
    }

    _getHeaderType(line) {
        if (line.startsWith('#')) {
            const header = line.split(" ").splice(1).join(" ");
            switch(header) {
                case 'Player king constraint': return 'playerKingConstraint';
                case 'Computer king constraint': return 'computerKingConstraint';
                case 'Other pieces count': return 'otherPiecesCount';
                case 'Other piece global constraint': return 'otherPieceGlobalConstraint';
                case 'Other piece mutual constraint': return 'otherPieceMutualConstraint';
                case 'Other piece indexed constraint': return 'otherPieceIndexedConstraint';
                case 'Drawish': return 'drawish';
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
            const type = parts[2];
            const ownerSide = parts[1];
            return {type, ownerSide};
        }
        catch {
            return undefined;
        }
    }

    _addLineToCurrentScript(line) {
        const emptyLine = line.trim().length === 0;
        if (emptyLine) return;
        if (this.currentScriptType === 'drawish') {
            this.result[this.currentScriptType] = line.trim() === 'true';
        }
        else if (this.currentScriptType === 'otherPiecesCount') {
            const lineParts = line.split(" ");
            const ownerSide = lineParts[0];
            const pieceType = lineParts[1];
            const pieceCount = parseInt(lineParts[2]);
            
            this.result[this.currentScriptType].push({pieceType, pieceCount, ownerSide});
        }
        else if ([
            'otherPieceGlobalConstraint',
            'otherPieceMutualConstraint',
            'otherPieceIndexedConstraint',
        ].includes(this.currentScriptType)) {
            this.result[this.currentScriptType][this._buildSpecificationKey(this.pieceTypeSpecification)].push(line);
        }
        else this.result[this.currentScriptType].push(line);
    }

    _buildSpecificationKey(typeSpecification) {
        return `${typeSpecification.ownerSide}${typeSpecification.type}`;
    }
}