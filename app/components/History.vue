<template>
    <ScrollView :width="size" :height="size" backgroundColor="#fdc">
        <WrapLayout orientation="horizontal">
            <template v-for="(child, childIndex) in children">
                <Label v-if="child.type === 'moveNumber'" :key="child.number" :text="child.number"
                    :fontSize="size * 0.075" class="moveNumber"
                />
                <Label v-if="child.type === 'moveSan'" :key="child.san" :text="child.san"
                    :fontSize="size * 0.065" :margin="size * 0.0125" class="moveSan"
                    @tap="$emit('setPosition', childIndex)"
                />
            </template>
        </WrapLayout>
    </ScrollView>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 200,
        },
    },
    data() {
        return {
            children: [
                {
                    type: 'moveNumber',
                    number: '1...',
                },
                {
                    type: 'moveSan',
                    san: '\u2655xf6+'
                },
                {
                    type: 'moveSan',
                    san: '\u2655d2'
                },
            ],
        }
    }
}
</script>

<style scoped>
    Label.moveNumber {
        vertical-align: middle;
        font-weight: bold;
    }
    Label.moveSan {
        
    }
</style>