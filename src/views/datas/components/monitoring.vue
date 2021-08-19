<template>
  <div class="monitoring">
    <div class="monitoring-content">
      <div class="title">
        实时监控
      </div>
      <div class="nav">
        <div class="nav-left">
          <span class="name">数据源：</span>
          <el-select
            v-model="resource"
            class="resource"
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dataResource"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span class="name">质量：</span>
          <el-select
            v-model="quality"
            class="quality"
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dataQuality"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            v-model="pointName"
            class="ipt"
            size="mini"
            placeholder="请输入点名或描述"
          ></el-input>
          <el-button
            type="success"
            class="btn"
            size="mini"
            icon="el-icon-search"
            @click="init"
          >查询</el-button>
          <!-- <el-button
            type="success"
            class="btn"
            size="mini"
            icon="el-icon-download"
          >导出</el-button> -->
        </div>
        <!-- <div class="nav-right">
          在线测点总数：<span class="normal">{{ numb.total }}</span>&nbsp;&nbsp;
          数据良好： <span class="good">{{ numb.good }}</span>&nbsp;&nbsp;
          坏点数量： <span class="bad">{{ numb.bad }}</span>&nbsp;&nbsp;
          数据超时： <span class="timeout">{{ numb.timeout }}</span>
        </div> -->
      </div>
      <div class="monitoring-table">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%;"
          border
          size="mini"
          height="68.5rem"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="stdCode"
            label="点名"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="val"
            label="最后更新值"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="dimension"
            label="单位"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="stdName"
            label="描述"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="quality"
            label="质量"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="最后更新时间"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="protocolName"
            label="归属数采服务"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template #default="scope">
              <el-button
                type="text"
                size="mini"
                @click="lookDiagram(scope.row)"
              >曲线</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="monitoring-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="size"
          :current-page="current"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataByPage } from '@/api/datas/monitoring'
export default {
  data () {
    return {
      resource: '',
      dataResource: [
        {
          value: '22',
          label: '11'
        }
      ],
      quality: '',
      dataQuality: [
        {
          value: '22',
          label: '11'
        }
      ],
      pointName: '',
      // numb: {
      //   total: 572,
      //   good: 482,
      //   bad: 4,
      //   timeout: 1
      // },
      tableData: [],
      current: 1,
      size: 20,
      total: 0 // 分页总个数
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getDataByPage({
        current: this.current,
        size: this.size,
        protocolCode: this.resource
      }).then(res => {
        if (res.data.data) {
          const { total, records } = res.data.data
          this.total = total
          this.tableData = records
        }
      })
    },
    lookDiagram() {}
  }
}
</script>

<style lang="less" scoped>
.monitoring {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 1rem;
  .monitoring-content {
    padding: 1rem;
    .title {
      font-size: 1.6rem;
      font-weight: 500;
      color: #46705b;
      line-height: 2.2rem;
      margin: 0 0 1rem 0.5rem;
    }
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .nav-left {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        .name {
          display: block;
          font-size: 1.4rem;
          color: #62807f;
          margin-left: 0.5rem;
          text-align: right;
        }
        .resource {
          width: 14.4rem;

        }
        .quality {
          width: 10.4rem;

        }
        .ipt {
          margin-left: 0.5rem;
          width: 20.6rem;
        }
        .btn {
          margin-left: 0.5rem;
        }
      }
      .nav-right {
        margin-right: 2rem;
        .normal {
          font-size: 1.6rem;
          color: #2d4c51;
        }
        .good {
          font-size: 1.6rem;
          color: #40a969;
        }
        .bad {
          font-size: 1.6rem;
          color: #f9455b;
        }
        .timeout {
          font-size: 1.6rem;
          color: #d59146;
        }
      }
    }
    .monitoring-table {
      margin-top: 1rem;
    }
    .monitoring-page {
      text-align: right;
      margin-top: 1rem;
    }
  }
}
</style>
