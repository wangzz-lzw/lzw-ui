// BEM 命名字符拼接函数
export const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  // 默认是 Block
  let cls = `${namespace}-${block}`
  // 如果存在 Block 后缀，也就是 Block 里面还有 Block，例如：el-form 下面还有一个 el-form-item
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  // 如果存在元素
  if (element) {
    cls += `__${element}`
  }
  // 如果存在修改器
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

