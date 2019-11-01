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
                                        <Label class="piece_type_cell" :text="_getType(item)" />
                                        <Label class="piece_owner_cell" :text="_getOwner(item)"
                                            :class="item.code.startsWith('c') ? 'computer_owner' : 'player_owner'"
                                        />
                                        <Label class="piece_count" @tap="_openEditCountModal(item.code)">
                                            <FormattedString>
                                                <Span class="piece_count_number" :text="item.count" />
                                                <Span class="fa piece_count_edit" text.decode="&#xf303;" />
                                            </FormattedString>
                                        </Label>
                                        <Image src="res://delete" class="delete_icon" @tap="_removePiece(item.code)" />
                                    </StackLayout>
                                </v-template>
                            </ListView>
                        </ScrollView>
                        <Fab
                            class="fab-button hl vb"
                            backgroundColor="yellowgreen"
                            icon="res://add"
                            @tap="_openAddCountModal()"
                            :visibility="add_piece_modal_open ? 'collapse' : 'visible'"
                        />
                        <Fab
                            class="fab-button hr vb"
                            backgroundColor="yellowgreen"
                            icon="res://save"
                            @tap="_saveAndExit()"
                            :visibility="add_piece_modal_open ? 'collapse' : 'visible'"
                        />


                        <ScrollView class="modal" :class="add_piece_modal_open ? 'open' : ''" :height="pieceTypeModalHeight">
                            <StackLayout orientation="vertical">
                                <Label :text="'adding_piece_count_title' | L" class="modal_title" />
                                <Label :text="'piece_picker' | L" class="modal_label" />
                                <ListPicker :items="pieces_items" v-model="piece_to_add_index" selectedIndex="0" />
                                <StackLayout orientation="horizontal">
                                    <Button :text="'add_piece_type_button' | L" @tap="_addPieceType()" class="modal_button" />
                                    <Button :text="'cancel_button' | L" @tap="_cancelPieceTypeAdding()" class="modal_button" />
                                </StackLayout>
                                <Label :text="add_piece_modal_error" class="modal_error" />
                            </StackLayout>
                        </ScrollView>

                        <ScrollView class="modal" :class="edit_count_modal_open ? 'open' : ''" :height="pieceTypeModalHeight">
                            <StackLayout orientation="vertical">
                                <Label :text="'editing_piece_count_title' | L" class="modal_title" />
                                <Label :text="editing_piece_count_type_string" class="modal_label center_horizontal" />
                                <ListPicker :items="available_counts" v-model="current_edited_count" selectedIndex="0" />
                                <StackLayout orientation="horizontal">
                                    <Button :text="'ok_button' | L" class="modal_button" @tap="_editCount()" />
                                    <Button :text="'cancel_button' | L" class="modal_button" @tap="_cancelCountEditing()" />
                                </StackLayout>
                                <Label :text="edit_piece_modal_error" class="modal_error" />
                            </StackLayout>
                        </ScrollView>

                    </GridLayout>
                </TabViewItem>

                <TabViewItem :title="'other_pieces_general_constraint_tab' | L">
                    <GridLayout>
                        <StackLayout orientation="vertical" v-if="registered_pieces_types_strings.length > 0">
                            <ListPicker :items="registered_pieces_types_strings" v-model="edited_general_type_index" selectedIndex="0" />
                            <ScrollView :height="otherScriptsZonesHeight">
                                <TextView 
                                    :text="_getGeneralConstraintText()"
                                    editable="true"
                                    autocorrect="false"
                                    ref="general" 
                                />
                            </ScrollView>
                        </StackLayout>
                        <Label v-else :text="'no_editing_piece_available' | L" class="no_piece_to_edit" />
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
                otherScriptsZonesHeight: platformModule.screen.mainScreen.heightDIPs - 200,
                pieces_counts: [],
                add_piece_modal_error: '',
                edit_piece_modal_error: '',
                add_piece_modal_open: false,
                piece_to_add_index: undefined,
                edit_count_modal_open: false,
                editing_piece_count_type: '',
                editing_piece_count_type_string: '',
                available_counts: [],
                current_edited_count: undefined,
                edited_general_type_index: undefined,
                edited_general_scripts: {},
                registered_pieces_types_strings: [],
                pieces_items: [],
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
        mounted() {
            this.pieces_items = this.owners.reduce((accumOwner, currentOwner) => {
                const additions = this.types.map(currentType => `${currentType} ${currentOwner}`);
                accumOwner.push(...additions);
                
                return accumOwner;
            }, []);
        },
        methods: {
            _saveAndExit() {
                const playerKingConstraint = this.$refs['player_king'].nativeView.text;
                const computerKingConstraint = this.$refs['computer_king'].nativeView.text;
            },

            _getType(pieceCountItem) {
                const typesOrder = {
                    'p': 0,
                    'n': 1,
                    'b': 2,
                    'r': 3,
                    'q': 4,
                };

                return this.types[typesOrder[pieceCountItem.code[1]]];
            },

            _getOwner(pieceCountItem) {
                const ownersOrder = {
                    'p': 0, 'c': 1,
                };

                return this.owners[ownersOrder[pieceCountItem.code[0]]];
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

            _openAddCountModal() {
                this.add_piece_modal_error = '';
                this.add_piece_modal_open = true;
            },

            _addPieceType() {
                const codesFromIndexes = [
                    'pp', 'pn', 'pb', 'pr', 'pq',
                    'cp', 'cn', 'cb', 'cr', 'cq',
                ];
                this.editing_piece_count_code = codesFromIndexes[this.piece_to_add_index];
                // As if we selected value 1, so index 0, from an exisiting counts options
                this.current_edited_count = 0;

                if (!this._checkUniqueness()) {
                    this.add_piece_modal_error = localize('already_added_piece_type');
                    return;
                }
                if (! this._checkForGoodCountForEachOwner()) {
                    this.add_piece_modal_error = localize('too_many_pieces_error');
                    return;
                }
                this.pieces_counts.push({
                    code: this.editing_piece_count_code,
                    count: 1,
                });
                this._sortPiecesCounts();
                // Also triggers VueJS change detection
                this.pieces_counts.splice(this.pieces_counts.length);
                this.registered_pieces_types_strings = this._getRegisteredPiecesTypesStrings();
                this.add_piece_modal_open = false;
            },

            _checkUniqueness() {
                return this.pieces_counts.filter(item => item.code === this.editing_piece_count_code).length === 0;
            },

            _cancelPieceTypeAdding() {
                this.add_piece_modal_open = false;
            },

            _openEditCountModal(pieceCode) {
                this.edit_piece_modal_error = '';
                const owner = {
                    'p': this.owners[0],
                    'c': this.owners[1],
                }[pieceCode[0]];
                const type = {
                    'p': this.types[0],
                    'n': this.types[1],
                    'b': this.types[2],
                    'r': this.types[3],
                    'q': this.types[4]
                }[pieceCode[1]];
                const availableCounts = {
                    'p': [1,2,3,4,5,6,7,8],
                    'n': [1,2,3,4,5,6,7,8,9,10],
                    'b': [1,2,3,4,5,6,7,8,9,10],
                    'r': [1,2,3,4,5,6,7,8,9,10],
                    'q': [1,2,3,4,5,6,7,8,9],
                }[pieceCode[1]];
                this.editing_piece_count_code = pieceCode;
                this.editing_piece_count_type_string = `${type} ${owner}`;
                this.available_counts = availableCounts;
                this.edit_count_modal_open = true;
            },

            _removePiece(pieceCode) {
                this.pieces_counts = this.pieces_counts.filter(item => item.code !== pieceCode);
                // Also triggers VueJS change detection
                this.pieces_counts.splice(this.pieces_counts.length);

                this.registered_pieces_types_strings = this._getRegisteredPiecesTypesStrings();
            },

            _editCount() {
                if (! this._checkForGoodCountForEachOwner()) {
                    this.edit_piece_modal_error = localize('too_many_pieces_error');
                    return;
                }
                const pieceTypeIndex = this.pieces_counts.findIndex(item => item.code === this.editing_piece_count_code);
                this.pieces_counts[pieceTypeIndex].count = this.current_edited_count + 1;
                // Also triggers VueJS change detection
                this.pieces_counts.splice(this.pieces_counts.length);
                this.edit_count_modal_open = false;
            },

            _cancelCountEditing() {
                this.edit_count_modal_open = false;
            },

            _checkForGoodCountForEachOwner() {
                const newPieceCount = this.current_edited_count + 1;
                let currentPlayerPiecesCount = this.pieces_counts.reduce((accum, current) => {
                    if (current.code.startsWith('p') && current.code !== this.editing_piece_count_code) {
                        accum += current.count;
                    }
                    return accum;
                }, 0);
                let currentComputerPiecesCount = this.pieces_counts.reduce((accum, current) => {
                    if (current.code.startsWith('c') && current.code !== this.editing_piece_count_code) {
                        accum += current.count;
                    }
                    return accum;
                }, 0);

                const editingPieceForPlayer = this.editing_piece_count_code.startsWith('p');
                editingPieceForPlayer ? 
                    currentPlayerPiecesCount += newPieceCount :
                    currentComputerPiecesCount += newPieceCount;

                return currentPlayerPiecesCount <= 15 && currentComputerPiecesCount <= 15;
            },

            _getRegisteredPiecesTypesStrings() {
                return this.pieces_counts.map(item => this._getPieceTypeStringFromCode(item.code));
            },

            _getPieceTypeStringFromCode(pieceCode) {
                const owner = {
                    'p': this.owners[0],
                    'c': this.owners[1],
                }[pieceCode[0]];
                const type = {
                    'p': this.types[0],
                    'n': this.types[1],
                    'b': this.types[2],
                    'r': this.types[3],
                    'q': this.types[4]
                }[pieceCode[1]]; 
                return `${type} ${owner}`;
            },

            _getRegisteredPiecesCodes() {
                return this.pieces_counts.map(item => item.code);
            },

            _getGeneralConstraintText() {
                /////////////////////////////////////////////
                console.log(this._getRegisteredPiecesCodes[this.edited_general_type_index]);
                /////////////////////////////////////////////
                return this.edited_general_type_index === undefined ? 
                '' : 
                this.edited_general_scripts[this._getRegisteredPiecesCodes[this.edited_general_type_index]];
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
    $piece_count_icon_size: 14;
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
        color: $piece_count_color;
        background-color: yellow;
    }

    .piece_count_number {
        font-size: $piece_count_font_size;
    }

    .piece_count_edit {
        font-size: $piece_count_icon_size;
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

    .center_horizontal {
        text-align: center;
    }

    .no_piece_to_edit {
        font-size: 20;
    }
</style>