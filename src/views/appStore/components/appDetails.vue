<template>
  <div class="appDetails">
    <div class="appDetails-left">
      <div class="appDetails-left-img">
        <div class="img-box">
          <img
            :src="require(`../../../assets/images/${routeParams.icon || 'defaultDevice'}.png`)"
            alt=""
          >
        </div>
        <el-button
          class="btn"
          size="small"
          type="primary"
        >获取</el-button>
      </div>
      <div class="appDetails-right">
        <div class="top-title">
          <div class="title">{{ routeParams.short_name }}</div>
          <el-rate
            v-model="star"
            disabled
            show-score
            text-color="#ff675a"
            score-template="{value}"
            :colors="['#ff675a','#ff675a','#ff675a']"
          >
          </el-rate>
        </div>
        <div class="tag">
          标签: {{ routeParams.tag }}
        </div>
        <div class="line"></div>
        <div class="content">
          <div class="content-title">
            概述：
          </div>
          <div class="content-text">
            {{ routeParams.desc_info }}
          </div>
          <div class="content-title">
            适用范围:
          </div>
          <div class="content-text">
            {{ routeParams.app_env }}
          </div>
          <div class="content-title">
            应用截图:
          </div>
          <div class="content-image">
            <el-image
              v-for="(item,index) in imgList"
              :key="index"
              class="img-item"
              :src="require(`../../../assets/images/${item.imgUrl}.png`)"
              :preview-src-list="[require(`../../../assets/images/${item.imgUrl}.png`)]"
            ></el-image>
          </div>
        </div>
      </div>
    </div>
    <div class="appDetails-right">
      <AppRecommendation :suggest-apps="suggestApps" />
    </div>
  </div>
</template>

<script>
import AppRecommendation from '@/components/AppRecommendation'
import { recommend } from '@/api/application/index'
import { mapState } from 'vuex'
export default {
  components: {
    AppRecommendation
  },
  data () {
    return {
      height: 'calc(100vh - 45.6rem)',
      suggestApps: [],
      star: 4.5,
      imgList: [
        { imgUrl: 'defaultDevice' },
        { imgUrl: 'defaultDevice' },
        { imgUrl: 'defaultDevice' },
        { imgUrl: 'defaultDevice' },
        { imgUrl: 'defaultDevice' }
      ]
    }
  },
  computed: {
    ...mapState({
      routeParams: state => state.application.routeParams
    })
  },
  watch: {
    routeParams(value) {
      console.log(value, 100)
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
    }
  }
}
</script>

<style lang="less" scoped>
.appDetails {
  display: flex;
  justify-content: space-between;
  .appDetails-left {
    width: 80%;
    display: flex;
    border-radius: 1rem;
    background-color: #fff;

    .appDetails-left-img {
      width: 24%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      .img-box {
        width: 90%;
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
      .btn {
        width: 90%;
      }
    }
    .appDetails-right {
      width: 72%;
      padding: 3.7rem 1rem 0;
      .top-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .title {
          font-size: 2.4rem;
          font-weight: 600;
          color: #2d4c51;
          line-height: 3.3rem;
        }
      }
      .tag {
        font-size: 1.4rem;
        font-weight: 400;
        color: #4f7084;
        line-height: 2rem;
        margin-top: 0.5rem;
      }
      .line {
        width: 100%;
        border-bottom: 0.1rem solid rgba(232, 232, 232, 1);
        margin: 2rem 0;
      }
      .content {
        display: flex;
        flex-direction: column;
        .content-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #2d4c51;
          line-height: 2.5rem;
        }
        .content-text {
          margin: 1rem 0 3rem;
          font-weight: 400;
          font-size: 1.6rem;
          color: #738184;
          line-height: 2.8rem;
        }
        .content-image {
          display: flex;
          flex-wrap: nowrap;
          height: 20rem;
          overflow: auto;
          padding: 2rem 0;
          .img-item {
            width: 25%;
            min-width: 21.8rem;
            height: 16rem;
            margin: 0 1rem;
          }
        }
      }
    }
  }
  .appDetails-right {
    width: calc(20% - 0.5rem);
    background-color: #fff;
    border-radius: 1rem;
  }
}
</style>
