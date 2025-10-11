import { debounce } from 'lodash-es';
import type { Directive } from 'vue';

const defaultDelay = 300;

const vDebounce: Directive<HTMLElement, () => void> = {
    mounted(el, binding) {
        const delay = binding.arg ? parseInt(binding.arg) : defaultDelay;
        el.addEventListener('click', debounce(binding.value, delay));
    },
    beforeUnmount(el, binding) {
        el.removeEventListener('click', binding.value); // 避免内存泄漏
    }
};

export default vDebounce;
