<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" :text="'home_title' | L"></Label>
        </ActionBar>

        <StackLayout orientation="vertical">
            <Button text="Generation test" @tap="launchTest" />
        </StackLayout>
    </Page>
</template>

<script>
    import { localize } from "nativescript-localize";
    import Vue from "nativescript-vue";

    import ChessPositionGenerator from './ChessPositionGenerator';
    import { SnackBar, SnackBarOptions } from "@nstudio/nativescript-snackbar";

    Vue.filter("L", localize);

    export default {
        data() {
            return {

            }
        },
        methods: {
            
            launchTest() {
                const position = new ChessPositionGenerator().generatePosition();
                const snackbar = new SnackBar();

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
            }
        },
    };
</script>

<style scoped lang="scss">
    @import '../app-variables';
</style>
