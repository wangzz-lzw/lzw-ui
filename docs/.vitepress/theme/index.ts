import DefaultTheme from "vitepress/theme";
import TestUI from "@lzwui/components";
import "@lzwui/theme-chalk/index.scss"
import Preview from "./preview/index.vue"; // 引入预览功能的组件
import "highlight.js/styles/base16/summerfruit-light.css"; // 主题

import hljs from 'highlight.js/lib/core'
import hljsVuePlugin from '@highlightjs/vue-plugin' 
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)

export default {
    ...DefaultTheme,
    enhanceApp: async ({ app, router, siteData }) => {
        app.use(TestUI);
        app.component("preview", Preview); // 注册预览功能的组件
        app.use(hljsVuePlugin);
    },
};
