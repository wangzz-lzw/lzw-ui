<template>
  <div :class="[bem.b()]">
    <table :class="[bem.e('inner')]">
      <thead v-if="showHeader">
        <tr :class="[bem.e('header-row')]">
          <th v-for="(column,$index) in columns" :key="column.prop" :class="[
            bem.e('header-cell'),
            headerCellClassName?.({ column, columnIndex: $index }),
            { [bem.is('sortable')]: column.sortable },
          ]" :style="headerCellStyle?.({ column, columnIndex: $index })" @click="handleSortClick(column)">
            <div :class="bem.e('cell-content')">
              {{ column.label }} 
              <span v-if="column.sortable" :class="[
                bem.e('sort-icon'),
                {
                  [bem.is('ascending')]: sortState.prop === column.prop && sortState.order === 'ascending',
                  [bem.is('descending')]: sortState.prop === column.prop && sortState.order === 'descending',
                }
              ]">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" />
                </svg>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex" :class="[
          bem.e('row'),
          rowClassName?.({ row, rowIndex }),
          { [bem.is('current')]: highlightCurrentRow && currentRow === row },
        ]" :style="rowStyle?.({ row, rowIndex })" @click="handleRowClick(row)">
          <td v-for="column in columns" :key="column.prop" :class="[
            bem.e('cell'),
            cellClassName?.({ row, column, rowIndex, columnIndex: $index }),
          ]" :style="cellStyle?.({ row, column, rowIndex, columnIndex: $index })">
            {{ sortedData[rowIndex][column.prop] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { bem, tableProps, type TableColumn } from './table'

const props = defineProps(tableProps)
const emits = defineEmits(['row-click', 'sort-change'])

const currentRow = ref()
const sortState = ref({
  prop: props.defaultSort.prop,
  order: props.defaultSort.order
})

const sortedData = computed(() => {
  if (!sortState.value.prop) return props.data

  const { prop, order } = sortState.value
  const column = props.columns.find(col => col.prop === prop)

  if (!column?.sortable) return props.data

  return [...props.data].sort((a, b) => {
    if (column.sortMethod) {
      return column.sortMethod(a, b)
    }

    if (order === 'ascending') {
      return a[prop] > b[prop] ? 1 : -1
    } else {
      return a[prop] < b[prop] ? 1 : -1
    }
  })
})

const handleRowClick = (row: any) => {
  currentRow.value = row
  emits('row-click', row)
}

const handleSortClick = (column: TableColumn) => {
  if (!column.sortable) return

  const { prop } = column
  let order

  if (sortState.value.prop !== prop) {
    order = props.sortOrders[0]
  } else {
    const currentIndex = props.sortOrders.indexOf(sortState.value.order)
    const nextIndex = (currentIndex + 1) % props.sortOrders.length
    order = props.sortOrders[nextIndex]
  }

  sortState.value = {
    prop: order ? prop : '',
    order
  }

  emits('sort-change', { column, prop, order })
}
</script>

<style scoped lang="scss"></style>
