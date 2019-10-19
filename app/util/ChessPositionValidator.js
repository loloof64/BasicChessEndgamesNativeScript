export default class ChessPositionValidator {

    checkPositionValidity(positionFenStr) {
        const positionPieces = this._buildPositionPiecesFromFen(positionFenStr);
        if (! this._checkGoodPiecesCount(positionPieces)) return false;
        return true;
    }

    _buildPositionPiecesFromFen(positionFenStr) {
        const boardPart = positionFenStr.split(' ')[0];
        const lines = boardPart.split("/").reverse();
        
        let pieces = [];
        lines.forEach(currentLine => {
            let linePieces = [];

            const chars = currentLine.split('');
            for (let currentChar of chars) {
                const charIsDigit = this._isDigit(currentChar);
                if (charIsDigit) {
                    const digitValue = currentChar.charCodeAt(0) - '0'.charCodeAt(0);
                    for (let i = 0; i < digitValue; i++) {
                        linePieces.push(null);
                    }
                }
                else {
                    const pieceData = this._pieceFromChar(currentChar);
                    linePieces.push(pieceData);
                }
            }

            pieces.push(linePieces);
        });

        return pieces;
    }

    _isDigit(char) {
        if (char.length > 1) return false;
        const charCode = char.charCodeAt(0);

        return charCode >= '0'.charCodeAt(0) && charCode <= '9'.charCodeAt(0);
    }

    _pieceFromChar(char) {
        switch(char) {
            case 'P': return { type: 'p', white: true};
            case 'N': return { type: 'n', white: true};
            case 'B': return { type: 'b', white: true};
            case 'R': return { type: 'r', white: true};
            case 'Q': return { type: 'q', white: true};
            case 'K': return { type: 'k', white: true};
            case 'p': return { type: 'p', white: false};
            case 'n': return { type: 'n', white: false};
            case 'n': return { type: 'b', white: false};
            case 'r': return { type: 'r', white: false};
            case 'q': return { type: 'q', white: false};
            case 'k': return { type: 'k', white: false};
            default: throw "Undefined piece value "+char;
        }
    }

    _checkGoodPiecesCount(positionPieces) {
        let whiteKingCount = 0;
        let blackKingCount = 0;

        let whitePawnsCount = 0;
        let blackPawnsCount = 0;
        let whiteKnightsCount = 0;
        let blackKnightsCount = 0;
        let whiteBishopsCount = 0;
        let blackBishopsCount = 0;
        let whiteRooksCount = 0;
        let blackRooksCount = 0;
        let whiteQueensCount = 0;
        let blackQueensCount = 0;

        positionPieces.forEach(line => line.forEach(piece => {
            if (piece === null) return;
            if (piece.type === 'k' && piece.white) whiteKingCount++;
            else if (piece.type === 'k' && !piece.white) blackKingCount++;
            else if (piece.type === 'p' && piece.white) whitePawnsCount++;
            else if (piece.type === 'p' && !piece.white) blackPawnsCount++;
            else if (piece.type === 'n' && piece.white) whiteKnightsCount++;
            else if (piece.type === 'n' && !piece.white) blackKnightsCount++;
            else if (piece.type === 'b' && piece.white) whiteBishopsCount++;
            else if (piece.type === 'b' && !piece.white) blackBishopsCount++;
            else if (piece.type === 'r' && piece.white) whiteRooksCount++;
            else if (piece.type === 'r' && !piece.white) blackRooksCount++;
            else if (piece.type === 'q' && piece.white) whiteQueensCount++;
            else if (piece.type === 'q' && !piece.white) blackQueensCount++;
        }));

        if (whiteKingCount !== 1 || blackKingCount !== 1) return false;
        if (whitePawnsCount > 8 || blackPawnsCount > 8) return false;
        if (whiteKnightsCount > 10 || blackKnightsCount > 10) return false;
        if (whiteBishopsCount > 10 || blackBishopsCount > 10) return false;
        if (whiteRooksCount > 10 || blackRooksCount > 10) return false;
        if (whiteQueensCount > 9 || blackQueensCount > 9) return false;

        return true;
    }

}