<template>
  <div class="application">
    <el-scrollbar
      class="application-left"
      :height="height"
    >
      <div
        v-for="(item,index) in models"
        :key="index"
        class="container"
      >
        <div class="container-title">
          {{ item.modelTypeName }}
        </div>
        <div class="model">
          <div
            v-for="(itm,idx) in item.modelList"
            :key="idx"
            class="model-box"
            @click="toParticulars(itm)"
          >
            <div class="model-box-title">
              <div class="model-box-title-lg">{{ itm.modelName }}</div>
              <div class="model-box-title-sm">{{ itm.modelTag }}</div>
            </div>

            <div
              class="model-box-image"
              @mouseenter="enter(itm)"
              @mouseleave="leave(itm)"
            >
              <img
                v-if="itm.mouseLeave"
                :src="require(`../../../assets/images/${itm.modelIcon || 'app/app_no_pic'}.png`)"
                alt=""
              >
              <img
                v-else
                :src="require(`../../../assets/images/${itm.appGif || 'app/chj'}.gif`)"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="container-title">
          实用工具类
        </div>
        <div class="model">
          <div
            v-for="(itm,idx) in tools"
            :key="idx"
            class="model-box"
          >
            <div class="model-box-title">
              <div class="model-box-title-lg">{{ itm.modelName }}</div>
              <div class="model-box-title-sm">{{ itm.decInfo }}</div>
            </div>
            <div class="model-box-image">
              <img
                :src="require(`../../../assets/images/app/${itm.imgUrl}.png`)"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="application-right">
      <AppRecommendation :suggest-apps="suggestApps" />
    </div>
  </div>
</template>
<script>
import AppRecommendation from '@/components/AppRecommendation'
import { listByCatalog, recommend } from '@/api/application/index'
export default {
  components: {
    AppRecommendation
  },
  data () {
    return {
      height: 'calc(100vh - 9.6rem)',
      models: [],
      suggestApps: [],
      mouseLeave: true,
      tools: [
        {
          modelName: '自动排班',
          imgUrl: 'schedule',
          decInfo: '工业/优化/烟气/预测'
        },
        {
          modelName: '石灰石耗用量计算',
          imgUrl: 'caco3'
        },
        {
          modelName: '单位转换换算器',
          imgUrl: 'calculator'
        },
        {
          modelName: '储氨罐体积计算',
          imgUrl: 'tank'
        }
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      listByCatalog({ plantCode: 'XCXM' }).then(res => {
        if (res.data.code === 0) {
          const data = res.data.data
          data.forEach(ele => {
            ele.modelList.forEach(itm => {
              itm.mouseLeave = true
            })
          })
          this.models = data
        }
      })
      recommend().then(res => {
        if (res.data.code === 0) {
          this.suggestApps = res.data.data
        }
      })
    },
    enter (item) {
      item.mouseLeave = false
    },
    leave (item) {
      item.mouseLeave = true
    },
    toParticulars(item) {
      console.log(item)
      this.$store.commit('PUSH_NAVBARLIST', {
        title: item.modelName,
        path: '/application/particulars',
        query: {
          modelUrl: item.modelUrl || 'http://localhost:8080'
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.application {
  display: flex;
  justify-content: space-between;
  .application-left {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 1rem;
    .container {
      padding: 0.9rem 1.4rem 0;
      .container-title {
        font-size: 1.8rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #46705b;
        line-height: 2.5rem;
      }
      .model {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .model-box {
          cursor: pointer;
          width: 32.2rem;
          height: 14rem;
          background: #e9eef3;
          border-radius: 1rem;
          margin: 1rem 2rem;
          box-shadow: 0.1rem 0.1rem 0.5rem #e9eef3;
          display: flex;
          justify-content: space-between;
          .model-box-title {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .model-box-title-lg {
              font-size: 1.6rem;
              font-weight: 600;
              margin-top: -0.8rem;
              margin-left: 2rem;
              color: #2d4c51;
            }
            .model-box-title-sm {
              font-size: 1.4rem;
              font-weight: 400;
              line-height: 20px;
              color: #2d4c51;
              margin-left: 2rem;
            }
          }
          .model-box-image {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 12rem;
            margin-right: 1rem;
            img {
              max-width: 100%;
            }
          }
          // &:hover {
          //   transform: scale(1.02, 1.02);
          // }
        }
      }
    }
  }
  .application-right {
    width: calc(20% - 0.5rem);
    background-color: #fff;
    border-radius: 1rem;
  }
}
</style>
