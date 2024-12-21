# vue基础脚手架

## 准备工作

1. node v16.14.2
2. pnpm 8.0.0

## 项目初始化

1. 设置淘宝镜像

   ```bash
   npm config set registry https://registry.npmmirror.com/
   ```

2. npm指令安装

   ```bash
   npm install -g pnpm@latest
   ```

3. 项目初始化命令

   ```bash
   pnpm create vite
   ```

4. 安装eslint

   ```bash
   pnpm create @eslint/config@latest
   ```

5. 安装sass

   ```bash
   pnpm install -D sass
   ```

6. element plus

   ```bash
   pnpm install element-plus
   ```
   
## 替换package.json
```js
{
  "name": "gytlv-mgr",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --open",
    "prod": "vite --mode prod --open",
    "build": "vite build",
    "build:prod": "vite build --mode prod",
    "preview": "vite preview"
  },
  "dependencies": {
    "@element-plus/icons-vue": "^2.3.1",
    "axios": "^1.7.9",
    "element-plus": "^2.9.0",
    "nprogress": "^0.2.0",
    "pinia": "^2.3.0",
    "pinia-plugin-persistedstate": "^4.1.3",
    "sass": "^1.82.0",
    "sass-loader": "^16.0.4",
    "vue": "^3.5.13",
    "vue-router": "^4.5.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.16.0",
    "@vitejs/plugin-vue": "^5.2.1",
    "eslint": "^9.16.0",
    "eslint-plugin-vue": "^9.32.0",
    "globals": "^15.13.0",
    "mockjs": "^1.1.0",
    "vite": "^6.0.1",
    "vite-plugin-mock": "^3.0.2",
    "vite-plugin-svg-icons": "^2.0.1"
  }
}
```

# 下载管理包
```bash
npm install
```

## main.js 配置
```js
import { createApp } from 'vue'
import '@/styles/index.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from '@/App.vue'
import router from '@/router'
import pinia from '@/store'
import appComponents from '@/components'

const app = createApp(App)
app.use(ElementPlus, { locale: zhCn, })
app.use(router)
app.use(pinia)
app.use(appComponents)
app.config.warnHandler = () => { };
app.mount('#app')
```