import { defineStore } from 'pinia';

export const usePermissionStore = defineStore(
    'permissionStore',
    () => {
        const permissionMenu = ref<PermissionRouterVo[]>([]);
        const permissionCode = ref<string[]>([]);
        const sidebarMenu = ref([]);

        const getPermission = () => {
            void permission().then(res => {
                permissionMenu.value = res.data.permissionMenu;
                permissionCode.value = res.data.permissionCode;
            });
        };

        const hasPermission = (value: string) => {
            return permissionCode.value.includes(value);
        };

        return {
            permissionMenu,
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
