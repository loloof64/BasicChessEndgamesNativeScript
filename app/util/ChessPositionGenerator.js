import Chess from 'chess.js';
import ChessPositionValidator from './ChessPositionValidator';

const MAX_SINGLE_STEP_TRIES = 15;

export default class ChessPositionGenerator {

    constructor(inputScriptsObject) {
        this.inputScripts = inputScriptsObject;
        this.chessPositionValidator = new ChessPositionValidator();
    }

    generatePosition() {
        const randomInt = parseInt(Math.random() * 10);
        const playerHasWhite = randomInt > 4;

        let chessInstanceWithKings = this._placeKings(playerHasWhite);
        if (chessInstanceWithKings === null) return null;

        return chessInstanceWithKings.fen();
    }

    /*
        Returns the position FEN
        or null if failed too many times.
    */
    _placeKings(playerHasWhite) {
        let chessInstance = new Chess();
        chessInstance.clear();

        const chessInstanceWithPlayerKing = this._placePlayerKing({chessInstance, playerHasWhite});
        if (chessInstanceWithPlayerKing === null) return null;
        chessInstance = chessInstanceWithPlayerKing;

        const chessInstanceWithKings = this._placeComputerKing({chessInstance, playerHasWhite});
        if (chessInstanceWithKings === null) return null;

        return chessInstanceWithKings;
    }

    /*
        Returns the position FEN
        or null if failed too many times.
    */
    _placePlayerKing({chessInstance, playerHasWhite}) {
        for (let tryNumber = 0; tryNumber < MAX_SINGLE_STEP_TRIES; tryNumber++) {
            const clonedInstance = new Chess(chessInstance.fen());
            const randomFile = parseInt(Math.random() * 8);
            const file = String.fromCharCode('a'.charCodeAt(0) + randomFile);

            const randomRank = parseInt(Math.random() * 8);
            const rank = String.fromCharCode('1'.charCodeAt(0) + randomRank);

            const square = "" + file + rank;
            const color = playerHasWhite ? 'w' : 'b';
            const validSquare = clonedInstance.put({ type: 'k', color }, square);
            if (!validSquare) continue;

            if (validSquare) return clonedInstance;
        }
        return null;
    }

    /*
        Returns the position FEN
        or null if failed too many times.
    */
    _placeComputerKing({chessInstance, playerHasWhite}) {
        
        for (let tryNumber = 0; tryNumber < MAX_SINGLE_STEP_TRIES; tryNumber++) {
            const clonedInstance = new Chess(chessInstance.fen());
            const randomFile = parseInt(Math.random() * 8);
            const file = String.fromCharCode('a'.charCodeAt(0) + randomFile);

            const randomRank = parseInt(Math.random() * 8);
            const rank = String.fromCharCode('1'.charCodeAt(0) + randomRank);

            const square = "" + file + rank;
            const color = playerHasWhite ? 'b' : 'w';
            const validSquare = clonedInstance.put({ type: 'k', color }, square);
            if (!validSquare) continue;

            if ( ! this.chessPositionValidator.checkPositionValidity(clonedInstance.fen()) ) {
                continue;
            }
            
            return clonedInstance;
        }
        return null;
    }
};