import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        /**授权码*/
        permission?: string | string[];
    }
}
