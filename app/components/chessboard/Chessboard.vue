<template>
	<GridLayout columns="*,2*,2*,2*,2*,2*,2*,2*,2*,*" rows="*,2*,2*,2*,2*,2*,2*,2*,2*,*"
        :width="size" :height="size" :backgroundColor="backgroundColor" @touch="reactToTouch" @tap="testTap"
        >
        <Label row="0" col="0"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="1" :text="fileCoords(0)"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="2" :text="fileCoords(1)"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="3" :text="fileCoords(2)"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="4" :text="fileCoords(3)"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="5" :text="fileCoords(4)"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="6" :text="fileCoords(5)"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="7" :text="fileCoords(6)"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="8" :text="fileCoords(7)"
            :color="coordsColor"></Label>
        <Label row="0" col="9"></Label>

        <Label :fontSize="fontSize" coordinate row="1" col="0" :text="rankCoords(0)"
            :color="coordsColor"></Label>
        <StackLayout id="70" row="1" col="1" :backgroundColor="cellBackgroundRowCol(7,0)"><Image :src="pieceImageAtRowCol(7, 0)"/></StackLayout>
        <StackLayout id="71" row="1" col="2" :backgroundColor="cellBackgroundRowCol(7,1)"><Image :src="pieceImageAtRowCol(7, 1)"/></StackLayout>
        <StackLayout id="72" row="1" col="3" :backgroundColor="cellBackgroundRowCol(7,2)"><Image :src="pieceImageAtRowCol(7, 2)"/></StackLayout>
        <StackLayout id="73" row="1" col="4" :backgroundColor="cellBackgroundRowCol(7,3)"><Image :src="pieceImageAtRowCol(7, 3)"/></StackLayout>
        <StackLayout id="74" row="1" col="5" :backgroundColor="cellBackgroundRowCol(7,4)"><Image :src="pieceImageAtRowCol(7, 4)"/></StackLayout>
        <StackLayout id="75" row="1" col="6" :backgroundColor="cellBackgroundRowCol(7,5)"><Image :src="pieceImageAtRowCol(7, 5)"/></StackLayout>
        <StackLayout id="76" row="1" col="7" :backgroundColor="cellBackgroundRowCol(7,6)"><Image :src="pieceImageAtRowCol(7, 6)"/></StackLayout>
        <StackLayout id="77" row="1" col="8" :backgroundColor="cellBackgroundRowCol(7,7)"><Image :src="pieceImageAtRowCol(7, 7)"/></StackLayout>
        <Label :fontSize="fontSize" coordinate row="1" col="9" :text="rankCoords(0)"
            :color="coordsColor"></Label>

        <Label coordinate :fontSize="fontSize" row="2" col="0" :text="rankCoords(1)"
            :color="coordsColor"></Label>
        <StackLayout id="60" row="2" col="1" :backgroundColor="cellBackgroundRowCol(6,0)"><Image :src="pieceImageAtRowCol(6, 0)"/></StackLayout>
        <StackLayout id="61" row="2" col="2" :backgroundColor="cellBackgroundRowCol(6,1)"><Image :src="pieceImageAtRowCol(6, 1)"/></StackLayout>
        <StackLayout id="62" row="2" col="3" :backgroundColor="cellBackgroundRowCol(6,2)"><Image :src="pieceImageAtRowCol(6, 2)"/></StackLayout>
        <StackLayout id="63" row="2" col="4" :backgroundColor="cellBackgroundRowCol(6,3)"><Image :src="pieceImageAtRowCol(6, 3)"/></StackLayout>
        <StackLayout id="64" row="2" col="5" :backgroundColor="cellBackgroundRowCol(6,4)"><Image :src="pieceImageAtRowCol(6, 4)"/></StackLayout>
        <StackLayout id="65" row="2" col="6" :backgroundColor="cellBackgroundRowCol(6,5)"><Image :src="pieceImageAtRowCol(6, 5)"/></StackLayout>
        <StackLayout id="66" row="2" col="7" :backgroundColor="cellBackgroundRowCol(6,6)"><Image :src="pieceImageAtRowCol(6, 6)"/></StackLayout>
        <StackLayout id="67" row="2" col="8" :backgroundColor="cellBackgroundRowCol(6,7)"><Image :src="pieceImageAtRowCol(6, 7)"/></StackLayout>
        <Label coordinate :fontSize="fontSize" row="2" col="9" :text="rankCoords(1)"
            :color="coordsColor"></Label>

        <Label :fontSize="fontSize" coordinate row="3" col="0" :text="rankCoords(2)"
            :color="coordsColor"></Label>
        <StackLayout id="50" row="3" col="1" :backgroundColor="cellBackgroundRowCol(5,0)"><Image :src="pieceImageAtRowCol(5, 0)"/></StackLayout>
        <StackLayout id="51" row="3" col="2" :backgroundColor="cellBackgroundRowCol(5,1)"><Image :src="pieceImageAtRowCol(5, 1)"/></StackLayout>
        <StackLayout id="52" row="3" col="3" :backgroundColor="cellBackgroundRowCol(5,2)"><Image :src="pieceImageAtRowCol(5, 2)"/></StackLayout>
        <StackLayout id="53" row="3" col="4" :backgroundColor="cellBackgroundRowCol(5,3)"><Image :src="pieceImageAtRowCol(5, 3)"/></StackLayout>
        <StackLayout id="54" row="3" col="5" :backgroundColor="cellBackgroundRowCol(5,4)"><Image :src="pieceImageAtRowCol(5, 4)"/></StackLayout>
        <StackLayout id="55" row="3" col="6" :backgroundColor="cellBackgroundRowCol(5,5)"><Image :src="pieceImageAtRowCol(5, 5)"/></StackLayout>
        <StackLayout id="56" row="3" col="7" :backgroundColor="cellBackgroundRowCol(5,6)"><Image :src="pieceImageAtRowCol(5, 6)"/></StackLayout>
        <StackLayout id="57" row="3" col="8" :backgroundColor="cellBackgroundRowCol(5,7)"><Image :src="pieceImageAtRowCol(5, 7)"/></StackLayout>
        <Label :fontSize="fontSize" coordinate row="3" col="9" :text="rankCoords(2)"
            :color="coordsColor"></Label>

        <Label :fontSize="fontSize" coordinate row="4" col="0" :text="rankCoords(3)"
            :color="coordsColor"></Label>
        <StackLayout id="40" row="4" col="1" :backgroundColor="cellBackgroundRowCol(4,0)"><Image :src="pieceImageAtRowCol(4, 0)"/></StackLayout>
        <StackLayout id="41" row="4" col="2" :backgroundColor="cellBackgroundRowCol(4,1)"><Image :src="pieceImageAtRowCol(4, 1)"/></StackLayout>
        <StackLayout id="42" row="4" col="3" :backgroundColor="cellBackgroundRowCol(4,2)"><Image :src="pieceImageAtRowCol(4, 2)"/></StackLayout>
        <StackLayout id="43" row="4" col="4" :backgroundColor="cellBackgroundRowCol(4,3)"><Image :src="pieceImageAtRowCol(4, 3)"/></StackLayout>
        <StackLayout id="44" row="4" col="5" :backgroundColor="cellBackgroundRowCol(4,4)"><Image :src="pieceImageAtRowCol(4, 4)"/></StackLayout>
        <StackLayout id="45" row="4" col="6" :backgroundColor="cellBackgroundRowCol(4,5)"><Image :src="pieceImageAtRowCol(4, 5)"/></StackLayout>
        <StackLayout id="46" row="4" col="7" :backgroundColor="cellBackgroundRowCol(4,6)"><Image :src="pieceImageAtRowCol(4, 6)"/></StackLayout>
        <StackLayout id="47" row="4" col="8" :backgroundColor="cellBackgroundRowCol(4,7)"><Image :src="pieceImageAtRowCol(4, 7)"/></StackLayout>
        <Label :fontSize="fontSize" coordinate row="4" col="9" :text="rankCoords(3)"
            :color="coordsColor"></Label>

        <Label :fontSize="fontSize" coordinate row="5" col="0" :text="rankCoords(4)"
            :color="coordsColor"></Label>
        <StackLayout id="30" row="5" col="1" :backgroundColor="cellBackgroundRowCol(3,0)"><Image :src="pieceImageAtRowCol(3, 0)"/></StackLayout>
        <StackLayout id="31" row="5" col="2" :backgroundColor="cellBackgroundRowCol(3,1)"><Image :src="pieceImageAtRowCol(3, 1)"/></StackLayout>
        <StackLayout id="32" row="5" col="3" :backgroundColor="cellBackgroundRowCol(3,2)"><Image :src="pieceImageAtRowCol(3, 2)"/></StackLayout>
        <StackLayout id="33" row="5" col="4" :backgroundColor="cellBackgroundRowCol(3,3)"><Image :src="pieceImageAtRowCol(3, 3)"/></StackLayout>
        <StackLayout id="34" row="5" col="5" :backgroundColor="cellBackgroundRowCol(3,4)"><Image :src="pieceImageAtRowCol(3, 4)"/></StackLayout>
        <StackLayout id="35" row="5" col="6" :backgroundColor="cellBackgroundRowCol(3,5)"><Image :src="pieceImageAtRowCol(3, 5)"/></StackLayout>
        <StackLayout id="36" row="5" col="7" :backgroundColor="cellBackgroundRowCol(3,6)"><Image :src="pieceImageAtRowCol(3, 6)"/></StackLayout>
        <StackLayout id="37" row="5" col="8" :backgroundColor="cellBackgroundRowCol(3,7)"><Image :src="pieceImageAtRowCol(3, 7)"/></StackLayout>
        <Label :fontSize="fontSize" coordinate row="5" col="9" :text="rankCoords(4)"
            :color="coordsColor"></Label>

        <Label :fontSize="fontSize" coordinate row="6" col="0" :text="rankCoords(5)"
            :color="coordsColor"></Label>
        <StackLayout id="20" row="6" col="1" :backgroundColor="cellBackgroundRowCol(2,0)"><Image :src="pieceImageAtRowCol(2, 0)"/></StackLayout>
        <StackLayout id="21" row="6" col="2" :backgroundColor="cellBackgroundRowCol(2,1)"><Image :src="pieceImageAtRowCol(2, 1)"/></StackLayout>
        <StackLayout id="22" row="6" col="3" :backgroundColor="cellBackgroundRowCol(2,2)"><Image :src="pieceImageAtRowCol(2, 2)"/></StackLayout>
        <StackLayout id="23" row="6" col="4" :backgroundColor="cellBackgroundRowCol(2,3)"><Image :src="pieceImageAtRowCol(2, 3)"/></StackLayout>
        <StackLayout id="24" row="6" col="5" :backgroundColor="cellBackgroundRowCol(2,4)"><Image :src="pieceImageAtRowCol(2, 4)"/></StackLayout>
        <StackLayout id="25" row="6" col="6" :backgroundColor="cellBackgroundRowCol(2,5)"><Image :src="pieceImageAtRowCol(2, 5)"/></StackLayout>
        <StackLayout id="26" row="6" col="7" :backgroundColor="cellBackgroundRowCol(2,6)"><Image :src="pieceImageAtRowCol(2, 6)"/></StackLayout>
        <StackLayout id="27" row="6" col="8" :backgroundColor="cellBackgroundRowCol(2,7)"><Image :src="pieceImageAtRowCol(2, 7)"/></StackLayout>
        <Label :fontSize="fontSize" coordinate row="6" col="9" :text="rankCoords(5)"
            :color="coordsColor"></Label>


        <Label :fontSize="fontSize" coordinate row="7" col="0" :text="rankCoords(6)"
            :color="coordsColor"></Label>
        <StackLayout id="10" row="7" col="1" :backgroundColor="cellBackgroundRowCol(1,0)"><Image :src="pieceImageAtRowCol(1, 0)"/></StackLayout>
        <StackLayout id="11" row="7" col="2" :backgroundColor="cellBackgroundRowCol(1,1)"><Image :src="pieceImageAtRowCol(1, 1)"/></StackLayout>
        <StackLayout id="12" row="7" col="3" :backgroundColor="cellBackgroundRowCol(1,2)"><Image :src="pieceImageAtRowCol(1, 2)"/></StackLayout>
        <StackLayout id="13" row="7" col="4" :backgroundColor="cellBackgroundRowCol(1,3)"><Image :src="pieceImageAtRowCol(1, 3)"/></StackLayout>
        <StackLayout id="14" row="7" col="5" :backgroundColor="cellBackgroundRowCol(1,4)"><Image :src="pieceImageAtRowCol(1, 4)"/></StackLayout>
        <StackLayout id="15" row="7" col="6" :backgroundColor="cellBackgroundRowCol(1,5)"><Image :src="pieceImageAtRowCol(1, 5)"/></StackLayout>
        <StackLayout id="16" row="7" col="7" :backgroundColor="cellBackgroundRowCol(1,6)"><Image :src="pieceImageAtRowCol(1, 6)"/></StackLayout>
        <StackLayout id="17" row="7" col="8" :backgroundColor="cellBackgroundRowCol(1,7)"><Image :src="pieceImageAtRowCol(1, 7)"/></StackLayout>
        <Label :fontSize="fontSize" coordinate row="7" col="9" :text="rankCoords(6)"
            :color="coordsColor"></Label>

        <Label :fontSize="fontSize" coordinate row="8" col="0" :text="rankCoords(7)"
            :color="coordsColor"></Label>
        <StackLayout id="00" row="8" col="1" :backgroundColor="cellBackgroundRowCol(0,0)"><Image :src="pieceImageAtRowCol(0, 0)"/></StackLayout>
        <StackLayout id="01" row="8" col="2" :backgroundColor="cellBackgroundRowCol(0,1)"><Image :src="pieceImageAtRowCol(0, 1)"/></StackLayout>
        <StackLayout id="02" row="8" col="3" :backgroundColor="cellBackgroundRowCol(0,2)"><Image :src="pieceImageAtRowCol(0, 2)"/></StackLayout>
        <StackLayout id="03" row="8" col="4" :backgroundColor="cellBackgroundRowCol(0,3)"><Image :src="pieceImageAtRowCol(0, 3)"/></StackLayout>
        <StackLayout id="04" row="8" col="5" :backgroundColor="cellBackgroundRowCol(0,4)"><Image :src="pieceImageAtRowCol(0, 4)"/></StackLayout>
        <StackLayout id="05" row="8" col="6" :backgroundColor="cellBackgroundRowCol(0,5)"><Image :src="pieceImageAtRowCol(0, 5)"/></StackLayout>
        <StackLayout id="06" row="8" col="7" :backgroundColor="cellBackgroundRowCol(0,6)"><Image :src="pieceImageAtRowCol(0, 6)"/></StackLayout>
        <StackLayout id="07" row="8" col="8" :backgroundColor="cellBackgroundRowCol(0,7)"><Image :src="pieceImageAtRowCol(0, 7)"/></StackLayout>
        <Label :fontSize="fontSize" coordinate row="8" col="9" :text="rankCoords(7)"
            :color="coordsColor"></Label>

        <Label row="9" col="0"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="1" :text="fileCoords(0)"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="2" :text="fileCoords(1)"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="3" :text="fileCoords(2)"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="4" :text="fileCoords(3)"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="5" :text="fileCoords(4)"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="6" :text="fileCoords(5)"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="7" :text="fileCoords(6)"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="8" :text="fileCoords(7)"
            :color="coordsColor"></Label>
        <StackLayout row="9" col="9"><Label id="playerTurn" :backgroundColor="turnColor()" :borderRadius="halfCellSize / 2.0"/></StackLayout>
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
            }

            if (outsideZone) {
                cancelDnd();
            }

            switch(event.action) {
                case 'down':
                    this.dndActive = true;
                    this.dndOriginCol = col;
                    this.dndOriginRow = row;
                    this.dndDestCol = col;
                    this.dndDestRow = row;
                    break;
                case 'move':
                    if (! this.dndActive) return;
                    this.dndDestCol = col;
                    this.dndDestRow = row;
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
