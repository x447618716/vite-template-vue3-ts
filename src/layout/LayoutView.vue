<script setup lang="ts">
import SidebarView from '@/layout/SidebarView.vue';

const route = useRoute();
const permissionStore = usePermissionStore();
const { sidebarMenu } = storeToRefs(permissionStore);
const isCollapse = ref(false);
</script>

<template>
    <el-container class="size-full">
        <el-header class="flex items-center justify-center bg-amber-200">Header</el-header>
        <el-container style="height: calc(100% - 60px)">
            <el-aside class="bg-cyan-500" width="200px">
                <el-menu :default-active="route.path" router :collapse="isCollapse">
                    <sidebar-view :sidebar-menu="sidebarMenu" />
                </el-menu>
            </el-aside>
            <el-main>
                <router-view v-slot="{ Component }">
                    <transition>
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
