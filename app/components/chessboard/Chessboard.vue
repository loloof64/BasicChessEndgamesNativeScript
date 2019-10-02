<template>
	<GridLayout columns="*,2*,2*,2*,2*,2*,2*,2*,2*,*" rows="*,2*,2*,2*,2*,2*,2*,2*,2*,*"
        :width="size" :height="size" :backgroundColor="backgroundColor" @touch="reactToTouch"
        >
        <Label row="0" col="0"></Label>
        <Label v-for="col in [0,1,2,3,4,5,6,7]" :key="'coord_top_' + col" coordinate :fontSize="fontSize" row="0" :col="col+1" :text="fileCoords(col)"
            :color="coordsColor"></Label>
        <Label row="0" col="9"></Label>

        <template v-for="row in [0,1,2,3,4,5,6,7]">
             <Label :key="'coord_left_'+row" :fontSize="fontSize" coordinate :row="row+1" col="0" :text="rankCoords(row)"
            :color="coordsColor"></Label>
            <StackLayout v-for="col in [0,1,2,3,4,5,6,7]" :key="'cell_'+(7-row)+col" :row="row+1" :col="col+1"
                :backgroundColor="cellBackgroundRowCol(7-row, col)">
                    <Image :src="pieceImageAtRowCol(7-row, col)"/>
            </StackLayout>
            <Label :key="'coord_right_'+row" :fontSize="fontSize" coordinate :row="row+1" col="9" :text="rankCoords(row)"
                :color="coordsColor"></Label>
        </template>

        <Label row="9" col="0"></Label>
        <Label v-for="col in [0,1,2,3,4,5,6,7]" :key="'coord_bottom_' + col" coordinate :fontSize="fontSize" row="9" :col="col+1" :text="fileCoords(col)"
            :color="coordsColor"></Label>
        <StackLayout row="9" col="9"><Label id="playerTurn" :backgroundColor="turnColor()" :borderRadius="halfCellSize / 2.0" :width="halfCellSize" :height="halfCellSize"/></StackLayout>
        <AbsoluteLayout rowSpan="10" colSpan="10" row="0" col="0">
            <Image :width="cellSize" :height="cellSize" :src="movedPieceImage()" :top="movedPieceTop()" :left="movedPieceLeft()" />
        </AbsoluteLayout>

        <StackLayout orientation="vertical" id="promotionDialog" rowSpan="10" colSpan="10"
            row="0" col="0" :class="{opened: promotionDialogOpened}"
            :set="whiteTurn = this.boardLogic.turn() === 'w'"
        >
            <Label id="title" :text="'choose_promotion_piece' | L" horizontalAlignment="center"/>
            <StackLayout orientation="horizontal" @tap="commitPromotion('q')" horizontalAlignment="left" width="100%">
                <Label :text="queenFigurine(whiteTurn)" />
                <Label :text="'queen_promotion' | L" />
            </StackLayout>
            <StackLayout orientation="horizontal" @tap="commitPromotion('r')" horizontalAlignment="left" width="100%">
                <Label :text="rookFigurine(whiteTurn)" />
                <Label :text="'rook_promotion' | L" />
            </StackLayout>
            <StackLayout orientation="horizontal" @tap="commitPromotion('b')" horizontalAlignment="left" width="100%">
                <Label :text="bishopFigurine(whiteTurn)" />
                <Label :text="'bishop_promotion' | L" />
            </StackLayout>
            <StackLayout orientation="horizontal" @tap="commitPromotion('n')" horizontalAlignment="left" width="100%">
                <Label :text="knightFigurine(whiteTurn)" />
                <Label :text="'knight_promotion' | L" />
            </StackLayout>
        </StackLayout>
    </GridLayout>
</template>

<script>
import Chess from 'chess.js';

let chess = new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
const dialogs = require("tns-core-modules/ui/dialogs");

import Vue from "nativescript-vue";
import { localize } from "nativescript-localize";

Vue.filter("L", localize);

