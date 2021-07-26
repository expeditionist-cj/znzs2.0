<template>
  <div class="Navbar">
    <div class="nav-head">
      <div class="nav-head-left">
        <img
          class="logo"
          src="@/assets/logo.png"
          alt=""
        >
        <div class="line"></div>
        <div class="plant-name">{{ plantName }}</div>

      </div>
      <div class="nav-head-right">
        <div class="nav-head-right-top">
          <span>{{ userName }},您好！</span>
          <svg
            class="icon menu-icon-font"
            aria-hidden="true"
            @click="onExit"
          >
            <use xlink:href="#icon-shangcheng_p" />
          </svg>
        </div>
        <div class="nav-head-right-bottom">
          <div class="nav-head-right-bottom-skew">
            <div class="nav-head-right-bottom-skew-child">
              <el-tabs
                v-model="editableTabsValue"
                type="card"
                editable
                @edit="handleTabsEdit"
              >
                <el-tab-pane
                  v-for="(item, index) in editableTabs"
                  :key="index"
                  :label="item.title"
                  :name="item.name"
                >
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Navbar',
  components: {

  },
  data () {
    return {
      userName: '陈绩',
      plantName: '新昌电厂',
      editableTabsValue: '1',
      editableTabs: [
        {
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        },
        {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        },
        {
          title: 'Tab 3',
          name: '3',
          content: 'Tab 3 content'
        },
        {
          title: 'Tab 4',
          name: '4',
          content: 'Tab 4 content'
        }
      ]
    };
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    onExit () {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push({ path: '/login' });
      });
    },
    handleTabsEdit() {

    }
  }
}
</script>
<style lang="less" scoped>
.Navbar {
  height: 5.6rem;
  background-color: #298b6a;
  display: flex;
  align-items: center;
  .nav-head {
    width: 100%;
    height: 100%;
    background-color: #298b6a;
    display: flex;
    justify-content: space-between;

    .nav-head-left {
      min-width: 40rem;
      width: 25%;
      display: flex;
      align-items: center;
      .logo {
        width: 30rem;
      }
      .line {
        height: 70%;
        margin-right: 2rem;
        border-right: 0.1rem solid #4b9a7f;
      }
      .plant-name {
        border-radius: 2rem;
        display: inline-block;
        font-size: 1.4rem;
        background-color: #42997c;
        padding: 0.5rem 1rem;
        color: #5ef19b;
      }
    }
    .nav-head-right {
      width: 75%;
      overflow: hidden;
      .nav-head-right-top {
        height: 50%;
        text-align: right;
        font-size: 1.2rem;
        line-height: 3rem;
        color: #93c5b4;
        margin-right: 2rem;
      }
      .nav-head-right-bottom {
        height: 50%;
        margin: 0.4rem -1rem 0 1rem;
        background-color: #3b9577;
        transform: skewX(-20deg);
        border-top-left-radius: 0.5em;
        .nav-head-right-bottom-skew {
          height: 100%;
          position: relative;
          top: -0.2rem;
          left: 1rem;
          background-color: #4b9e82;
          border-top-left-radius: 0.5em;
          .nav-head-right-bottom-skew-child {
            height: 100%;
            position: relative;
            top: -0.2rem;
            left: 1rem;
            background-color: #2b7f63;
            border-top-left-radius: 0.5em;
            &::after {
              display: block;
              content: "";
              clear: both;
              height: 0;
              overflow: hidden;
            }
          }
          &::after {
            display: block;
            content: "";
            clear: both;
            height: 0;
            overflow: hidden;
          }
        }
        &::after {
          display: block;
          content: "";
          clear: both;
          height: 0;
          overflow: hidden;
        }
      }
    }
  }
  .menu {
    width: 6.4rem;
    height: 100%;
  }
}
</style>
