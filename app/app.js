import Vue from "nativescript-vue";
Vue.config.silent = true;

import Home from "./pages/Home";

new Vue({

    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    },
}).$start();
