import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/components/button/" },
    ],

    sidebar: {
      "/components/": [
        {
          text: "基本",
          items: [{ text: "Button 按钮", link: "/components/button/" }],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
})
