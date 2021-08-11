<template>
  <div class="home">
    <div class="nav-left">
      <div class="nav-left-content">
        <div class="top-content">
          <div class="navbar">
            <div
              v-for="(item,index) in datasMenu"
              :key="index"
              class="list-box"
              :class="{active: item.component === acctiveData}"
              @click="onCheck(item)"
            >
              <div class="list-box-img">
                <img
                  :src="require(`../../../assets/images/${item.imgUrl}.png`)"
                  alt=""
                >
              </div>
              <div class="list-box-title">
                {{ item.title }}
              </div>
            </div>
          </div>
          <div class="top-content-img">
            <div class="points">
              <div
                v-for="(item,index) in points"
                :key="index"
                class="points-box"
              >
                <div class="numb">
                  {{ item.value }}
                </div>
                <div class="name">
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="dataHomeImg">
              <div class="data-top">23</div>
              <div class="data-right">98K</div>
              <div class="data-bottom">25</div>
              <div class="data-left">41</div>
            </div>

          </div>

        </div>
        <div class="bottom-content">
          <div class="table-title">
            数据源
          </div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%;"
            border
            size="mini"
            height="14.4rem"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="连接名称"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="通讯类型"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="通讯地址"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="通讯状态"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="采集点位数量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="日数据采集量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="累计运行时长"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="content-right">
      <div class="msgs">
        <div class="msgs-title">
          实时消息
        </div>
        <div
          v-for="(item,index) in msgs"
          :key="index"
          class="msg-box"
        >
          <div class="top-msg">
            <el-button
              size="mini"
              round
              :type="item.level > 1? 'warning' : 'danger'"
            >{{ item.level > 1? '超时' : '坏点' }}</el-button>
            <div class="time">{{ item.time }}</div>
          </div>
          <div class="bottom-msg">
            {{ item.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import datasMenu from '@/config/datasMenu'
export default {
  data () {
    return {
      acctiveData: '',
      datasMenu,
      tableData: [
        {
          name: '1'
        },
        {
          name: '1'
        }
      ],
      points: [
        {
          name: '测点总量',
          value: '150'
        },
        {
          name: '测点总量',
          value: '150'
        },
        {
          name: '测点总量',
          value: '150'
        },
        {
          name: '测点总量',
          value: '150'
        }
      ],
      msgs: [
        {
          time: '2021/08/31 12:23:21',
          level: 2,
          message: '24:N:R:B_RP:3_D07:A5M #8炉B SCR反应器第2、3层催化剂间烟气压力'
        },
        {
          time: '2021/08/31 12:23:21',
          level: 1,
          message: '24:N:R:B_RP:3_D07:A5M #8炉B SCR反应器第2、3层催化剂间烟气压力'
        },
        {
          time: '2021/08/31 12:23:21',
          level: 2,
          message: '24:N:R:B_RP:3_D07:A5M #8炉B SCR反应器第2、3层催化剂间烟气压力'
        },
        {
          time: '2021/08/31 12:23:21',
          level: 1,
          message: '24:N:R:B_RP:3_D07:A5M #8炉B SCR反应器第2、3层催化剂间烟气压力'
        },
        {
          time: '2021/08/31 12:23:21',
          level: 1,
          message: '24:N:R:B_RP:3_D07:A5M #8炉B SCR反应器第2、3层催化剂间烟气压力'
        }
      ]
    }
  },
  methods: {
    onCheck (item) {
      this.$store.commit('PUSH_NAVBARLIST', {
        title: item.title,
        path: item.path
      })
      // this.$router.push({
      //   path: item.path
      // })
      this.acctiveData = item.component
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../styles/common.less";
.home {
  width: 100%;
  height: calc(100% - 4rem);
  display: flex;
  justify-content: space-between;
  .nav-left {
    width: 80%;
    height: calc(100% + 3.5rem);
    padding: 0.5rem;
    margin-right: 0.5rem;
    .nav-left-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top-content {
        display: flex;
        margin-bottom: 1rem;
        .navbar {
          display: flex;
          flex-direction: column;
          background: #fff;
          padding-top: 2rem;
          border-radius: 1rem;
          .list-box {
            cursor: pointer;
            width: 9rem;
            height: 10.5rem;
            border: 0.1rem solid rgba(106, 166, 156, 0.4);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 1.4rem 1.4rem;
            border-radius: 1rem;
            &:hover {
              color: @activeColor;
              background-color: @activeBgColor;
            }
            .list-box-img {
              img {
                width: 5.2rem;
              }
            }
            .title {
              height: 2rem;
              font-size: 1.6rem;
              padding: 0.5rem;
              margin-bottom: 1rem;
            }
          }
          .active {
            color: @activeColor;
            background-color: @activeBgColor;
          }
        }
        .top-content-img {
          width: 100%;
          background: url("../../../assets/images/bgWg.png");
          position: relative;
          .points {
            display: flex;
            .points-box {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 0.8rem 2rem;
              background: #fff;
              border-radius: 0.8rem;
              margin-left: 1rem;
              .numb {
                font-size: 2.4rem;
                font-weight: 600;
                color: #005f9d;
                line-height: 3.3rem;
              }
              .name {
                font-size: 1.4rem;
                font-weight: 500;
                color: #005f9d;
                line-height: 2rem;
              }
            }
          }
          .dataHomeImg {
            background: url("../../../assets/images/dataHome.png");
            background-size: 100% 100%;
            width: 86.9rem;
            height: 54rem;
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }
          .data-top {
            position: absolute;
            top: 9.5%;
            left: 34%;
            z-index: 2;
            font-size: 1.8rem;
            color: rgba(255, 211, 0, 1);
          }
          .data-right {
            position: absolute;
            top: 30%;
            left: 83%;
            z-index: 2;
            font-size: 1.8rem;
            color: rgba(255, 211, 0, 1);
          }
          .data-bottom {
            position: absolute;
            z-index: 2;
            font-size: 1.8rem;
            color: rgba(255, 211, 0, 1);
            top: 76.5%;
            left: 46%;
          }
          .data-left {
            position: absolute;
            z-index: 2;
            font-size: 1.8rem;
            color: rgba(255, 211, 0, 1);
            top: 56.5%;
            left: 21%;
          }
        }
      }
      .bottom-content {
        padding: 1rem;
        border-radius: 1rem;
        overflow: hidden;
        background: #fff;
        .table-title {
          font-size: 1.6rem;
          font-weight: 500;
          color: #46705b;
          line-height: 2.2rem;
          margin-bottom: 1rem;
        }
        .el-table--mini {
          font-size: 1.2rem;
        }
        /deep/.el-table--mini td,
        /deep/.el-table--mini th {
          padding: 0.6rem 0;
        }
      }
    }
  }
  .content-right {
    width: 35.4rem;
    max-width: 35.4rem;
    height: 100%;
    overflow: hidden;
    padding: 2rem;
    background: #fff;
    border-radius: 1rem;
    .msgs {
      display: flex;
      flex-direction: column;
      .msgs-title {
        font-size: 1.6rem;
        font-weight: 500;
        color: #46705b;
        line-height: 2.2rem;
        margin-bottom: 1.6rem;
      }
      .msg-box {
        background: #f2f8f8;
        margin-bottom: 1.6rem;
        border-radius: 0.2rem;
        padding: 0.5rem 1rem;
        .top-msg {
          display: flex;
          justify-content: space-between;
          align-items: center;

          /deep/.el-button--mini,
          .el-button--mini.is-round {
            padding: 0.3rem 0.9rem;
          }
          /deep/.el-button.is-round {
            border-radius: 2rem;
          }
          /deep/.el-button {
            min-height: 1rem;
            font-size: 1.2rem;
          }
        }
        .bottom-msg {
          font-size: 1.4rem;
          font-weight: 400;
          color: #2d4c51;
          line-height: 2.2rem;
        }
      }
    }
  }
}
</style>
