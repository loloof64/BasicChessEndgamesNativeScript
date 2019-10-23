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

    Vue.filter("L", localize);

    export default {
        data() {
            return {
                constraintScript: "",
            }
        },
        methods: {
            
            launchTest() {

                try {
                    const position = new ChessPositionGenerator({
                        playerKingConstraint: this.constraintScript,
                    }).generatePosition();

                    if (position === null) {
                        alert({
                        title: localize('position_generation_fail'),
                        okButtonText: localize('ok_button')
                        }).then(() => {
                            console.error('Failed to generate position')
                        })
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
                    alert({
                        title: localize('script_error_title'),
                        message: e.error.message,
                        okButtonText: localize('ok_button')
                    }).then(() => {
                        console.error(e.error.message);
                    })
                }
                
            }
        },
    };
</script>

<style scoped lang="scss">
    @import '../app-variables';
</style>
