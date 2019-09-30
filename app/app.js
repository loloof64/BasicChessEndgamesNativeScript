import Vue from "nativescript-vue";
Vue.config.silent = true;

import Home from "./components/Home";

new Vue({

    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    },
}).$start();
