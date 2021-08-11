<template>
  <div class="system-menu">
    <div class="menu">
      <el-menu
        :default-active="$route.path || '/'"
        class="el-menu-vertical-demo"
        router
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <el-menu-item index="/">
          <div class="menu-title">
            <svg
              class="icon menu-icon-font"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhuye_p" />
            </svg>
            <div class="title-name">
              首页
            </div>
          </div>
        </el-menu-item>
        <el-menu-item index="/application">
          <div class="menu-title">
            <svg
              class="icon menu-icon-font"
              aria-hidden="true"
            >
              <use xlink:href="#icon-moxingyingyong_p" />
            </svg>
            <div class="title-name">
              应用
            </div>
          </div>
        </el-menu-item>
        <el-menu-item index="/datas/home">
          <div class="menu-title">
            <svg
              class="icon menu-icon-font"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhudaohang_shuju_p" />
            </svg>
            <div class="title-name">
              数据
            </div>
          </div>
        </el-menu-item>
        <el-menu-item index="/appStore/appHome">
          <div class="menu-title">
            <svg
              class="icon menu-icon-font"
              aria-hidden="true"
            >
              <use xlink:href="#icon-shangcheng_p" />
            </svg>
            <div class="title-name">
              商城
            </div>
          </div>
        </el-menu-item>
        <el-menu-item index="/settings">
          <div class="menu-title">
            <svg
              class="icon menu-icon-font"
              aria-hidden="true"
            >
              <use xlink:href="#icon-xitong" />
            </svg>
            <div class="title-name">
              设置
            </div>
          </div>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
// import { getData } from '@/api/layout'
const dict = [
  {
    name: '首页',
    path: '/'
  }, {
    name: '应用',
    path: '/application'
  },
  {
    name: '数据',
    path: '/datas/home'
  }, {
    name: '商城',
    path: '/appStore/appHome'
  },
  {
    name: '设置',
    path: '/settings'
  }
]
export default {
  name: 'SystemMenu',
  data () {
    return {
      isCollapse: true
    };
  },
  mounted () {
    // this.init()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect (key, keyPath, item, routeResult) {
      let title = ''
      dict.forEach(ele => {
        if (ele.path === key) {
          title = ele.name
        }
      })
      this.$store.commit('PUSH_NAVBARLIST', {
        title,
        path: key
      })
    },
    init () {
      // getData().then(res => {
      //   console.log(res, 111);
      // })
    }
  }
}
</script>
<style lang="less" scoped>
.system-menu {
  width: 6.4rem;
  background-color: #1f7c73;
  overflow: hidden;
  .menu {
    width: 6.4rem;
    height: 100%;
    .el-menu {
      background-color: transparent;
    }
    .el-menu-item {
      color: #d2e4e3;
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
      background-color: #1c6c64;
      color: #54e194;
    }
    .el-menu-item.is-active {
      color: #54e194;
      background-color: #1c6c64;
    }
    .menu-icon-font {
      font-size: 2rem;
    }
    .menu-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title-name {
        font-size: 1.4rem;
        line-height: 1.4rem;
      }
    }
  }
}
</style>
