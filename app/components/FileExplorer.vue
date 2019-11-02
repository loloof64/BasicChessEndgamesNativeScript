<template>
    <StackLayout>
        <ScrollView :width="explorerPathWidth" height="30" orientation="horizontal">
            <Label :text="explorerPath" class="explorerPath" textWrap="true" />
        </ScrollView>
        <GridLayout>
            <ScrollView :height="scriptsViewHeight" orientation="vertical">
                <ListView for="item in explorerItems" @itemTap="_onExplorerTap($event.item)">
                    <v-template>
                        <StackLayout orientation="horizontal">
                            <Image v-if="_isFolder(item)" src="res://folder" class="type_thumbnail" />
                            <Image v-else src="res://file" class="type_thumbnail" />
                            <Label :text="item.name" class="item_label" />
                        </StackLayout>
                    </v-template>
                </ListView>
            </ScrollView>
            <ActivityIndicator :busy="generatingPosition" row="0" col="0" />
            <Fab
                class="fab-button hr vb"
                backgroundColor="orchid"
                icon="res://new_document"
                @tap="_newScriptInEditor()"
            />
            <Fab
                class="fab-button hl vb"
                backgroundColor="yellowgreen"
                icon="res://new_folder"
                @tap="_createFolder()"
            />
        </GridLayout>
    </StackLayout>
</template>

<script>
    import { localize } from "nativescript-localize";
    import Vue from "nativescript-vue";
    const platformModule = require("tns-core-modules/platform");
    const fileSystemModule = require("tns-core-modules/file-system");


    import ConstraintScriptLoader from '../position_generator/ConstraintScriptLoader';
    import ChessPositionGenerator from '../position_generator/ChessPositionGenerator';

    Vue.filter("L", localize);
    Vue.registerElement(
        'Fab',
        () => require('@nstudio/nativescript-floatingactionbutton').Fab
    );

    export default {
        data() {
            return {
                explorerPath: '',
                explorerItems: [],
                scriptsViewHeight: platformModule.screen.mainScreen.heightDIPs - 260,
                explorerPathWidth: platformModule.screen.mainScreen.widthDIPs,
                currentFolder: undefined,
                scriptsRootFolder: undefined,
                generatingPosition: false,
            }
        },
        async mounted() {
            const currentAppFolder = fileSystemModule.knownFolders.currentApp();
            const rootFolder = currentAppFolder.getFolder('personnal_constraints');
            this.scriptsRootFolder = rootFolder;
            this.currentFolder = rootFolder;
            this._updateItems();
        },
        methods: {
            async _createFolder() {
                prompt({
                    title: localize('new_folder_title'),
                    okButtonText: localize('ok_button'),
                    cancelButtonText: localize('cancel_button'),
                }).then(async result => {
                    const validated = result.result;
                    const folderName = result.text;

                    if (validated && folderName !== undefined) {
                        this._addFolder(folderName);
                        this._updateItems();
                    }
                });
            },
            _newScriptInEditor() {
                this.$navigator.navigate('/script_editor', {
                    transition: {
                        name:'slide',
                        duration: 200
                    },
                    props: {
                        folderPath: this.currentFolder.path,
                        permission: 'w',
                    }
                });
            },
            _onExplorerTap(explorerItem) {
                if (explorerItem.folder) {
                    this._navigateToFolder(explorerItem.path);
                }
                else {
                    this._playGame(explorerItem.path);
                }
            },

            async _getItems() {
                let explorerItems = [];
                const entities = await this.currentFolder.getEntities();
                entities.forEach(entity => {
                    const isAFolder = fileSystemModule.Folder.exists(entity.path);
                    const name = entity.name;
                    const path = entity.path;
                    if (isAFolder) {
                        explorerItems.push({
                            name, path,
                            folder: true,
                        });
                    }
                    else if (name.endsWith('.cst')) {
                        explorerItems.push({
                            name, path,
                            folder: false,
                        })
                    }
                });
                let updatedItems = explorerItems.sort((fst, snd) => {
                    if (fst.folder !== snd.folder) {
                        return fst.folder ? -1 : 1;
                    }
                    return fst.name.localeCompare(snd.name, this._getLocale(), {sentitivity: "base"});
                });

                const weCanGoUp = this.currentFolder.path !== this.scriptsRootFolder.path;
                if (weCanGoUp) {
                    updatedItems.unshift({
                        name: '..',
                        path: '..',
                        folder: true,
                    });
                }

                return updatedItems;
            },

            _addFolder(folderName) {
                this.currentFolder.getFolder(folderName);
            },

            /*
            https://stackoverflow.com/a/48758960/662618
            */
            _getLocale() {
                let lang;  
                if (platformModule.isAndroid) {
                    lang = java.util.Locale.getDefault().getLanguage();
                }
                if (platformModule.isIOS) {
                    lang = NSLocale.preferredLanguages.firstObject;
                } else {
                    platformModule.device.language;
                }

                return lang;
            },

            _getShortenedPath() {
                const path = this.currentFolder.path;
                return path.replace(this.scriptsRootFolder.path, localize('custom_scripts_root'))
            },

            async _updateItems() {
                this.explorerItems = await this._getItems();
                // Also triggers VueJS change detection
                this.explorerItems.splice(this.explorerItems.length);
                this.explorerPath = this._getShortenedPath();
            },

            _isFolder(explorerItem) {
                return explorerItem.folder;
            },

            _navigateToFolder(folderPathString) {
                if (folderPathString === '..') {
                    this.currentFolder = this.currentFolder.parent;
                    this._updateItems();
                }
                else {
                    const targetFolder = fileSystemModule.Folder.fromPath(folderPathString);
                    this.currentFolder = targetFolder;
                    this._updateItems(); 
                }
            },

            async _playGame(gamePathString) {
                let scriptData;

                this.generatingPosition = true;

                try {
                    scriptData = await new ConstraintScriptLoader().loadCustomScript(gamePathString);
                } catch (e) {
                    this.generatingPosition = false;
                    alert({
                        title: localize('script_loading_error_title'),
                        okButtonText: localize('ok_button')
                    }).then(() => {
                        console.error('Error while loading script');
                        console.error(e);
                    })
                    return;
                }

                if (scriptData === undefined) {
                    this.generatingPosition = false;
                    alert({
                        title: localize('script_loading_error_title'),
                        okButtonText: localize('ok_button')
                    }).then(() => {
                        console.error('Ill-formed script file !');
                    })
                    return;
                }

                try {
                    const position = new ChessPositionGenerator().generatePosition(scriptData);
                    const gameGoal = scriptData.drawish ? localize('drawish_goal') : localize('winning_goal');
                    this.generatingPosition = false;

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
                                gameGoal,
                            }
                        });
                    }
                } catch (e) {
                    this.generatingPosition = false;

                    const pieceKind = e.pieceKind;
                    const pieceKindStr = pieceKind !== undefined ? localize(pieceKind) : undefined;

                    let title = `${localize('script_execution_error_title')} : ${localize(e.kind)}`;
                    if (pieceKindStr !== undefined) title += ` (${pieceKindStr})`;

                    alert({
                        title,
                        message: e.error,
                        okButtonText: localize('ok_button')
                    }).then(() => {
                        console.error(e.error);
                    })
                }
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

    .explorerPath {
        font-size: 18;
        background-color: aquamarine;
    }

    .type_thumbnail {
        width: 30;
        height: 30;
        margin: 6 8;
    }

    .item_label {
        width: 100%;
        height: 100%;
        font-size: 22;
        vertical-align: middle;
    }
</style>