<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" :text="'home_title' | L"></Label>
        </ActionBar>

        <StackLayout orientation="vertical">
            <Button text="Generation test" @tap="launchTest" />
            <TextView v-model="constraintScript" />
        </StackLayout>
    </Page>
</template>

<script>
    import { localize } from "nativescript-localize";
    import Vue from "nativescript-vue";

    import ChessPositionGenerator from '../util/ChessPositionGenerator';
    import { SnackBar, SnackBarOptions } from "@nstudio/nativescript-snackbar";

    Vue.filter("L", localize);

    export default {
        data() {
            return {
                constraintScript: "",
            }
        },
        methods: {
            
            launchTest() {
                const snackbar = new SnackBar();

                try {
                    const position = new ChessPositionGenerator({
                        playerKingConstraint: this.constraintScript,
                    }).generatePosition();

                    if (position === null) {
                        snackbar.simple(localize('position_generation_fail'));
                    }
                    else {
                        this.$navigator.navigate('/game', {
                            transition: {
                                name:'slide',
                                duration: 200
                            },
                            props: {
                                position,
                            }
                        });
                    }
                } catch (e) {
                    console.error(e.error);
                    snackbar.simple('Script error !');
                }
                
            }
        },
    };
</script>

<style scoped lang="scss">
    @import '../app-variables';
</style>
