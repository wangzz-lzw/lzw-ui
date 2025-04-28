import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  vite: {
      ssr: {
      noExternal: ['@highlightjs/vue-plugin']
    }
  },
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/components/button/" },
    ],

    sidebar: {
      "/components/": [
        {
          text: "基本",
          items: [
            { text: "Button 按钮", link: "/components/button/" },
            { text: "Form 表单", link: "/components/form/" },
            { text: "Input 输入框", link: "/components/input/" },
            { text: "Tree", link: "/components/tree/" },
            { text: "Checkbox", link: "/components/checkbox/" },
            { text: "Model", link: "/components/model/" },
            { text:"Select", link:"/components/select/"},
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "http://github.com/wangzz-lzw/lzw-ui" }],
  },
})
