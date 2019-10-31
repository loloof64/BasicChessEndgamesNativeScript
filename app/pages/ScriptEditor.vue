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
                                            :class="item.code.startsWith('c') ? 'computer_owner' : 'player_owner'"
                                        />
                                        <Label class="piece_count" :text="item.count" />
                                        <Image src="res://delete" class="delete_icon" />
                                    </StackLayout>
                                </v-template>
                            </ListView>
                        </ScrollView>
                        <Fab
                            class="fab-button hl vb"
                            backgroundColor="yellowgreen"
                            icon="res://add"
                            @tap="_addCount()"
                            :visibility="add_piece_modal_open ? 'collapse' : 'visible'"
                        />
                        <Fab
                            class="fab-button hr vb"
                            backgroundColor="yellowgreen"
                            icon="res://save"
                            @tap="_saveAndExit()"
                            :visibility="add_piece_modal_open ? 'collapse' : 'visible'"
                        />
                        <ScrollView class="modal" :class="add_piece_modal_open ? 'open' : ''" :height="scriptsZonesHeight">
                            <StackLayout orientation="vertical">
                                <Label :text="'adding_piece_count_title' | L" class="modal_title" />
                                <Label :text="'piece_type_picker' | L" class="modal_label" />
                                <ListPicker :items="types" v-model="type_to_add" selectedIndex="0" />
                                <Label :text="'piece_owner_picker' | L" class="modal_label" />
                                <ListPicker :items="owners" v-model="owner_to_add" selectedIndex="0" />
                                <StackLayout orientation="horizontal">
                                    <Button :text="'add_piece_type_button' | L" @tap="_addPieceType()" class="modal_button" />
                                    <Button :text="'cancel_button' | L" @tap="_cancel()" class="modal_button" />
                                    <Label :text="piece_modal_error" class="modal_error" />
                                </StackLayout>
                            </StackLayout>
                        </ScrollView>
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
                pieceTypeModalHeight: platformModule.screen.mainScreen.heightDIPs - 200,
                pieces_counts: [],
                piece_modal_error: '',
                add_piece_modal_open: false,
                type_to_add: undefined,
                owner_to_add: undefined,
                types: [
                    localize('pawn'), 
                    localize('knight'), 
                    localize('bishop'), 
                    localize('rook'), 
                    localize('queen')
                ],
                owners: [
                    localize('player'),
                    localize('computer'),
                ],
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
                    const fstOwner = fst.code[0];
                    const sndOwner = snd.code[0];

                    const fstType = fst.code[1];
                    const sndType = snd.code[1];

                    if (fstOwner !== sndOwner) {
                        return fstOwner === 'p' ? -1 : 1;
                    }
                    const typesOrder = {
                        'p': 0,
                        'n': 1,
                        'b': 2,
                        'r': 3,
                        'q': 4,
                    };

                    return typesOrder[fstType] < typesOrder[sndType] ? -1 : 1;
                });
            },

            _addCount() {
                this.add_piece_modal_open = true;
            },

            _addPieceType() {
                if (!this._checkUniqueness()) {
                    this.piece_modal_error = localize('already_added_piece_type');
                }
                else {
                    const type = this.types[this.type_to_add];
                    const owner = this.owners[this.owner_to_add];
                    this.pieces_counts.push({
                        code: this._getSelectedPieceCode(),
                        type,
                        owner,
                        count: 1,
                    });
                    this._sortPiecesCounts();
                    // Also triggers VueJS change detection
                    this.pieces_counts.splice(this.pieces_counts.length);
                    this.add_piece_modal_open = false;
                }
            },

            _checkUniqueness() {
                const selectedPieceCode = this._getSelectedPieceCode();
                return this.pieces_counts.filter(item => item.code === selectedPieceCode).length === 0;
            },

            _getSelectedPieceCode() {
                const typeString = ['p', 'n', 'b', 'r', 'q'][this.type_to_add];
                const ownerString = ['p', 'c'][this.owner_to_add];

                return `${ownerString}${typeString}`;
            },

            _cancel() {
                this.add_piece_modal_open = false;
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

    $piece_count_font_size: 20;
    $piece_count_color: midnightblue;

    .piece_type_cell {
        font-size: $piece_count_font_size;
        width: 100;
        height: 100%;
        background-color: aqua;
        text-align: center;
    }

    .piece_owner_cell {
        width: 150;
        height: 100%;
        text-align: center;
    }

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
        width: 40;
        font-size: $piece_count_font_size;
        color: $piece_count_color;
        background-color: yellow;
        text-align: center;
    }

    .modal_title {
        width: 100%;
        font-size: 20;
        text-align: center;
        font-weight: bold;
    }

    .modal_label {
        width: 100%;
        font-size: 16;
    }

    .modal {
        opacity: 0;
        visibility: collapse;
        background-color: white;
    }

    .modal.open {
        opacity: 1.0;
        visibility: visible;
    }

    .modal_error {
        font-size: $piece_count_font_size;
        color: red;
        font-style: italic;
        text-align: center;
    }

    .modal_button {
        font-size: 16;
        background-color: coral;
    }

    .delete_icon {
        width: 30;
        height: 30;
    }
</style>