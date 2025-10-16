import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';

import LayoutView from '@/layout/LayoutView.vue';
import ErrorView from '@/views/ErrorView.vue';
import LoginView from '@/views/LoginView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NotPermissionView from '@/views/NotPermissionView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: LoginView
        },
        {
            path: '/',
            name: 'Layout',
            component: LayoutView,
            children: []
        },
        { path: '/error', name: 'Error', component: ErrorView },
        { path: '/403', name: 'NotPermission', component: NotPermissionView },
        { path: '/:pathMatch(.*)', name: 'NotFound', component: NotFoundView }
    ],
    scrollBehavior(_1, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { top: 0 };
    }
});

const hasNecessaryRoute = (to: RouteLocationNormalized) => {
    const existingRoutes = router.getRoutes();
    return existingRoutes.some(route => route.path === to.path && to.name !== 'Layout');
};

// eslint-disable-next-line complexity
router.beforeEach(to => {
    const authStore = useAuthStore();
    const permissionStore = usePermissionStore();
    const { dynamicRoutes } = storeToRefs(permissionStore);

    // 情况1：未登录但访问的是布局页 → 重定向登录页
    if (!authStore.isLogin && to.name === 'Layout') {
        return { name: 'Login', query: { redirect: to.fullPath }, replace: true };
    }

    // 情况2：已登录但访问的是登录页 → 重定向首页
    if (authStore.isLogin && to.name === 'Login') {
        return { name: 'Layout', replace: true };
    }

    // 情况3：已登陆
    if (authStore.isLogin) {
        //情况4：当前路由不在路由表中  → 检查动态路由
        if (!hasNecessaryRoute(to)) {
            if (dynamicRoutes.value.length) {
                //情况5：动态路由存在当前路由 → 将动态路由添加到路由表中
                if (dynamicRoutes.value.some(route => route.path === to.path)) {
                    permissionStore.addRouter();
                    return to.fullPath;
                }
            } else {
                //情况6：动态路由没有数据 → 请求后端权限数据生成动态路由
                void permissionStore.getPermission().then(() => {
                    return to.fullPath;
                });
            }
        }

        //情况7：访问的是布局页且动态路由中不存在根路由配置 → 重定向到动态路由的首项
        if (to.name === 'Layout') {
            if (!dynamicRoutes.value.some(route => ['', '/'].includes(route.path))) {
                return dynamicRoutes.value[0]?.path;
            }
        }
    }

    return true;
});

export default router;
