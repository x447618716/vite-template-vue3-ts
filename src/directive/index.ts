import type { App } from 'vue';

import vDebounce from './vDebounce.ts';
import vLazy from './vLazy';
import vPermission from './vPermission.ts';
import vThrottle from './vThrottle.ts';

export default {
    install(app: App) {
        app.directive('permission', vPermission);
        app.directive('lazy', vLazy);
        app.directive('throttle', vThrottle);
        app.directive('debounce', vDebounce);
    }
};
