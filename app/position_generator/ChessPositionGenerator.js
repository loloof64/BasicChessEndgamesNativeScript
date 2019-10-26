import Chess from 'chess.js';
import ChessPositionValidator from './ChessPositionValidator';
import interpretScript from '../position_generator/ConstraintScriptInterpreter';

const MAX_KING_STEP_TRIES = 30;
const MAX_SINGLE_PIECE_STEP_TRIES = 1000;

const GENERAL_VALUES = {
    '#FileA': 0,
    '#FileB': 1,
    '#FileC': 2,
    '#FileD': 3,
    '#FileE': 4,
    '#FileF': 5,
    '#FileG': 6,
    '#FileH': 7,

    '#Rank1': 0,
    '#Rank2': 1,
    '#Rank3': 2,
    '#Rank4': 3,
    '#Rank5': 4,
    '#Rank6': 5,
    '#Rank7': 6,
    '#Rank8': 7,
}

export default class ChessPositionGenerator {

    constructor() {
        this.inputScripts = undefined;
        this.chessPositionValidator = new ChessPositionValidator();
    }

    generatePosition(inputScriptsObject) {
        this.inputScripts = inputScriptsObject;
        const randomInt = parseInt(Math.random() * 10);
        const playerHasWhite = randomInt > 4;

        const {chessInstanceWithKings, playerKingCoords, computerKingCoords} = this._placeKings(playerHasWhite);
        if (chessInstanceWithKings === null) return null;

        const completePosition = this._placeOtherPieces({chessInstanceWithKings, playerHasWhite, 
            playerKingCoords, computerKingCoords});
        if (completePosition === null) return null;

        return completePosition.fen();
    }

    /*
        Returns the Chess instance
        or null if failed too many times.
    */
    _placeKings(playerHasWhite) {
        let chessInstance = new Chess();
        chessInstance.clear();

        const {chessInstanceWithPlayerKing, playerKingCoords} = this._placePlayerKing({chessInstance, playerHasWhite});
        if (chessInstanceWithPlayerKing === null) return null;
        chessInstance = chessInstanceWithPlayerKing;

        const {chessInstanceWithKings, computerKingCoords} = this._placeComputerKing({chessInstance, playerHasWhite});
        if (chessInstanceWithKings === null) return null;

        return {chessInstanceWithKings, playerKingCoords, computerKingCoords};
    }

    /*
        Returns the Chess instance
        or null if failed too many times.
    */
    _placePlayerKing({chessInstance, playerHasWhite}) {
        const constraintScript = this.inputScripts.playerKingConstraint;

        for (let tryNumber = 0; tryNumber < MAX_KING_STEP_TRIES; tryNumber++) {
            const clonedInstance = new Chess(chessInstance.fen());
            
            const selectedCell = this._selectRandomCell();

            const square = "" + selectedCell.fileStr + selectedCell.rankStr;
            const color = playerHasWhite ? 'w' : 'b';
            const validSquare = clonedInstance.put({ type: 'k', color }, square);
            if (!validSquare) continue;

            if (constraintScript !== undefined) {
                try {
                    let updatedScript = constraintScript;
                    updatedScript = this._replaceGlobalVariables(updatedScript);
                    updatedScript = this._replaceLocalVariables({
                        script: updatedScript,
                        substitutions: [
                            {regex: /\$file/g, value: selectedCell.file},
                            {regex: /\$rank/g, value: selectedCell.rank},
                            {regex: /\$playerHasWhite/g, value: playerHasWhite ? "2==2" : "2!=2"},
                        ]
                    });

                    const respectConstraint = interpretScript(updatedScript);
                    if (!respectConstraint) continue;
                }
                catch (e) {
                    throw {
                        kind: 'player_king_constraint_script_error',
                        error: e,
                    };
                }
            }

            if (validSquare) return {chessInstanceWithPlayerKing: clonedInstance, playerKingCoords: selectedCell};
        }
        return { chessInstanceWithPlayerKing: null, playerKingCoords: null};
    }

