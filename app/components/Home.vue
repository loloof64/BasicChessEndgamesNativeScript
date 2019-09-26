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
            <Button @tap='() => sendCommandToStockfish("go depth 15")'>
                Get Stockfish move !
            </Button>
        </GridLayout>
    </Page>
</template>

<script>
    import "@nota/nativescript-webview-ext/vue";

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
