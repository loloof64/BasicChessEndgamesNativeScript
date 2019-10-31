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
                                autocorrect="false"
                                ref="player_king"   
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
                                autocorrect="false"
                                ref="computer_king"
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
                scriptsZonesHeight: platformModule.screen.mainScreen.heightDIPs - 170,
            };
        },
        methods: {
            _saveAndExit() {
                const playerKingConstraint = this.$refs['player_king'].nativeView.text;
                const computerKingConstraint = this.$refs['computer_king'].nativeView.text;
                ////////////////////////////////////////////////
                console.log(playerKingConstraint);
                console.log(computerKingConstraint);
                ////////////////////////////////////////////////
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

    .update_button {
        background-color: rgb(112, 63, 16);
    }

    .action-bar {
        background-color: rgba(252, 143, 19, 0.89);
    }
</style>