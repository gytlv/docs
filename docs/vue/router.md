# 动态路由配置
## 动态路由格式
```js
[
    {
        "id": 2,
        "parentId": 0,
        "name": "系统管理",
        "type": 0,
        "path": "system",
        "component": "",
        "perms": null,
        "icon": "Setting",
        "sortValue": 1,
        "activeMenu": null,
        "isHide": false,
        "status": 1,
        "createTime": "2021-06-01 02:05:37",
        "updateTime": "2024-08-09 16:35:56",
        "isDeleted": 0,
        "meta": {
            "title": "系统管理",
            "icon": "Setting",
            "activeMenu": "",
            "isHide": false,
            "perms": null
        },
        "children": [
            {
                "id": 3,
                "parentId": 2,
                "name": "用户管理",
                "type": 1,
                "path": "/system/user",
                "component": "/system/user",
                "perms": "",
                "icon": "UserFilled",
                "sortValue": 1,
                "activeMenu": null,
                "isHide": false,
                "status": 1,
                "createTime": "2021-06-01 02:05:37",
                "updateTime": "2024-08-09 16:11:30",
                "isDeleted": 0,
                "meta": {
                    "title": "用户管理",
                    "icon": "UserFilled",
                    "activeMenu": "",
                    "isHide": false,
                    "perms": [
                        "bt.sysUser.page",
                        "bt.sysUser.add",
                        "bt.sysUser.update",
                        "bt.sysUser.remove",
                        "bt.sysUser.assignRole"
                    ]
                },
                "children": null,
                "select": false
            },
            {
                "id": 4,
                "parentId": 2,
                "name": "角色管理",
                "type": 1,
                "path": "/system/role",
                "component": "/system/role",
                "perms": "",
                "icon": "Tools",
                "sortValue": 2,
                "activeMenu": null,
                "isHide": false,
                "status": 1,
                "createTime": "2021-06-01 02:05:37",
                "updateTime": "2024-08-11 17:19:30",
                "isDeleted": 0,
                "meta": {
                    "title": "角色管理",
                    "icon": "Tools",
                    "activeMenu": "",
                    "isHide": false,
                    "perms": [
                        "bt.sysRole.list",
                        "bt.sysRole.add",
                        "bt.sysRole.update",
                        "bt.sysRole.remove",
                        "bt.sysRole.assignAuth"
                    ]
                },
                "children": null,
                "select": false
            },
            {
                "id": 5,
                "parentId": 2,
                "name": "菜单管理",
                "type": 1,
                "path": "/system/menu",
                "component": "/system/menu",
                "perms": "",
                "icon": "Menu",
                "sortValue": 3,
                "activeMenu": null,
                "isHide": false,
                "status": 1,
                "createTime": "2021-06-01 02:05:37",
                "updateTime": "2024-08-23 07:36:17",
                "isDeleted": 0,
                "meta": {
                    "title": "菜单管理",
                    "icon": "Menu",
                    "activeMenu": "",
                    "isHide": false,
                    "perms": [
                        "bt.sysMenu.list",
                        "bt.sysMenu.add",
                        "bt.sysMenu.update",
                        "bt.sysMenu.remove"
                    ]
                },
                "children": null,
                "select": false
            },
            {
                "id": 20,
                "parentId": 2,
                "name": "部门管理",
                "type": 1,
                "path": "/system/department",
                "component": "/system/department",
                "perms": "",
                "icon": "Menu",
                "sortValue": 4,
                "activeMenu": null,
                "isHide": false,
                "status": 1,
                "createTime": "2022-05-24 18:07:05",
                "updateTime": "2024-08-11 17:17:15",
                "isDeleted": 0,
                "meta": {
                    "title": "部门管理",
                    "icon": "Menu",
                    "activeMenu": "",
                    "isHide": false,
                    "perms": [
                        "bt.sysDept.list",
                        "bt.sysDept.add",
                        "bt.sysDept.update",
                        "bt.sysDept.remove"
                    ]
                },
                "children": null,
                "select": false
            },
            {
                "id": 22,
                "parentId": 2,
                "name": "岗位管理",
                "type": 1,
                "path": "/system/post",
                "component": "/system/post",
                "perms": "",
                "icon": "Menu",
                "sortValue": 5,
                "activeMenu": null,
                "isHide": false,
                "status": 1,
                "createTime": "2022-05-24 18:25:30",
                "updateTime": "2024-08-11 17:20:19",
                "isDeleted": 0,
                "meta": {
                    "title": "岗位管理",
                    "icon": "Menu",
                    "activeMenu": "",
                    "isHide": false,
                    "perms": [
                        "bt.sysPost.list",
                        "bt.sysPost.add",
                        "bt.sysPost.update",
                        "bt.sysPost.remove"
                    ]
                },
                "children": null,
                "select": false
            },
            {
                "id": 34,
                "parentId": 2,
                "name": "日志管理",
                "type": 0,
                "path": "",
                "component": "",
                "perms": "",
                "icon": "Document",
                "sortValue": 6,
                "activeMenu": null,
                "isHide": false,
                "status": 1,
                "createTime": "2022-05-31 21:23:07",
                "updateTime": "2024-08-11 17:54:22",
                "isDeleted": 0,
                "meta": {
                    "title": "日志管理",
                    "icon": "Document",
                    "activeMenu": "",
                    "isHide": false,
                    "perms": []
                },
                "children": null,
                "select": false
            }
        ],
        "select": false
    },
    {
        "id": 45,
        "parentId": 0,
        "name": "专辑管理",
        "type": 0,
        "path": "album",
        "component": null,
        "perms": null,
        "icon": "Film",
        "sortValue": 1,
        "activeMenu": null,
        "isHide": false,
        "status": 1,
        "createTime": "2023-05-31 21:59:44",
        "updateTime": "2024-08-23 00:57:52",
        "isDeleted": 0,
        "meta": {
            "title": "专辑管理",
            "icon": "Film",
            "activeMenu": "",
            "isHide": false,
            "perms": null
        },
        "children": [
            {
                "id": 46,
                "parentId": 45,
                "name": "专辑列表",
                "type": 1,
                "path": "/album/albumList",
                "component": "/album/albumList/albumList",
                "perms": null,
                "icon": "List",
                "sortValue": 1,
                "activeMenu": null,
                "isHide": false,
                "status": 1,
                "createTime": "2023-05-31 22:01:32",
                "updateTime": "2023-05-31 22:01:32",
                "isDeleted": 0,
                "meta": {
                    "title": "专辑列表",
                    "icon": "List",
                    "activeMenu": "",
                    "isHide": false,
                    "perms": [
                        "bt.album.viewDetail",
                        "bt.album.passAndNotPass"
                    ]
                },
                "children": null,
                "select": false
            },
            {
                "id": 55,
                "parentId": 45,
                "name": "声音管理",
                "type": 1,
                "path": "/album/trackList",
                "component": "/album/trackList/trackList",
                "perms": null,
                "icon": "Headset",
                "sortValue": 1,
                "activeMenu": null,
                "isHide": false,
                "status": 1,
                "createTime": "2023-05-31 22:53:48",
                "updateTime": "2024-08-15 15:44:17",
                "isDeleted": 0,
                "meta": {
                    "title": "声音管理",
                    "icon": "Headset",
                    "activeMenu": "",
                    "isHide": false,
                    "perms": [
                        "bt.track.viewTrackDetail",
                        "bt.track.viewTrackDetail"
                    ]
                },
                "children": null,
                "select": false
            },
            {
                "id": 58,
                "parentId": 45,
                "name": "分类管理",
                "type": 1,
                "path": "/album/category",
                "component": "/album/category/category",
                "perms": null,
                "icon": "Menu",
                "sortValue": 1,
                "activeMenu": null,
                "isHide": false,
                "status": 1,
                "createTime": "2023-05-31 22:59:23",
                "updateTime": "2023-05-31 22:59:55",
                "isDeleted": 0,
                "meta": {
                    "title": "分类管理",
                    "icon": "Menu",
                    "activeMenu": "",
                    "isHide": false,
                    "perms": null
                },
                "children": null,
                "select": false
            },
            {
                "id": 59,
                "parentId": 45,
                "name": "分类属性管理",
                "type": 1,
                "path": "/album/categoryAttribute",
                "component": "/album/categoryAttribute/categoryAttribute",
                "perms": null,
                "icon": "Grid",
                "sortValue": 1,
                "activeMenu": null,
                "isHide": false,
                "status": 1,
                "createTime": "2023-05-31 23:00:27",
                "updateTime": "2023-05-31 23:00:27",
                "isDeleted": 0,
                "meta": {
                    "title": "分类属性管理",
                    "icon": "Grid",
                    "activeMenu": "",
                    "isHide": false,
                    "perms": null
                },
                "children": null,
                "select": false
            }
        ],
        "select": false
    },
    {
        "id": 50,
        "parentId": 0,
        "name": "订单管理",
        "type": 0,
        "path": "order",
        "component": "",
        "perms": null,
        "icon": "DocumentCopy",
        "sortValue": 5,
        "activeMenu": null,
        "isHide": false,
        "status": 1,
        "createTime": "2023-05-31 22:27:33",
        "updateTime": "2024-08-23 00:51:18",
        "isDeleted": 0,
        "meta": {
            "title": "订单管理",
            "icon": "DocumentCopy",
            "activeMenu": "",
            "isHide": false,
            "perms": null
        },
        "children": [
            {
                "id": 51,
                "parentId": 50,
                "name": "订单列表",
                "type": 1,
                "path": "/order/orderList",
                "component": "/order/orderList/orderList",
                "perms": null,
                "icon": "List",
                "sortValue": 1,
                "activeMenu": null,
                "isHide": false,
                "status": 1,
                "createTime": "2023-05-31 22:43:50",
                "updateTime": "2024-08-15 15:38:34",
                "isDeleted": 0,
                "meta": {
                    "title": "订单列表",
                    "icon": "List",
                    "activeMenu": "",
                    "isHide": false,
                    "perms": [
                        "bt.order.viewOrderDetail"
                    ]
                },
                "children": null,
                "select": false
            }
        ],
        "select": false
    },
    {
        "id": 53,
        "parentId": 0,
        "name": "会员管理",
        "type": 0,
        "path": "member",
        "component": "",
        "perms": null,
        "icon": "UserFilled",
        "sortValue": 1,
        "activeMenu": null,
        "isHide": false,
        "status": 1,
        "createTime": "2023-05-31 22:46:13",
        "updateTime": "2024-08-15 15:41:34",
        "isDeleted": 0,
        "meta": {
            "title": "会员管理",
            "icon": "UserFilled",
            "activeMenu": "",
            "isHide": false,
            "perms": null
        },
        "children": [
            {
                "id": 54,
                "parentId": 53,
                "name": "会员列表",
                "type": 1,
                "path": "/member/memberList",
                "component": "/member/memberList/memberList",
                "perms": null,
                "icon": "UserFilled",
                "sortValue": 1,
                "activeMenu": null,
                "isHide": false,
                "status": 1,
                "createTime": "2023-05-31 22:47:31",
                "updateTime": "2023-05-31 22:47:31",
                "isDeleted": 0,
                "meta": {
                    "title": "会员列表",
                    "icon": "UserFilled",
                    "activeMenu": "",
                    "isHide": false,
                    "perms": null
                },
                "children": null,
                "select": false
            }
        ],
        "select": false
    }
]
```
## router配置
index.js
```js
import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoute } from "./routes";
import useLayoutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { ref } from "vue";
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
const modules = import.meta.glob(['../views/system/**/index.vue'])

let router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoute,
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})

let dynamicRouteFlag = ref(false)

router.beforeEach((to, _from, next) => {
    nProgress.start()
    if (to.path != '/404') {
        useLayoutSettingStore().path = to.path;
    }
    if (useUserStore().token) {
        if (to.path == '/login') {
            next('/')
        } else {
            if (dynamicRouteFlag.value) {
                next()
            } else {
                loadDynamicRoute();
                dynamicRouteFlag.value = true//6.不让重复添加
                router.push({ path: useLayoutSettingStore().path })
            }
        }
    } else {
        //1.没有登陆,则进入登陆界面
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})


const loadDynamicRoute = () => {
    useUserStore().dynamicRoutes.forEach((route) => {
        router.addRoute({ path: "/" + route.path, name: route.name, meta: route.meta, component: () => import("@/layout/index.vue") });
        if (route && route.children && route.children.length > 0) {
            route.children.forEach((routeItem) => {
                router.addRoute(route.name, { name: routeItem.name, path: `${routeItem.path}`, meta: routeItem.meta, component: modules[`../views${routeItem.component}/index.vue`] })
                if (routeItem.children) {
                    routeItem.children.forEach((item) => {
                        router.addRoute(route.name, { name: item.name, path: `${item.path}`, meta: item.meta, component: modules[`../views${item.component}/index.vue`] })
                    })
                };
            })
        }
    })
}


router.afterEach((_to, _from) => {
    nProgress.done()
})

export default router
```

## 路由配置
routes.js
```js
export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登陆',//菜单标题
            isHide: true
        }
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            title: '',//菜单标题
            isHide: false,
            icon: 'HomeFilled'
        },
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                name: 'home',
                meta: {
                    title: '首页',//菜单标题
                    icon: 'HomeFilled'
                },
            }
        ],
        redirect: '/home'
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',//菜单标题
            isHide: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',//菜单标题
            isHide: true
        }
    }
]
```