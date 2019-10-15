<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Home"></Label>
        </ActionBar>

        <StackLayout orientation="vertical">
            <WrapLayout dock="top" orientation="horizontal">
                <Label  class="button" @tap="newGame()">
                    <FormattedString>
                        <Span class="fa button" text.decode="&#xf11e;" fontSize="30" />
                    </FormattedString>
                </Label>
                <Label  class="button" @tap="reverseBoard()">
                    <FormattedString>
                        <Span class="fa button" text.decode="&#xf338;" fontSize="30" />
                    </FormattedString>
                </Label>
                <Label  class="button" @tap="toggleHistoryVisibility()">
                    <FormattedString>
                        <Span v-if="historyVisible" class="fa button" text.decode="&#xf43c;" fontSize="30" />
                        <Span v-else class="fa button" text.decode="&#xf1da;" fontSize="30" />
                    </FormattedString>
                </Label>
                <Label  class="button" @tap="requestGameStop()">
                    <FormattedString>
                        <Span class="fa button" text.decode="&#xf28d;" fontSize="30" />
                    </FormattedString>
                </Label>
            </WrapLayout>
            <GridLayout :width="boardWidth" :height="boardWidth" columns="*" rows="*">
                <Chessboard ref="board" :size="boardWidth" :reversed="reversed" row="0" col="0" 
                    @movesan="addMoveSanToHistory($event)"
                    @newgame="resetHistoryForNewGame($event)"
                />
                <History ref="history" :size="boardWidth" row="0" col="0" 
                    :visibility="historyVisible ? 'visible' : 'hidden'" 
                    @gotohistory="gotoHistory($event)"
                />
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
    import Chessboard from './chessboard/Chessboard.vue';
    import PlayerType from './chessboard/PlayerType';
    import History from './History';
    const platformModule = require("tns-core-modules/platform");
    import { localize } from "nativescript-localize";
    import Vue from "nativescript-vue";

    Vue.filter("L", localize);

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
            gotoHistory(eventObject) {
                this.$refs['board'].gotoHistory(eventObject);
                this.historyVisible = false;
            },
            toggleHistoryVisibility() {
                this.historyVisible = !this.historyVisible;
            },
            requestGameStop() {
                const board = this.$refs['board'];
                if (!board.gameIsRunning()) return;

                confirm(localize('confirm_stop_game')).then(result => {
                    if (result) {
                        board.stopGame();
                    }
                });
            },
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
        margin: 10;
        border-color: $accent-dark;
        border-width: 2;
        padding: 3;
        width: 40;
        height: 40;
        text-align: center;
    }
</style>
