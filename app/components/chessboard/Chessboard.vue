<template>
	<GridLayout columns="*,2*,2*,2*,2*,2*,2*,2*,2*,*" rows="*,2*,2*,2*,2*,2*,2*,2*,2*,*"
        :width="size" :height="size" :backgroundColor="backgroundColor" @touch="reactToTouch" @tap="testTap"
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
        <StackLayout row="9" col="9"><Label id="playerTurn" :backgroundColor="turnColor()" :borderRadius="halfCellSize / 2.0"/></StackLayout>
        <AbsoluteLayout rowSpan="10" colSpan="10" row="0" col="0">
            <Image :width="cellSize" :height="cellSize" :src="movedPieceImage()" :top="movedPieceTop()" :left="movedPieceLeft()" />
        </AbsoluteLayout>
    </GridLayout>
</template>

<script>
import Chess from 'chess.js';

const chess = new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

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
        reactToTouch(event) {
            const col = Math.floor((event.getX() - this.halfCellSize) / this.cellSize);
            const row = 7 - Math.floor((event.getY() - this.halfCellSize) / this.cellSize);
            const outsideZone = col < 0 || col > 7 || row < 0 || row > 7;

            const cancelDnd = () => {
                this.dndActive = false;
                this.dndOriginCol = undefined;
                this.dndOriginRow = undefined;
                this.dndDestCol = undefined;
                this.dndDestRow = undefined;
                this.dndMovedPieceTop = undefined;
                this.dndMovedPieceLeft = undefined;
                this.dndMovedPieceImage = undefined;
            }

            if (outsideZone) {
                cancelDnd();
            }

            switch(event.action) {
                case 'down':
                    const isAnEmptyCell = this.pieceImageAtRowCol(row, col) === null;
                    if (isAnEmptyCell) return;
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
                    cancelDnd();
                    break;
            }
        },
    },
}
</script>

<style scoped>
    Label[coordinate] {
        text-align: center;
        vertical-align: middle;
    }
</style>
