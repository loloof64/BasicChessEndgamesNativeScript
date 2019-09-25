import Vue from "nativescript-vue";

import Home from "./components/Home";

const webViewModule = require("tns-core-modules/ui/web-view");

function onWebViewLoaded(webargs) {
    Vue.$log.debug('Log from onWebViewLoaded.');

    const page = webargs.object.page;
    const vm = page.bindingContext;
    const webview = webargs.object;
    vm.set("result", "WebView is still loading...");
    vm.set("enabled", false);

    Vue.$log.debug('Log from onWebViewLoaded.');

    webview.on(webViewModule.WebView.loadFinishedEvent, (args) => {
        let message = "";
        if (!args.error) {
            message = `WebView finished loading of ${args.url}`;
        } else {
            message = `Error loading ${args.url} : ${args.error}`;
        }

        vm.set("result", message);
        console.log(`WebView message - ${message}`);
    });
}

/*const StockfishWorkerScript = require("nativescript-worker-loader!./stockfish/stockfish.js.txt");
const StockfishWorker = new StockfishWorkerScript();
StockfishWorker.postMessage('uci');
StockfishWorker.postMessage('isready');
*/
new Vue({

    template: `
        <Frame>
            <WebView src="<html><body></body></html>"
                width="0" height="0"
                loadFinished={onWebViewLoaded}
            />
            <Home />
        </Frame>`,

    components: {
        Home
    },
    data(){
        return {
            onWebViewLoaded: onWebViewLoaded
        }
    }
}).$start();
