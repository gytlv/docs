# pina仓库

## 配置pina
index.js
```js
import { createPinia } from "pinia"; 
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


let pinia=createPinia();
pinia.use(piniaPluginPersistedstate)

export default pinia;
```
## 仓库配置
src/store/modules/user.js
```js
import { defineStore } from "pinia"

let useUserStore = defineStore("gytlv_", {
    state: () => ({
        token: '',
        userInfo: {},
        dynamicRoutes: [],
        error: 0
    }),
    actions: {
        setToken(token) {
            this.token = token;
        },
        setDynamicRoute(menu) {
            this.dynamicRoutes = [...menu]
        },
        setUserInfo(userInfo) {
            this.userInfo = userInfo
        }
    },
    getters: {},
    persist: true
})

export default useUserStore;
```
src/store/modules/setting.js
```js
import { defineStore } from "pinia"

let useLayoutSettingStore = defineStore("gytlv_LayoutSetting", {
    state: () => ({
        fold: false,
        path: '/',
        refresh: false,
        tabs: [],
    }),
    actions: {},
    getters: {},
    persist: true
})

export default useLayoutSettingStore;
```