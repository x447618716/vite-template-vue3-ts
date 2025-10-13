import { defineStore } from 'pinia';

export const usePermissionStore = defineStore(
    'permissionStore',
    () => {
        const permissionRouter = ref<PermissionRouterVo[]>([]);
        const permissionCode = ref<string[]>([]);
        const sidebarMenu = ref([]);

        const getPermission = async () => {
            const res = await permission();
            if (res.code === ResultEnum.SUCCESS) {
                permissionRouter.value = res.data.permissionRouterVo;
                permissionCode.value = res.data.permissionCode;
            }
        };

        const hasPermission = (value: string) => {
            return permissionCode.value.includes(value);
        };

        return {
            permissionCode,
            sidebarMenu,
            getPermission,
            hasPermission
        };
    },
    {
        persist: true
    }
);
