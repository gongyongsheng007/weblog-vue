import { useCookies } from "@vueuse/integrations/useCookies";
import { colorPickerContextKey } from "element-plus";

//存储在Cookie 中Token 的key
const TOKEN_KEY = 'Authorization'
const cookie = useCookies()

//暴露方法

//获取Token
export function getToken() {
    return cookie.get(TOKEN_KEY);
}

//存储Token
export function setToken(token) {
    return cookie.set(TOKEN_KEY,token);
}

//移除Token
export function removeToken() {
    return cookie.remove(TOKEN_KEY);
}