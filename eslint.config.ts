import pluginVitest from '@vitest/eslint-plugin';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import { globalIgnores } from 'eslint/config';
import pluginCypress from 'eslint-plugin-cypress/flat';
import * as importPlugin from 'eslint-plugin-import';
import pluginVue from 'eslint-plugin-vue';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],
        rules: {
            /**
             * 作用：禁止使用 var 声明变量。
             * 目的：鼓励使用 let 和 const，以避免变量提升（hoisting）和作用域混乱的问题。
             * */
            'no-var': 'warn',
            /**
             * 作用：推荐使用 const 而不是 let，除非变量需要重新赋值。
             * 目的：提升代码可读性与不变性。
             * */
            'prefer-const': 'warn',
            /**
             * 作用：禁止使用 console.*。
             * 目的：避免生产环境输出调试信息。
             * */
            'no-console': 'off',
            /**
             * 作用：鼓励使用解构赋值。
             * 目的：提升代码简洁性与可读性。
             * */
            'prefer-destructuring': 'warn',
            /**
             * 作用：限制函数参数数量（建议 ≤5）。
             * 目的：提高函数的可读性和可测试性。
             * */
            'max-params': ['warn', 5],
            /**
             * 作用：限制函数体内的语句数量（建议 ≤30）。
             * 目的：避免函数过长，提升可维护性。
             * */
            'max-statements': ['warn', 30],
            /**
             * 作用：禁止嵌套三元表达式。
             * 目的：避免逻辑复杂度过高，影响可读性。
             * */
            'no-nested-ternary': 'warn',
            /**
             * 作用：禁止使用 eval()。
             * 目的：避免潜在的安全漏洞。
             * */
            'no-eval': 'error',
            /**
             * 作用：禁止使用 with 语句。
             * 目的：避免作用域混乱和性能问题。
             * */
            'no-with': 'error',
            /**
             * 作用：禁止在 setTimeout、setInterval 中使用字符串作为函数体。
             * 目的：避免隐式调用 eval。
             * */
            'no-implied-eval': 'error',
            /**
             * 作用：要求变量名和属性名使用驼峰命名法（如 userName，而非 user_name）。
             * 目的：保持代码一致性，符合 JavaScript 社区惯例。
             * */
            camelcase: 'warn',
            /**
             * 作用：设置代码缩进为 4 个空格，并允许 switch case 中缩进为 1（即比 case 多一个空格）。
             * 目的：提高代码可读性，统一团队的缩进风格。
             * */
            indent: ['warn', 4, { SwitchCase: 1 }],
            /**
             * 作用：强制在语句末尾添加分号。
             * 目的：避免 ASI（自动分号插入）导致的潜在错误。
             * */
            semi: ['warn', 'always'],
            /**
             * 作用：字符串必须使用单引号。
             * 目的：统一引号风格，减少引号嵌套时的转义问题。
             * */
            quotes: ['warn', 'single'],
            /**
             * 作用：规定代码行结束符为 Windows 风格（\r\n），而非 Unix 风格（\n）。
             * 目的：用于统一团队在不同操作系统下的换行符格式。
             * */
            'linebreak-style': ['warn', 'windows'],
            /**
             * 作用：禁用对 == 和 != 的检查（即允许使用非严格比较）。
             * 目的：放宽限制，允许更灵活的类型转换判断。
             * */
            eqeqeq: 'off',
            /**
             * 作用：禁用对未定义变量的检查。
             * 目的：交由 TypeScript 或项目构建工具判断变量是否定义。
             * 风险：可能导致运行时错误，需配合 TypeScript 使用。
             * */
            'no-undef': 'off',
            /**
             * 作用：禁用对未使用变量的检测。
             * 目的：关闭默认的 ESLint 检查，改由 TypeScript 插件接管（见下一条）。
             * */
            'no-unused-vars': 'off',
            /**
             * 作用：使用 TypeScript 插件来检查未使用的变量，并允许以 _ 开头的变量被忽略。
             * 目的：更精准地识别未使用变量，同时允许开发者使用 _ 表示“故意忽略”的变量。
             * */
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_'
                }
            ],
            /**
             * 作用：不允许使用 any 类型。
             * 目的：提高开发灵活性，允许临时类型松散。
             * */
            '@typescript-eslint/no-explicit-any': 'error',
            /**
             * 作用：禁止将 any 类型或未知类型传递给函数参数。
             * 目的：防止类型错误导致的运行时异常，强制开发者明确类型
             * */
            '@typescript-eslint/no-unsafe-argument': 'error',
            /**
             * 作用：强制使用 import type 导入纯类型声明。
             * 目的：优化打包体积，区分类型与值 4。
             * */
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
            /**
             * 作用：禁止函数返回 any 或未知类型。
             * 目的：确保函数返回值类型明确
             * */
            '@typescript-eslint/no-unsafe-return': 'warn',
            /**
             * 作用：允许空函数体。
             * 目的：方便占位或临时调试。
             * 建议：正式环境中应填充函数体或使用 // TODO 注释说明。
             * */
            '@typescript-eslint/no-empty-function': 'error',
            /**
             * 作用：不允许使用 // @ts-ignore 或 // @ts-nocheck。
             * 目的：允许临时绕过类型检查。
             * 建议：应尽量避免使用，并注明原因。
             * */
            '@typescript-eslint/ban-ts-comment': 'warn',
            /**
             * 作用：不允许使用非空断言操作符 !。
             * 目的：简化类型推断，开发者自行承担风险。
             * 示例：
             * ```ts
             *      let val!: string;
             * ```
             * 建议：仅在确保变量不会为 null 时使用。
             * */
            '@typescript-eslint/no-non-null-assertion': 'warn',
            /**
             * 作用：禁止直接使用未命名的数字常量（如 if (status === 3)）。
             * 目的：提升代码可解释性
             * 示例
             * ```ts
             *      // 不良写法（触发警告）
             *      if (status === 1) {...}
             *
             *      // 推荐写法
             *      const STATUS_ACTIVE = 1;
             *      if (status === STATUS_ACTIVE) {...}
             * ```
             * */
            '@typescript-eslint/no-magic-numbers': [
                'error',
                {
                    ignore: [-1, 0, 1], // 忽略常见基础数字
                    ignoreEnums: true, // 自动忽略枚举中的数字
                    ignoreArrayIndexes: true, // 忽略数组索引
                    enforceConst: true, // 强制使用const定义
                    ignoreNumericLiteralTypes: true // 忽略如`type: 1`的类型定义
                }
            ],
            /**
             * 作用：防止未处理的 Promise。
             * 目的：避免因未捕获 Promise 异常而导致的静默失败。
             * */
            '@typescript-eslint/no-floating-promises': 'error',
            /**
             * 作用：禁止在条件语句中使用总是为真或假的表达式。
             * 目的：提升代码逻辑的严谨性和可读性。
             * */
            '@typescript-eslint/no-unnecessary-condition': 'warn',
            /**
             * 作用：鼓励使用 ?? 而非 ||。
             * 目的：避免 0、'' 等“假值”被错误地替换。
             * */
            '@typescript-eslint/prefer-nullish-coalescing': 'warn',
            /**
             * 作用：鼓励使用 ?. 替代 && 链式访问。
             * 目的：提高代码简洁性和可读性。
             * */
            '@typescript-eslint/prefer-optional-chain': 'warn',
            /**
             * 作用：强制为 Vue 组件的 props 定义类型。
             * 目的：增强组件接口的可读性和可维护性
             * */
            'vue/require-prop-types': 'error',
            /**
             * 作用：禁止直接修改 props 的值。
             * 目的：遵循 Vue 单向数据流原则，避免副作用
             * */
            'vue/no-mutating-props': 'error',
            /**
             * 作用：Vue 模板中 HTML 缩进为 4 个空格。
             * 目的：统一 Vue 模板的缩进风格，与 JS 代码一致。
             * */
            'vue/html-indent': ['warn', 4],
            /**
             * 作用：允许单行 HTML 元素内容不换行。
             * */
            'vue/singleline-html-element-content-newline': 'off',
            /**
             * 作用：不限制每行的 HTML 属性数量。(交由prettier 最大单行控制)
             * 目的：允许将多个属性写在一行，提高可读性。
             * */
            'vue/max-attributes-per-line': 'off',
            /**
             * 作用：允许单单词组件名，如 <Header />。
             * 目的：降低组件命名复杂度，适合小型项目或个人项目。
             * 建议：中大型项目建议开启，以避免与 HTML 标签冲突。
             * */
            'vue/multi-word-component-names': 'off',
            /**
             * 作用：不允许不闭合自闭合标签（如 <img> 而不是 <img />）。
             * 目的：兼容 HTML 习惯，便于非 Vue 开发者阅读。
             * 适用场景：团队中 HTML 与 Vue 混合开发较多。
             * */
            'vue/html-self-closing': [
                'warn',
                {
                    html: {
                        void: 'always',
                        normal: 'never'
                    }
                }
            ],
            /**
             * 作用：检测并报错未使用的 Vue 组件。
             * 目的：清理冗余代码，提升构建效率。
             * */
            'vue/no-unused-components': 'error',
            /**
             * 作用：强制为 Vue 组件的 props 设置默认值（除非指定为 required）。
             * 目的：增强组件的健壮性和可复用性。
             * */
            'vue/require-default-prop': 'warn',
            /**
             * 作用：禁止在 Vue 模板中使用驼峰命名的属性名。
             * 目的：避免与 HTML 规范冲突（HTML 属性应使用短横线命名）。
             * */
            'vue/attribute-hyphenation': 'error',
            /**
             * 作用：禁止模块循环依赖（需安装 eslint-plugin-import）。
             * 目的：避免代码耦合和不可预测的加载问题 2
             * */
            'import/no-cycle': [
                'error',
                {
                    ignoreExternal: true // 忽略第三方包
                }
            ],
            /**
             * 作用：规范导入语句的分组和顺序（如第三方库优先）。
             * */
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true }
                }
            ],
            /**
             * 作用：检查模块路径是否可解析。
             * 目的：避免因路径错误导致构建失败。
             * 需配合 eslint-import-resolver-typescript 插件使用
             * */
            'import/no-unresolved': 'error',
            /**
             * 作用：强制在 import 语句后添加空行。
             * 目的：提升代码清晰度。
             * */
            'import/newline-after-import': 'warn',
            /**
             * 作用：限制单个函数行数（建议 60 行内）。
             * 目的：避免函数过于复杂，提升可测试性
             * */
            'max-lines-per-function': ['warn', 60],
            /**
             * 作用：限制函数的圈复杂度（建议 ≤10）。
             * 目的：减少嵌套逻辑，提高可读性
             * */
            complexity: ['warn', 10],
            /**
             * 作用：限制代码块嵌套深度（建议不超过4层）
             * */
            'max-depth': ['warn', 4]
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.app.json'
                }
            }
        },
        plugins: {
            import: importPlugin
        }
    },

    globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'eslint.config.*', 'vite.config.*']),

    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,

    {
        ...pluginVitest.configs.recommended,
        files: ['src/**/__tests__/*']
    },

    {
        ...pluginCypress.configs.recommended,
        files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}', 'cypress/support/**/*.{js,ts,jsx,tsx}']
    },
    skipFormatting
);
