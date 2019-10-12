<template>
    <GridLayout @touch="reactToTouch" columns="*" rows="*" :width="size" :height="size" background="red">
        <WebViewExt dock="center" src="~/components/chessboard/stockfish/index.html"
                width="0" height="0"
                row="0" col="0"
                @loadFinished="onWebViewLoaded"
            />
        <CanvasView  dock="center" :width="size" :height="size" @draw="drawBoard" ref="canvas" row="0" col="0"
        />
        <StackLayout dock="center" orientation="vertical" id="promotionDialog"
                :width="size" :height="size"
                row="0" col="0"
                :class="{opened: promotionDialogOpened}"
                :set="whiteTurn = this.boardLogic.turn() === 'w'"
            >
            <Label id="title" :text="'choose_promotion_piece' | L" horizontalAlignment="center" :fontSize="cellSize * 0.5"/>
            <StackLayout orientation="horizontal" @tap="commitPromotion('q')" horizontalAlignment="left" width="100%">
                <Label :text="queenFigurine(whiteTurn)" :fontSize="cellSize * 0.8" />
                <Label :text="'queen_promotion' | L" :fontSize="cellSize * 0.8" />
            </StackLayout>
            <StackLayout orientation="horizontal" @tap="commitPromotion('r')" horizontalAlignment="left" width="100%">
                <Label :text="rookFigurine(whiteTurn)" :fontSize="cellSize * 0.8" />
                <Label :text="'rook_promotion' | L" :fontSize="cellSize * 0.8" />
            </StackLayout>
            <StackLayout orientation="horizontal" @tap="commitPromotion('b')" horizontalAlignment="left" width="100%">
                <Label :text="bishopFigurine(whiteTurn)" :fontSize="cellSize * 0.8" />
                <Label :text="'bishop_promotion' | L" :fontSize="cellSize * 0.8" />
            </StackLayout>
            <StackLayout orientation="horizontal" @tap="commitPromotion('n')" horizontalAlignment="left" width="100%">
                <Label :text="knightFigurine(whiteTurn)" :fontSize="cellSize * 0.8" />
                <Label :text="'knight_promotion' | L" :fontSize="cellSize * 0.8" />
            </StackLayout>
        </StackLayout>
        <!--
        <StackLayout id="gameEndedText" orientation="vertical" :width="size" :height="size"
            horizontalAlignment="center" verticalAlignment="center" dock="center"
            :class="{opened: !gameInProgress}">
            <Label :text="gameEndedReason | L" :fontSize="cellSize * 0.8" textWrap="true" color="red" />
        </StackLayout>
        -->
    </GridLayout>
</template>

<script>
import "@nota/nativescript-webview-ext/vue";
import CanvasPlugin from 'nativescript-canvas/vue';
import Chess from 'chess.js';

const dialogs = require("tns-core-modules/ui/dialogs");

import Vue from "nativescript-vue";
import { localize } from "nativescript-localize";
import { Color } from 'tns-core-modules/color/color';
import { Canvas, Cap, drawRect, createRect, Paint, Style} from 'nativescript-canvas';

import { knownFolders, path } from 'tns-core-modules/file-system/file-system';
import { fromFile, ImageSource } from 'tns-core-modules/image-source/image-source';

let piecesPictures = [];

const loadPiecePicture = (refShortcut) => {
    piecesPictures[refShortcut] = fromFile(path.join( knownFolders.currentApp().path, 'components/chessboard/chess_vectors/'+refShortcut+'.png'));
}
for (let shortcut of ['pl', 'nl', 'bl', 'rl', 'ql', 'kl', 'pd', 'nd', 'bd', 'rd', 'qd', 'kd']) {
    loadPiecePicture(shortcut);
}

