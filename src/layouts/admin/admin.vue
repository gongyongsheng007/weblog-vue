<template>
    <!-- 外层容器 -->
    <el-container>
    
        <!-- 左边侧边栏 -->
        <el-aside>左边侧边栏</el-aside>
        
        <!-- 右边主内容区域 -->
        <el-container>
            <!-- 顶栏容器 -->
            <el-header>头部</el-header>

            <!-- 主容器 -->
            <el-main>
                <!-- 标签导航栏 -->
                <!-- 根据路由展示不同的页面 -->
                <router-view></router-view>
            </el-main>

            <!-- 底容器 -->
            <el-footer>底部</el-footer>
        </el-container>
    </el-container>
</template>