export default {
    props: {
        size: {
            type: Number,
            default: 200,
        },
        backgroundColor: {
            type: String,
            default: "#1A6A15"
        },
        whiteCellColor: {
            type: String,
            default: "#ffce9e"
        },
        blackCellColor: {
            type: String,
            default: "#d18b47"
        },
        coordsColor: {
            type: String,
            default: "#fca02b"
        },
        reversed: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            boardLogic: chess,
            dndActive: false,
            dndOriginCol: undefined,
            dndOriginRow: undefined,
            dndDestCol: undefined,
            dndDestRow: undefined,
            promotionDialogOpened: false,
        };
    },
    computed: {
        cellSize() {
            return this.size / 9.0;
        },
        halfCellSize() {
            return this.cellSize / 2.0;
        },
        fontSize() {
            return this.cellSize * 0.4;
        },
    },
    methods: {
        pieceAt(rank, file) {
            const square = `${String.fromCharCode('a'.charCodeAt(0) + file)}${String.fromCharCode('1'.charCodeAt(0) + rank)}`;
            const piece = this.boardLogic.get(square);
            return piece;
        },
        pieceImageAtRankFile(rank, file) {
            const row = this.reversed ? 7-rank : rank;
            const col = this.reversed ? 7-file : file;
            const isTheMovingPiece = this.dndOriginRow === row && this.dndOriginCol === col;

            if (isTheMovingPiece) return null;

            const piece = this.pieceAt(rank, file);
            if (piece === null) return null;
            let imageBase;
            switch(piece.type) {
                case 'p': imageBase = piece.color === 'b' ? 'pd' : 'pl'; break;
                case 'n': imageBase = piece.color === 'b' ? 'nd' : 'nl'; break;
                case 'b': imageBase = piece.color === 'b' ? 'bd' : 'bl'; break;
                case 'r': imageBase = piece.color === 'b' ? 'rd' : 'rl'; break;
                case 'q': imageBase = piece.color === 'b' ? 'qd' : 'ql'; break;
                case 'k': imageBase = piece.color === 'b' ? 'kd' : 'kl'; break;
            }
            if (!imageBase) return null;
            return `~/components/chessboard/chess_vectors/${imageBase}.png`;
        },
        pieceImageAtRowCol(row, col) {
            const rank = this.reversed ? 7-row : row;
            const file = this.reversed ? 7-col : col;

            return this.pieceImageAtRankFile(rank, file);
        },
        piecePresentAtRowCol(row, col) {
            return this.pieceImageAtRowCol(row, col) === null ? 'hidden' : 'visible';
        },
        fileCoords(index) {
            return this.reversed ? ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'][index] : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][index];
        },
        rankCoords(index) {
            return this.reversed ? ['1', '2', '3', '4', '5', '6', '7', '8'][index]: ['8', '7', '6', '5', '4', '3', '2', '1'][index];
        },
        turnColor() {
            switch(this.boardLogic.turn()) {
                case 'w': return 'white';
                case 'b': return 'black';
                default: return 'transparent';
            }
        },
        cellBackgroundRowCol(row, col) {
            const isTheDndOriginCell = row === this.dndOriginRow && col === this.dndOriginCol;
            const isADndCellToHighlight = row === this.dndDestRow || col === this.dndDestCol;
            const isWhiteCell = (row+col) % 2 === 0;

            if (isTheDndOriginCell) return 'red';
            if (isADndCellToHighlight) return 'green';

            return isWhiteCell ? this.whiteCellColor : this.blackCellColor;
        },
        movedPieceImage() {
            if (!this.dndActive) return null;
            return this.dndMovedPieceImage;
        },
        movedPieceTop() {
            if (!this.dndActive) return undefined;
            return this.dndMovedPieceTop;
        },
        movedPieceLeft() {
            if (!this.dndActive) return undefined;
            return this.dndMovedPieceLeft;
        },
        queenFigurine(whiteTurn) {
            return whiteTurn ? '\u2655' : '\u265B';
        },
        rookFigurine(whiteTurn) {
            return whiteTurn ? '\u2656' : '\u265C';
        },
        bishopFigurine(whiteTurn) {
            return whiteTurn ? '\u2657' : '\u265D';
        },
        knightFigurine(whiteTurn) {
            return whiteTurn ? '\u2658' : '\u265E';
        },
        commitPromotion(typeStr) {
            this.promotionDialogOpened = false;
            this.boardLogic.move({from: this.startCellStr, to: this.endCellStr, promotion: typeStr});
            this.cancelDnd();
        },
        cancelDnd() {
            this.dndActive = false;
            this.dndOriginCol = undefined;
            this.dndOriginRow = undefined;
            this.dndDestCol = undefined;
            this.dndDestRow = undefined;
            this.dndMovedPieceTop = undefined;
            this.dndMovedPieceLeft = undefined;
            this.dndMovedPieceImage = undefined;
            this.startCellStr = undefined;
            this.endCellStr = undefined;
        },
        reactToTouch(event) {
            const rankAndFileToCoordinate = function(rank, file) {
                return `${String.fromCharCode('a'.charCodeAt(0) + file)}${String.fromCharCode('1'.charCodeAt(0) + rank)}`;
            }

            if (this.promotionDialogOpened) return;

            const col = Math.floor((event.getX() - this.halfCellSize) / this.cellSize);
            const row = 7 - Math.floor((event.getY() - this.halfCellSize) / this.cellSize);
            const outsideZone = col < 0 || col > 7 || row < 0 || row > 7;

            if (outsideZone) {
                this.cancelDnd();
            }

            const file = this.reversed ? 7-col : col;
            const rank = this.reversed ? 7-row : row;
            const pieceAtClickedSquare = this.boardLogic.get(rankAndFileToCoordinate(rank, file));

            switch(event.action) {
                case 'down':
                    const isAnEmptyCell = this.pieceImageAtRowCol(row, col) === null;
                    if (isAnEmptyCell) return;
                    const notOurPiece = this.boardLogic.turn() !== pieceAtClickedSquare.color;
                    if (notOurPiece) return;
                    this.dndMovedPieceImage = this.pieceImageAtRowCol(row, col);
                    this.dndActive = true;
                    this.dndOriginCol = col;
                    this.dndOriginRow = row;
                    this.dndDestCol = col;
                    this.dndDestRow = row;
                    this.dndMovedPieceLeft = event.getX() - this.halfCellSize;
                    this.dndMovedPieceTop = event.getY() - this.halfCellSize;
                    break;
                case 'move':
                    if (! this.dndActive) return;

                    this.dndDestCol = col;
                    this.dndDestRow = row;
                    this.dndMovedPieceLeft = event.getX() - this.halfCellSize;
                    this.dndMovedPieceTop = event.getY() - this.halfCellSize;

                    break;
                case 'up':
                    if (!this.dndActive) return;

                    const originRank = this.reversed ? 7 - this.dndOriginRow : this.dndOriginRow;
                    const originFile = this.reversed ? 7 - this.dndOriginCol : this.dndOriginCol;
                    const destRank = this.reversed ? 7-row : row;
                    const destFile = this.reversed ? 7-col : col;

                    this.startCellStr = rankAndFileToCoordinate(originRank, originFile);
                    this.endCellStr = rankAndFileToCoordinate(destRank, destFile);

                    const boardLogicClone = new Chess(this.boardLogic.fen());
                    const moveResult = boardLogicClone.move({from: this.startCellStr, to: this.endCellStr, promotion: 'q'}) ;
                    const isValidMove = moveResult !== null;

                    if (isValidMove) {
                        const isAPromotionMove = moveResult.promotion !== undefined;
                        if (isAPromotionMove) {
                            this.promotionDialogOpened = true;
                        }
                        else {
                            this.boardLogic.move({from: this.startCellStr, to: this.endCellStr});
                            this.cancelDnd();
                        }
                    }
                    else {
                        this.cancelDnd();
                    }
            }
        },
    },
}
</script>

<style scoped>
    @keyframes showPromotionDialog {
		from {
			opacity: 0;
		}
		to {
			opacity: 0.6;
		}
	}

    Label[coordinate] {
        text-align: center;
        vertical-align: middle;
    }

    #promotionDialog {
        opacity: 0;
        visibility: collapse;
    }

    #promotionDialog.opened {
        opacity: 0.6;
        background-color: whitesmoke;
        visibility: visible;
        animation-name: showPromotionDialog;
		animation-duration: 1s;
		animation-fill-mode: forwards;
    }

    #promotionDialog Label {
        color: black;
        font-size: 48;
        padding: 10 0;
    }

    #promotionDialog > #title {
        color: black;
        font-size: 24;
    }
</style>
