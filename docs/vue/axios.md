# vue-axios

## 配置axios
request.js
```js
import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";

let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
});

request.interceptors.request.use((config) => {
    if (useUserStore().token) {
        config.headers.token = useUserStore().token
    }
    return config;
})

request.interceptors.response.use((response) => {
    if (response.data.code == 401) {
        ElMessage({ type: 'error', message: response.data.message })
        localStorage.clear()
        window.location.href = '/'
    } else {
        return response.data
    }
}, (error) => {
    return Promise.reject(error)
})

export default request;
```

## 封装axios请求
http.js
```js
import request from "@/utils/axios/request";
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        request.get(url, {
            params: params
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
/**
 * get方法，对应get请求,直接在地址后面拼串的形式
 * @param {String} url [请求的url地址]
 * @param {String} params [请求时携带的参数]
 */
export function getDynamic(url, params) {
    return new Promise((resolve, reject) => {
        const completeUrl = `${url}/${params}`
        request.get(completeUrl, {}).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
/**
 * deleteDynamic方法，对应delte请求,直接在地址后面拼串的形式
 * @param {String} url [请求的url地址]
 * @param {String} params [请求时携带的参数]
 */
export function deleteDynamic(url, params) {
    return new Promise((resolve, reject) => {
        const completeUrl = `${url}/${params}`
        request.delete(completeUrl, {}).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
/**
* post方法，对应post请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function post(url, params) {
    return new Promise((resolve, reject) => {
        request.post(url, params).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
/**
* delete方法，对应delete请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function batchDelete(url, params) {
    return new Promise((resolve, reject) => {
        request.delete(url, params).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
* put方法，对应put请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function update(url, params) {
    return new Promise((resolve, reject) => {
        request.put(url, params).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
```

## 用法

api/user.js
```js
import { get, getDynamic, post, deleteDynamic, batchDelete, update } from '@/utils/axios/http'

const API = {
    login: "/security/login",
    page: "/sysUser/page",
    oneDelete:"sysUser/remove",
    batchDelete: "/sysUser/batchRemove",
    add: "sysUser/save",
    update: "sysUser/update",
}

export const loginRequest = (data) => post(API.login, data);
export const pageRequest = (data) => post(API.page, data);
export const addRequest = (data) => post(API.add, data);
export const updateRequest = (data) => update(API.update, data);
export const oneDelRequest = (data) => deleteDynamic(API.oneDelete, data);
export const batchDelRequest = (data) => batchDelete(API.batchDelete, { data: data });
```