    /*
        Returns the Chess instance
        or null if failed too many times.
    */
    _placeComputerKing({chessInstance, playerHasWhite}) {
        const constraintScript = this.inputScripts.computerKingConstraint;
        
        for (let tryNumber = 0; tryNumber < MAX_KING_STEP_TRIES; tryNumber++) {
            const clonedInstance = new Chess(chessInstance.fen());
            
            const selectedCell = this._selectRandomCell();

            const square = "" + selectedCell.fileStr + selectedCell.rankStr;
            const color = playerHasWhite ? 'b' : 'w';
            const validSquare = clonedInstance.put({ type: 'k', color }, square);
            if (!validSquare) continue;

            if ( ! this.chessPositionValidator.checkPositionValidity(clonedInstance.fen()) ) {
                continue;
            }

            if (constraintScript !== undefined) {
                try {
                    let updatedScript = constraintScript;
                    updatedScript = this._replaceGlobalVariables(updatedScript);
                    updatedScript = this._replaceLocalVariables({
                        script: updatedScript,
                        substitutions: [
                            {regex: /\$file/g, value: selectedCell.file},
                            {regex: /\$rank/g, value: selectedCell.rank},
                            {regex: /\$playerHasWhite/g, value: playerHasWhite ? "2==2" : "2!=2"},
                        ]
                    });
    
                    const respectConstraint = interpretScript(updatedScript);
    
                    if (!respectConstraint) continue;
                }
                catch (e) {
                    throw {
                        kind: 'computer_king_constraint_script_error',
                        error: e,
                    };
                }
            }

            let fenWithGoodPlayerTurn = clonedInstance.fen();
            let parts = fenWithGoodPlayerTurn.split(" ");
            parts[1] = playerHasWhite ? 'w' : 'b';
            fenWithGoodPlayerTurn = parts.join(" ");

            return { chessInstanceWithKings: new Chess(fenWithGoodPlayerTurn), computerKingCoords: selectedCell };
        }
        return { chessInstanceWithKings: null, computerKingCoords: null };
    }

    /*
        Returns the Chess instance
        or null if failed too many times.
    */
   _placeOtherPieces({chessInstanceWithKings, playerHasWhite, playerKingCoords, computerKingCoords}) {
        const chessInstance = chessInstanceWithKings;
        const constraintScript = this.inputScripts.otherPiecesCount;
        let chessInstanceWithAllPieces = chessInstance;
        let failedForAtLeastOnePiece = false;

        for (let currentEntry of constraintScript) {
            const pieceType = currentEntry.pieceType;
            const ownerSide = currentEntry.ownerSide;
            const pieceCount = currentEntry.pieceCount;

            const chessInstanceWithNewPiece = this._placeSinglePiece({
                chessInstance: chessInstanceWithAllPieces, playerHasWhite,
                playerKingCoords, computerKingCoords,
                pieceType, ownerSide, pieceCount});
            if (chessInstanceWithNewPiece === null) {
                failedForAtLeastOnePiece = true;
                break;
            }
            chessInstanceWithAllPieces = chessInstanceWithNewPiece;
        }

        if (failedForAtLeastOnePiece) return null;
        return chessInstanceWithAllPieces;
   }