Vue.filter("L", localize);
Vue.use(CanvasPlugin);

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
            piecesPictures: piecesPictures,
            webview: undefined,
            boardLogic: new Chess('8/8/8/8/8/8/8/8 w - - 0 1'),
            dndActive: false,
            dndOriginCol: undefined,
            dndOriginRow: undefined,
            dndDestCol: undefined,
            dndDestRow: undefined,
            promotionDialogOpened: false,
            boardOrientationBeforePromotionDialog: undefined,
            gameInProgress: false,
            gameEndedReason: undefined,
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
    watch: {
        reversed: function (newVal, oldVal) {
            const canvas = this.$refs.canvas.nativeView;
            canvas.redraw();
        }
    },
    methods: {
        onWebViewLoaded(args) {
            this.webview = args.object;
            try {
                this.webview.on('stockfishOutput', this.processStockfishOutput);
            }
            catch (error) {
                console.error(error);
            }
        },
        sendCommandToStockfish(command) {
            if (this.webview !== undefined) {
                try {
                    this.webview.executeJavaScript(`stockfish.postMessage('${command}');`);
                }
                catch (error) {
                    console.error(error);
                }
            }
        },
        processStockfishOutput(output) {
            console.log(output.data);
        },
        startNewGame(startPosisitionStr) {
            ////////////////////////////////////////////
            this.sendCommandToStockfish("go depth 12")
            ////////////////////////////////////////////
            this.cancelDnd();
            this.promotionDialogOpened = false;
            this.boardLogic = new Chess(startPosisitionStr || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
            this.gameEndedReason = undefined;
            this.gameInProgress = true;
            const canvas = this.$refs.canvas.nativeView;
            canvas.redraw();
        },
        pieceAt(rank, file) {
            const square = `${String.fromCharCode('a'.charCodeAt(0) + file)}${String.fromCharCode('1'.charCodeAt(0) + rank)}`;
            const piece = this.boardLogic.get(square);
            return piece;
        },
        pieceImageShortcutAtRankFile(rank, file) {
            const row = this.reversed ? 7-rank : rank;
            const col = this.reversed ? 7-file : file;
            let isTheMovingPiece;
            if (this.promotionDialogOpened) {
                const boardReversedSincePromotionDialog = this.boardOrientationBeforePromotionDialog !== this.reversed;
                let realCol = boardReversedSincePromotionDialog ? 7-col : col;
                let realRow = boardReversedSincePromotionDialog ? 7-row : row;
                isTheMovingPiece = this.dndOriginRow === realRow && this.dndOriginCol === realCol;
            } else {
                isTheMovingPiece = this.dndOriginRow === row && this.dndOriginCol === col;
            }

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
            return imageBase;
        },
        pieceImageAtRowCol(row, col) {
            const rank = this.reversed ? 7-row : row;
            const file = this.reversed ? 7-col : col;

            return this.pieceImageShortcutAtRankFile(rank, file);
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
        movedPieceImage() {
            if (!this.dndActive) return null;
            return this.dndMovedPieceImage;
        },
        movedPieceTop() {
            if (!this.dndActive) return undefined;
            if (this.promotionDialogOpened) {
                const boardReversedSincePromotionDialog = this.boardOrientationBeforePromotionDialog !== this.reversed;
                const realTop = boardReversedSincePromotionDialog ? (this.size - this.dndMovedPieceTop - this.cellSize) : this.dndMovedPieceTop;
                return realTop;
            }
            else {
                return this.dndMovedPieceTop;
            }
        },
        movedPieceLeft() {
            if (!this.dndActive) return undefined;
            if (this.promotionDialogOpened) {
                const boardReversedSincePromotionDialog = this.boardOrientationBeforePromotionDialog !== this.reversed;
                const realLeft = boardReversedSincePromotionDialog ? (this.size - this.dndMovedPieceLeft - this.cellSize) : this.dndMovedPieceLeft;
                return realLeft;
            }
            else {
                return this.dndMovedPieceLeft;
            }
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
            this.boardOrientationBeforePromotionDialog = undefined;
            this.boardLogic.move({from: this.startCellStr, to: this.endCellStr, promotion: typeStr});
            this.cancelDnd();
            const canvas = this.$refs.canvas.nativeView;
            canvas.redraw();
            this.checkGameEndedStateAndNotifyUser();
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
            const canvas = this.$refs.canvas.nativeView;
            canvas.redraw();
        },
        checkGameEndedStateAndNotifyUser() {
            if (this.boardLogic.in_checkmate()) {
                this.gameInProgress = false;
                this.gameEndedReason = 'game_ending_mate';
            } else if (this.boardLogic.in_stalemate()) {
                this.gameInProgress = false;
                this.gameEndedReason = 'game_ending_draw_stalemate';
            } else if (this.boardLogic.in_threefold_repetition()) {
                this.gameInProgress = false;
                this.gameEndedReason = 'game_ending_draw_three_fold_repetitions';
            } else if (this.boardLogic.insufficient_material()) {
                this.gameInProgress = false;
                this.gameEndedReason = 'game_ending_draw_missing_material';
            } else if (this.boardLogic.in_draw()) {
                this.gameInProgress = false;
                this.gameEndedReason = 'game_ending_draw_fifty_moves_rule';
            }
        },
        reactToTouch(event) {
            const canvas = this.$refs.canvas.nativeView;

            const rankAndFileToCoordinate = function(rank, file) {
                return `${String.fromCharCode('a'.charCodeAt(0) + file)}${String.fromCharCode('1'.charCodeAt(0) + rank)}`;
            }

            if (! this.gameInProgress) return;
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

                    canvas.redraw();
                    break;
                case 'move':
                    if (! this.dndActive) return;

                    this.dndDestCol = col;
                    this.dndDestRow = row;
                    this.dndMovedPieceLeft = event.getX() - this.halfCellSize;
                    this.dndMovedPieceTop = event.getY() - this.halfCellSize;

                    canvas.redraw();

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
                            this.boardOrientationBeforePromotionDialog = this.reversed;
                            this.promotionDialogOpened = true;
                        }
                        else {
                            this.boardLogic.move({from: this.startCellStr, to: this.endCellStr});
                            this.cancelDnd();
                            this.checkGameEndedStateAndNotifyUser();
                            canvas.redraw();
                        }
                    }
                    else {
                        this.cancelDnd();
                        canvas.redraw();
                    }
            }
        },
        drawBoard(event) {
            const { canvas } = event;

            this._drawBackground(canvas);
            this._drawCoordinates(canvas);
            this._drawCells(canvas);
            this._drawPieces(canvas);
            this._drawPlayerTurn(canvas);
            this._drawMovedPiece(canvas);
        },
        _drawBackground(canvas) {
            const paint = new Paint();
            paint.setColor(new Color(this.backgroundColor));
            paint.setStyle(Style.FILL);
            canvas.drawRect(createRect(0, 0, this.size, this.size), paint);
        },
        _drawCoordinates(canvas) {
            const paint = new Paint();
            paint.setColor(new Color(this.coordsColor));
            paint.setTextSize(this.cellSize * 0.4);
            paint.setAntiAlias(true);

            for (let row of [0,1,2,3,4,5,6,7]) {
                const text = this.rankCoords(row);
                const y = this.cellSize * (1.15 + row);
                const left = this.cellSize * 0.13;
                const right = this.cellSize * 8.63;

                canvas.drawText(text, left, y, paint);
                canvas.drawText(text, right, y, paint);
            }

            for (let col of [0,1,2,3,4,5,6,7]) {
                const text = this.fileCoords(col);
                const x = this.cellSize * (0.9 + col);
                const top = this.cellSize * 0.40;
                const bottom = this.cellSize * 8.90;

                canvas.drawText(text, x, top, paint);
                canvas.drawText(text, x, bottom, paint);
            }
        },
        _drawCells(canvas) {
            const paint = new Paint();
            paint.setStyle(Style.FILL);

            for (let row of [0,1,2,3,4,5,6,7]) {
                for (let col of [0,1,2,3,4,5,6,7]) {
                    const whiteCell = (row+col) %2 === 0;
                    let color = whiteCell ? this.whiteCellColor : this.blackCellColor;
                    
                    if (this.dndDestCol === col || this.dndDestRow === 7-row) color = 'green';
                    if (this.dndOriginCol === col && this.dndOriginRow === 7-row) color = 'red';
                    const x = this.cellSize * (0.5 + col);
                    const y = this.cellSize * (0.5 + row);

                    paint.setColor(new Color(color));
                    canvas.drawRect(createRect(x, y, this.cellSize, this.cellSize), paint);
                }
            }
        },
        _drawPieces(canvas) {
            for (let row of [0,1,2,3,4,5,6,7]) {
                for (let col of [0,1,2,3,4,5,6,7]) {
                    const rank = this.reversed ? row : 7-row;
                    const file = this.reversed ? 7-col : col;

                    const pieceImageShortcut = this.pieceImageShortcutAtRankFile(rank, file);
                    if (pieceImageShortcut === null) continue;

                    const image = this.piecesPictures[pieceImageShortcut];
                    const x = this.cellSize * (0.5 + col);
                    const y = this.cellSize * (0.5 + row);

                    canvas.drawBitmap(image, null, createRect(x, y, this.cellSize, this.cellSize), null);
                }
            }
        },
        _drawPlayerTurn(canvas) {
            const paint = new Paint();
            paint.setStyle(Style.FILL);
            paint.setColor(this.turnColor());

            const x = this.cellSize * 8.5;
            canvas.drawArc(createRect(x,x, this.halfCellSize, this.halfCellSize), 360, 360, true, paint);
        },
        _drawMovedPiece(canvas) {
            if (!this.dndActive) return;

            const image = this.piecesPictures[this.movedPieceImage()];
            if (image === null) return;

            const x = this.movedPieceLeft();
            const y = this.movedPieceTop();

            canvas.drawBitmap(image, null, createRect(x, y, this.cellSize, this.cellSize), null);
        }
    },
}
</script>

<style scoped>
    @keyframes fadeIn {
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
        animation-name: fadeIn;
		animation-duration: 1s;
		animation-fill-mode: forwards;
    }

    #promotionDialog Label {
        color: black;
    }

    #promotionDialog > #title {
        color: black;
    }

    #gameEndedText {
        opacity: 0;
        visibility: collapse;
    }

    #gameEndedText.opened {
        opacity: 0.6;
        visibility: visible;
        animation-name: fadeIn;
        animation-duration: 1s;
        animation-fill-mode: forwards;
    }
</style>
