import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "node:path";
export default defineConfig({
  build: {
    //打包文件目录
    outDir: "es",
    //压缩
    //minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: ["vue"],
      input: ["index.ts"],
      output: [
        {
          //打包格式
          format: "es",
          //打包后文件名
          entryFileNames: "[name].mjs",
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: "named",
          //配置打包根目录
          dir: "../../lzwui/es",
        },
        {
          //打包格式
          format: "cjs",
          //打包后文件名
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: "named",
          //配置打包根目录
          dir: "../../lzwui/lib",
        },
      ],
    },
    lib: {
      entry: "./index.ts",
    },
  },
  plugins: [
    vue(),
    dts({
      entryRoot: ".",
      // 输出目录应与 build.rollupOptions.output 配置保持一致
      outDir: ["../../lzwui/es", "../../lzwui/lib"],
      // 配置要包含的文件
      include: ["index.ts", "src/**/*.ts", "src/**/*.vue"],
      // 开启 vue 文件支持
      cleanVueFileName: true,
      // TypeScript 配置文件路径
      tsconfigPath: path.resolve(__dirname, "../../tsconfig.json"),
    }),
  ],
});
