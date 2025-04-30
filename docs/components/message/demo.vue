<template>
  <div class="demo-message">
    <h3>基础用法</h3>
    <t-button @click="showMessage" type="primary">显示消息</t-button>

    <h3>不同状态</h3>
    <t-button @click="showSuccess" type="success">成功</t-button>
    <t-button @click="showWarning" type="warning">警告</t-button>
    <t-button @click="showInfo" type="info">信息</t-button>
    <t-button @click="showError" type="danger">错误</t-button>

    <h3>可关闭</h3>
    <t-button @click="showClosableMessage" type="primary">可关闭消息</t-button>

    <h3>自定义时长</h3>
    <t-button @click="showLongMessage" type="primary">显示5秒</t-button>
  </div>
</template>

<script setup lang="ts">
import { message } from '@lzwui/components/message'
console.log()
const showMessage = () => {
  message('这是一条普通消息')
}

const showSuccess = () => {
  message.success('这是一条成功消息')
}

const showWarning = () => {
  message.warning('这是一条警告消息')
}

const showInfo = () => {
  message.info('这是一条信息消息')
}

const showError = () => {
  message.error('这是一条错误消息')
}

const showClosableMessage = () => {
  message({
    message: '可手动关闭的消息',
    showClose: true
  })
}

const showLongMessage = () => {
  message({
    message: '这条消息会显示5秒',
    duration: 5000
  })
}
</script>

<style scoped>
.demo-message {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

h3 {
  margin: 16px 0 8px;
  font-weight: 500;
}
</style>
