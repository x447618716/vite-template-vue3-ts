<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';

const authStore = useAuthStore();
const router = useRouter();
const { accountInfo, accessToken, refreshToken, expiresAt } = storeToRefs(authStore);

const formRef = ref<FormInstance>();

const form = reactive<LoginDto>({
    account: '',
    password: ''
});

const formRules = reactive<FormRules<LoginDto>>({
    account: [
        {
            required: true,
            message: '请输入账号!'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码'
        }
    ]
});

onMounted(() => {
    //检查记住密码状态
    if (accountInfo.value.remembered) {
        form.account = accountInfo.value.account;
        form.password = accountInfo.value.password;
    }
});

// 登录方法
const handleSubmit = async () => {
    if (!formRef.value) return;
    await formRef.value.validate(valid => {
        if (valid) {
            void login(form).then(res => {
                accountInfo.value.account = form.account;
                accountInfo.value.password = form.password;
                accessToken.value = res.data.accessToken;
                refreshToken.value = res.data.refreshToken;
                expiresAt.value = res.data.expiresAt;
                void router.push('/');
            });
        }
    });
};
</script>

<template>
    <el-row justify="center" align="middle" class="size-full">
        <div class="flex h-1/3 w-1/5 items-center justify-center rounded-xl p-6 shadow-[0_4px_16px_rgba(72,144,255,0.12)]">
            <el-form class="w-full" ref="formRef" :model="form" :rules="formRules">
                <el-form-item prop="account">
                    <el-input class="w-full" v-model="form.account" type="text" placeholder="请输入手机号码" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="w-full" v-model="form.password" type="password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button class="w-full" type="primary" @click="handleSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-row>
</template>
