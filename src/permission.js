import router from "@/router/index";
import { showElMessage } from "./composables/util";
import { getToken } from "./composables/auth";
import { showPageLoading , hidePageLoading } from "./composables/util";

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
    console.log('==> 全局路由前置守卫')
    // 若用户想访问后台（以 /admin 为前缀的路由）
    // 未登录，则强制跳转登录页
    showPageLoading();
    let token=getToken();
    if(!token && to.path.startsWith('/admin')){
        showElMessage('请先登录','warning');
        next({path : '/login'})
    }else if(token && to.path=='/login'){
        showElMessage('请勿重复登录','warning');
        next({path : '/admin/index' })
    }else{
        next()
    }
})

// 全局路由后置守卫
router.afterEach((to, from) => {
    // 动态设置页面 Title
    let title = (to.meta.title ? to.meta.title : '') + ' - Weblog'
    document.title = title
    hidePageLoading();
})