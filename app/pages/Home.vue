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
                        <ActivityIndicator :busy="generatingPosition" />
                        <ListView for="item in sampleScripts" @itemTap="onSampleScriptTap($event.item)">
                            <v-template>
                                <Label :text="item.label" fontSize="22" width="100%" />
                            </v-template>
                        </ListView>
                    </GridLayout>
                </TabViewItem>

                <TabViewItem :title="'custom_scripts' | L" 
                iconSource="res://handsaw">
                    <GridLayout>
                        <Label text="Custom scripts" class="h2 text-center" />
                    </GridLayout>
                </TabViewItem>
            </TabView>
        </StackLayout>
    </Page>
</template>

<script>
    import { localize } from "nativescript-localize";
    import Vue from "nativescript-vue";

    import ChessPositionGenerator from '../position_generator/ChessPositionGenerator';
    import ConstraintScriptLoader from '../position_generator/ConstraintScriptLoader';

    Vue.filter("L", localize);

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
            }
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

                    let title = `${localize('script_error_title')} : ${localize(e.kind)}`;
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
        },
    };
</script>

<style scoped lang="scss">
    @import '../app-variables';
</style>
