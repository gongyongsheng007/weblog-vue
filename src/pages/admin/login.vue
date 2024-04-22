<template>
    <!-- 使用 grid 网格布局，并指定列数为 2，高度占满全屏 -->
    <div class="grid grid-cols-2 h-screen">
	    <div class="col-span-2 order-2 md:col-span-1 md:order-1 bg-slate-900">
        	<!-- 指定为 flex 布局，并设置为屏幕垂直水平居中，高度为 100% -->
            <div class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInLeft animate__fast">
                <h2 class="font-bold text-4xl mb-7 text-white">Weblog 博客登录</h2>
                <p class="text-white">一款由 Spring Boot + Mybaits Plus + Vue 3.2 + Vite 4 开发的前后端分离博客。</p>
                <!-- 指定图片宽度为父级元素的 1/2 -->
                <img src="@/assets/developer.png" class="w-1/2">
            </div>
        </div>
        <div class="col-span-2 order-1 md:col-span-1 md:order-2 bg-white">
            <div class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInRight animate__fast">
                <h1 class="font-bold text-4xl mb-5">欢迎回来</h1>
                <div class="flex items-center justify-center mb-7 text-gray-400 space-x-2">
                    <span class="h-[1px] w-16 bg-gray-200"></span>
                    <span>账号密码登录</span>
                    <span class="h-[1px] w-16 bg-gray-200"></span>
                </div>
                <!-- 引入 Element Plus 表单组件，移动端设置宽度为 5/6，PC 端设置为 2/5 -->
                <el-form class="w-5/6 md:w-2/5" ref="formRef" :rules="rules" :model="form">
                    <el-form-item prop="username">
                        <!-- 输入框组件 -->
                        <el-input size="large" v-model="form.username" placeholder="请输入用户名" :prefix-icon="User" clearable/>
                    </el-form-item>
                        
                    <el-form-item prop="password">
                        <!-- 密码框组件 -->
                        <el-input size="large" type="password" v-model="form.password" placeholder="请输入密码" :prefix-icon="Lock" clearable show-password/>
                    </el-form-item>
                    
                    <el-form-item>
                        <!-- 登录按钮，宽度设置为 100% -->
                        <el-button class="w-full mt-2" size="large" :loading="loading" type="primary" @click="onSubmit">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
// 引入 Element Plus 中的用户、锁图标
import { User, Lock } from '@element-plus/icons-vue'
import { login } from '@/api/admin/user'
import { ref,reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { showElMessage } from '@/composables/util'
import { setToken } from '@/composables/auth'

// 定义响应式的表单对象
const form = reactive({
    username: '',
    password: ''
})

const router=useRouter()

//表单引用
const formRef=ref(null)
//登录按钮加载
const loading=ref(false)

//表单验证规则
const rules= {
    username:[
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        }
    ],
    password:[
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }
    ]
}

// 登录
const onSubmit = () => {
    console.log('登录')
    //先验证表单
    formRef.value.validate((valid)=>{
        if(!valid){
            console.log('表单校验不通过');
            return false;
        }
        loading.value=true;//表示加载中
        //调用登录接口
        login(form.username, form.password).then((res) => {
            console.log(res)
            if(res.success==true){
                //存储Token
                let token=res.data.token
                setToken(token);
                //提示登录成功
                showElMessage('登录成功');
                //跳转后台
                router.push('/admin/index');
            }else{
                //获取服务端错误信息
                let message=res.message;
                showElMessage(message,'error')
            }
        })
        .finally(()=>{
            loading.value=false;//结束加载
        })
    }) 
}

//实现按回车执行登录事件
function onKeyUp(e){
    if(e.key == 'Enter'){
        onSubmit();
    }
}

//添加键盘监听
onMounted(()=>{
    console.log('添加键盘监听')
    document.addEventListener('keyup', onKeyUp)
})

//移除键盘监听
onBeforeUnmount(()=>{
    document.removeEventListener('keyup', onKeyUp)
})
</script>