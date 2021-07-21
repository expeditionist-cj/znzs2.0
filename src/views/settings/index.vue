<template>
  <div class="settings">
    <el-scrollbar class="nav-left">
      <div
        v-for="(item,index) in settingsMenu"
        :key="index"
        class="list"
      >
        <div class="title">{{ item.title }}</div>
        <div class="content">
          <div
            v-for="(itm,idx) in item.children"
            :key="idx"
            class="box"
            :class="{active: item.component === activePage}"
            @click="onCheck(itm)"
          >
            <!-- <i :class="itm.iconClass"></i> -->
            <svg
              class="icon box-icon-font"
              aria-hidden="true"
            >
              <use :xlink:href="'#'+itm.iconClass" />
            </svg>
            <div>{{ itm.name }}</div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="content-right">
      <!-- <transition name="fade-transform" mode="out-in">
        <router-view :key="$route.path" />
      </transition> -->
      <router-view v-slot="{ Component }">
        <transition
          name="fade-transform"
          mode="out-in"
        >
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      settingsMenu
    }
  },
  computed: {
    ...mapState({
      activePage: (state) => state.settings.activePage
    })
  },
  methods: {
    onCheck (item) {
      console.log(item, 100);
      this.$router.push({
        path: item.path
      })
      this.$store.commit('SET_ACTIVEPAGE', item.component)
      console.log(this.activePage)
    }
  }
}
</script>
<style lang="less" scoped>
.settings {
  width: 100%;
  height: 100%;
  display: flex;
  .nav-left {
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
          .box-icon-font {
            font-size: 2rem;
            margin-bottom: 0.2rem;
          }
        }
        .active {
          color: #3ad954;
          background-color: #0f0f0f;
        }
      }
    }
  }
  .content-right {
    width: calc(100% - 26.5rem);
    height: 100%;
  }
}
</style>
