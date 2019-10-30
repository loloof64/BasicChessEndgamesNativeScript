<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" :text="'home_title' | L"></Label>
        </ActionBar>

        <StackLayout orientation="vertical">
            <TabView selectedIndex="0">
                <TabViewItem :title="'sample_scripts' | L"
                iconSource="res://bookshelf">
                    <GridLayout>
                        <ListView for="item in sampleScripts" @itemTap="onSampleScriptTap($event.item)" row="0" col="0">
                            <v-template>
                                <Label :text="item.label" fontSize="22" width="100%" />
                            </v-template>
                        </ListView>
                        <ActivityIndicator :busy="generatingPosition" row="0" col="0" />
                    </GridLayout>
                </TabViewItem>

                <TabViewItem :title="'custom_scripts' | L" 
                iconSource="res://handsaw">
                    <StackLayout>
                        <Label :text="explorerPath" class="explorerPath" />
                        <GridLayout>
                            <ScrollView :height="personalsListViewHeight">
                                <ListView for="item in explorerItems" @itemTap="onExplorerTap($event.item)">
                                    <v-template>
                                        <Label :text="item.name" fontSize="22" width="100%" />
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
                                @tap="createFolder()"
                            />
                        </GridLayout>
                    </StackLayout>
                </TabViewItem>
            </TabView>
        </StackLayout>
    </Page>
</template>

<script>
    import { localize } from "nativescript-localize";
    import Vue from "nativescript-vue";
    const platformModule = require("tns-core-modules/platform");

    import ChessPositionGenerator from '../position_generator/ChessPositionGenerator';
    import ConstraintScriptLoader from '../position_generator/ConstraintScriptLoader';

    import FileExplorer from '../util/FileExplorer';

    Vue.filter("L", localize);
    Vue.registerElement(
        'Fab',
        () => require('@nstudio/nativescript-floatingactionbutton').Fab
    );
    
    export default {
        data() {
            return {
                sampleScripts: [
                    {
                        path: 'kq_k.cst',
                        label: localize('sample_kq_k'),
                    },
                    {
                        path: 'kr_k.cst',
                        label: localize('sample_kr_k'),
                    },
                    {
                        path: 'krr_k.cst',
                        label: localize('sample_krr_k'),
                    },
                    {
                        path: 'kbb_k.cst',
                        label: localize('sample_kbb_k'),
                    },
                    {
                        path: 'kp_k_1.cst',
                        label: localize('sample_kp_k_1'),
                    },
                    {
                        path: 'kp_k_2.cst',
                        label: localize('sample_kp_k_2'),
                    },
                    {
                        path: 'kppp_kppp.cst',
                        label: localize('sample_kppp_kppp'),
                    },
                    {
                        path: 'knb_k.cst',
                        label: localize('sample_knb_k'),
                    },
                ],
                generatingPosition: false,
                explorerItems: [],
                explorerPath: '',
                explorerManager: new FileExplorer(),
                personalsListViewHeight: platformModule.screen.mainScreen.heightDIPs - 200,
            }
        },
        async mounted() {
            this.explorerItems = await this.explorerManager.getItems();
            this.explorerPath = this.explorerManager.getShortenedPath();
        },
        methods: {  
            async onSampleScriptTap(scriptItem) {

                let scriptData;

                this.generatingPosition = true;

                try {
                    scriptData = await new ConstraintScriptLoader().loadSampleScript(scriptItem.path);
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
                
            },
            onExplorerTap(explorerItem) {

            },
            createFolder() {
                prompt({
                    title: localize('new_folder_title'),
                    okButtonText: localize('ok_button'),
                    cancelButtonText: localize('cancel_button'),
                }).then(async result => {
                    const folderName = result.text || this._randomName();

                    this.explorerManager.addFolder(folderName);
                    const updatedItems = await this.explorerManager.getItems();

                    this.explorerItems = updatedItems;
                });
            },
            _randomName() {
                let name = '';
                for (let i = 0; i < 20; i++) {
                    const letterIndex = Math.random() * 26;
                    const letter = String.fromCharCode('a'.charCodeAt(0) + letterIndex);
                    name += letter;
                }
                return name;
            }
        },
    };
</script>

<style scoped lang="scss">
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
</style>
