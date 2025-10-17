import { axiosRequestAdapter } from '@alova/adapter-axios';
import { createAlova } from 'alova';
import type { AxiosError } from 'axios';
import { assign } from 'lodash-es';

import { checkStatus } from '@/http/checkStatus.ts';
import router from '@/router';
import { Toast } from '@/utils';

/**
 * 请求内置操作
 * */
interface RequestOperate {
    /**
     * 请求地址集
     * key:请求地址
     * value:请求时间戳
     * */
    requestMap: Map<string, number>;
}

const requestOperate: RequestOperate = {
    requestMap: new Map<string, number>()
};

/**
 * alova 请求实例
 * @link https://github.com/alovajs/alova
 */
const alovaInstance = createAlova({
    baseURL: import.meta.env.VITE_BASE_URL,
    requestAdapter: axiosRequestAdapter(),
    timeout: 10000,
    cacheFor: null, // 完全禁用缓存
    beforeRequest: async method => {
        const authStore = useAuthStore();
        timerRecycling();
        //判断当前请求是否已在请求列表中
        if (requestOperate.requestMap.has(method.url)) {
            method.abort();
        } else {
            //判断是否加入请求集-> 默认为加入
            if (method.meta?.debounce ?? true) {
                requestOperate.requestMap.set(method.url, new Date().getTime());
            }
        }
        method.config.headers = assign(authStore.getAuthorization, { apifoxToken: 'zC_7kbY3_WeqXhxSog7ry' }, method.config.headers);
    },
    responded: {
        onSuccess: async (response, method) => {
            const { status, data } = response;
            if (status !== ResultEnum.SUCCESS) {
                checkStatus(status, '服务不可用,请稍后重试！');
                return Promise.reject(response);
            }
            const { code, message } = data as BaseResponse<null>;
            const authStore = useAuthStore();
            if (code === ResultEnum.ACCESS_TOKEN_EXPIRED) {
                const isSuccess = await authStore.refresh();
                if (isSuccess) {
                    method.config.headers = assign(method.config.headers, authStore.getAuthorization);
                    await method.send();
                } else {
                    await router.replace('/login');
                }
                return;
            }
            if (code === ResultEnum.REFRESH_TOKEN_EXPIRED) {
                authStore.$reset();
                await router.replace('/login');
                return;
            }
            if (code !== ResultEnum.SUCCESS) {
                checkStatus(code, message);
                return Promise.reject(response);
            } else {
                return Promise.resolve(data);
            }
        },
        onError: (err: AxiosError, method) => {
            Toast(err.message);
            return Promise.reject({ err, method });
        },
        onComplete: methods => {
            //删除指定项
            requestOperate.requestMap.delete(methods.url);
        }
    }
});

//回收
const timerRecycling = () => {
    requestOperate.requestMap.forEach((value, key, map) => {
        //请求列中项存在时间超1分钟将其清除
        if (new Date().getTime() - value > NumberEnum.TIME_OUT) {
            map.delete(key);
        }
    });
};

export default alovaInstance;
