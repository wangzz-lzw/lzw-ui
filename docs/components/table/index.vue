<template>
    <t-table sortable :columns="tableColumns" :data="tableData"></t-table>
</template>

<script setup lang="ts">

const tableColumns = [
    {
        label: 'Name',
        prop: 'name',
        width: 150,
        fixed: true,
    },
    {
        label: 'Age',
        prop: 'age',
        width: 100,
    },
    {
        label: 'Address',
        prop: 'address',
        width: 200,
    },
    {
        label: 'Email',
        prop: 'email',
        width: 200,
    },
];

const tableData = [
    {
        name: 'John',
        age: 20,
        address: 'New York No. 1 Lake Park',
        email: 'john@example.com',
    },
    {
        name: 'Tom',
        age: 21,
        address: 'London No. 1 Lake Park',
        email: 'tom@example.com',
    },
    {
        name: 'Jerry',
        age: 22,
        address: 'Sydney No. 1 Lake Park',
        email: 'jerry@example.com',
    },
];

</script>

<style scoped lang="scss"></style>
