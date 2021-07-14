<template>
  <div class="layout">
    <Navbar />
    <div class="layout-content">
      <SystemMenu />
      <AppMain />
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from './components/Navbar'
import SystemMenu from './components/SystemMenu'
import AppMain from './components/AppMain'
import Footer from './components/Footer.vue'
export default {
  name: 'Layout',
  components: {
    Navbar,
    SystemMenu,
    AppMain,
    Footer
  }
}
</script>
<style lang="less" scoped>
.layout {
  .layout-content {
    display: flex;
  }
}
</style>
