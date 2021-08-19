<template>
  <div class="dataStandardization">
    <div class="dataStandardization-content">
      <div class="title">
        数据标准化
      </div>
      <div class="nav">
        <div class="nav-left">
          <el-input
            v-model="keyWords"
            class="ipt"
            size="mini"
            placeholder="请输入“标准编码/描述”"
          ></el-input>
          <el-button
            type="success"
            class="btn"
            size="mini"
            icon="el-icon-search"
            @click="selectByPage"
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
            @click="importExcelDialogVisible = true"
          >导入</el-button>
          <el-button
            type="success"
            class="btn"
            size="mini"
            icon="el-icon-download"
            @click="doExport"
          >导出</el-button>
        </div>
      </div>
      <div class="dataStandardization-table">
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
            label="标准编码"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="stdName"
            label="标准描述"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="dimension"
            label="标准单位"
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
            prop="pointName"
            label="测点描述"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="pointDimension"
            label="测点单位"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="scaling"
            label="缩放比例"
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
                @click="doEdit(scope.row)"
              >修改</el-button>
              <el-button
                type="text"
                size="mini"
                @click="doDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="dataStandardization-page">
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
      v-model="dialogVisible"
      :title="dialogTitle"
      width="40%"
      :close-on-click-modal="false"
    >
      <div class="dialog-content clearfix">
        <div class="content-nav">
          <div class="text">
            <span class="title">项目</span><span class="redFont">*</span>
          </div>
          <el-select
            v-if="showSelect"
            v-model="rowData.plant"
            size="mini"
            placeholder="请选择"
            @change="changeDialogPlant"
          >
            <el-option
              v-for="(item, index) in dialogPlants"
              :key="index"
              :label="item.name"
              :value="item.deptCode"
            />
          </el-select>
          <el-input
            v-if="!showSelect"
            v-model="rowData.plantName"
            style="width: 15rem"
            size="mini"
          />
          <div class="text">
            <span class="title">机组</span><span class="redFont" />
          </div>
          <el-select
            v-if="showSelect"
            v-model="rowData.unit"
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in dialogUnitList"
              :key="index"
              :label="item.deviceName"
              :value="item.deviceCode"
            />
          </el-select>
          <el-input
            v-if="!showSelect"
            v-model="rowData.unitName"
            style="width: 15rem"
            size="mini"
          />
          <div class="text">
            <span class="title">点类型</span><span class="redFont">*</span>
          </div>
          <el-select
            v-model="rowData.sdtType"
            size="mini"
            placeholder="请选择"
            @change="changeSdtType"
          >
            <el-option
              v-for="item in sdtTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div
          v-if="sdtType == 'calc'"
          class="content-nav"
        >
          <div class="text">
            <span class="title">公式</span><span class="redFont">*</span>
          </div>
          <el-input
            v-model="rowData.cptExp"
            class="text-area"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </div>
        <div class="content-nav">
          <div class="text">
            <span class="title">标准名称</span><span class="redFont">*</span>
          </div>
          <el-input
            v-model="rowData.sdtName"
            class="ipt"
            size="mini"
          />
          <div class="text">
            <span class="title">标准编码</span><span class="redFont">*</span>
          </div>
          <el-input
            v-model="rowData.sdtCode"
            size="mini"
            class="ipt"
          />
        </div>
        <div
          v-if="sdtType == 'bind'"
          class="content-nav"
        >
          <div class="text">
            <span class="title">原始点名</span><span class="redFont">*</span>
          </div>
          <el-input
            v-model="rowData.oldName"
            class="ipt"
            size="mini"
          />
          <div class="text">
            <span class="title">原始码</span><span class="redFont">*</span>
          </div>
          <el-input
            v-model="rowData.oldCode"
            size="mini"
            class="ipt"
          />
        </div>
        <div class="content-nav">
          <div class="text">
            <span class="title">量纲</span><span class="redFont">*</span>
          </div>
          <el-input
            v-model="rowData.dimension"
            class="ipt"
            size="mini"
          />
          <div class="text">
            <span class="title">缩放</span><span class="redFont" />
          </div>
          <el-input
            v-model="rowData.scaling"
            size="mini"
            class="ipt"
          />
        </div>
        <div class="content-nav">
          <div class="content-nav-left">
            <div class="text">
              <span class="title">上限</span><span class="redFont" />
            </div>
            <el-input
              v-model="rowData.upLimit"
              class="ipt"
              size="mini"
            />
          </div>
          <div class="content-nav-right">
            <div class="text">
              <span class="title">下限</span><span class="redFont" />
            </div>
            <el-input
              v-model="rowData.lowLimit"
              size="mini"
              class="ipt"
            />
          </div>
        </div>
        <div class="content-nav">
          <div class="content-nav-left">
            <div class="text">
              <span class="title">值类型</span><span class="redFont">*</span>
            </div>
            <el-select
              v-model="rowData.pointValType"
              size="mini"
              class="select-width"
              placeholder="请选择"
            >
              <el-option
                v-for="item in pointValTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="content-nav-right">
            <div class="text">
              <span class="title">统计方式</span><span class="redFont">*</span>
            </div>
            <el-select
              v-model="rowData.cptType"
              size="mini"
              class="select-width"
              placeholder="请选择"
            >
              <el-option
                v-for="item in cptTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="mini"
            @click="dialogVisible = false"
          >取 消</el-button>
          <el-button
            type="success"
            size="mini"
            @click="dialogVisible = false"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 导入excel弹框提示 -->
    <MyUpload
      ref="myUpload"
      :submit-loading="submitLoading"
      :import-excel-dialog-visible="importExcelDialogVisible"
      @submitUpload="submitUpload"
      @changeImportExcelDialogVisible="changeImportExcelDialogVisible"
    />
  </div>
