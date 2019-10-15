<template>
    <ScrollView :width="size" :height="size" backgroundColor="#fdc">
        <WrapLayout orientation="horizontal">
            <template v-for="(child, childIndex) in children">
                <Label v-if="child.type === 'moveNumber'" :key="child.number" :text="child.number"
                    :fontSize="size * 0.075" class="moveNumber"
                />
                <Label v-if="child.type === 'moveSan'" :key="child.san" :text="child.san"
                    :fontSize="size * 0.065" :margin="size * 0.0125" class="moveSan"
                    @tap="$emit('setposition', childIndex)"
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
            firstSanMove: false,
            moveNumber: 1,
        }
    },
    methods: {
        startHistory({moveNumber, whiteMove}) {
            const white = whiteMove || true;
            const number = moveNumber || 1;

            // clear array content
            this.children.splice(0, this.children.length);

            const numberStr = `${moveNumber}.${whiteMove ? '' : '..'}`;
            this.children.push({
                type: 'moveNumber',
                number: numberStr,
            });

            this.firstSanMove = true;
        },
        addSanMove({san, whiteMove}) {
            const white = whiteMove === undefined ? true : whiteMove;

            //////////////////////////////////////////
            console.log('whiteMove', whiteMove);
            console.log('white', white);
            //////////////////////////////////////////

            if (!this.firstSanMove && white) {
                this.moveNumber++;
                const number = `${this.moveNumber}.`;
                this.children.push({
                    type: 'moveNumber',
                    number: number,
                });
            }

            this.children.push({
                type: 'moveSan',
                san: san,
            });

            this.firstSanMove = false;
        }
    },
}
</script>

<style scoped>
    Label.moveNumber {
        vertical-align: middle;
        font-weight: bold;
    }
    Label.moveSan {
        color: cadetblue;
    }
</style>