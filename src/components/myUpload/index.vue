<template>
  <div class="myUpload-wrap">
    <el-dialog
      :model-value="importExcelDialogVisible"
      :before-close="beforeClose"
      title="导入excel"
      width="30%"
    >
      <el-upload
        ref="upload"
        class="upload-demo"
        :limit="limit"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-remove="handleRemove"
        :on-change="changeFile"
        :auto-upload="false"
      >
        <!-- <template #trigger> -->
        <el-button size="mini" type="success">选取文件</el-button>
        <!-- </template> -->
        <!-- <template #tip>
          <div class="el-upload__tip">
            Excel文件，且不超过500kb
          </div>
        </template> -->
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="mini" @click="onCloseDialog">取 消</el-button>
          <el-button
            size="mini"
            type="success"
            :loading="submitLoading"
            @click="submitUpload"
          >上传文件</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tip: {
      type: String,
      default: '请上传Excel文件'
    },
    limit: {
      type: Number,
      default: 1
    },
    submitLoading: {
      type: Boolean,
      default: false
    },
    importExcelDialogVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      importExcelTime: Date.now(),
      importExcelDataPickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      file: null
    };
  },
  computed: {},
  watch: {
  },
  created() {},
  mounted() {
  },
  methods: {
    // 删除文件
    handleRemove(file) {
      this.$emit('handleRemove', file);
    },
    // 文件改变时触发
    changeFile(file) {
      this.file = file
    },
    // 上传文件
    submitUpload() {
      if (!this.$refs.upload.uploadFiles.length) {
        this.$message.info('请选择要上传的文件');
        return false;
      }
      console.log(this.file, 30)
      this.$emit('submitUpload', this.file);
    },
    beforeClose(done) {
      this.$emit('changeImportExcelDialogVisible', false);
    },
    onCloseDialog() {
      this.$emit('changeImportExcelDialogVisible', false);
    },
    // 清空已上传文件
    clearFils() {
      this.$refs.upload.clearFiles()
    }
  }
};
</script>

<style lang="less">
.myUpload-wrap {
  // .el-dialog, .el-pager li{
  //   background-color: #263553!important;
  // }
  // .el-dialog__title{
  //   color: rgba(255,255,255,0.9);
  // }
  // .el-upload__tip{
  //   color: rgba(255,255,255,0.9);
  // }
  // .el-upload-list__item-name{
  //   color: rgba(255,255,255,0.9);
  // }
  // .el-upload-list__item:hover{
  //   background-color: rgba(255,255,255,0.4);
  // }
}
</style>
