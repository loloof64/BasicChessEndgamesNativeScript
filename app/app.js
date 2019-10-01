import Vue from "nativescript-vue";
Vue.config.silent = true;

require('globals');
require('nativescript-i18n');

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
