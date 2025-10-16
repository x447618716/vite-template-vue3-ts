<script setup lang="ts">
import type { MenusRouter } from '@/stores/modules/permission.ts';

defineOptions({
    name: 'SidebarView'
});

const props = defineProps<{
    sidebarMenu: MenusRouter[];
}>();
</script>

<template>
    <template v-for="item in props.sidebarMenu">
        <template v-if="item.children && item.children.length">
            <el-sub-menu :index="item.path" :key="item.id">
                <template #title>
                    <span>{{ item.title }}</span>
                </template>
                <sidebar-view :sidebar-menu="item.children" />
            </el-sub-menu>
        </template>
        <template v-else>
            <el-menu-item :index="item.path" :key="item.id">
                <template #title>
                    <span>{{ item.title }}</span>
                </template>
            </el-menu-item>
        </template>
    </template>
</template>
