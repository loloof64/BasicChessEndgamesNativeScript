<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Home"></Label>
        </ActionBar>

        <DockLayout orientation="vertical">
            <WebViewExt dock="top" src="~/stockfish/index.html"
                width="0" height="0"
                @loadFinished="onWebViewLoaded"
            />
            <WrapLayout dock="top" orqientation="horizontal">
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
        </DockLayout>
    </Page>
</template>

<script>
    import "@nota/nativescript-webview-ext/vue";
    import Chessboard from './chessboard/Chessboard.vue';
    const platformModule = require("tns-core-modules/platform");

    export default {
        data() {
            return {
                webview: undefined,
                reversed: false,
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
            newGame() {
                this.$refs['board'].startNewGame();
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
