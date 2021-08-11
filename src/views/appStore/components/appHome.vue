<template>
  <div class="appStore">
    <div class="appStore-left">
      <div class="appStore-title">
        <div>商城共 <span class="total">{{ countData.total }}</span> 个模型/应用，已获取 <span class="redColor">{{ countData.purchased }}</span> 个，已试用 <span class="redColor">{{ countData.tried }}</span> 个</div>
      </div>
      <div class="appStore-content">
        <el-carousel
          class="appStore-carousel"
          :interval="4000"
          type="card"
          height="25rem"
        >
          <el-carousel-item
            v-for="item in options"
            :key="item"
          >
            <img
              class="carousel-image"
              src="../../../assets/images/login-bg.png"
              alt=""
            >
          </el-carousel-item>
        </el-carousel>
        <el-scrollbar :height="height">
          <div class="commodity">
            <div
              v-for="(item,index) in commoditys"
              :key="index"
              class="model"
            >
              <div class="model-box">
                <img
                  :src="item.modelIcon ? require(`../../../assets/images/${item.modelIcon}.png`) : require('../../../assets/images/defaultDevice.png')"
                  alt=""
                  @click="toAppDetails(item)"
                >
              </div>
              <div class="model-top">
                <div class="model-text">
                  <div
                    class="title"
                    @click="toAppDetails(item)"
                  >{{ item.short_name }}</div>
                  <div class="details">{{ item.tag }}</div>
                </div>
                <div class="model-right">
                  <el-button
                    size="mini"
                    type="primary"
                  >获取</el-button>
                </div>
              </div>
              <div class="model-mid">
                <el-rate
                  v-model="item.star"
                  disabled
                  show-score
                  text-color="#ff675a"
                  score-template="{value}"
                  :colors="['#ff675a','#ff675a','#ff675a']"
                >
                </el-rate>
              </div>
              <div class="descript">{{ item.desc_info }}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="appStore-right">
      <AppRecommendation :suggest-apps="suggestApps" />
    </div>
  </div>
</template>
<script>
import AppRecommendation from '@/components/AppRecommendation'
import { recommend } from '@/api/application/index'
import { modelStoreList } from '@/api/appStore/index'
export default {
  components: {
    AppRecommendation
  },
  data () {
    return {
      height: 'calc(100vh - 45.6rem)',
      suggestApps: [],
      commoditys: [],
      options: [],
      countData: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      recommend().then(res => {
        if (res.data.code === 0) {
          this.suggestApps = res.data.data
        }
      })
      modelStoreList({
        plant: 'XCXM'
      }).then(res => {
        if (res.data.code === 0) {
          const { countData, list, turns } = res.data.data
          this.countData = countData
          this.commoditys = list
          this.options = turns
        }
      })
    },
    toAppDetails (item) {
      this.$store.commit('PUSH_NAVBARLIST', {
        title: '应用详情',
        path: '/appStore/appDetails'
      })
      this.$store.commit('SET_ROUTEPARAMS', item)
    }
  }
}
</script>
<style lang="less" scoped>
.appStore {
  display: flex;
  justify-content: space-between;
  .appStore-left {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 1rem;
    .appStore-title {
      background-color: #fff;
      font-size: 1.4rem;
      padding: 1rem 2rem;
      border-radius: 0.4rem;
      .total {
        color: rgba(31, 164, 67, 1);
      }
      .redColor {
        color: rgba(249, 69, 91, 1);
      }
    }
    .appStore-content {
      margin-top: 0.5rem;
      background-color: #fff;
      border-radius: 0.4rem;
      padding: 2rem;
      .appStore-carousel {
        width: 80%;
        margin: 0 auto;
      }
      .carousel-image {
        width: 100%;
        height: 100%;
      }
      .commodity {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .model {
          width: 24%;
          height: 29.5rem;
          .model-box {
            cursor: pointer;
            height: 15.2rem;
            background-color: #e9eef3;
            border-radius: 1rem;
            margin: 2.7rem 2rem;
            box-shadow: 0.1rem 0.1rem 0.5rem #e9eef3;
            text-align: center;
            img {
              width: 14.3rem;
              margin-top: 1.25rem;
            }
            &:hover {
              transform: scale(1.02, 1.02);
            }
          }
          .model-top {
            display: flex;
            .model-text {
              width: 80%;
              margin: 0 2rem 0.7rem;
              font-family: PingFangSC-Semibold, PingFang SC;
              .title {
                font-size: 1.6rem;
                font-weight: 600;
                color: #2d4c51;
                line-height: 2.2rem;
                cursor: pointer;
                &:hover {
                  color: red;
                }
              }
              .desc {
                font-size: 1.4rem;
                font-weight: 400;
                color: #4f7084;
                line-height: 2rem;
              }
              .details {
                font-size: 1.4rem;
                font-weight: 400;
                color: #a0b7bb;
                line-height: 2rem;
              }
            }
            .model-right {
              width: 20%;
              height: 2rem;
              margin-right: 3rem;
              .el-button {
                padding: 0.5rem 2rem;
                min-height: 2.5rem;
                border-radius: 1.4rem;
              }
              .el-button--primary {
                background-color: rgba(3, 206, 219, 1);
              }
            }
          }
          .model-mid {
            margin-left: 2rem;
            /deep/.el-rate__icon {
              margin-right: 0;
            }
          }
          .descript {
            margin: 0 2rem;
            font-size: 1.4rem;
            font-weight: 400;
            color: #a0b7bb;
            line-height: 2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover {
              white-space: normal;
              overflow: overlay;
            }
          }
        }
      }
    }
  }
  .appStore-right {
    width: calc(20% - 0.5rem);
    background-color: #fff;
    border-radius: 1rem;
  }
}
.el-carousel__item h3 {
  opacity: 0.75;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: transparent;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: transparent;
}
</style>
