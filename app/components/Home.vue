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
            <Chessboard :size="boardWidth" :reversed="false"></Chessboard>
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

    .info {
        font-size: 20;
    }
</style>
