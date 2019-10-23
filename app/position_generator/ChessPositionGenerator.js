import Chess from 'chess.js';
import ChessPositionValidator from './ChessPositionValidator';
import interpretScript from '../position_generator/ConstraintScriptInterpreter';

const MAX_SINGLE_STEP_TRIES = 50;

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
        Returns the Chess instance
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
        Returns the Chess instance
        or null if failed too many times.
    */
    _placePlayerKing({chessInstance, playerHasWhite}) {
        const constraintScript = this.inputScripts.playerKingConstraint;

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

            try {
                let updatedScript = constraintScript;
                updatedScript = updatedScript.replace(/\$file/g, randomFile);
                updatedScript = updatedScript.replace(/\$rank/g, randomRank);
                updatedScript = updatedScript.replace(/\$playerHasWhite/, playerHasWhite ? "2==2" : "2!=2");

                const respectConstraint = interpretScript(updatedScript);

                if (!respectConstraint) continue;
            }
            catch (e) {
                throw {
                    kind: 'player_king_constraint_script_error',
                    error: e,
                };
            }

            if (validSquare) return clonedInstance;
        }
        return null;
    }

    /*
        Returns the Chess instance
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

            let fenWithGoodPlayerTurn = clonedInstance.fen();
            let parts = fenWithGoodPlayerTurn.split(" ");
            parts[1] = playerHasWhite ? 'w' : 'b';
            fenWithGoodPlayerTurn = parts.join(" ");

            return new Chess(fenWithGoodPlayerTurn);
        }
        return null;
    }
};