import Vue from "nativescript-vue";
Vue.config.silent = true;

Vue.registerElement('SVGImage', () => require('@exeleon/nativescript-svg').SVGImage);

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
