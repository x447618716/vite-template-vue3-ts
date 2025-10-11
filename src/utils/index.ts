/**
 * 显示消息提示框
 */
export function Toast(title: string, options?: object) {
    void ElMessage({
        message: title,
        duration: 1500,
        icon: 'none',
        ...options
    });
}
