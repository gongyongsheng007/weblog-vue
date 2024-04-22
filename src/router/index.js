import Index from '@/pages/fronted/index.vue'
import { createRouter,createWebHashHistory } from 'vue-router'
import Login from '@/pages/admin/login.vue'
import AdminIndex from '@/pages/admin/index.vue'

//统一声明路由
const routes=[
    {
        path:'/',//访问的路由地址
        component:Index,//对应的组件
        meta:{//页面信息
            title:'Weblog首页' //页面标题
        }

    },
    {
        path:'/login',
        component:Login,
        meta:{
            title:'Weblog登录页'
        }
    },
    {
        path:'/admin/index',
        component:AdminIndex,
        meta:{
            title:'Admin 后台首页'
        }
    }
]

//创建路由
const router=createRouter({
    // 指定路由的历史管理方式，hash 模式指的是 URL 的路径是通过 hash 符号（#）进行标识
    history:createWebHashHistory(),
    routes,
})

// ES6 模块导出语句，它用于将 router 对象导出，以便其他文件可以导入和使用这个对象
export default router