<template>
  <div class="AppMain">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<style lang="less" scoped>
.AppMain {
  width: calc(100% - 8.2rem);
  padding: 0 0.5rem;
}
</style>
