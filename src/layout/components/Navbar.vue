<template>
  <div class="Navbar">
    <div class="nav-head">
      <div class="nav-head-left">
        <img
          class="logo"
          src="@/assets/logo.png"
          alt=""
        >
        <div class="plant-name">{{ plantName }}</div>
        <Tabs />
      </div>
      <div class="nav-head-right">
        <span>{{ userName }},您好！</span>
        <el-button size="mini" @click="onExit">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from './Tabs/index.vue'
export default {
  name: 'Navbar',
  components: {
    Tabs
  },
  data () {
    return {
      userName: '陈绩',
      plantName: '新昌电厂',
      editableTabsValue: '2',
      editableTabs: [
        {
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }
      ],
      tabIndex: 2
    };
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    onExit() {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.Navbar {
  height: 4.1rem;
  padding: 0.8rem;
  .nav-head {
    display: flex;
    justify-content: space-between;
    .nav-head-left {
    display: flex;
    align-items: center;
    .logo {
      width: 30rem;
    }
    .plant-name {
      display: inline-block;
      font-size: 2rem;
    }
    }
    .nav-head-right {

    }
  }
  .menu {
    width: 6.4rem;
    height: 100%;
  }
}
</style>
