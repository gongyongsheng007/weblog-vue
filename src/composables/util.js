import nProgress from "nprogress"

//显示页面加载
export function showPageLoading(){
    nProgress.start();
}

//隐藏页面加载
export function hidePageLoading(){
    nProgress.done();
}

//消息提示
export function showElMessage(message = '提示内容' , type = 'success' , customClass = ''){
    return ElMessage({
        message,
        type: type,
        customClass
    })
}