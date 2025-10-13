import { useIntersectionObserver } from '@vueuse/core';
import type { Directive } from 'vue';

const vLazy: Directive<HTMLImageElement, string> = {
    mounted(el, binding) {
        el.src = `https://dummyimage.com/${el.width}x${el.height}/e0e0e0/333333&text=加载中...`; // 默认占位图
        const { stop } = useIntersectionObserver(el, ([intersectionObserver]) => {
            if (intersectionObserver?.isIntersecting) {
                el.src = binding.value; // 进入视口加载真实图片
                stop();
            }
        });
    }
};

export default vLazy;
