/**
 * 登录响应Vo
 * */
export interface LoginVo {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
}

/**
 * 权限响应Vo
 * */
export interface PermissionVo {
    permissionRouterVo: PermissionRouterVo[];
    permissionCode: string[];
}

/**
 * 权限路由Vo
 * */
export interface PermissionRouterVo {
    id: string;
    parentId: string;
    url: string;
    title: string;
    icon?: string;
    type: string;
}
