<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" :text="'game_title' | L"></Label>
        </ActionBar>

        <StackLayout orientation="vertical">
            <WrapLayout dock="top" orientation="horizontal">
                <Label class="button" @tap="newGame()">
                    <FormattedString>
                        <Span class="fa button" text.decode="&#xf11e;" fontSize="30" />
                    </FormattedString>
                </Label>
                <Label class="button" @tap="reverseBoard()">
                    <FormattedString>
                        <Span class="fa button" text.decode="&#xf338;" fontSize="30" />
                    </FormattedString>
                </Label>
                <Label class="button" @tap="toggleHistoryVisibility()">
                    <FormattedString>
                        <Span v-if="historyVisible" class="fa button" text.decode="&#xf43c;" fontSize="30" />
                        <Span v-else class="fa button" text.decode="&#xf1da;" fontSize="30" />
                    </FormattedString>
                </Label>
                <Label class="button" @tap="requestGameStop()">
                    <FormattedString>
                        <Span class="fa button" text.decode="&#xf28d;" fontSize="30" />
                    </FormattedString>
                </Label>
            </WrapLayout>
            <GridLayout :width="boardWidth" :height="boardWidth" columns="*" rows="*">
                <Chessboard ref="board" :size="boardWidth" :reversed="reversed" row="0" col="0" 
                    @movesan="addMoveSanToHistory($event)"
                    @newgame="resetHistoryForNewGame($event)"
                    @gameended="() => historyAvailable = true"
                    @historyselection="highlightHistoryMove($event)"
                />
                <History ref="history" :size="boardWidth" row="0" col="0" 
                    :visibility="historyVisible ? 'visible' : 'hidden'" 
                    @gotohistory="gotoHistory($event)"
                />
            </GridLayout>
            <WrapLayout dock="bottom" orientation="horizontal" :visibility="historyAvailable ? 'visible' : 'hidden'">
                <Label class="button" @tap="gotoHistory('first')">
                    <FormattedString>
                        <Span class="fa button" text.decode="&#xf04a;" fontSize="30" />
                    </FormattedString>
                </Label>
                <Label class="button" @tap="gotoHistory('previous')">
                    <FormattedString>
                        <Span class="fa button" text.decode="&#xf048;" fontSize="30" />
                    </FormattedString>
                </Label>
                <Label class="button" @tap="gotoHistory('next')">
                    <FormattedString>
                        <Span class="fa button" text.decode="&#xf051;" fontSize="30" />
                    </FormattedString>
                </Label>
                <Label class="button" @tap="gotoHistory('last')">
                    <FormattedString>
                        <Span class="fa button" text.decode="&#xf04e;" fontSize="30" />
                    </FormattedString>
                </Label>
            </WrapLayout>
        </StackLayout>
    </Page>
</template>

<script>
    import Chessboard from '../components/chessboard/Chessboard.vue';
    import PlayerType from '../components/chessboard/PlayerType';
    import History from '../components/History';
    const platformModule = require("tns-core-modules/platform");
    import { localize } from "nativescript-localize";
    import Vue from "nativescript-vue";

    Vue.filter("L", localize);

    export default {
        data() {
            return {
                reversed: false,
                historyVisible: false,
                historyAvailable: false,
            }
        },
        props: [
            'position',
        ],
        methods: {
            newGame() {
                const userHasWhite = this.position.split(" ")[1] === 'w';
                const whitePlayer = userHasWhite ? PlayerType.Human : PlayerType.Computer;
                const blackPlayer = userHasWhite ? PlayerType.Computer : PlayerType.Human;
                this.$refs['board'].startNewGame({
                    startPositionStr: this.position,
                    whitePlayerType: whitePlayer,
                    blackPlayerType: blackPlayer,
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
                this.historyAvailable = false;
            },
            gotoHistory(eventObject) {
                const board = this.$refs['board'];
                if (board.gameIsRunning()) return;

                board.gotoHistory(eventObject);
                this.historyVisible = false;
            },
            toggleHistoryVisibility() {
                this.historyVisible = !this.historyVisible;
            },
            requestGameStop() {
                const board = this.$refs['board'];
                if (!board.gameIsRunning()) return;

                confirm({
                    title: localize('stop_game_title'),
                    message: localize('confirm_stop_game'),
                    okButtonText: localize('ok_button'),
                    cancelButtonText: localize('cancel_button'),
                }).then(result => {
                    if (result) {
                        board.stopGame();
                        this.historyAvailable = true;
                    }
                });
            },
            highlightHistoryMove(eventObject) {
                this.$refs['history'].highlightHistoryMove(eventObject);
            },
        },
        computed: {
            boardWidth() {
                const screenWidth = platformModule.screen.mainScreen.widthDIPs;
                const screenHeight = platformModule.screen.mainScreen.heightDIPs;

                return screenWidth < screenHeight ? screenWidth : screenHeight;
            }
        },
        mounted: function() {
            this.newGame();
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
