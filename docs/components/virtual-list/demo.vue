<template>
  <div>
    <t-virtual-list :data="data"></t-virtual-list>
  </div>

</template>

<script lang="ts" setup>

const data = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`
}));
</script>
