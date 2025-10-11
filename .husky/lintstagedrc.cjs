module.exports = {
    // 检查 JS/TS/Vue 文件
    '*.{js,ts,vue}': [
        'eslint --fix', // 自动修复 ESLint 错误
        'prettier --write', // 格式化代码
        () => 'vue-tsc --noEmit' //ts检查
    ],
    // 检查 CSS/SCSS 文件
    '*.{css,scss}': ['prettier --write'],
    // 其他文件类型（如 JSON）
    '*.json': ['prettier --write']
};