</template>

<script>
import { getDataByPage, updateData, delData, uploadSdt, exportSdt } from '@/api/datas/dataStandardization'
import { getAllPlants, selectUnitCode } from '@/api/common'
import { getCurrentInstance } from 'vue'
import MyUpload from '@/components/myUpload/index.vue'
import { proxyUrl } from '@/config/config'
export default {
  components: {
    MyUpload
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const selectByPage = proxy.$debounce(() => {
      proxy.init()
    })
    return {
      selectByPage
    }
  },
  data () {
    return {
      submitLoading: false,
      importExcelDialogVisible: false,
      fileList: [],
      proxyUrl,
      dialogUnitList: [],
      dialogPlants: [],
      pointValTypes: [
        {
          value: 'ist',
          label: '瞬时值'
        },
        {
          value: 'cml',
          label: '累计值'
        }
      ],
      cptTypes: [
        {
          value: 'sum',
          label: '小时累计'
        },
        {
          value: 'avg',
          label: '小时平均'
        }
      ],
      sdtTypes: [
        {
          value: 'calc',
          label: '计算点'
        },
        {
          value: 'bind',
          label: '绑定点'
        }
      ],
      sdtType: 'calc',
      showSelect: true,
      rowData: {},
      dialogVisible: false,
      dialogTitle: '新增',
      keyWords: '',
      tableData: [],
      current: 1,
      size: 20,
      total: 100 // 分页总个数
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化分页查询
    init () {
      getDataByPage({
        current: this.current,
        keyWords: this.keyWords,
        plantCode: this.plantCode,
        size: this.size
      }).then(res => {
        if (res.data) {
          const { records, total } = res.data
          this.tableData = records
          this.total = total
        }
      })
    },
    //   查询电厂
    getAllPlantsInfo () {
      getAllPlants().then((res) => {
        console.log(res, 100)
        const data = res.data
        this.dialogPlants = data
        const plants = JSON.parse(JSON.stringify(res.data))
        plants.unshift({
          name: '所有项目',
          deptCode: ''
        })
        this.plants = plants
      })
    },
    // 弹框中切换点类型
    changeSdtType (value) {
      this.sdtType = value
    },
    // 弹框中切换电厂查询机组
    changeDialogPlant (value) {
      this.dialogUnitList = []
      this.getDialogUnitList(value)
    },
    // 弹框中根据电厂查询机组
    getDialogUnitList (value) {
      if (!value) {
        this.dialogUnitList = []
        return
      }
      selectUnitCode({
        plant: value
      }).then((res) => {
        this.dialogUnitList = res.data
      })
    },
    // 新增
    doAdd () {
      this.dialogVisible = true
      this.getAllPlantsInfo()
    },
    // 修改
    doEdit (row) {
      updateData(row).then(res => {
        console.log(res);
      })
    },
    // 删除
    doDelete (row) {
      delData(row.id).then(res => {
        console.log(res);
      })
    },
    changeImportExcelDialogVisible(value) {
      this.importExcelDialogVisible = value
    },
    // 上传
    submitUpload(formData) {
      console.log(formData, 100)
      // return
      this.submitLoading = true
      // this.$refs.myUpload.clearFiles() // 清空已上传的文件
      uploadSdt(formData)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success('上传成功！')
            this.submitLoading = false
            this.importExcelDialogVisible = false
            // this.$refs.myUpload.clearFiles() // 清空已上传的文件
            this.init()
          } else {
            this.submitLoading = false
            this.$message.error(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
          this.submitLoading = false
          this.$message.error('上传失败')
        })
    },
    // 导出
    doExport() {
      exportSdt({
        current: this.current,
        keyWords: this.keyWords,
        plantCode: this.plantCode,
        size: this.size
      }).then(res => {
        console.log(res);
      })
    }
  }

}
</script>

<style lang="less" scoped>
.dataStandardization {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 1rem;
  .dataStandardization-content {
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
          width: 20.6rem;
        }
        .btn {
          margin-left: 0.5rem;
        }
      }
    }
    .dataStandardization-table {
      margin-top: 1rem;
      :deep(.el-button) {
        border: 0;
      }
    }
    .dataStandardization-page {
      text-align: right;
      margin-top: 1rem;
    }
  }
  .dialog-content {
    padding-left: 1rem;
    .content-nav {
      padding-right: 2rem;
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      .content-nav-left {
        width: 50%;
        display: flex;
      }
      .content-nav-right {
        width: 50%;
        display: flex;
        .select-width {
          width: 100%;
        }
      }
      .text {
        display: flex;
        margin-right: 0.2rem;
        .title {
          width: 8rem;
          display: inline-block;
          text-align: right;
        }
        .redFont {
          width: 1rem;
          color: red;
          display: inline-block;
        }
      }
    }
  }
}
</style>
