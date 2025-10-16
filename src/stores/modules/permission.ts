import type { RouteRecordRaw } from 'vue-router';

import router from '@/router';
import type { PermissionRouterVo } from '@/services/vo/auth.ts';

export interface MenusRouter extends PermissionRouterVo {
    children?: MenusRouter[];
}

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue');

export const usePermissionStore = defineStore(
    'permissionStore',
    () => {
        const permissionRouter = ref<PermissionRouterVo[]>([]);
        const permissionCode = ref<string[]>([]);

        const sidebarMenu = computed(() => generateTreeStructure(permissionRouter.value));

        const dynamicRoutes = computed(() => generateRouter(permissionRouter.value));

        const getPermission = async () => {
            const res = await permission();
            if (res.code === ResultEnum.SUCCESS) {
                permissionRouter.value = res.data.permissionRouter;
                permissionCode.value = res.data.permissionCode;
            }
        };

        const addRouter = () => {
            dynamicRoutes.value.forEach(route => router.addRoute('Layout', route));
        };

        const hasPermission = (value: string | string[]) => {
            const requiredPermissions = Array.isArray(value) ? value : [value];
            return requiredPermissions.some(p => permissionCode.value.includes(p));
        };

        return {
            permissionRouter,
            permissionCode,
            sidebarMenu,
            dynamicRoutes,
            addRouter,
            getPermission,
            hasPermission
        };
    },
    {
        persist: true
    }
);

/**
 * 生成树结构数据
 * */
const generateTreeStructure = (router: PermissionRouterVo[]) => {
    const map = new Map<string, MenusRouter>();
    const tree: MenusRouter[] = [];
    router.forEach(node => {
        map.set(node.id, { ...node, children: [] });
    });
    router.forEach(node => {
        const { parentId } = node;
        if (parentId === '') {
            tree.push(<MenusRouter>map.get(node.id));
        } else {
            const parent = map.get(parentId);
            parent?.children?.push(<MenusRouter>map.get(node.id));
        }
    });
    return tree;
};

/**
 * 生成路由
 * */
const generateRouter = (router: PermissionRouterVo[]) => {
    const dynamicRoutes: RouteRecordRaw[] = [];
    router.forEach(item => {
        const component = loadComponent(item.component);
        dynamicRoutes.push(
            component
                ? {
                      path: item.path,
                      name: item.name,
                      component: component
                  }
                : {
                      path: item.path,
                      name: item.name,
                      redirect: '/error'
                  }
        );
    });
    return dynamicRoutes;
};

/**
 * 加载组件
 * */
const loadComponent = (componentPath: string) => {
    for (const path in modules) {
        const [_, name] = path.match(/\.\/views\/(.*)\.vue$/) ?? [];
        if (name === componentPath) {
            return modules[path];
        }
    }
    return;
};
