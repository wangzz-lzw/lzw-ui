import { computed, unref } from 'vue'
import { _bem } from '@lzwui/utils/bem'
export const useNamespace = (block: string) => {
    const defaultNamespace = "t"
  // 命名前缀也就是命名空间
  const namespace = computed(() => defaultNamespace)
  // 创建块 例如：el-form
  const b = (blockSuffix = '') =>
    _bem(unref(namespace), block, blockSuffix, '', '')
  // 创建元素 例如：el-input__inner
  const e = (element?: string) =>
    element ? _bem(unref(namespace), block, '', element, '') : ''
  // 创建块修改器 例如：el-form--default
  const m = (modifier?: string) =>
    modifier ? _bem(unref(namespace), block, '', '', modifier) : ''
  // 创建后缀块元素 例如：el-form-item
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? _bem(unref(namespace), block, blockSuffix, element, '')
      : ''
  
  const is = (name: string, state: string | boolean) =>
    state ? `is-${name}` : ''


  return {
    namespace,
    b,
    e,
    m,
    be,
    is
  }
}

