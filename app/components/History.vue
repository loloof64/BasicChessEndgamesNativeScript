<template>
    <ScrollView ref="scrollview" :width="size" :height="size" backgroundColor="#fdc">
        <WrapLayout orientation="horizontal">
            <template v-for="(child, childIndex) in children">
                <Label v-if="child.type === 'moveNumber'" :key="child.number" :text="child.number"
                    :fontSize="size * 0.075" class="moveNumber"
                />
                <Label v-if="child.type === 'moveSan'" :key="child.san" :text="child.san"
                    :fontSize="size * 0.065" :margin="size * 0.0125" class="moveSan"
                    @tap="() => sendGotoHistoryEvent(childIndex)"
                    :backgroundColor="getMoveBackgroundColor(childIndex)"
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
            children: [],
            firstSanMove: false,
            moveNumber: 1,
            historyIndex: 0,
            hightlightedHistoryIndex: undefined,
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
            this.moveNumber = number;
            this.historyIndex = 0;
        },
        addSanMove({san, whiteMove}) {
            const white = whiteMove === undefined ? true : whiteMove;

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
                historyIndex: this.historyIndex,
            });
            this.historyIndex++;

            this.firstSanMove = false;
            // Move the scrollview to the bottom
            const scrollView = this.$refs.scrollview.nativeView;
            scrollView.scrollToVerticalOffset(scrollView.scrollableHeight, false);
        },
        sendGotoHistoryEvent(childIndex) {
            const historyObject = this.children[childIndex];

            if (historyObject.historyIndex === undefined) return;

            this.$emit('gotohistory', historyObject.historyIndex);
        },
        highlightHistoryMove(historyIndex) {
            this.hightlightedHistoryIndex = this.children.findIndex(currentChild => currentChild.historyIndex !== undefined &&
                currentChild.historyIndex === historyIndex
            );
        },
        getMoveBackgroundColor(childIndex) {
            return this.hightlightedHistoryIndex === childIndex ? '#f66' : 'transparent';
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