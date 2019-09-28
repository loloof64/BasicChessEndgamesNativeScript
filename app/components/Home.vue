<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Home"></Label>
        </ActionBar>

        <GridLayout>
            <WebViewExt src="~/stockfish/index.html"
                width="0" height="0"
                @loadFinished="onWebViewLoaded"
            />
            <Chessboard size="300" reversed/>
        </GridLayout>
    </Page>
</template>

<script>
    import "@nota/nativescript-webview-ext/vue";
    import Chessboard from './chessboard/Chessboard.vue';

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
