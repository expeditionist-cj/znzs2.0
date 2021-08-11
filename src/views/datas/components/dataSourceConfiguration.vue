<template>
  <div class="dataSourceConfiguration">
    <div class="dataSourceConfiguration-content">
      <div class="title">
        数据源配置
      </div>
      <div class="nav">
        <div class="nav-left">
          <el-button
            type="success"
            class="btn"
            size="mini"
            icon="el-icon-plus"
          >新增</el-button>
        </div>
      </div>
      <div class="dataSourceConfiguration-table">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%;"
          border
          size="mini"
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
            label="最后更新时间"
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
            <template #default="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleClick(scope.row)"
              >修改</el-button>
              <el-button
                type="text"
                size="mini"
                @click="handleClick(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
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
      numb: {
        total: 572,
        good: 482,
        bad: 4,
        timeout: 1
      },
      tableData: [
        {
          name: 1
        },
        {
          name: 1
        }
      ],
      total: 1000 // 分页总个数
    }
  }
}
</script>

<style lang="less" scoped>
.dataSourceConfiguration {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 1rem;
  .dataSourceConfiguration-content {
    padding: 1rem;
    .title {
      font-size: 1.6rem;
      font-weight: 500;
      color: #46705b;
      line-height: 2.2rem;
      margin: 0 0 1rem 0.5rem;
    }
    .dataSourceConfiguration-table {
      margin-top: 1rem;
      /deep/.el-button {
        border: 0;
      }
    }
  }
}
</style>
