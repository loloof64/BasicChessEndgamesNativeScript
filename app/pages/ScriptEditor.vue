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
                            <TextView 
                                editable="true"
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
                            <TextView 
                                editable="true" 
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
                                <ListPicker :items="pieces_items" v-model="piece_to_add_index" />
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
                                <ListPicker :items="available_counts" v-model="current_edited_count" />
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

                        <ScrollView v-if="pieces_counts.length > 0">
                            <StackLayout orientation="vertical">
                                <Button 
                                    class="edit_other_script_button"
                                    v-for="item in pieces_counts" :key="item.code"
                                    :text="_getPieceButtonStringFromCode(item.code)"
                                    @tap="_openEditGeneralScriptModal(item.code)"
                                />
                            </StackLayout>
                        </ScrollView>

                        <Label v-else :text="'no_editing_piece_available' | L" class="no_piece_to_edit" />

                        <StackLayout class="modal" :class="edit_global_modal_open ? 'open' : ''">
                            <Label :text="_getGeneralModalTitle()" class="modal_title" />
                            <StackLayout orientation="horizontal">
                                <Button :text="'ok_button' | L" class="modal_button" @tap="_editCurrentGeneralConstraint()" />
                                <Button :text="'cancel_button' | L" class="modal_button" @tap="_cancelGeneralConstraintEditing()" />
                            </StackLayout>
                            <ScrollView orientation="vertical" :height="otherScriptModalHeight">
                                <TextView
                                    editable="true" 
                                    autocorrect="false"
                                    :text="current_global_constraint_content"
                                    ref="general_constraint"
                                />
                            </ScrollView>
                        </StackLayout> 

                        <Fab
                            class="fab-button hr vb"
                            backgroundColor="yellowgreen"
                            icon="res://save"
                            @tap="_saveAndExit()"
                        />

                    </GridLayout>
                </TabViewItem>

                <TabViewItem :title="'other_pieces_mutual_constraint_tab' | L">
                    <GridLayout>

                        <ScrollView v-if="pieces_counts.length > 0">
                            <StackLayout orientation="vertical">
                                <Button 
                                    class="edit_other_script_button"
                                    v-for="item in pieces_counts" :key="item.code"
                                    :text="_getPieceButtonStringFromCode(item.code)"
                                    @tap="_openEditMutualScriptModal(item.code)"
                                />
                            </StackLayout>
                        </ScrollView>

                        <Label v-else :text="'no_editing_piece_available' | L" class="no_piece_to_edit" />

                        <StackLayout class="modal" :class="edit_mutual_modal_open ? 'open' : ''">
                            <Label :text="_getMutualModalTitle()" class="modal_title" />
                            <StackLayout orientation="horizontal">
                                <Button :text="'ok_button' | L" class="modal_button" @tap="_editCurrentMutualConstraint()" />
                                <Button :text="'cancel_button' | L" class="modal_button" @tap="_cancelMutualConstraintEditing()" />
                            </StackLayout>
                            <ScrollView orientation="vertical" :height="otherScriptModalHeight">
                                <TextView
                                    editable="true" 
                                    autocorrect="false"
                                    :text="current_mutual_constraint_content"
                                    ref="mutual_constraint"
                                />
                            </ScrollView>
                        </StackLayout> 

                        <Fab
                            class="fab-button hr vb"
                            backgroundColor="yellowgreen"
                            icon="res://save"
                            @tap="_saveAndExit()"
                        />

                    </GridLayout>
                </TabViewItem>

                <TabViewItem :title="'other_pieces_indexed_constraint_tab' | L">
                    <GridLayout>

                        <ScrollView v-if="pieces_counts.length > 0">
                            <StackLayout orientation="vertical">
                                <Button 
                                    class="edit_other_script_button"
                                    v-for="item in pieces_counts" :key="item.code"
                                    :text="_getPieceButtonStringFromCode(item.code)"
                                    @tap="_openEditIndexedScriptModal(item.code)"
                                />
                            </StackLayout>
                        </ScrollView>

                        <Label v-else :text="'no_editing_piece_available' | L" class="no_piece_to_edit" />

                        <StackLayout class="modal" :class="edit_indexed_modal_open ? 'open' : ''">
                            <Label :text="_getIndexedModalTitle()" class="modal_title" />
                            <StackLayout orientation="horizontal">
                                <Button :text="'ok_button' | L" class="modal_button" @tap="_editCurrentIndexedConstraint()" />
                                <Button :text="'cancel_button' | L" class="modal_button" @tap="_cancelIndexedConstraintEditing()" />
                            </StackLayout>
                            <ScrollView orientation="vertical" :height="otherScriptModalHeight">
                                <TextView
                                    editable="true" 
                                    autocorrect="false"
                                    :text="current_indexed_constraint_content"
                                    ref="indexed_constraint"
                                />
                            </ScrollView>
                        </StackLayout> 

                        <Fab
                            class="fab-button hr vb"
                            backgroundColor="yellowgreen"
                            icon="res://save"
                            @tap="_saveAndExit()"
                        />

                    </GridLayout>
                </TabViewItem>

                <TabViewItem :title="'goal_tab' | L">
                    <GridLayout>
                        <StackLayout orientation="horizontal">
                            <Label :text="'winning_goal_switch' | L" class="goal_label"/>
                            <Switch v-model="winningGoal" />
                        </StackLayout>

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
    const fileSystemModule = require("tns-core-modules/file-system");

    Vue.filter("L", localize);

    export default {
        data() {
            return {
                scriptsZonesHeight: platformModule.screen.mainScreen.heightDIPs - 170,
                pieceTypeModalHeight: platformModule.screen.mainScreen.heightDIPs - 200,
                otherScriptsZonesHeight: platformModule.screen.mainScreen.heightDIPs - 220,
                otherScriptModalHeight: platformModule.screen.mainScreen.heightDIPs - 60,
                pieces_counts: [],
                winningGoal: true,
                add_piece_modal_error: '',
                edit_piece_modal_error: '',
                add_piece_modal_open: false,
                piece_to_add_index: 0,
                edit_count_modal_open: false,
                editing_piece_count_type: '',
                editing_piece_count_type_string: '',
                available_counts: [],
                current_edited_count: 0,
                pieces_items: [],
                edit_global_modal_open: false,
                edit_mutual_modal_open: false,
                edit_indexed_modal_open: false,
                current_edited_general_code: undefined,
                current_edited_mutual_code: undefined,
                current_edited_indexed_code: undefined,
                current_global_constraint_content: undefined,
                current_mutual_constraint_content: undefined,
                current_indexed_constraint_content: undefined,
                global_scripts: {},
                mutual_scripts: {},
                indexed_scripts: {},
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
        props: [
            'folderPath',
            'mode',
            'permission',
        ],
        methods: {
            async _saveAndExit() {
                try {
                    await this._saveInFile();
                    this.$navigator.navigate('/home', {
                        transition: {
                            name:'slide',
                            duration: 200
                        }
                    });
                }
                catch (err) {
                    console.error(err);
                    alert({
                        title: localize('save_script_error_title'),
                        okButtonText: localize('ok_button')
                    }).then(() => {});
                }
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
                if (! this._checkNoScriptDefinedFor(pieceCode)) {
                    const typeString = this._getPieceTypeStringFromCode(pieceCode);
                    confirm({
                        title: localize('script_piece_deletion_confirmation_title', typeString),
                        message: localize('script_piece_deletion_confirmation_message', typeString),
                        okButtonText: localize('ok_button'),
                        cancelButtonText: localize('cancel_button'),
                    }).then(result => {
                        const userRefused = result !== true;
                        if (userRefused) return;

                        this.pieces_counts = this.pieces_counts.filter(item => item.code !== pieceCode);
                        // Also triggers VueJS change detection
                        this.pieces_counts.splice(this.pieces_counts.length);
                    });
                }
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

            _getPieceButtonStringFromCode(pieceCode) {
                const typeString = this._getPieceTypeStringFromCode(pieceCode);
                return localize('edit_other_script_button_caption', typeString);
            },

            _getGeneralModalTitle() {
                if (this.current_edited_general_code === undefined) return '';
                const typeString = this._getPieceTypeStringFromCode(this.current_edited_general_code);
                return localize('general_modal_title', typeString);
            },

            _openEditGeneralScriptModal(pieceCode) {
                this.current_edited_general_code = pieceCode;
                this.current_global_constraint_content = this.global_scripts[pieceCode];
                this.edit_global_modal_open = true;
            },

            _editCurrentGeneralConstraint() {
                this.global_scripts[this.current_edited_general_code] = this.$refs['general_constraint'].nativeView.text;
                this.current_global_constraint_content = '';
                this.edit_global_modal_open = false;
            },

            _cancelGeneralConstraintEditing() {
                this.current_global_constraint_content = '';
                this.edit_global_modal_open = false;
            },

            _getMutualModalTitle() {
                if (this.current_edited_mutual_code === undefined) return '';
                const typeString = this._getPieceTypeStringFromCode(this.current_edited_mutual_code);
                return localize('mutual_modal_title', typeString);
            },

            _openEditMutualScriptModal(pieceCode) {
                this.current_edited_mutual_code = pieceCode;
                this.current_mutual_constraint_content = this.mutual_scripts[pieceCode];
                this.edit_mutual_modal_open = true;
            },

            _editCurrentMutualConstraint() {
                this.mutual_scripts[this.current_edited_mutual_code] = this.$refs['mutual_constraint'].nativeView.text;
                this.current_mutual_constraint_content = '';
                this.edit_mutual_modal_open = false;
            },

            _cancelMutualConstraintEditing() {
                this.current_mutual_constraint_content = '';
                this.edit_mutual_modal_open = false;
            },

            _getIndexedModalTitle() {
                if (this.current_edited_indexed_code === undefined) return '';
                const typeString = this._getPieceTypeStringFromCode(this.current_edited_indexed_code);
                return localize('indexed_modal_title', typeString);
            },

            _openEditIndexedScriptModal(pieceCode) {
                this.current_edited_indexed_code = pieceCode;
                this.current_indexed_constraint_content = this.indexed_scripts[pieceCode];
                this.edit_indexed_modal_open = true;
            },

            _editCurrentIndexedConstraint() {
                this.indexed_scripts[this.current_edited_indexed_code] = this.$refs['indexed_constraint'].nativeView.text;
                this.current_indexed_constraint_content = '';
                this.edit_indexed_modal_open = false;
            },

            _cancelIndexedConstraintEditing() {
                this.current_indexed_constraint_content = '';
                this.edit_indexed_modal_open = false;
            },

            _checkNoScriptDefinedFor(pieceCode) {
                const generalConstraint = this.global_scripts[pieceCode];
                const indexedConstraint = this.indexed_scripts[pieceCode];
                const mutualConstraint = this.mutual_scripts[pieceCode];

                return ["", undefined].includes(generalConstraint) &&
                    ["", undefined].includes(mutualConstraint) &&
                    ["", undefined].includes(indexedConstraint);
            },

            async _saveInFile() {
                const destinationFolderPath = this.folderPath;
                if (!destinationFolderPath) {
                    console.error("Don't know in which folder to save !");
                    return;
                }

                const destinationFolderInstance = fileSystemModule.Folder.fromPath(destinationFolderPath);
                const fileName = 'test.cst';
                const fileInstance = destinationFolderInstance.getFile(fileName);
                await this._writeScriptInFile(fileInstance);
            },

            async _writeScriptInFile(fileInstance) {
                const drawishStatusPart = this._getDrawishStatusText();
                const playerKingConstraintPart = this._getPlayerKingConstraintText();
                const computerKingConstraintPart = this._getComputerKingConstraintText();
                const otherPiecesCountPart = this._getOtherPiecesCountText();
                const otherPiecesGlobalConstraintPart = this._getOtherPiecesGlobalConstraintText();
                const otherPiecesMutualConstraintPart = this._getOtherPiecesMutualConstraintText();
                const otherPiecesIndexedConstraintPart = this._getOtherPiecesIndexedConstraintText();

                const textContent = [
                    drawishStatusPart,
                    playerKingConstraintPart,
                    computerKingConstraintPart,
                    otherPiecesCountPart,
                    otherPiecesGlobalConstraintPart,
                    otherPiecesMutualConstraintPart,
                    otherPiecesIndexedConstraintPart,
                ].filter(item => item.length > 0).join('\n');

                await fileInstance.writeText(textContent);
            },

            _getDrawishStatusText() {
                return [
                    '# Drawish',
                    '',
                    `${this.winningGoal ? 'false' : 'true'}`,
                ].join('\n');
            },

            _getPlayerKingConstraintText() {
                const playerKingConstraint = this.$refs['player_king'].nativeView.text;
                if ([undefined, ''].includes(playerKingConstraint)) return '';
                return [
                    '# Player king constraint',
                    '',
                    playerKingConstraint,
                ].join('\n');
            },

            _getComputerKingConstraintText() {
                const computerKingConstraint = this.$refs['computer_king'].nativeView.text;
                if ([undefined, ''].includes(computerKingConstraint)) return '';
                return [
                    '# Computer king constraint',
                    '',
                    computerKingConstraint,
                ].join('\n');
            },

            _getOtherPiecesCountText() {
                const otherPiecesCount = this.pieces_counts.map(item => {
                    const pieceCode = item.code;
                    const pieceCount = item.count;

                    return `${pieceCode.toUpperCase().split('').join(' ')} ${pieceCount}`;
                }).join('\n');
                if ([undefined, ''].includes(otherPiecesCount)) return '';
                return [
                    '# Other pieces count',
                    '',
                    otherPiecesCount,
                ].join('\n');
            },

            _getOtherPiecesGlobalConstraintText() {
                const otherPiecesGlobalConstraint = this.pieces_counts.map(item => {
                    const pieceCode = item.code;
                    const pieceSectionHeader = `# ${pieceCode.toUpperCase().split('').join(' ')}`;
                    const script = this.global_scripts[pieceCode];

                    if ([undefined, ''].includes(script)) return '';
                    return [
                        pieceSectionHeader,
                        '',
                        script,
                        ''
                    ].filter(item => item.length > 0).join('\n');
                });

                return [
                    '# Other piece global constraint',
                    '',
                    otherPiecesGlobalConstraint,
                ].join('\n');
            },

            _getOtherPiecesMutualConstraintText() {
                const otherPiecesMutualConstraint = this.pieces_counts.map(item => {
                    const pieceCode = item.code;
                    const pieceSectionHeader = `# ${pieceCode.toUpperCase().split('').join(' ')}`;
                    const script = this.mutual_scripts[pieceCode];

                    if ([undefined, ''].includes(script)) return '';
                    return [
                        pieceSectionHeader,
                        '',
                        script,
                        ''
                    ].filter(item => item.length > 0).join('\n');
                });

                return [
                    '# Other piece mutual constraint',
                    '',
                    otherPiecesMutualConstraint,
                ].join('\n');
            },

            _getOtherPiecesIndexedConstraintText() {
                const otherPiecesIndexedConstraint = this.pieces_counts.map(item => {
                    const pieceCode = item.code;
                    const pieceSectionHeader = `# ${pieceCode.toUpperCase().split('').join(' ')}`;
                    const script = this.indexed_scripts[pieceCode];

                    if ([undefined, ''].includes(script)) return '';
                    return [
                        pieceSectionHeader,
                        '',
                        script,
                        ''
                    ].filter(item => item.length > 0).join('\n');
                });

                return [
                    '# Other piece indexed constraint',
                    '',
                    otherPiecesIndexedConstraint,
                ].join('\n');
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
        background-color: pink;
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

    .edit_other_script_button {
        background-color: forestgreen;
        font-size: 20;
    }

    .goal_label {
        font-size: 20;
        vertical-align: middle;
    }
</style>