import { createRouter, createWebHistory } from 'vue-router';

import LayoutView from '@/components/LayoutView.vue';
import HomeView from '@/views/HomeView.vue';
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
            children: [
                {
                    path: '/',
                    name: 'Home',
                    component: HomeView,
                    meta: {
                        requiresAuth: false
                    }
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
    ]
});

router.beforeEach(to => {
    const authStore = useAuthStore();
    if (!authStore.isLogin && to.name == 'Home') {
        // 如果没有登录且目标路由不是登录页面则跳转到登录页面
        return { name: 'Login', replace: true };
    } else if (authStore.isLogin && to.name === 'Login') {
        // 如果已经登录且目标页面是登录页面则跳转至首页
        return { name: 'Home', replace: true };
    } else if (authStore.isLogin && to.meta.requiresAuth) {
        // 如果已经登录且目标页面是登录页面则跳转至首页
        return { name: 'NotPermission', replace: true };
    }
});

export default router;
