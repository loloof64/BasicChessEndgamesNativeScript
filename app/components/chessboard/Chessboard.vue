<template>
	<GridLayout columns="*,2*,2*,2*,2*,2*,2*,2*,2*,*" rows="*,2*,2*,2*,2*,2*,2*,2*,2*,*"
        :width="size" :height="size" :backgroundColor="backgroundColor">
        <Label row="0" col="0"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="1" :text="fileCoords[0]"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="2" :text="fileCoords[1]"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="3" :text="fileCoords[2]"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="4" :text="fileCoords[3]"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="5" :text="fileCoords[4]"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="6" :text="fileCoords[5]"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="7" :text="fileCoords[6]"
            :color="coordsColor"></Label>
        <Label coordinate :fontSize="fontSize" row="0" col="8" :text="fileCoords[7]"
            :color="coordsColor"></Label>
        <Label row="0" col="9"></Label>

        <Label :fontSize="fontSize" coordinate row="1" col="0" :text="rankCoords[0]"
            :color="coordsColor"></Label>
        <Label id="70" row="1" col="1" :backgroundColor="whiteCellColor"></Label>
        <Label id="71" row="1" col="2" :backgroundColor="blackCellColor"></Label>
        <Label id="72" row="1" col="3" :backgroundColor="whiteCellColor"></Label>
        <Label id="73" row="1" col="4" :backgroundColor="blackCellColor"></Label>
        <Label id="74" row="1" col="5" :backgroundColor="whiteCellColor"></Label>
        <Label id="75" row="1" col="6" :backgroundColor="blackCellColor"></Label>
        <Label id="76" row="1" col="7" :backgroundColor="whiteCellColor"></Label>
        <Label id="77" row="1" col="8" :backgroundColor="blackCellColor"></Label>
        <Label :fontSize="fontSize" coordinate row="1" col="9" :text="rankCoords[0]"
            :color="coordsColor"></Label>

        <Label coordinate :fontSize="fontSize" row="2" col="0" :text="rankCoords[1]"
            :color="coordsColor"></Label>
        <Label id="60" row="2" col="1" :backgroundColor="blackCellColor"></Label>
        <Label id="61" row="2" col="2" :backgroundColor="whiteCellColor"></Label>
        <Label id="62" row="2" col="3" :backgroundColor="blackCellColor"></Label>
        <Label id="63" row="2" col="4" :backgroundColor="whiteCellColor"></Label>
        <Label id="64" row="2" col="5" :backgroundColor="blackCellColor"></Label>
        <Label id="65" row="2" col="6" :backgroundColor="whiteCellColor"></Label>
        <Label id="66" row="2" col="7" :backgroundColor="blackCellColor"></Label>
        <Label id="67" row="2" col="8" :backgroundColor="whiteCellColor"></Label>
        <Label coordinate :fontSize="fontSize" row="2" col="9" :text="rankCoords[1]"
            :color="coordsColor"></Label>

        <Label :fontSize="fontSize" coordinate row="3" col="0" :text="rankCoords[2]"
            :color="coordsColor"></Label>
        <Label id="50" row="3" col="1" :backgroundColor="whiteCellColor"></Label>
        <Label id="51" row="3" col="2" :backgroundColor="blackCellColor"></Label>
        <Label id="52" row="3" col="3" :backgroundColor="whiteCellColor"></Label>
        <Label id="53" row="3" col="4" :backgroundColor="blackCellColor"></Label>
        <Label id="54" row="3" col="5" :backgroundColor="whiteCellColor"></Label>
        <Label id="55" row="3" col="6" :backgroundColor="blackCellColor"></Label>
        <Label id="56" row="3" col="7" :backgroundColor="whiteCellColor"></Label>
        <Label id="57" row="3" col="8" :backgroundColor="blackCellColor"></Label>
        <Label :fontSize="fontSize" coordinate row="3" col="9" :text="rankCoords[2]"
            :color="coordsColor"></Label>

        <Label :fontSize="fontSize" coordinate row="4" col="0" :text="rankCoords[3]"
            :color="coordsColor"></Label>
        <Label id="40" row="4" col="1" :backgroundColor="blackCellColor"></Label>
        <Label id="41" row="4" col="2" :backgroundColor="whiteCellColor"></Label>
        <Label id="42" row="4" col="3" :backgroundColor="blackCellColor"></Label>
        <Label id="43" row="4" col="4" :backgroundColor="whiteCellColor"></Label>
        <Label id="44" row="4" col="5" :backgroundColor="blackCellColor"></Label>
        <Label id="45" row="4" col="6" :backgroundColor="whiteCellColor"></Label>
        <Label id="46" row="4" col="7" :backgroundColor="blackCellColor"></Label>
        <Label id="47" row="4" col="8" :backgroundColor="whiteCellColor"></Label>
        <Label :fontSize="fontSize" coordinate row="4" col="9" :text="rankCoords[3]"
            :color="coordsColor"></Label>

        <Label :fontSize="fontSize" coordinate row="5" col="0" :text="rankCoords[4]"
            :color="coordsColor"></Label>
        <Label id="30" row="5" col="1" :backgroundColor="whiteCellColor"></Label>
        <Label id="31" row="5" col="2" :backgroundColor="blackCellColor"></Label>
        <Label id="32" row="5" col="3" :backgroundColor="whiteCellColor"></Label>
        <Label id="33" row="5" col="4" :backgroundColor="blackCellColor"></Label>
        <Label id="34" row="5" col="5" :backgroundColor="whiteCellColor"></Label>
        <Label id="35" row="5" col="6" :backgroundColor="blackCellColor"></Label>
        <Label id="36" row="5" col="7" :backgroundColor="whiteCellColor"></Label>
        <Label id="37" row="5" col="8" :backgroundColor="blackCellColor"></Label>
        <Label :fontSize="fontSize" coordinate row="5" col="9" :text="rankCoords[4]"
            :color="coordsColor"></Label>

        <Label :fontSize="fontSize" coordinate row="6" col="0" :text="rankCoords[5]"
            :color="coordsColor"></Label>
        <Label id="20" row="6" col="1" :backgroundColor="blackCellColor"></Label>
        <Label id="21" row="6" col="2" :backgroundColor="whiteCellColor"></Label>
        <Label id="22" row="6" col="3" :backgroundColor="blackCellColor"></Label>
        <Label id="23" row="6" col="4" :backgroundColor="whiteCellColor"></Label>
        <Label id="24" row="6" col="5" :backgroundColor="blackCellColor"></Label>
        <Label id="25" row="6" col="6" :backgroundColor="whiteCellColor"></Label>
        <Label id="26" row="6" col="7" :backgroundColor="blackCellColor"></Label>
        <Label id="27" row="6" col="8" :backgroundColor="whiteCellColor"></Label>
        <Label :fontSize="fontSize" coordinate row="6" col="9" :text="rankCoords[5]"
            :color="coordsColor"></Label>


        <Label :fontSize="fontSize" coordinate row="7" col="0" :text="rankCoords[6]"
            :color="coordsColor"></Label>
        <Label id="10" row="7" col="1" :backgroundColor="whiteCellColor"></Label>
        <Label id="11" row="7" col="2" :backgroundColor="blackCellColor"></Label>
        <Label id="12" row="7" col="3" :backgroundColor="whiteCellColor"></Label>
        <Label id="13" row="7" col="4" :backgroundColor="blackCellColor"></Label>
        <Label id="14" row="7" col="5" :backgroundColor="whiteCellColor"></Label>
        <Label id="15" row="7" col="6" :backgroundColor="blackCellColor"></Label>
        <Label id="16" row="7" col="7" :backgroundColor="whiteCellColor"></Label>
        <Label id="17" row="7" col="8" :backgroundColor="blackCellColor"></Label>
        <Label :fontSize="fontSize" coordinate row="7" col="9" :text="rankCoords[6]"
            :color="coordsColor"></Label>

        <Label :fontSize="fontSize" coordinate row="8" col="0" :text="rankCoords[7]"
            :color="coordsColor"></Label>
        <Label id="00" row="8" col="1" :backgroundColor="blackCellColor"></Label>
        <Label id="01" row="8" col="2" :backgroundColor="whiteCellColor"></Label>
        <Label id="02" row="8" col="3" :backgroundColor="blackCellColor"></Label>
        <Label id="03" row="8" col="4" :backgroundColor="whiteCellColor"></Label>
        <Label id="04" row="8" col="5" :backgroundColor="blackCellColor"></Label>
        <Label id="05" row="8" col="6" :backgroundColor="whiteCellColor"></Label>
        <Label id="06" row="8" col="7" :backgroundColor="blackCellColor"></Label>
        <Label id="07" row="8" col="8" :backgroundColor="whiteCellColor"></Label>
        <Label :fontSize="fontSize" coordinate row="8" col="9" :text="rankCoords[7]"
            :color="coordsColor"></Label>

        <Label row="9" col="0"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="1" :text="fileCoords[0]"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="2" :text="fileCoords[1]"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="3" :text="fileCoords[2]"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="4" :text="fileCoords[3]"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="5" :text="fileCoords[4]"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="6" :text="fileCoords[5]"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="7" :text="fileCoords[6]"
            :color="coordsColor"></Label>
        <Label :fontSize="fontSize" coordinate row="9" col="8" :text="fileCoords[7]"
            :color="coordsColor"></Label>
        <Label id="playerTurn" row="9" col="9"></Label>
    </GridLayout>
</template>

<script>
import Chess from 'chess.js';

const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

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
        };
    },
    computed: {
        fileCoords() {
            return this.reversed ? files.reverse() : files;
        },
        rankCoords() {
            return this.reversed ? ranks.reverse(): ranks;
        },
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
            return `~/chess_vectors/Chess_${imageBase}t45.svg`;
        },
        pieceImageAtRowCol(row, col) {
            const rank = this.reversed ? 7-row : row;
            const file = this.reversed ? 7-col : col;

            return this.pieceImageAtRankFile(rank, file);
        },
        piecePresentAtRowCol(row, col) {
            return this.pieceImageAtRowCol(row, col) === null ? 'hidden' : 'visible';
        }
    },
}
</script>

<style scoped>
    Label[coordinate] {
        text-align: center;
        vertical-align: middle;
    }
</style>
