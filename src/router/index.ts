import { createRouter, createWebHistory } from 'vue-router';

import LayoutView from '@/components/LayoutView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NotPermissionView from '@/views/NotPermissionView.vue';

// 公共路由
const constantRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/',
        name: 'Layout',
        component: LayoutView,
        children: [
            {
                path: '/',
                name: 'Home',
                component: HomeView
            }
        ]
    },

    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (About.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import('../views/AboutView.vue')
    // },
    { path: '/403', name: 'NotPermission', component: NotPermissionView },
    { path: '/:pathMatch(.*)', name: 'NotFound', component: NotFoundView }
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes,
    scrollBehavior(_1, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { top: 0 };
    }
});

router.beforeEach(async to => {
    const authStore = useAuthStore();
    const permissionStore = usePermissionStore();

    // 情况1：目标路由不需要认证 → 直接放行
    if (!to.meta.requiresAuth) {
        return true;
    }

    // 情况2：需要认证
    if (!authStore.isLogin) {
        // 未登录 → 重定向至登录页，并携带回跳地址
        return { name: 'Login', query: { redirect: to.fullPath }, replace: true };
    }

    // 情况3：已登录但访问的是登录页 → 重定向首页
    if (to.name === 'Login') {
        return { name: 'Home', replace: true };
    }

    // 情况4：已登录且需认证 → 检查具体权限（示例为简单字符串匹配）
    if (to.meta.permission) {
        const userPermissions = permissionStore.permissionCode;
        //如果权限码为空重新获取一次最新数据
        if (!userPermissions.length) {
            await permissionStore.getPermission();
        }

        const requiredPermissions = Array.isArray(to.meta.permission) ? to.meta.permission : [to.meta.permission];

        const hasPermission = requiredPermissions.some(p => userPermissions.includes(p));

        if (!hasPermission) {
            return { name: 'NotPermission', replace: true };
        }
    }

    return true;
});

export default router;
