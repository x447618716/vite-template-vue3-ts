import { AES, Utf8 } from 'crypto-es';
import { createPinia } from 'pinia';
import type { StateTree } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

// 加密密钥，可根据实际情况修改
const encryptionKey = 'UNION-APP-@#@##@###@';

// 自定义序列化函数
const serialize = (state: StateTree) => {
    const jsonState = JSON.stringify(state);
    return AES.encrypt(jsonState, encryptionKey).toString();
};

// 自定义反序列化函数
const deserialize = (encrypted: string) => {
    const bytes = AES.decrypt(encrypted, encryptionKey);
    const originalText = bytes.toString(Utf8);
    return JSON.parse(originalText) as object;
};

const pinia = createPinia();
pinia.use(
    createPersistedState({
        storage: {
            setItem: (key, value) => localStorage.setItem(key, value),
            getItem: key => localStorage.getItem(key)
        },
        serializer: {
            deserialize: import.meta.env.MODE !== 'development' ? deserialize : state => JSON.parse(state) as object,
            serialize: import.meta.env.MODE !== 'development' ? serialize : state => JSON.stringify(state)
        }
    })
);

export default pinia;
