import dayjs from 'dayjs';
import { defineStore } from 'pinia';

interface AccountInfo {
    account: string;
    password: string;
    remembered: boolean;
}

export const useAuthStore = defineStore(
    'authStore',
    () => {
        const accessToken = ref('');
        const refreshToken = ref('');
        const expiresAt = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'));
        const accountInfo = ref<AccountInfo>({
            account: '',
            password: '',
            remembered: false
        });

        const isLogin = computed(() => dayjs().isBefore(dayjs(expiresAt.value)));
        const getAuthorization = computed(() => (accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : null));
        watch(isLogin, async () => {
            await autoRefresh();
        });
        const $reset = () => {
            accessToken.value = '';
            refreshToken.value = '';
        };
        const loginOut = async () => {
            await logout();
            $reset();
        };
        const refresh = async () => {
            const { code, data } = await refreshAccessToken({
                refreshToken: refreshToken.value
            });
            if (code == ResultEnum.SUCCESS) {
                accessToken.value = data.accessToken;
                refreshToken.value = data.refreshToken;
                expiresAt.value = data.expiresAt;
                return true;
            } else {
                return false;
            }
        };
        const autoRefresh = async () => {
            if (dayjs().isAfter(dayjs(expiresAt.value).subtract(NumberEnum.TIME_OFFSET, 'm'))) {
                await refresh();
            }
            setTimeout(async () => {
                await autoRefresh();
            }, NumberEnum.TIME_OUT);
        };

        return {
            accessToken,
            refreshToken,
            expiresAt,
            accountInfo,
            isLogin,
            getAuthorization,
            $reset,
            loginOut,
            refresh
        };
    },
    {
        persist: true
    }
);
