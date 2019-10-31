<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" :text="'script_editor_title' | L"></Label>
        </ActionBar>

        <StackLayout orientation="vertical">
            <TabView selectedIndex="0">
                <TabViewItem :title="'player_king_constraint_tab' | L">
                    <GridLayout>
                        <ScrollView :height="scriptsZonesHeight">
                            <TextView editable="true"
                                ref="player_king"
                                :text="playerKingConstraint"
                                @blur="_updatePlayerKingConstraint()"   
                            />
                        </ScrollView>
                        <Fab
                            class="fab-button hr vb"
                            backgroundColor="yellowgreen"
                            icon="res://save"
                            @tap="_saveAndExit()"
                        />
                    </GridLayout>
                </TabViewItem>

                <TabViewItem :title="'computer_king_constraint_tab' | L">
                    <GridLayout>
                        <ScrollView :height="scriptsZonesHeight">
                            <TextView editable="true" 
                                ref="computer_king"
                                :text="computerKingConstraint"
                                @blur="_updateComputerKingConstraint()"   
                            />
                        </ScrollView>
                        <Fab
                            class="fab-button hl vb"
                            backgroundColor="yellowgreen"
                            icon="res://save"
                            @tap="_saveAndExit()"
                        />
                    </GridLayout>
                </TabViewItem>
            </TabView>
        </StackLayout>
    </Page>
</template>

<script>
    import { localize } from "nativescript-localize";
    import Vue from "nativescript-vue";
    const platformModule = require("tns-core-modules/platform");

    Vue.filter("L", localize);

    export default {
        data() {
            return {
                playerKingConstraint: '',
                computerKingConstraint: '',
                scriptsZonesHeight: platformModule.screen.mainScreen.heightDIPs - 170,
            };
        },
        methods: {
            _updatePlayerKingConstraint() {
                this.playerKingConstraint = this.$refs['player_king'].text;
            },

            _updateComputerKingConstraint() {
                this.computerKingConstraint = this.$refs['computer_king'].text;
            },

            _saveAndExit() {
                console.log(this.playerKingConstraint);
                console.log(this.computerKingConstraint);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../app-variables';

    .fab-button {
        width: 65;
        height: 65;
        opacity: 0.3;
    }

    .hr {
        horizontal-align: right;
    }

    .vb {
        vertical-align: bottom;
    }
</style>