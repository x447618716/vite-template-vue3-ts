// https://github.com/conventional-changelog/commitlint/#what-is-commitlint

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat', // 添加新功能、新特性
                'fix', // 修补bug
                'docs', // 文档(documentation)
                'style', // 格式、样式(不影响代码运行的变动)
                'refactor', // 代码重构
                'perf', // 性能改进
                'test', // 添加测试
                'build', //修改构建环境、外部依赖
                'ci', // 持续集成
                'chore', // 构建过程或辅助工具的变动
                'revert' // 回滚到上一个版本
            ]
        ],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never']
    }
};
