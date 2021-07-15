<template>
  <div class="system-menu">
    <div class="menu">
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        router
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="/application">
          <i class="el-icon-document"></i>
          <template #title>应用</template>
        </el-menu-item>
        <el-menu-item index="/datas">
          <i class="el-icon-setting"></i>
          <template #title>数据</template>
        </el-menu-item>
        <el-menu-item index="/appStore">
          <i class="el-icon-setting"></i>
          <template #title>商城</template>
        </el-menu-item>
        <el-menu-item index="/settings">
          <i class="el-icon-setting"></i>
          <template #title>设置</template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { getData } from '@/api/layout'
export default {
  name: 'SystemMenu',
  data () {
    return {
      isCollapse: true,
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
  mounted() {
    this.init()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    init() {
      getData().then(res => {
        console.log(res, 111);
      })
    }
  }
}
</script>
<style lang="less" scoped>
.system-menu {
  width: 6.4rem;
  height: calc(100vh - 8.7rem);
  background-color: #032144;
  margin-left: 0.8rem;
  overflow: hidden;
  .menu {
    width: 6.4rem;
    height: 100%;
    .el-menu {
      background-color: transparent;
    }
    .el-menu-item:focus, .el-menu-item:hover {
      background-color: transparent;
      color: #3AD954;
    }
    .el-menu-item.is-active{
      color: #3AD954;
    }
  }
}
</style>