   /*
        Returns the Chess instance
        or null if failed too many times.
    */
   _placeSinglePiece({
        chessInstance, playerHasWhite,
        playerKingCoords, computerKingCoords,
        pieceType, ownerSide, pieceCount
    }) {
        let alreadyPlacedPieces = [];

        for (let pieceIndex = 0; pieceIndex < pieceCount; pieceIndex++) {
            let pieceResolved = false;
            let selectedCell;

            for (let tryNumber = 0; tryNumber < MAX_SINGLE_PIECE_STEP_TRIES; tryNumber++) {
                const clonedInstance = new Chess(chessInstance.fen());

                selectedCell = this._selectRandomCell();

                const square = "" + selectedCell.fileStr + selectedCell.rankStr;

                let color;
                if (playerHasWhite) {
                    color = ownerSide === 'P' ? 'w' : 'b';
                }
                else {
                    color = ownerSide === 'P' ? 'b' : 'w';
                }

                const freeSquare = clonedInstance.get(square) === null;
                if (!freeSquare) continue;

                const validSquare = clonedInstance.put({type: pieceType.toLowerCase(), color}, square);
                if (!validSquare) continue;

                const positionValid = this.chessPositionValidator.checkPositionValidity(clonedInstance.fen());
                if (!positionValid) continue;


                const pieceScriptsKey = `${ownerSide}${pieceType}`;
                const globalScriptConstraint = this.inputScripts.otherPieceGlobalConstraint[pieceScriptsKey];
                const indexedScriptConstraint = this.inputScripts.otherPieceIndexedConstraint[pieceScriptsKey];
                const mutualScriptConstraint = this.inputScripts.otherPieceMutualConstraint[pieceScriptsKey];

                const globalScriptConstraintRespected =
                    this._checkGlobalScriptConstraintRespected({
                        globalScriptConstraint, selectedCell,
                        playerKingCoords, computerKingCoords,
                        playerHasWhite,
                    });
                if (!globalScriptConstraintRespected) continue;

                const indexedScriptConstraintRespected =
                    this._checkIndexedScriptConstraintRespected({
                        indexedScriptConstraint,
                        selectedCell, playerHasWhite, pieceIndex,
                        playerKingCoords, computerKingCoords,
                    });
                if (!indexedScriptConstraintRespected) continue;

                const mutualScriptConstraintRespected = 
                    this._checkMutualScriptConstraintRespected({
                        mutualScriptConstraint, selectedCell, playerHasWhite,
                        alreadyPlacedPieces, pieceType, ownerSide,
                    });
                if (!mutualScriptConstraintRespected) continue;

                
                chessInstance = clonedInstance;
                alreadyPlacedPieces.push(selectedCell);
                pieceResolved = true;
                break;
            }

            if (!pieceResolved) return null;
        }
        
        return chessInstance;
   }

   _replaceGlobalVariables(script) {
        let updatedScript = script;
        Object.entries(GENERAL_VALUES).forEach(entry => {
            const key = entry[0];
            const value = entry[1];

            const regex = new RegExp(key, 'g');

            updatedScript = updatedScript.replace(regex, value);
        });
        return updatedScript;
   }

   _replaceLocalVariables({script, substitutions}) {
       let updatedScript = script;
       substitutions.forEach(currentSubsitute => {
           updatedScript = updatedScript.replace(currentSubsitute.regex, currentSubsitute.value);
       });
       return updatedScript;
   }

   _selectRandomCell() {
        const randomFile = parseInt(Math.random() * 8);
        const fileStr = String.fromCharCode('a'.charCodeAt(0) + randomFile);

        const randomRank = parseInt(Math.random() * 8);
        const rankStr = String.fromCharCode('1'.charCodeAt(0) + randomRank);

        return {rankStr, fileStr, file: randomFile, rank: randomRank};
   }

