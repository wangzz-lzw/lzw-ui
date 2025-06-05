<template>
  <div class="virtual-list-demo">
    <t-virtual-list :data="data" :item-size="40" style="height: 400px; border: 1px solid #eee; border-radius: 4px;">
      <template #default="{ item }">
        {{ item }}
      </template>
    </t-virtual-list>
  </div>
</template>

<script lang="ts" setup>
const data = Array.from({ length: 1000 }, (_, i) => (
  `Item ${i + 1}`
));
</script>

<style scoped>
.virtual-list-demo {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>