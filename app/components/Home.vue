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
                <Label  class="button" @tap="toggleHistoryVisibility()">
                    <FormattedString>
                        <Span v-if="historyVisible" class="fa button" text.decode="&#xf43c;" fontSize="50" />
                        <Span v-else class="fa button" text.decode="&#xf1da;" fontSize="50" />
                    </FormattedString>
                </Label>
            </WrapLayout>
            <GridLayout :width="boardWidth" :height="boardWidth" columns="*" rows="*">
                <Chessboard ref="board" :size="boardWidth" :reversed="reversed" row="0" col="0" 
                    @movesan="addMoveSanToHistory($event)"
                    @newgame="resetHistoryForNewGame($event)"
                />
                <History ref="history" :size="boardWidth" row="0" col="0" :visibility="historyVisible ? 'visible' : 'hidden'" />
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
    import Chessboard from './chessboard/Chessboard.vue';
    import PlayerType from './chessboard/PlayerType';
    import History from './History';
    const platformModule = require("tns-core-modules/platform");

    export default {
        data() {
            return {
                reversed: false,
                historyVisible: false,
            }
        },
        methods: {
            newGame() {
                this.$refs['board'].startNewGame({
                    startPositionStr: '3K1k2/3P4/8/8/8/8/r7/7R w - - 0 32',
                    whitePlayerType: PlayerType.Computer,
                    blackPlayerType: PlayerType.Computer,
                });
            },
            reverseBoard() {
                this.reversed = ! this.reversed;
            },
            addMoveSanToHistory(eventObject) {
                this.$refs['history'].addSanMove(eventObject);
            },
            resetHistoryForNewGame(eventObject) {
                this.$refs['history'].startHistory(eventObject);
            },
            toggleHistoryVisibility() {
                this.historyVisible = !this.historyVisible;
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
            History,
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
