<template>
    <GridLayout
        columns="*,2*,2*,2*,2*,2*,2*,2*,2*,*"
        rows="*,2*,2*,2*,2*,2*,2*,2*,2*,*"
        :width="size"
        :height="size"
        :backgroundColor="backgroundColor"
    >
        <Label row="0" col="0" text=""></Label>
        <Label row="0" col="1" :text="fileCoords[0]" :color="coordsColor"></Label>
        <Label row="0" col="2" :text="fileCoords[1]" :color="coordsColor"></Label>
        <Label row="0" col="3" :text="fileCoords[2]" :color="coordsColor"></Label>
        <Label row="0" col="4" :text="fileCoords[3]" :color="coordsColor"></Label>
        <Label row="0" col="5" :text="fileCoords[4]" :color="coordsColor"></Label>
        <Label row="0" col="6" :text="fileCoords[5]" :color="coordsColor"></Label>
        <Label row="0" col="7" :text="fileCoords[6]" :color="coordsColor"></Label>
        <Label row="0" col="8" :text="fileCoords[7]" :color="coordsColor"></Label>
        <Label row="0" col="9" text=""></Label>

        <Label row="1" col="0" :text="rankCoords[0]" :color="coordsColor"></Label>
        <Label id="80" row="1" col="1" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="81" row="1" col="2" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="82" row="1" col="3" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="83" row="1" col="4" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="84" row="1" col="5" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="85" row="1" col="6" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="86" row="1" col="7" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="87" row="1" col="8" text="" :backgroundColor="blackCellColor"></Label>
        <Label row="1" col="9" :text="rankCoords[0]" :color="coordsColor"></Label>

        <Label row="2" col="0" :text="rankCoords[1]" :color="coordsColor"></Label>
        <Label id="70" row="2" col="1" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="71" row="2" col="2" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="72" row="2" col="3" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="73" row="2" col="4" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="74" row="2" col="5" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="75" row="2" col="6" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="76" row="2" col="7" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="77" row="2" col="8" text="" :backgroundColor="whiteCellColor"></Label>
        <Label row="2" col="9" :text="rankCoords[1]" :color="coordsColor"></Label>

        <Label row="3" col="0" :text="rankCoords[2]" :color="coordsColor"></Label>
        <Label id="60" row="3" col="1" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="61" row="3" col="2" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="62" row="3" col="3" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="63" row="3" col="4" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="64" row="3" col="5" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="65" row="3" col="6" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="66" row="3" col="7" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="67" row="3" col="8" text="" :backgroundColor="blackCellColor"></Label>
        <Label row="3" col="9" :text="rankCoords[2]" :color="coordsColor"></Label>

        <Label row="4" col="0" :text="rankCoords[3]" :color="coordsColor"></Label>
        <Label id="50" row="4" col="1" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="51" row="4" col="2" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="52" row="4" col="3" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="53" row="4" col="4" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="54" row="4" col="5" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="55" row="4" col="6" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="56" row="4" col="7" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="57" row="4" col="8" text="" :backgroundColor="whiteCellColor"></Label>
        <Label row="4" col="9" :text="rankCoords[3]" :color="coordsColor"></Label>

        <Label row="5" col="0" :text="rankCoords[4]" :color="coordsColor"></Label>
        <Label id="40" row="5" col="1" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="41" row="5" col="2" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="42" row="5" col="3" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="43" row="5" col="4" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="44" row="5" col="5" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="45" row="5" col="6" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="46" row="5" col="7" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="47" row="5" col="8" text="" :backgroundColor="blackCellColor"></Label>
        <Label row="5" col="9" :text="rankCoords[4]" :color="coordsColor"></Label>

        <Label row="6" col="0" :text="rankCoords[5]" :color="coordsColor"></Label>
        <Label id="30" row="6" col="1" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="31" row="6" col="2" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="32" row="6" col="3" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="33" row="6" col="4" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="34" row="6" col="5" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="35" row="6" col="6" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="36" row="6" col="7" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="37" row="6" col="8" text="" :backgroundColor="whiteCellColor"></Label>
        <Label row="6" col="9" :text="rankCoords[5]" :color="coordsColor"></Label>


        <Label row="7" col="0" :text="rankCoords[6]" :color="coordsColor"></Label>
        <Label id="20" row="7" col="1" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="21" row="7" col="2" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="22" row="7" col="3" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="23" row="7" col="4" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="24" row="7" col="5" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="25" row="7" col="6" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="26" row="7" col="7" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="27" row="7" col="8" text="" :backgroundColor="blackCellColor"></Label>
        <Label row="7" col="9" :text="rankCoords[6]" :color="coordsColor"></Label>

        <Label row="8" col="0" :text="rankCoords[7]" :color="coordsColor"></Label>
        <Label id="30" row="8" col="1" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="31" row="8" col="2" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="32" row="8" col="3" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="33" row="8" col="4" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="34" row="8" col="5" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="35" row="8" col="6" text="" :backgroundColor="whiteCellColor"></Label>
        <Label id="36" row="8" col="7" text="" :backgroundColor="blackCellColor"></Label>
        <Label id="37" row="8" col="8" text="" :backgroundColor="whiteCellColor"></Label>
        <Label row="8" col="9" :text="rankCoords[7]" :color="coordsColor"></Label>

        <Label row="9" col="0" text=""></Label>
        <Label row="9" col="1" :text="fileCoords[0]" :color="coordsColor"></Label>
        <Label row="9" col="2" :text="fileCoords[1]" :color="coordsColor"></Label>
        <Label row="9" col="3" :text="fileCoords[2]" :color="coordsColor"></Label>
        <Label row="9" col="4" :text="fileCoords[3]" :color="coordsColor"></Label>
        <Label row="9" col="5" :text="fileCoords[4]" :color="coordsColor"></Label>
        <Label row="9" col="6" :text="fileCoords[5]" :color="coordsColor"></Label>
        <Label row="9" col="7" :text="fileCoords[6]" :color="coordsColor"></Label>
        <Label row="9" col="8" :text="fileCoords[7]" :color="coordsColor"></Label>
        <Label id="playerTurn" row="9" col="9" text=""></Label>
    </GridLayout>
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
        }
    },
    data() {
        return {
            reversed: false,
        };
    },
    computed: {
        fileCoords() {
            return this.reversed ? files.reverse() : files;
        },
        rankCoords() {
            return this.reversed ? ranks.reverse(): ranks;
        }
    },
}
</script>

<style scoped>
    Label {
        text-align: center;
    }
</style>
