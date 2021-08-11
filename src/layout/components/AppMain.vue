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
  width: calc(100% - 6.4rem);
  height: calc(100vh - 9.6rem);
  padding: 0.5rem;
  background-color: #E7F1E5;
  overflow: hidden;
}
</style>
