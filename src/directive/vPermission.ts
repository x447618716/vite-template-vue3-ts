import type { Directive } from 'vue';

const vPermission: Directive<HTMLElement, string> = {
    mounted(el, binding) {
        const { hasPermission } = usePermissionStore();
        if (!hasPermission(binding.value)) {
            el.parentNode?.removeChild(el); // 无权限时移除元素
        }
    }
};

export default vPermission;
