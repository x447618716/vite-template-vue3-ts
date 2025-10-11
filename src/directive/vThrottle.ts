import { throttle } from 'lodash-es';
import type { Directive } from 'vue';

const defaultDelay = 300;

const vThrottle: Directive<HTMLElement, () => void> = {
    mounted(el, binding) {
        const delay = binding.arg ? parseInt(binding.arg) : defaultDelay;
        el.addEventListener('click', throttle(binding.value, delay));
    },
    beforeUnmount(el, binding) {
        el.removeEventListener('click', binding.value); // 避免内存泄漏
    }
};

export default vThrottle;
