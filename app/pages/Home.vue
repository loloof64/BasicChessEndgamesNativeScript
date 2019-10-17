<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" :text="'home_title' | L"></Label>
        </ActionBar>

        <StackLayout orientation="vertical">
            <Label text="Hello !" />
        </StackLayout>
    </Page>
</template>

<script>
    import { localize } from "nativescript-localize";
    import Vue from "nativescript-vue";

    Vue.filter("L", localize);

    export default {
        data() {
            return {

            }
        },
        methods: {
            
        },
    };
</script>

<style scoped lang="scss">
    @import '../app-variables';
</style>