### 页面使用
user.vue
```js
<template>
    <el-card style="height: 70px;">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名:">
                <el-input placeholder="请输入用户名" v-model="searchInfo.keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="searchInfo.keyword ? false : true" @click="search">搜索</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <div style="float: left;margin-bottom: 20px;">
            <el-button type="primary" @click="addBtn">添加用户</el-button>
            <el-popconfirm :title="`确定删除]吗?`" width="260px" @confirm="delSelectUsers" @cancel="cancelBatchDelete">
                <template #reference>
                    <el-button type="primary" :disabled="selectIds.length ? false : true" @click="">批量删除</el-button>
                </template>
            </el-popconfirm>
        </div>
        <!--列表信息展示-->
        <el-table border :data="userArr" style="margin: 10px 0px;" @selection-change="selectChange">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" align="center" label="#"></el-table-column>
            <el-table-column prop="name" align="center" label="昵称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="username" align="center" label="用户名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" align="center" label="用户状态" show-overflow-tooltip>
                <template #default="{ row }">
                    <el-switch v-model="row.status" :active-value="1" :inactive-value="0" disabled></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="postName" align="center" label="岗位名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="deptName" align="center" label="部门名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" align="center" label="创建时间" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="280px" align="center">
                <template #default="{ row }">
                    <el-button type="primary" size="small" icon="User" v-if="row.username !== `admin`"
                        @click="roleBtn(row)">分配角色</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateBtn(row)"
                        v-if="row.username !== `admin`">编辑</el-button>
                    <el-popconfirm :title="`确定删除[${row.name}]吗?`" width="260px" @confirm="remove(row)"
                        v-if="row.username !== `admin`">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="searchInfo.page" v-model:page-size="searchInfo.limit"
            :page-sizes="[10, 15, 20]" :size="searchInfo.size" background="background" :total="searchInfo.total"
            @current-change="getSysUserList" />
    </el-card>
    <!--添加用户,更新用户信息-->
    <el-drawer v-model="drawer">
        <template #header>
            <h4>{{ userParams.id ? '修改用户' : '添加用户' }}</h4>
        </template>
        <template #default>
            <el-form label-width="auto" class="userForm" :model="userParams" :rules="rules" ref="userFormRef">
                <el-form-item label="用户名:" prop="username">
                    <el-input placeholder="请输入姓名" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称:" prop="name">
                    <el-input placeholder="请输入昵称" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password" v-if="!userParams.id">
                    <el-input placeholder="请输入密码" type="password" v-model="userParams.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号:" prop="phone">
                    <el-input placeholder="请输入手机号" v-model="userParams.phone"></el-input>
                </el-form-item>
                <el-form-item label="岗位:" prop="postId">
                    <el-select placeholder="请选择岗位" v-model="userParams.postId">
                        <el-option v-for="item in sysPostArr" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="部门:" prop="deptId">
                    <el-tree-select v-model="userParams.deptId" node-key="id" :data="sysDeptNode" check-strictly
                        :props="deptProps" :default-expanded-keys="[1]" :render-after-expand="false" />
                </el-form-item>
                <el-form-item label="状态:" prop="status">
                    <el-switch v-model="userParams.status" :active-value="1" :inactive-value="0" />
                    <span style="margin-left: 30px;">{{ userParams.status == 0 ? "禁用" : "启用" }}</span>
                </el-form-item>
                <el-form-item label="描述:">
                    <el-input rows="5" placeholder="描述..." type="textarea" v-model="userParams.description"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawer = false;">取消</el-button>
                <el-button type="primary" @click="save">确认</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { pageRequest, batchDelRequest, addRequest, updateRequest, oneDelRequest } from '@/api/sys/user'
import { sysDeptList } from '@/api/sys/dept'
import { sysPostList } from '@/api/sys/post'
import useLayoutSettingStore from '@/store/modules/setting';

let layoutSettingStore = useLayoutSettingStore();

let userArr = ref([]);
let sysDeptNode = ref([]);
let sysPostArr = ref([]);
//控制添加和修改按钮的隐藏和显示
let drawer = ref(false)

//用户表单
let userFormRef = ref();

//部门树形结构
const deptProps = {
    children: 'children',
    label: 'name',
    id: 'id'
};

//分页搜索
let searchInfo = reactive({
    page: 1,
    limit: 10,
    total: 0,
    size: 0,
    keyword: "",
})

//添加或修改的用户数据
let userParams = reactive({
    username: '',
    name: '',
    password: '',
    phone: '',
    deptId: '',
    postId: '',
    description: '',
    status: 0
})


const search = () => {
    getSysUserList()
}

//用户列表分页查询
const getSysUserList = async (pager = 1) => {
    searchInfo.page = pager;
    let result = await pageRequest(searchInfo);

    if (result.code == 200) {
        userArr.value = result.data.records;
        searchInfo.total = result.data.total;
        searchInfo.size = result.data.pages;
    }
}

//部门列表
const getSysDeptList = async () => {
    let result = await sysDeptList();
    if (result.code == 200) {
        sysDeptNode.value = result.data;
    }
}

//岗位列表
const getSysPostList = async () => {
    let result = await sysPostList();
    if (result.code == 200) {
        sysPostArr.value = result.data;
    }
}


//添加按钮
const addBtn = () => {
    drawer.value = true
    Object.assign(userParams, {
        id: 0,
        username: '',
        name: '',
        password: '',
        phone: '',
        deptId: '',
        postId: '',
        description: '',
        status: 0
    })
    //新增和修改抽屉打开后清除校验提示
    nextTick(() => {
        userFormRef.value.clearValidate('username');
        userFormRef.value.clearValidate('name');
        userFormRef.value.clearValidate('password')
    })
};

//修改按钮
const updateBtn = (row) => {
    Object.assign(userParams, row)
    drawer.value = true
    nextTick(() => {
        userFormRef.value.clearValidate('userName');
        userFormRef.value.clearValidate('name');
    })
}


//校验用户名字
const validateUsername = (_rule, value, callBack) => {
    if (value.trim().length >= 4) {
        callBack()
    } else {
        callBack(new Error('用户名至少为5位'))
    }
}
//校验昵称
const validateName = (_rule, value, callBack) => {
    if (value.trim().length >= 2) {
        callBack()
    } else {
        callBack(new Error('用户昵称至少为2位'))
    }
}

//校验密码
const validatePassword = (_rule, value, callBack) => {
    if (value.trim().length >= 6) {
        callBack()
    } else {
        callBack(new Error('用户密码至少为6位'))
    }
}



//添加规则
const rules = {
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    name: [{ required: true, trigger: 'blur', validator: validateName }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
}


//保存或修改用户
const save = async () => {
    let opt = userParams.id ? "update" : "add";

    if (opt == 'add') {
        await userFormRef.value.validate();
        let result = await addRequest(userParams);

        if (result.code == 200) {
            if (result.data) {
                drawer.value = false;
                ElMessage({ type: 'success', message: '添加成功' });
            }
            else {
                ElMessage({ type: 'error', message: "用户已存在" });
            }
        };
    }
    if (opt == 'update') {
        await userFormRef.value.validate();
        let result = await updateRequest(userParams);

        if (result.code == 200) {
            if (result.data) {
                drawer.value = false;
                ElMessage({ type: 'success', message: '修改成功' });
            }
            else {
                ElMessage({ type: 'error', message: "用户已存在" });
            }
        };
    }
    getSysUserList(userParams.id ? searchInfo.page : 1)
}





let selectIds = ref([]);
//批量删除数据选中
const selectChange = async (value) => {
    selectIds.value = value;
}

//批量删除
const delSelectUsers = async () => {
    let idsList = [];
    selectIds.value.map(item => {
        if (item.username === 'admin') {
            return;
        } else {
            idsList.push(item.id)
        }
    });
    let result = await batchDelRequest(idsList);

    if (result.code == 200) {
        ElMessage({ type: 'success', message: '删除成功!' });
        getSysUserList(userArr.value.length > 1 ? searchInfo.page : 1)
    }
}
// 删除用户
const remove = async (row) => {
    let result = await oneDelRequest(row.id);
    if (result.code == 200) {
        ElMessage({ type: 'success', message: '删除成功!' });
        getSysUserList(userArr.value.length > 1 ? searchInfo.page : 1)
    }
}

//取消批量删除
const cancelBatchDelete = () => {
    getSysUserList(userArr.value.length > 1 ? searchInfo.page : 1)
}

//重置
const reset = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh;
}

onMounted(() => {
    getSysUserList();
    getSysDeptList();
    getSysPostList();
})
</script>

<style scoped lang="scss">
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.userForm .el-select {
    --el-select-width: 220px;
}
</style>
```

