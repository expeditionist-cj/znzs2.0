<template>
  <div class="appRecommendation">
    <el-scrollbar
      class="appRecommendation-content"
      :height="height"
    >
      <div class="container">
        <div class="title">
          应用推荐
        </div>
        <div
          v-for="(item,index) in suggestApps"
          :key="index"
          class="model"
        >
          <div class="model-box">
            <img
              :src="item.cover_img ? require(`../../assets/images/${item.cover_img}`) : require('../../assets/images/shop/cover/chj.png')"
              alt=""
              @click="toAppDetails"
            >
          </div>
          <div class="model-top">
            <div class="model-text">
              <div class="title" @click="toAppDetails(item)">{{ item.modelShortName }}</div>
              <!-- <div class="desc">{{ item.decInfo }}</div> -->
              <div class="details">{{ item.descript }}</div>
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
              v-model="item.modelStart"
              disabled
              show-score
              text-color="#ff675a"
              score-template="{value}"
              :colors="['#ff675a','#ff675a','#ff675a']"
            >
            </el-rate>
          </div>
          <div class="descript">{{ item.decInfo }}</div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  props: {
    suggestApps: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      height: 'calc(100vh - 9.6rem)'

    }
  },
  methods: {
    toAppDetails(item) {
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
.appRecommendation {
  width: 100%;
  height: 100%;
  .appRecommendation-content {
    .container {
      padding: 0.9rem 1.4rem;
      .title {
        font-size: 1.4rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #46705b;
        line-height: 20px;
      }
      .model {
        .model-box {
          cursor: pointer;
          height: 15.2rem;
          background-color: #e9eef3;
          border-radius: 1rem;
          margin: 1.7rem 2rem;
          box-shadow: 0.1rem 0.1rem 0.5rem #e9eef3;
          text-align: center;
          img {
            width: 100%;
          }
          &:hover {
            transform: scale(1.02, 1.02);
          }
        }
        .model-top {
          display: flex;
          .model-text {
            width: 80%;
            margin: 0 2rem;
            font-family: PingFangSC-Semibold, PingFang SC;
            .title {
              font-size: 1.6rem;
              font-weight: 600;
              color: #2d4c51;
              line-height: 2.2rem;
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
          :deep(.el-rate__icon) {
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
</style>
