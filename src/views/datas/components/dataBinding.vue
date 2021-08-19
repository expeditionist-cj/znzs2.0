<template>
  <div class="dataBinding">
    <div class="dataBinding-content">
      <div class="title">
        数据绑定
      </div>
      <div class="nav">
        <div class="nav-left">
          <el-input
            v-model="keyWords"
            class="ipt"
            size="mini"
            placeholder="请输入“测点编码/描述/类型/单位/系统名称”"
          ></el-input>
          <el-button
            type="success"
            class="btn"
            size="mini"
            icon="el-icon-search"
            @click="init"
          >查询</el-button>
          <el-button
            type="success"
            class="btn"
            size="mini"
            icon="el-icon-plus"
            @click="doAdd"
          >新增</el-button>
          <el-button
            type="success"
            class="btn"
            size="mini"
            icon="el-icon-document"
          >模板下载</el-button>
          <el-button
            type="success"
            class="btn"
            size="mini"
            icon="el-icon-upload"
          >导入</el-button>
          <el-button
            type="success"
            class="btn"
            size="mini"
            icon="el-icon-download"
          >导出</el-button>
        </div>
      </div>
      <div class="dataBinding-table">
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
            prop="pointCode"
            label="测点编码"
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
            prop="dimension"
            label="单位"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="pointName"
            label="测点描述"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="mainSystem"
            label="主系统"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="subSystem"
            label="子系统"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template #default="scope">
              <el-button type="text" size="mini" @click="doEdit(scope.row)">修改</el-button>
              <el-button type="text" size="mini" @click="doDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="dataBinding-page">
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

    <!-- 弹框 -->
    <el-dialog
      v-model="centerDialogVisible"
      :title="dialogTitle"
      width="30%"
    >

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getDataByPage } from '@/api/datas/dataBinding'
export default {
  data () {
    return {
      dialogTitle: '新增',
      centerDialogVisible: false,
      keyWords: '',
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
        keyWords: this.keyWords
      }).then(res => {
        console.log(res, 200);
        if (res.data.data) {
          const { total, records } = res.data.data
          this.total = total
          this.tableData = records
        }
      })
    },
    doAdd() {
      // this.centerDialogVisible = true
    },
    // 修改
    doEdit (row) {
      // updateData(row).then(res => {
      //   console.log(res);
      // })
    },
    // 删除
    doDelete (row) {
      // delData(row.id).then(res => {
      //   console.log(res);
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.dataBinding {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 1rem;
  .dataBinding-content {
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
        .ipt {
          width: 30.6rem;
        }
        .btn {
          margin-left: 0.5rem;
        }
      }
    }
    .dataBinding-table {
      margin-top: 1rem;
      :deep(.el-button) {
        border: 0;
      }
    }
    .dataBinding-page {
      text-align: right;
      margin-top: 1rem;
    }
  }
}
</style>
