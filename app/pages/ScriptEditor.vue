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

                <TabViewItem :title="'other_pieces_count_tab' | L">
                    <GridLayout>
                        <ScrollView :height="scriptsZonesHeight">
                            <ListView for="item in pieces_counts">
                                <v-template>
                                    <StackLayout orientation="horizontal">
                                        <Label class="piece_type_cell" :text="item.type" />
                                        <Label class="piece_owner_cell" :text="item.owner"
                                            :class="item.owner === 'computer' ? 'computer_owner' : 'player_owner'"
                                        />
                                        <Label class="piece_count" :text="item.count" />
                                        <Image src="res://delete" />
                                    </StackLayout>
                                </v-template>
                            </ListView>
                        </ScrollView>
                        <Fab
                            class="fab-button hl vb"
                            backgroundColor="yellowgreen"
                            icon="res://add"
                            @tap="_addCount()"
                        />
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
                pieces_counts: [],
            };
        },
        methods: {
            _saveAndExit() {
                const playerKingConstraint = this.$refs['player_king'].nativeView.text;
                const computerKingConstraint = this.$refs['computer_king'].nativeView.text;
                ////////////////////////////////////////////////
                console.log(playerKingConstraint);
                console.log(computerKingConstraint);
                console.log(this.pieces_counts);
                ////////////////////////////////////////////////
            },

            _sortPiecesCounts() {
                this.pieces_counts = this.pieces_counts.sort((fst, snd) => {
                    if (fst.owner !== snd.owner) {
                        return fst.owner === 'player' ? -1 : 1;
                    }
                    const typesOrder = {
                        'pawn': 0,
                        'knight': 1,
                        'bishop': 2,
                        'rook': 3,
                        'queen': 4,
                        'king': 5,
                    };

                    return typesOrder[fst.type] < typesOrder[snd.type] ? -1 : 1;
                });
            },

            _addCount() {

            }
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

    .hl {
        horizontal-align: left;
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

    .piece_type_cell {
        width: 25;
        height: 100%;
        background-color: aqua;
    }

    .piece_owner_cell {
        width: 25;
        height: 100%;
    }

    $piece_count_font_size: 20;
    $piece_count_color: midnightblue;

    .player_owner {
        font-size: $piece_count_font_size;
        color: $piece_count_color;
        background-color: yellowgreen;
    }

    .computer_owner {
        font-size: $piece_count_font_size;
        color: $piece_count_color;
        background-color: palevioletred;
    }

    .piece_count {
        font-size: $piece_count_font_size;
        color: $piece_count_color;
        background-color: yellow;
    }
</style>