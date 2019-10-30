<template>
    <StackLayout>
        <Label :text="explorerPath" class="explorerPath" />
        <GridLayout>
            <ScrollView :height="personalsListViewHeight">
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
            <Fab
                class="fab-button hr vb"
                backgroundColor="orchid"
                icon="res://new_document"
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
                personalsListViewHeight: platformModule.screen.mainScreen.heightDIPs - 200,
                currentFolder: undefined,
                scriptsRootFolder: undefined,
            }
        },
        async mounted() {
            const currentAppFolder = fileSystemModule.knownFolders.currentApp();
            const rootFolder = currentAppFolder.getFolder('personnal_constraints');
            this.scriptsRootFolder = rootFolder;
            this.currentFolder = rootFolder;
            this._updateItems();
            this.explorerPath = this._getShortenedPath();
        },
        methods: {
            async _createFolder() {
                prompt({
                    title: localize('new_folder_title'),
                    okButtonText: localize('ok_button'),
                    cancelButtonText: localize('cancel_button'),
                }).then(async result => {
                    const folderName = result.text || this._randomName();

                    this._addFolder(folderName);
                    
                    this._updateItems();
                });
            },
            _onExplorerTap(explorerItem) {

            },
            _randomName() {
                let name = '';
                for (let i = 0; i < 20; i++) {
                    const letterIndex = Math.random() * 26;
                    const letter = String.fromCharCode('a'.charCodeAt(0) + letterIndex);
                    name += letter;
                }
                return name;
            },

            async _getItems() {
                let explorerItems = [];
                const entities = await this.scriptsRootFolder.getEntities();
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
                return explorerItems.sort((fst, snd) => {
                    if (fst.folder !== snd.folder) {
                        return fst.folder ? -1 : 1;
                    }
                    return fst.name.localeCompare(snd.name, this._getLocale(), {sentitivity: "base"});
                });
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

            goToSubFolder(folderName) {
                const folderPath = fileSystemModule.path.join(this.currentFolder.path, folderName);
                const folder = fileSystemModule.Folder.fromPath(folderPath);
                const isAnExistingFolder = fileSystemModule.Folder.exists(folder);

                if (isAnExistingFolder) {
                    this.currentFolder = folder;
                }
            },

            goUpLevel() {
                if (this.currentFolder === this.scriptsRootFolder) return;
                this.currentFolder = this.currentFolder.parent;
            },

            _getShortenedPath() {
                const path = this.currentFolder.path;
                return path.replace(this.scriptsRootFolder.path, localize('custom_scripts_root'))
            },

            async _updateItems() {
                this.explorerItems = await this._getItems();
                // Also triggers VueJS change detection
                this.explorerItems.splice(this.explorerItems.length);
            },

            _isFolder(explorerItem) {
                return explorerItem.folder;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../app-variables';

    .fab-button {
        width: 65;
        height: 65;
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