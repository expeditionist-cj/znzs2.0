<template>
  <div class="settings">
    <el-scrollbar class="nav-left">
      <div v-for="(item,index) in settingsMenu" :key="index" class="list">
        <div class="title">{{ item.title }}</div>
        <div class="content">
          <div v-for="(itm,idx) in item.children" :key="idx" class="box" @click="onCheck(itm)">
            <i :class="itm.iconClass"></i>
            <div>{{ itm.name }}</div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="title">模型配置</div>
        <div class="content">
          <div class="box">
            <i class="el-icon-user"></i>
            <div>分类管理</div>
          </div>
          <div class="box">
            <i class="el-icon-user"></i>
            <div>模型管理</div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="title">数据配置</div>
        <div class="content">
          <div class="box">
            <i class="el-icon-user"></i>
            <div>数据源配置</div>
          </div>
          <div class="box">
            <i class="el-icon-user"></i>
            <div>数据标准化</div>
          </div>
          <div class="box">
            <i class="el-icon-user"></i>
            <div>数据补录</div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="title">其他配置</div>
        <div class="content">
          <div class="box">
            <i class="el-icon-user"></i>
            <div>排班配置</div>
          </div>
          <div class="box">
            <i class="el-icon-user"></i>
            <div>主页配置</div>
          </div>
          <div class="box">
            <i class="el-icon-user"></i>
            <div>订阅配置</div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="content-right">
      <!-- <transition name="fade-transform" mode="out-in">
        <router-view :key="$route.path" />
      </transition> -->
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script>
import settingsMenu from '@/utils/settingsMenu'
export default {
  data() {
    return {
      settingsMenu
    }
  },
  methods: {
    onCheck(item) {
      this.$router.push({
        path: item.path
      })
    }
  }
}
</script>
<style lang="less" scoped>
.settings {
  width: calc(100% - 6.4rem);
  height: 100%;
  display: flex;
  .nav-left {
    border: 1px solid red;
    width: 24rem;
    padding: 0 1rem;
    height: 100%;
    background-color: #fff;
    margin-right: 0.5rem;
    .list {
      .title {
        height: 2rem;
        font-size: 1.6rem;
        padding: 0.5rem;
        margin-bottom: 1rem;
      }
      .content {
        display: flex;
        .box {
          width: 6rem;
          height: 4rem;
          text-align: center;
          margin: 1rem;
          .el-icon-user {
            font-size: 2rem;
            margin-bottom: 0.2rem;
          }
          &:hover {
            color: #54d887;
          }
        }
      }
    }
  }
  .content-right {
    width: calc(100% - 30.4rem);
    height: 100%;
    border: 1px solid #000;
  }
}
// global transition css

/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}

</style>
