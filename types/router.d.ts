import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        /**是否是要授权*/
        requiresAuth?: boolean;
        /**授权码*/
        permission?: string | string[];
    }
}
