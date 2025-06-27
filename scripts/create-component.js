#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// 获取组件名称参数
const componentName = "date-picker";
if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

// 组件目录路径
const templateDirPath = path.join(__dirname, './')
const componentsDir = path.join(__dirname, '../packages/components');
const targetDir = path.join(componentsDir, componentName);
const templateDir = path.join(templateDirPath, 'templateCom');

// 检查组件是否已存在
if (fs.existsSync(targetDir)) {
  console.log(`Component ${componentName} already exists`);
  process.exit(0);
}

// 创建组件目录
fs.mkdirSync(targetDir);
fs.mkdirSync(path.join(targetDir, 'src'));

// 模板文件列表
const templateFiles = [
  {
    src: 'src/templateCom.vue',
    dest: `src/${componentName}.vue`,
    replace: [
      { from: 'templateCom', to: componentName },
      { from: 'TemplateCom', to: componentName.charAt(0).toUpperCase() + componentName.slice(1) }
    ]
  },
  {
    src: 'src/templateCom.ts',
    dest: `src/${componentName}.ts`,
    replace: [
      { from: 'templateCom', to: componentName }
    ]
  },
  {
    src: 'index.ts',
    dest: 'index.ts',
    replace: [
      { from: 'templateCom', to: componentName },
      { from: 'TemplateCom', to: componentName.charAt(0).toUpperCase() + componentName.slice(1) }
    ]
  }
];

// 复制并处理模板文件
templateFiles.forEach(file => {
  const templatePath = path.join(templateDir, file.src);
  const destPath = path.join(targetDir, file.dest);

  let content = fs.readFileSync(templatePath, 'utf8');
  file.replace.forEach(replace => {
    content = content.replace(new RegExp(replace.from, 'g'), replace.to);
  });

  fs.writeFileSync(destPath, content);
});

console.log(`Component ${componentName} created successfully`);