   _checkGlobalScriptConstraintRespected({
        globalScriptConstraint, selectedCell,
        playerKingCoords, computerKingCoords,
        playerHasWhite,
   }){
        if (globalScriptConstraint === undefined) return true;

        let updatedScript = globalScriptConstraint;

        updatedScript = this._replaceLocalVariables({
            script: updatedScript,
            substitutions: [
                {regex: /\$file/g, value: selectedCell.file},
                {regex: /\$rank/g, value: selectedCell.rank},
                {regex: /\$playerKingFile/g, value: playerKingCoords.file},
                {regex: /\$playerKingRank/g, value: playerKingCoords.rank},
                {regex: /\$computerKingFile/g, value: computerKingCoords.file},
                {regex: /\$computerKingRank/g, value: computerKingCoords.rank},
                {regex: /\$playerHasWhite/g, value: playerHasWhite ? "2==2" : "2!=2"}
            ]
        });
        updatedScript = this._replaceGlobalVariables(updatedScript);

        try {
            const respectConstraint = interpretScript(updatedScript);
            return respectConstraint;
        }
        catch (e) {
            const pieceKind = `${ownerSide}${pieceType}`;

            throw {
                kind: 'piece_global_constraint_script_error',
                pieceKind,
                error: e,
            };
        }
   }

   _checkIndexedScriptConstraintRespected({
        indexedScriptConstraint, 
        selectedCell, playerHasWhite, pieceIndex,
        playerKingCoords, computerKingCoords,
    }){
        if (indexedScriptConstraint === undefined) return true;

        let updatedScript = indexedScriptConstraint;
        updatedScript = this._replaceLocalVariables({
            script: updatedScript,
            substitutions: [
                {regex: /\$file/g, value: selectedCell.file},
                {regex: /\$rank/g, value: selectedCell.rank},
                {regex: /\$playerKingFile/g, value: playerKingCoords.file},
                {regex: /\$playerKingRank/g, value: playerKingCoords.rank},
                {regex: /\$computerKingFile/g, value: computerKingCoords.file},
                {regex: /\$computerKingRank/g, value: computerKingCoords.rank},
                {regex: /\$index/g, value: pieceIndex},
                {regex: /\$playerHasWhite/g, value: playerHasWhite ? "2==2" : "2!=2"}
            ]
        });
        updatedScript = this._replaceGlobalVariables(updatedScript);

        try {
            const respectConstraint = interpretScript(updatedScript);
            return respectConstraint;
        }
        catch (e) {
            const pieceKind = `${ownerSide}${pieceType}`;

            throw {
                kind: 'piece_indexed_constraint_script_error',
                pieceKind,
                error: e,
            };
        }
    }

   _checkMutualScriptConstraintRespected({
       mutualScriptConstraint, selectedCell, playerHasWhite,
       alreadyPlacedPieces, pieceType, ownerSide,
   }) {
       if (mutualScriptConstraint === undefined) return true;

        let updatedScript = mutualScriptConstraint;

        updatedScript = this._replaceLocalVariables({
            script: updatedScript,
            substitutions: [
                {regex: /\$secondFile/g, value: selectedCell.file},
                {regex: /\$secondRank/g, value: selectedCell.rank},
                {regex: /\$playerHasWhite/g, value: playerHasWhite ? "2==2" : "2!=2"}
            ]
        });

        updatedScript = this._replaceGlobalVariables(updatedScript);

        try {
            let mutualScriptConstraintStillRespected = true;
            for (let firstPieceCoordinates of alreadyPlacedPieces) {

                if (mutualScriptConstraintStillRespected) {
                    let updatedScriptCopy = updatedScript;
                    updatedScriptCopy = this._replaceLocalVariables({
                        script: updatedScriptCopy,
                        substitutions: [
                            {regex: /\$firstFile/g, value: firstPieceCoordinates.file},
                            {regex: /\$firstRank/g, value: firstPieceCoordinates.rank},
                            {regex: /\$playerHasWhite/g, value: playerHasWhite ? "2==2" : "2!=2"}
                        ]
                    });

                    const respectConstraint = interpretScript(updatedScriptCopy);
                    if (!respectConstraint) {
                        mutualScriptConstraintStillRespected = false;
                        break;
                    }
                }
            };

            return mutualScriptConstraintStillRespected;
        }
        catch (e) {

            const pieceKind = `${ownerSide}${pieceType}`;

            throw {
                kind: 'piece_mutual_constraint_script_error',
                pieceKind,
                error: e,
            };
        }


   }

};