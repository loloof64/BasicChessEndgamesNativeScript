<template>
	<StackLayout :width="size" :height="size" :backgroundColor="backgroundColor">
        <FlexboxLayout justifyContent="center" alignItems="center" :width="size" :height="halfCellSize">
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="halfCellSize" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[0]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[1]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[2]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[3]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[4]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[5]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[6]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[7]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="halfCellSize" />
        </FlexboxLayout>

        <FlexboxLayout justifyContent="center" alignItems="center" :width="size" :height="cellSize">
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[0]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[0]" :color="coordsColor" />
        </FlexboxLayout>

        <FlexboxLayout justifyContent="center" alignItems="center" :width="size" :height="cellSize">
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[1]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[1]" :color="coordsColor" />
        </FlexboxLayout>

        <FlexboxLayout justifyContent="center" alignItems="center" :width="size" :height="cellSize">
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[2]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[2]" :color="coordsColor" />
        </FlexboxLayout>

        <FlexboxLayout justifyContent="center" alignItems="center" :width="size" :height="cellSize">
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[3]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[3]" :color="coordsColor" />
        </FlexboxLayout>

        <FlexboxLayout justifyContent="center" alignItems="center" :width="size" :height="cellSize">
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[4]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[4]" :color="coordsColor" />
        </FlexboxLayout>

        <FlexboxLayout justifyContent="center" alignItems="center" :width="size" :height="cellSize">
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[5]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[5]" :color="coordsColor" />
        </FlexboxLayout>

        <FlexboxLayout justifyContent="center" alignItems="center" :width="size" :height="cellSize">
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[6]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[6]" :color="coordsColor" />
        </FlexboxLayout>

        <FlexboxLayout justifyContent="center" alignItems="center" :width="size" :height="cellSize">
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[7]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="blackCellColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="cellSize" :backgroundColor="whiteCellColor" />
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="cellSize" :fontSize="fontSize" :text="rankCoords[7]" :color="coordsColor" />
        </FlexboxLayout>

        <FlexboxLayout justifyContent="center" alignItems="center" :width="size" :height="halfCellSize">
            <Label justifyContent="center" alignItems="center" :width="halfCellSize" :height="halfCellSize" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[0]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[1]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[2]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[3]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[4]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[5]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[6]" :color="coordsColor" />
            <Label justifyContent="center" alignItems="center" :width="cellSize" :height="halfCellSize" :fontSize="fontSize" :text="fileCoords[7]" :color="coordsColor" />
            <Label id="playerTurn" :width="halfCellSize" :height="halfCellSize" />
        </FlexboxLayout>
	</StackLayout>
</template>

<script>
const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

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
        }
    },
    data() {
        return {

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
}
</script>

<style scoped>
    Label {
        text-align: center;
    }
</style>
