<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Home"></Label>
        </ActionBar>

        <StackLayout orientation="vertical">
            <WrapLayout dock="top" orientation="horizontal">
                <Label  class="button" @tap="newGame()">
                    <FormattedString>
                        <Span class="fa button" text.decode="&#xf11e;" fontSize="50" />
                    </FormattedString>
                </Label>
                <Label  class="button" @tap="reverseBoard()">
                    <FormattedString>
                        <Span class="fa button" text.decode="&#xf338;" fontSize="50" />
                    </FormattedString>
                </Label>
            </WrapLayout>
            <Chessboard ref="board" :size="boardWidth" :reversed="reversed"></Chessboard>
        </StackLayout>
    </Page>
</template>

<script>
    import Chessboard from './chessboard/Chessboard.vue';
    import PlayerType from './chessboard/PlayerType';
    const platformModule = require("tns-core-modules/platform");

    export default {
        data() {
            return {
                reversed: false,
            }
        },
        methods: {
            newGame() {
                this.$refs['board'].startNewGame({
                    startPositionStr: 'bb6/krP5/pp6/8/8/8/8/4K3 w - - 0 1',
                    whitePlayerType: PlayerType.Computer,
                    blackPlayerType: PlayerType.Human,
                });
            },
            reverseBoard() {
                this.reversed = ! this.reversed;
            }
        },
        computed: {
            boardWidth() {
                const screenWidth = platformModule.screen.mainScreen.widthDIPs;
                const screenHeight = platformModule.screen.mainScreen.heightDIPs;

                return screenWidth < screenHeight ? screenWidth : screenHeight;
            }
        },
        components: {
            Chessboard,
        }
    };
</script>

<style scoped lang="scss">
    @import '../app-variables';

    .fa {
        color: $accent-dark;
    }

    Label.button {
        margin: 10 20;
        border-color: $accent-dark;
        border-width: 2;
        padding: 3;
        width: 60;
        height: 60;
        text-align: center;
    }
</style>
