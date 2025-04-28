<template>
    <div class="demo-popup">
        <div class="trigger-container">
            <t-popup v-model="showPopup" placement="bottom" trigger="click">
                <t-button type="primary">Click Toggle Popup</t-button>
                <template #popper>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <span>Close</span>
                        <span>Close</span>
                        <span>Close</span>
                        <span>Close</span>
                        <span>Close</span>
                        <span>Close</span>
                    </div>
                </template>
            </t-popup>

            <t-popup v-model="hoverPopupVisible" placement="bottom" trigger="hover">
                <t-button type="danger">Hover Toggle Popup</t-button>
                <template #popper>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <span>Close</span>
                        <span>Close</span>
                        <span>Close</span>
                        <span>Close</span>
                        <span>Close</span>
                        <span>Close</span>
                    </div>
                </template>
            </t-popup>
        </div>

        <div class="mask-controls">
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const showPopup = ref(false)

const hoverPopupVisible = ref(false)

</script>

<style scoped>
.trigger-container {
    display: flex;
    gap: 20px;
}
</style>
