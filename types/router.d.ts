import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        /**是否授权访问 值为true:代表当前未授权访问*/
        requiresAuth?: boolean;
    }
}
